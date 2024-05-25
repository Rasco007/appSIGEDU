<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\HomeModel;

class HomeController extends BaseController
{
    public function obtenerClasesHoy()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $homeModel = new HomeModel();
        $resp = $homeModel->obtenerClasesHoy($id_alumno);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function obtenerTodosProximosExamenes()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $homeModel = new HomeModel();
        $resp = $homeModel->obtenerTodosProximosExamenes($id_alumno);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function obtenerNoticia()
    {
        $resp = new \stdClass();
        $homeModel = new HomeModel();
        $resp = $homeModel->obtenerNoticia();
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
    
}
