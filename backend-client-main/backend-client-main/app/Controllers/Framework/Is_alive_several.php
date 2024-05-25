<?php

namespace App\Controllers\Framework;

use App\Filters\CorsFilter;
use App\Helpers\CookieHelper;
use App\Filters\Check;
use App\Models\Framework\TokenModel;
use App\Controllers\BaseController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Is_alive_several extends BaseController
{

    public function index()
    {
        $resp = new \stdClass();
        $state = 'LOGGED';
        //Obtenemos token de cabecera
        if ($this->request->getCookie('accessToken') == null) {
            $state = "NOT_LOGGED";
        }
        $resp->state = $state;
        $resp->message = $state == 'NOT_LOGGED' ? 'Redrigir a login' : 'Redrigir a home';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }


    public function isAlive()
    {
        try{
            $crosFilter = new CorsFilter();
            $resp = new \stdClass();
            $state = 'LOGGED';
            
            if($this->request->getCookie('accessToken') == null){
                return $crosFilter->sendResponse(['message' => 'Nonexistent Token','state' => 'NOT_LOGGED'], 401);
            }
            $accessToken = $this->request->getCookie('accessToken');

            if ($accessToken == null) {
                $state = "NOT_LOGGED";
            } else {
                $vars = $this->checktoken($accessToken);
            }
            $resp->state = $state;
            return $this->response->setJSON($resp)->setStatusCode(200);
        }catch (\Exception $ex){
            return $crosFilter->sendResponse(['message' => 'Ocurrio un error al chequear token','state' => 'NOT_LOGGED'], 401);
        }

    }

    private function checktoken($token)
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
            $ret->mensaje = $e->getMessage();
            $ret->code = 401;
        }

        return $ret;
    }
}
