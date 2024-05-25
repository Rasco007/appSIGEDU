<?php

namespace App\Controllers;

class Dummy extends BaseController
{
    public function index()
    {
        $resp = new \stdClass();
        $valor = 'd361f91377b3a8ad8b132f5b2fab1e2746a5f06c' ;

        $resp->original = $valor;
        $resp->encrypt = encryptedAES($valor, 'db');
        $resp->decrypt = decryptedAES($resp->encrypt, 'db');
    //    pre($resp);
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function create(){
        $resp = new \stdClass();

        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}
