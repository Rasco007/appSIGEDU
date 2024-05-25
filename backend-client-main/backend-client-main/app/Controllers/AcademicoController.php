<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\AcademicoModel;


class AcademicoController extends BaseController
{

    public function index()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $academicoModel = new AcademicoModel();
        $resp = $academicoModel->obtenerCarreras($id_alumno);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function getEnCurso()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $c_carrera = $this->request->getPost('c_carrera');
        
        $academicoModel = new AcademicoModel();
        $resp = $academicoModel->obtenerEnCurso($id_alumno, $c_carrera);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function getHistorial()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $c_carrera = $this->request->getPost('c_carrera');
        
        $academicoModel = new AcademicoModel();
        $resp = $academicoModel->obtenerHistorial($id_alumno, $c_carrera);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}
