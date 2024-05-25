<?php

namespace App\Controllers;

use App\Controllers\BaseController;

use App\Models\DetalleEvaluacionModel;

class DetalleEvaluacionController extends BaseController
{
    public function obtenerDetalleEvaluacion()
    {
        $resp = new \stdClass();
        $id_libreta = $this->request->getPost('id_libreta');
        $detCurModel = new DetalleEvaluacionModel();
        $resp = $detCurModel->obtenerDetalleEvaluacion($id_libreta);
        
        return $this->response->setJSON($resp)->setStatusCode(200);
    }

}
