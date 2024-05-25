<?php

namespace App\Filters;

use App\Helpers\CookieHelper;
use App\Models\Framework\TokenModel;
use App\Models\Framework\UserModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Check_deprecado implements FilterInterface{

    public function before(RequestInterface $request, $arguments = null)
    {
        $crosFilter = new CorsFilter();
        // $method = $request->getMethod();
        $axios = $request->getUri()->getPath();
        $firstUri = $request->getUri()->getSegment(1);

        if($request->getCookie('accessToken') == null){
            return $crosFilter->sendResponse(['message' => 'Nonexistent Token','state' => 'NOT_LOGGED'], 401);
        }
        $token = $request->getCookie('accessToken');

        // $crosFilter = new CorsFilter();

        /** obtener cabeceras */
        // if($request->header('cli') == null){
        //     return $crosFilter->sendResponse(['message' => 'Non-existent customer data'], 403);
        // }

        // $token = $request->header('accessToken')->getValue();
        
        /** checkear validacion de token */
        $vars = $this->checkToken($token);

        if($vars->code >= 400){
            // Eliminamos cookie HTTP ONLY
            CookieHelper::setCookie('accessToken', '', 0);

            return $crosFilter->sendResponse(['message' => 'Invalid authorization','state' => 'NOT_LOGGED'], $vars->code);
        }

        /** valida tiempo de vida de token */
        /** verificar el entorno que tmb deberia estar en el token */
        $valido = $this->checkStatus($vars);
        if($valido->code >= 400){
            // Eliminamos cookie HTTP ONLY
            CookieHelper::setCookie('accessToken', '', 0);

            return $crosFilter->sendResponse(['message' => $valido->message,'state' => 'NOT_LOGGED'], $valido->code);
        }

        /** checkear sesion activa */
        $session = $this->checkActiveSession($token, $vars);
        if($session->code >= 400){
            // Eliminamos cookie HTTP ONLY
            CookieHelper::setCookie('accessToken', '', 0);

            return $crosFilter->sendResponse(['message' => 'Session expired.','state' => 'NOT_LOGGED'], $session->code);
        }

        $_SERVER['ACCESS_TOKEN'] = $token;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null){
        $token = $request->getCookie('accessToken');
        $state = $this->refreshToken($token);
        if($state->token != 'none'){
            CookieHelper::setCookie('accessToken', $state->token, $state->exp_time);
            $_SERVER['ACCESS_TOKEN'] = $token;
        }
    }

    private function checktoken($token){
        $model = new TokenModel();
        $secret = $model->getSecret();
        $ret = new \stdClass();
        $key = new key ($secret,'HS256');
        try{
            $vars = JWT::decode($token, $key);
            $ret = $vars;
            $ret->code = 200;
        } catch (\Throwable $e){
            $ret->message = $e->getMessage();
            $ret->code = 401;
        }

        return $ret;
    }

    private function checkstatus($vars){
        /** todo valida tiempo de vida de token */
        $ret = new \stdClass();
        $model = new TokenModel();
        $now = time();

        $ret->message = '';
        $ret->code = 200;

        if($vars->exp <= $now){
            $ret->message = 'Expired Session';
            $ret->code = 401;
        }
        return $ret;
    }

    private function refreshtoken($token){
        $tokenModel = new TokenModel();
        $model = new UserModel();
        $param = new \stdClass();
        $resp = new \stdClass();
        $vars = $this->checkToken($token);
        $now = time();
        $timeLimit = $tokenModel->getExpirationTime();
        $timeLimitRefresh = $tokenModel->getExpirationTimeRefresh();
        $expiration = $now + $timeLimit;
        if($vars->exp < $expiration){
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
            if($registerLogin->state != 'OK'){
                return $this->response->setJSON($registerLogin)->setStatusCode(401);
            }
        }
        else{
            $resp->token = 'none';
            $resp->param = 'none';
        }
        return $resp;
    }

    private function checkActiveSession($accessToken, $vars){
        helper('tdi_helper');
        $ret = new \stdClass();
        $model = new TokenModel();

        $secret = $model->getSessionRecord(decryptedAES($vars->user), $accessToken);

        $ret->message = '';
        $ret->code = 200;

        if($secret != 1){
            $ret->message = 'Session disabled';
            $ret->code = 401;
        }

        if($ret->code == 200){
            $model->setUserConnect(decryptedAES($vars->user));
        }

        return $ret;
    }
}