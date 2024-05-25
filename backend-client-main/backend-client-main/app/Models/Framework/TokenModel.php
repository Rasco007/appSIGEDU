<?php
namespace App\Models\Framework;

use CodeIgniter\Model;
use CodeIgniter\Database\RawSql;

class TokenModel extends Model{

    public function __construct(){
        parent::__construct();
        $entorno = (isset($_SERVER['entorno']))? $_SERVER['entorno']: 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function getTokenData(){
        $builder = $this->db->table('tablas_generales');

        $secret = $this->db->table('tablas_generales')
            ->select('d_dato1')
            ->where('n_tabla', 901)
            ->where('c_dato', 'TOKEN_KEY');

        $expiration = $this->db->table('tablas_generales')
            ->select('d_dato1')
            ->where('n_tabla', 901)
            ->where('c_dato', 'TOKEN_EXP');

        $query = $builder->select('d_dato1 AS EXP')
            ->selectSubquery($secret, 'SECRET')
            ->where('n_tabla', 901)
            ->where('c_dato', 'TOKEN_EXP')
            ->get();
        $res = $query->getResultArray();

        return $res[0];
    }

    public function getExpirationTime(){
        $query   = $this->db->query("SELECT gt.d_dato1 as DATA FROM tablas_generales gt WHERE gt.n_tabla = 901 AND gt.c_dato = 'TOKEN_RFSH'");
        $arr = $query->getResultArray();
        return $arr[0]['DATA'];
    }

    public function getExpirationTimeRefresh(){
        $query   = $this->db->query("SELECT gt.d_dato1 as DATA FROM tablas_generales gt WHERE gt.n_tabla = 901 AND gt.c_dato = 'TOKEN_EXP'");
        $arr = $query->getResultArray();
        return $arr[0]['DATA'];
    }

    public function getSecret(){
        $query = $this->db->query("SELECT gt.d_dato1 as DATA FROM tablas_generales gt WHERE gt.n_tabla = 901 AND gt.c_dato = 'TOKEN_KEY'");
        $arr = $query->getResultArray();
        return $arr[0]['DATA'];
    }

    public function getSessionRecord($userName, $accessToken){

        $builder = $this->db->table('registro_sesiones');
        $query = $builder->select('COUNT(1) AS SESSION')
            ->where('c_usuario', $userName)
            ->where('c_token', $accessToken)
            ->where('m_valido', true)
            ->get();

        $ret = $query->getRow()->SESSION;

        return $ret;
    }

    public function setUserConnect($userName){
        $query = $this->db->query("SET @app_user = ?", [$userName]);
    }

    public function getCookieValues(){
        try {

            $builder = $this->db->table('tablas_generales');
            $domain = $this->db->table('tablas_generales')
                ->select('d_dato1')
                ->where('n_tabla', 901)
                ->where('c_dato', 'COK_DOMAIN');

            $secure = $this->db->table('tablas_generales')
                ->select('d_dato1')
                ->where('n_tabla', 901)
                ->where('c_dato', 'COK_SECURE');

            $http = $this->db->table('tablas_generales')
                ->select('d_dato1')
                ->where('n_tabla', 901)
                ->where('c_dato', 'COK_HTTP');

            $path = $this->db->table('tablas_generales')
                ->select('d_dato1')
                ->where('n_tabla', 901)
                ->where('c_dato', 'COK_PATH');

            $samesite = $this->db->table('tablas_generales')
                ->select('d_dato1')
                ->where('n_tabla', 901)
                ->where('c_dato', 'COK_SITE');

            $query = $builder->select('')
                ->selectSubquery($domain, 'DOMAIN')
                ->selectSubquery($secure, 'SECURE')
                ->selectSubquery($http, 'HTTP_ONLY')
                ->selectSubquery($path, 'PATH')
                ->selectSubquery($samesite, 'SAMESITE')
                ->get();
            $res = $query->getResultArray()[0];
            return $res;
        }
        catch (\CodeIgniter\Database\Exceptions\DatabaseException $e){
            $id_error = log_error_db($e, 'getStatusUrl');
            throw new \RuntimeException($id_error);
        }
    }

}