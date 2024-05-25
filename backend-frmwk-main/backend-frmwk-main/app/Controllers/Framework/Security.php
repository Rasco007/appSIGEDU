<?php
namespace App\Controllers\Framework;
use App\Controllers\BaseController;
use App\Helpers\CookieHelper;
use App\Models\Framework\TokenModel;
use App\Models\Framework\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Security extends BaseController
{
    public function index()
    {
        //validar origen de peticion con datos de CLI
//        if($this->request->header('Origin')){
//            $originCall = explode(" ",$this->request->header('Origin'))[1];

//        if($this->request->getIPAddress()){
//            $originCall = $this->request->getIPAddress();
//        }else{
//            $data = [
//                'status' => 'ERROR',
//                'message' => 'Origin not found.'
//            ];
//            return $this->response->setJSON($data)->setStatusCode(403);
//        }

        $objCli = getClientCredentials();
        preg_match_all("/'(.*?)'/", $objCli->allowedOrigins, $matches);
        $allowedOrigins = $matches[1];

//        if(!in_array($originCall, $allowedOrigins)){
//            $data = [
//                'status' => 'ERROR',
//                'message' => 'Unauthorized origin.'
//            ];
//            return $this->response->setJSON($data)->setStatusCode(403);
//        }

        if($this->request->header('Authorization')){
            $arrOriginToken = explode(" ",$this->request->header('Authorization'));
            if($arrOriginToken[1] === 'Bearer'){
                $originToken = $arrOriginToken[2];
            }else{
                $data = [
                    'state' => 'ERROR',
                    'message' => 'Authorization invalid.'
                ];
                return $this->response->setJSON($data)->setStatusCode(403);
            }
        }else{
            $data = [
                'state' => 'ERROR',
                'message' => 'Token not found.'
            ];
            return $this->response->setJSON($data)->setStatusCode(403);
        }

        $resToken = $this->checkTokenSecurity($originToken, $_SERVER['CLI'], true);
        if ($resToken->code >= 400){
            $data = [
                'state' => 'ERROR',
                'message' => $resToken->mensaje
            ];
            return $this->response->setJSON($data)->setStatusCode($resToken->code);
        }

        return $this->loginIntegration($resToken);
    }

    public function delete_cookie(){
        // Eliminamos cookie HTTP ONLY
        CookieHelper::setCookie('accessToken', '', 0);
        $resp = new \stdClass();
        $resp->state = 'OK';
        $resp->msg = 'Delete Cookie Ok';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function get_cookie_data(){
        $resp = new \stdClass();
        $accessToken = $this->request->getCookie('accessToken');
        $resp->home = "";
        $resp->user = "";

        if ($accessToken != null ){
            $resToken = $this->checkToken($accessToken);
            //Solo si es code 200, retorno valores de token, sino devolvere valores vacios
            if ($resToken->code == 200){
                $resp->home = $resToken->home;
                $resp->user = $resToken->user;
            }
        }
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    //Usa el CLI como secret
   private function checkTokenSecurity($token, $secret, $show_vbl){
        $model = new TokenModel();
        $ret = new \stdClass();
        $key = new key ($secret,'HS256');
        try{
            $vars = JWT::decode($token, $key);
            if($show_vbl === true){
                $ret->variables = $vars;
            }
            $ret->mensaje = 'OK';
            $ret->code = 200;
        }
        catch (\Throwable $e){
            $ret->mensaje = 'Token invalid: '.$e->getMessage();
            $ret->code = 403;
        }
        return $ret;
    }

    //Usa TOKEN_SECRET_KEY de la BD como secret
    private function checkToken($token){
        $model = new TokenModel();
        $secret = $model->getSecret();
        $ret = new \stdClass();
        $key = new key ($secret,'HS256');
        try{
            $vars = JWT::decode($token, $key);
            $ret = $vars;
            $ret->code = 200;
        } catch (\Throwable $e){
            $ret->mensaje = 'Token invalid: '.$e->getMessage();
            $ret->code = 403;
        }

        return $ret;
    }

    private  function loginIntegration($varToken){
        $resp = new \stdClass();
        $model = new UserModel();
        $tokenModel = new TokenModel();

        $user = base64_decode($varToken->variables->user);
        $name = base64_decode($varToken->variables->name);
        $entorno = base64_decode($varToken->variables->entorno);
        
        $tk = $tokenModel->getTokenData();
        $secret = $tk['SECRET'];
        $exp_time = $tk['EXP'];
        $time = time();
        $header = ['typ' => 'JWT', 'alg' => 'HS256'];

        $payload = [
            'user' => $user,
            'iat' => $time,
            'exp' => $time + $exp_time,
            'home' => $varToken->variables->home,
            'entorno'=>$entorno
        ];
        $token = JWT::encode($payload, $secret, 'HS256', null, $header);
        $resp->userName = $name;
        $resp->state = 'OK';

        $registerLogin = $model->registerLoginUser($user, $token);
        if($registerLogin->state != 'OK'){
            return $this->response->setJSON($registerLogin)->setStatusCode(403);
        }

        // Creacion de cookie HTTP ONLY
        CookieHelper::setCookie('accessToken', $token, $exp_time);

        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}