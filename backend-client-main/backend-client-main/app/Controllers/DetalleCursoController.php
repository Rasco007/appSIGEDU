<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\DetalleCursoModel;

class DetalleCursoController extends BaseController
{
    public function obtenerDetalleCurso()
    {
        $resp = new \stdClass();
        $id_alu_cur = $this->request->getPost('id_alu_cur');
        $detCurModel = new DetalleCursoModel();
        $resp = $detCurModel->obtenerDetalleCurso($id_alu_cur);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

    public function obtenerExamenesRendidos()
    {
        $resp = new \stdClass();
        $id_alumno = $this->request->getPost('id_alumno');
        $id_alu_cur = $this->request->getPost('id_alu_cur');
        $detCurModel = new DetalleCursoModel();
        $resp = $detCurModel->obtenerExamenesRendidos($id_alumno, $id_alu_cur);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
    
    public function obtenerProximosExamenes()
    {
        $resp = new \stdClass();
        $id_alu_cur = $this->request->getPost('id_alu_cur');
        $detCurModel = new DetalleCursoModel();
        $resp = $detCurModel->obtenerProximosExamenes($id_alu_cur);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }
}
