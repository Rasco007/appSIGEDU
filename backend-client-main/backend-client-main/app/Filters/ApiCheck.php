<?
// Backend - CodeIgniter 4
// app/Filters/DatabaseConnectionMiddleware.php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use App\Models\Framework\CheckUrlConection;

class ApiCheck implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $crosFilter = new CorsFilter();
        // Obtener el método HTTP de la petición
        // $method = $request->getMethod();

        // Obtener la URI completa de la petición
        $uri = $request->getUri();

        // Obtener la ruta (path) de la URI
        $path = $uri->getPath();
        // $uri = current_url(true);
        // Obtener el primer segmento de la URI
        // $firstSegment = strval($uri->getSegment(1));

        //quito el /index.php que aparece
        if (strpos($path, 'index.php') !== false) {
            $path = str_replace('/index.php', '', $path);
        }
        
        // Realizar la consulta a la base de datos
        $valido = $this->checkUrlDB($path);
          
     
        if ($valido->code >= 400) {
            return $crosFilter->sendResponse(['message' => $valido->message], $valido->code);
        }
   
        if($valido->tipo_conexion == 'WB'){
            $_SERVER['backurl'] = $valido->data_conexion;
            $_SERVER['endpoint'] = $valido->endpoint;
            $_SERVER['metodo'] = $valido->metodo;
            $_SERVER['headerAuth'] = $valido->headerAuth;
            $_SERVER['parametros'] = $valido->parametros;
        }else{
            $_SERVER['entorno'] = $valido->data_conexion;
        }
       
    }

    public function after(RequestInterface $request, $response, $arguments = null)
    {
        // Puedes realizar acciones después del procesamiento de la petición si es necesario
    }
    private function checkUrlDB($url)
    {
        $ret = new \stdClass();
        $model = new CheckUrlConection();

        try {
            $valido = $model->checkUrlInDatabase($url);
        } catch (\Exception $e) {
            $ret->message = 'Invalid url';
            $ret->code = 403;
            return $ret;
        }

        if ($valido->state != 'OK') {
            $ret->message = 'Invalid url';
            $ret->code = 401;
        } else {
            $ret->message = '';
            $ret->code = 200;
            $ret->tipo_conexion = $valido->tipo_conexion;
            $ret->data_conexion = $valido->data_conexion;
            if($valido->tipo_conexion == 'WB'){
                $ret->endpoint = $valido->endpoint;
                $ret->metodo =  $valido->metodo;
                $ret->headerAuth =  $valido->headerAuth;
                $ret->parametros =  $valido->parametros;
            }

        }
      
        return $ret;
    }
}
