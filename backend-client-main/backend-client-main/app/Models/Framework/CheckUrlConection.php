<?php

namespace  App\Models\Framework;

use CodeIgniter\Model;
use CodeIgniter\Database\RawSql;

class CheckUrlConection extends Model
{

    public function __construct()
    {
        parent::__construct();
        $entorno = 'default';
        $this->db = \Config\Database::connect($entorno);
    }
    public function checkUrlInDatabase($url)
    {
        $this->setKeyApp();

        $builder = $this->db->table('tablas_generales');
        $query = $builder->select('d_dato1 as tipo_conexion,d_dato2 as data_conexion ,d_dato3 as endpoint, d_dato4 as parametros,d_dato5 as metodo, d_dato6 as headerAuth')
            ->where('n_tabla', 200)
            ->where('c_dato', $url)
            // ->where('c_dato', '/back/test')
            ->get();
        
        $ret = $query->getResultArray();
      
        $resp = new \stdClass();
        if (!count($ret)) {
            $resp->state = 'NO_OK';
            $resp->msj = 'Url not enabled';
        } else {
            $resp->state = 'OK';
            $resp->data_conexion = $ret[0]['data_conexion'];
            $resp->tipo_conexion = $ret[0]['tipo_conexion'];
            
            if($ret[0]['tipo_conexion'] =='WB'){
                $resp->endpoint =$ret[0]['endpoint'];
                $resp->metodo =$ret[0]['metodo'];
                $resp->headerAuth =$ret[0]['headerAuth'];
                $parametrosString = $ret[0]['parametros'];
                // Convertir la cadena a un array
                $resp->parametros = explode(',', $parametrosString);
            }
        }
 
        return $resp;
    }

    private function setKeyApp()
    {
        $query = $this->db->query("SET @app_key = ?", [getenv('app_key')]);
    }
}
