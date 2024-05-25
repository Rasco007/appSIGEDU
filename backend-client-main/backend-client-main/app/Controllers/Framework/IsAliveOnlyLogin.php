<?php
namespace App\Controllers\Framework;

use App\Controllers\BaseController;

class IsAliveOnlyLogin extends BaseController
{

    public function index()
    {
        $resp = new \stdClass();
        $state='LOGGED';
        //Obtenemos token de cabecera
        if($this->request->header('Authorization') == null){
            $state = "NOT_LOGGED";
        }else{
            $accessToken = $this->request->header('Authorization')->getValue();
            $accessToken = explode(" ",$accessToken)[1];
            $state = $accessToken != 'undefined' ? 'LOGGED' : 'NOT_LOGGED';
        }
        $resp->state = $state;
        $resp->message = $state == 'NOT_LOGGED' ? 'Redrigir a login' : 'Redrigir a home';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }


}