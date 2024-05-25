<?php

namespace App\Controllers\Framework;

use App\Controllers\BaseController;
use App\Models\Framework\ClientModel;

use App\Models\UserModel;

class ClientController extends BaseController
{
    public function index()
    {
    }
    public function getConsultaCliente()
    {
        $configuracionModel = new ClientModel();

        $clientes = json_decode($configuracionModel->obtenerClientes());
        return $this->response->setJSON(json_encode($clientes))->setStatusCode(200);
    }
    public function postIdioma()
    {
        $idioma = $this->request->getPost('idioma');
        $configuracionModel = new ClientModel();
        $json_idiomas = $configuracionModel->obtenerIdiomas($idioma);
        return $this->response->setJSON(str_replace('\\', '', $json_idiomas))->setStatusCode(200);
    }
    public function iniciarSesion()
    {
        try {
            $user = $this->request->getPost('user');
            $pass = $this->request->getPost('password');
            $userModel = new UserModel();

            $clientes = $userModel->loginUser($user, $pass);
          
            if ($clientes->state == 'OK') {
                // Si hay datos válidos, preparar la respuesta
                return $this->response->setHeader('accessToken',$_SERVER['ACCESS_TOKEN'])
                    ->setJSON(json_encode($clientes))
                    ->setStatusCode(200);
            } else {
                // Si no hay datos válidos, puede manejarlo según sea necesario
                return $this->response->setJSON(['state' => $clientes->state, 'message' => $clientes->message])
                    ->setStatusCode(404);
            }
        } catch (\Throwable $e) {
            // Si ocurre alguna excepción, manejarla aquí
            return $this->response->setJSON(['error' => 'Ocurrió un error al iniciar sesión: ' . $e->getMessage()])
                ->setStatusCode(500);
        }
    }
    public function postDatosConexionCliente()
    {
        $configuracionModel = new ClientModel();
        $id_cliente = $this->request->getPost('id_cliente');
        $clientes = json_decode($configuracionModel->obtenerConexionCliente($id_cliente));
        return $this->response->setJSON(json_encode($clientes))->setStatusCode(200);
    }
    public function postDatosCliente()
    {
        $configuracionModel = new ClientModel();
        $id_cliente = $this->request->getPost('id_cliente');
        $clientes = json_decode($configuracionModel->obtenerDatosCliente($id_cliente));
        return $this->response->setJSON(json_encode($clientes))->setStatusCode(200);
    }
}
