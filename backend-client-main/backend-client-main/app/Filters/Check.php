<?php

namespace App\Filters;

use App\Models\Framework\TokenModel;
use App\Models\Framework\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\Key;

class Check implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $crosFilter = new CorsFilter();
        // Obtener el token de acceso del encabezado de autorización
        // $token = $request->getHeaderLine('Authorization');
        // Obtener el token de autorización del encabezado
        if ($request->header('Authorization') == null) {

            return $crosFilter->sendResponse(['message' => 'No-existente token'], 403);
        }
        $token = $request->getHeaderLine('Authorization');
        // El token tiene que venir precedido por el prefijo 'Bearer'.
        // funcion para checkear que venga en el formato esperado.
        $accessToken = $this->checktokenformat($token);

        $vars = $this->checkToken($accessToken);

        if ($vars->code >= 400) {

            return $crosFilter->sendResponse(['message' => 'Autorizacion Invalida. -Sesión expirada.', 'state' => 'NOT_LOGGED'], $vars->code);
        }

        /** valida tiempo de vida de token */
        /** verificar el entorno que tmb deberia estar en el token */
        $valido = $this->checkStatus($vars);
        if ($valido->code >= 400) {

            return $crosFilter->sendResponse(['message' => $valido->message, 'state' => 'NOT_LOGGED'], $valido->code);
        }

        /** checkear sesion activa */
        $session = $this->checkActiveSession($accessToken, $vars);
        if ($session->code >= 400) {

            return $crosFilter->sendResponse(['message' => 'Token expirado.', 'state' => 'NOT_LOGGED'], $session->code);
        }

        $_SERVER['ACCESS_TOKEN'] = $accessToken;

        // // Verificar y decodificar el token JWT
        // try {
        //     $decoded = JWT::decode($token, getenv('JWT_SECRET'), ['HS256']);
        // } catch (ExpiredException $e) {
        //     // Manejar el token expirado
        //     return $this->sendErrorResponse('Token expired', 'NOT_LOGGED', 401);
        // } catch (\Exception $e) {
        //     // Manejar otros errores de token
        //     return $this->sendErrorResponse('Invalid token', 'NOT_LOGGED', 401);
        // }

        // Si todo está bien, puedes continuar con la solicitud
        return;
    }

    // public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    // {
    //     // $token = $request->getHeaderLine('Authorization');
    //     // $accessToken = $this->checktokenformat($token);
    //     // $state = $this->refreshToken($accessToken);
    //     // $_SERVER['ACCESS_TOKEN'] = $token;
    //     // if($state->token != 'none'){
    //     //     // CookieHelper::setCookie('accessToken', $state->token, $state->exp_time);
    //     //     $_SERVER['ACCESS_TOKEN'] = $token;
    //     // }
    // }
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        if ($request->getHeaderLine('Authorization') == null) {
            return $response->setJSON([
                'codigo' => 403,
                'mensaje' => 'Token Inexistente'
            ])->setContentType('application/json')
                ->setStatusCode(403);
        }

        try {
            $token = $request->getHeaderLine('Authorization');
            $accessToken = $this->checktokenformat($token);
            $vars = $this->checkToken($accessToken);
            $model = new TokenModel();
            //Rango de tiempo donde debo refrescar el token
       
            $expiration = $model->getExpirationTime();
            if (($vars->exp - time()) < $expiration) {
                $refreshed_data = $this->refreshtoken($accessToken);
          
                $_SERVER['ACCESS_TOKEN'] = $refreshed_data->token;
                // CookiesHelper::generate_cookie('token', $refreshed_data['token'], $refreshed_data['exp_cookie']);
                return $response->setHeader('refreshtoken',$refreshed_data->token);
            }
        } catch (\Exception $e) {
            $resp = [
                'message' => html_entity_decode($e->getMessage()),
                'resultado' => 'NOOK'
            ];
            return $response->setJSON($resp)->setStatusCode(409);
        }
    }
    /**
     * Envía una respuesta de error JSON.
     *
     * @param string $message Mensaje de error
     * @param string $state Estado
     * @param int $statusCode Código de estado HTTP
     * @return ResponseInterface Respuesta HTTP
     */

    public function checktokenformat($token)
    {

        $tokenParts = explode(' ', $token);
        $ret = new \stdClass();

        try {
            if (count($tokenParts) == 2 && $tokenParts[0] == 'Bearer') {
                $accessToken = $tokenParts[1];
                return  $accessToken;
            } else {
                $ret->message = 'Autorizacion Invalida -formato Incorrecto.';
                $ret->code = 401;
                return $ret;
            }
        } catch (\Throwable $e) {
            $ret->message = $e->getMessage();
            $ret->code = 401;
            return $ret;
        }
    }
    public function checktoken($token)
    {
        $model = new TokenModel();
        $secret = $model->getSecret();

        $ret = new \stdClass();
        $key = new key($secret, 'HS256');

        try {

            $vars = JWT::decode($token, $key);
            $ret = $vars;

            $ret->code = 200;
        } catch (\Throwable $e) {
            $ret->message = $e->getMessage();

            $ret->code = 401;
        }

        return $ret;
    }

    private function checkstatus($vars)
    {
        /** todo valida tiempo de vida de token */
        $ret = new \stdClass();
        $model = new TokenModel();
        $now = time();

        $ret->message = '';
        $ret->code = 200;

        if ($vars->exp <= $now) {
            $ret->message = 'Sesión Expirada';
            $ret->code = 401;
        }
        return $ret;
    }
 
    private function refreshtoken($token)
    {
        $tokenModel = new TokenModel();
        $model = new UserModel();
        $param = new \stdClass();
        $resp = new \stdClass();
        $vars = $this->checkToken($token);
        $now = time();
        $timeLimit = $tokenModel->getExpirationTime();
        $timeLimitRefresh = $tokenModel->getExpirationTimeRefresh();
        $expiration = $now + $timeLimit;
        if ($vars->exp < $expiration) {
            $tk = $tokenModel->getTokenData();
            $secret = $tk['SECRET'];
            $header = ['typ' => 'JWT', 'alg' => 'HS256'];

            $payload = [
                'user' => $vars->user,
                'iat' => $now,
                'exp' => $now + $timeLimitRefresh,
                // 'home' => $vars->home,
                // 'entorno' => $vars->entorno
            ];

            $resp->token = JWT::encode($payload, $secret, 'HS256', null, $header);
            $resp->exp_time = $timeLimitRefresh;

            $registerLogin = $model->registerLoginUser(decryptedAES($vars->user), $resp->token);
            if ($registerLogin->state != 'OK') {
                return $this->response->setJSON($registerLogin)->setStatusCode(401);
            }
        } else {
            $resp->token = 'none';
            $resp->param = 'none';
        }
        return $resp;
    }

    private function checkActiveSession($accessToken, $vars)
    {
        helper('tdi_helper');
        $ret = new \stdClass();
        $model = new TokenModel();

        $secret = $model->getSessionRecord(decryptedAES($vars->user), $accessToken);

        $ret->message = '';
        $ret->code = 200;

        if ($secret != 1) {
            $ret->message = 'Sesión Inhabilitada';
            $ret->code = 401;
        }

        if ($ret->code == 200) {
            $model->setUserConnect(decryptedAES($vars->user));
        }

        return $ret;
    }
}
