<?php

namespace App\Controllers\Framework;
use App\Controllers\BaseController;
// Frontend realiza una solicitud indicando la acción y el tipo de acceso a datos
class ApiController extends BaseController
{

    public function index()
    {
    }
    // Controlador intermedio
    public function handleRequest()
    {

        // session_start();

        // $_SESSION['METODO_CLIENTE'] = 'valor_deseado';
        $backclient = new \stdClass();
        $backclient->backurl = $_SERVER['backurl'];
        $backclient->headerAuth = $_SERVER['headerAuth'];
        $endpoint =  $_SERVER['endpoint'];
        $metodo =  $_SERVER['metodo'];
        $parametrosEsperados = $_SERVER['parametros'];
        
        // Array para almacenar los datos de la solicitud
        $requestParams = array();
        // Iterar sobre los nombres de los parámetros
        foreach ($parametrosEsperados as $parametro) {
            // Obtener el valor del parámetro de la solicitud POST
            $valorParametro = $this->request->getPost($parametro);
            // Agregar el valor al array de datos de la solicitud
            $requestParams[$parametro] = $valorParametro;
        }
        
        try {
            $response = executeServiceClientWB($backclient, $metodo, $endpoint, $requestParams);
        } catch (\Exception $e) {
            $response = ['error' => 'Error instantiating ApiController: ' . $e->getMessage()];
        }

        return $this->response->setJSON($response);
    }

}
