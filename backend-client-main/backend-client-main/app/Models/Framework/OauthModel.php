<?php
namespace App\Models\Framework;
use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class OauthModel extends Model{
    public function __construct(){
        parent::__construct();
        $entorno = (isset($_SERVER['entorno']))? $_SERVER['entorno']: 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function setAuthorizationCode($clientId, $code){
        $resp = new \stdClass();

        try{
            $data = [
                'idCode'                        => new RawSql('DEFAULT'),
                'clientId'                      => $clientId,
                'authorizationCode'             => $code,
                'authorizationCodeExpiresOn'    => date('Y-m-d H:i:s', strtotime('+60 minutes', strtotime(date('Y-m-d H:i:s')))),
                'authorizationCodeRevoke'       => false,
            ];

            $builder = $this->db->table('authorizationCode');
            $builder->insert($data);

            $resp->state='OK';
            $resp->msj='authorizationCode registrado.';
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->msj='Error al registrar authorizationCode.';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function validateAuthorizationCode($code){
        $resp = new \stdClass();
        try{
            $builder = $this->db->table('authorizationCode');
            $query = $builder->select('COUNT(1) AS SESSION')
                ->where('authorizationCode', $code)
                // ->where('authorizationCodeExpiresOn >', date('Y-m-d H:i:s'))
                ->where('authorizationCodeRevoke', false)
                ->get();

            $resp->state='OK';
            $resp->result=$query->getRow()->SESSION;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al validar authorizationCode.';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function getParamsAuthorizationCode($code){
        $resp = new \stdClass();
        try{
            $builder = $this->db->table('authorizationCode');
            $query = $builder->select('authorizationCode.params as params, authorizationCode.token as token, authorizationCode.redirect_uri as redirect_uri, serviceClients.clientSecret as cli')
                ->join('serviceClients', 'authorizationCode.clientId = serviceClients.clientId', 'inner')
                ->where('authorizationCode', $code)
                ->get();

            $resp->state='OK';
            $resp->params=$query->getRow()->params;
            $resp->token=$query->getRow()->token;
            $resp->redirect_uri=$query->getRow()->redirect_uri;
            $resp->cli=$query->getRow()->cli;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al validar authorizationCode.';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function revokeAuthorizationCode($code){
        try{
            $resp = new \stdClass();

            $builder = $this->db->table('authorizationCode');
            $builder->set('authorizationCodeRevoke',true)
                ->where('authorizationCode', $code);
            $builder->update();

            $resp->state='OK';
            $resp->msj='AuthorizationCode revocado.';
            return $resp;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->msj='Error al revocar authorizationCode.';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function setParamsAuthorizationCode($code, $params=null, $token=null, $redirect_uri=null){
        try{
            $resp = new \stdClass();

            $builder = $this->db->table('authorizationCode');

            if($params != null){$builder->set('params',$params);}
            if($token != null){$builder->set('token',$token);}
            if($redirect_uri != null){$builder->set('redirect_uri',$redirect_uri);}

            // if($redirect_uri != null){
            //     $builder
            //         ->set('params',$params)
            //         ->set('token',$token)
            //         ->set('redirect_uri',$redirect_uri)
            //         ->where('authorizationCode', $code);
            // }else{
            //     $builder
            //         ->set('params',$params)
            //         ->set('token',$token)
            //         ->where('authorizationCode', $code);
            // }

            $builder
                ->where('authorizationCode', $code);
            $builder->update();

            $resp->state='OK';
            $resp->msj='AuthorizationCode Update.';
            return $resp;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->msj='Error al setear params en authorizationCode.';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function getRedirectUri($redirect_uri){
        $resp = new \stdClass();
        try{
            $builder = $this->db->table('generalTables');
            $query = $builder->select('data1 as REDIRECT')
                ->where('numTable', 902)
                ->where('codTable', $redirect_uri)
                ->get();

            $resp->redirect=$query->getRow()->REDIRECT;

            $builder = $this->db->table('parameters');
            $query = $builder->select('valueParam as SECURITY')
                ->where('codParam', 'URI_CLI_AUTH')
                ->get();

            $resp->state='OK';
            $resp->security=$query->getRow()->SECURITY;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al recuperar redirect.';
            $resp->exception=$e;
        }

        return $resp;
    }
}