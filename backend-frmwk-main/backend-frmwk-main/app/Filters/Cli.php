<?php

namespace App\Filters;

use App\Models\Framework\ClientModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
// use Config\Services;

class Cli implements FilterInterface{

    public function before(RequestInterface $request, $arguments = null)
    {
        $crosFilter = new CorsFilter();
        // $method = $request->getMethod();
        // $axios = $request->getUri()->getPath();
        // $firstUri = $request->getUri()->getSegment(1);
        // $response = Services::response();

        /** obtener cabeceras */
        if($request->header('cli') == null){
            return $crosFilter->sendResponse(['message' => 'Non-existent customer data'], 403);
        }

        $cli = $request->header('cli')->getValue();

        /** checkear el usuario y menu con sus perfiles dentro de axios_permitidos dentro del token */
        $valido = $this->checkClient($cli);
        if($valido->code >= 400){
            return $crosFilter->sendResponse(['message' => $valido->message], $valido->code);
        }

        $_SERVER['CLI'] = $cli;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null){

        return $response;
    }

    private function checkClient($cli){
        $ret = new \stdClass();
        $model = new ClientModel();

        try{
            $valido = $model->getDataClient($cli);
        }catch (\Exception $e){
            $ret->message = 'Invalid client';

            $ret->code = 403;
            return $ret;
        }

        $ret->message = '';
        $ret->code = 200;

        if ($valido->state != 'OK'){
            $ret->message = 'Invalid client';
            $ret->code = 401;
        }

        return $ret;
    }
}