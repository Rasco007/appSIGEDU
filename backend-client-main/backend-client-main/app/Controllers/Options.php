<?php
namespace App\Controllers;

class Options extends BaseController
{
    public function index()
    {
        $resp = new \stdClass();
        $resp->state = 'OK';
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}