<?php
namespace App\Models;
use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class EjemploModel extends Model{
    public function __construct(){
        parent::__construct();
        $entorno = (isset($_SERVER['entorno']))? $_SERVER['entorno']: 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function pruebaOracle(){
        $resp = new \stdClass();
        try{
            $query   = $this->db->query("SELECT c_dato, d_dato FROM tablas_generales WHERE N_TABLA = 100");
            $arr = $query->getResultArray();
            $resp->state = 'OK';
            $resp->result = $arr;;

        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al ejecutar la query';
            $resp->exception=$e;
        }

        return $resp;
    }
}