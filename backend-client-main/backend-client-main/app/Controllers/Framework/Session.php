<?php

namespace App\Controllers\Framework;

use App\Controllers\BaseController;
use App\Helpers\CookieHelper;
use App\Models\Framework\TokenModel;
use App\Models\Framework\UserModel;
use Firebase\JWT\JWT;

class Session extends BaseController
{
    public function index(){
        $resp = new \stdClass();

        if($this->request->getCookie('accessToken') == null){
            $resp->state = 'NOOK';
            $resp->message = 'Nonexistent Token2';
            return $this->response->setJSON($resp)->setStatusCode(401);
        }


        $resp->state = 'OK';
        $resp->message = 'existent Token';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }


    public function login()
    {
        $resp = new \stdClass();
        $result = new \stdClass();
        
        $model = new UserModel();
        $tokenModel = new TokenModel();
        $userEncryp = $this->request->getPost('user');
        $passEncryp = $this->request->getPost('password');

        $user = decryptedAES($userEncryp);
        $pass = decryptedAES($passEncryp);
        
        $result = $model->loginUser($user, $pass);

        if ($result->state === 'OK') {
            $tk = $tokenModel->getTokenData();
            $secret = $tk['SECRET'];
            $exp_time = $tk['EXP'];
            $time = time();
            $header = ['typ' => 'JWT', 'alg' => 'HS256'];
            $payload = [
                // 'user' => $user,
                'user' => encryptedAES($result->userId),
                'iat' => $time,
                'exp' => $time + $exp_time,
                // 'home' => $result->homeUri,
                // 'entorno' => $result->entorno
            ];
            $token = JWT::encode($payload, $secret, 'HS256', null, $header);
            $resp->userName = $result->fristName;
            // $resp->entorno = $result->entorno;
            $resp->state = 'OK';

            $registerLogin = $model->registerLoginUser($result->userId, $token);
            if ($registerLogin->state != 'OK') {
                return $this->response->setJSON($registerLogin)->setStatusCode(403);
            }

            // Creacion de cookie HTTP ONLY
            CookieHelper::setCookie('accessToken', $token, $exp_time);

            return $this->response->setJSON($resp)->setStatusCode(200);
        } else {
            return $this->response->setJSON($result)->setStatusCode(403);
        }
    }

    public function logout(){
        if($this->request->getCookie('accessToken') == null){
            return $this->response->setJSON(['message' => 'Nonexistent Token3'])->setStatusCode(401);
        }

        // Eliminamos cookie HTTP ONLY
        CookieHelper::setCookie('accessToken', '', 0);

        $resp = new \stdClass();
        $resp->state = 'OK';
        $resp->msg = 'Successful logout';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

}