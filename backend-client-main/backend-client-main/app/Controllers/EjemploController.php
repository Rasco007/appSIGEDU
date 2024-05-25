<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\EjemploModel;


class EjemploController extends BaseController
{

    public function index()
    {
        $resp = new \stdClass();
        $state = 'TEST_STATE';
        $resp->state = $state;
        $resp->message = '1 2 3 probando';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function pruebaOracle()
    {
        $ejemploModel = new EjemploModel();
        $resp = $ejemploModel->pruebaOracle();
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}
