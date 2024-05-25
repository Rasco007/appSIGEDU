<?php

namespace  App\Models\Framework;

use CodeIgniter\Model;
use CodeIgniter\Database\RawSql;

class UserModel extends Model
{

    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }
    public function dbLoginUser($params)
    {
        $resp = new \stdClass();
        $builder = $this->db->table('usuarios u');

        $query = $builder->select('u.c_usuario, u.id_alumno, u.d_nombre, u.d_apellido, GROUP_CONCAT(up.id_perfil) as perfiles')
            ->join('usuarios_perfiles up', 'up.c_usuario = u.c_usuario')
            // ->where('u.c_usuario', $params['user'])
            ->where('u.c_usuario', encryptedAES($params['user'], 'db'))
            ->where('u.f_baja is null')
            ->groupBy('u.c_usuario')
            ->get();

        $ret = $query->getResultArray();

        if (count($ret) == 0) {
            $resp->state = 'NO_OK';
            $resp->message = 'Invalid login';
            
            // DB ERROR LOG TABLE
            $data = [
                'd_error'       => 'Invalid login for user: ' . $params['user'],
                'id_sesion'     => new RawSql('DEFAULT'),
            ];
            $builder = $this->db->table('errores');
            $builder->insert($data);
        } else {
            $resp->state = 'OK';
            $resp->c_usuario = $ret[0]['c_usuario'];
            $resp->id_alumno = $ret[0]['id_alumno'];
            $resp->fristName = $ret[0]['d_nombre'];
            $resp->lastName = $ret[0]['d_apellido'];
            // $resp->contactEmail = decryptedAES($ret[0]['d_mail'], 'db');
            $resp->perfiles = explode(',', $ret[0]['perfiles']);
            $resp->message = 'Usuario Valido';
        }
        return $resp;
    }
    public function getDataClient($clientSecret)
    {
        $this->setKeyApp();

        $builder = $this->db->table('clientes');
        $query = $builder->select('id_cliente, d_cliente, d_url_endpoint, d_header_authorization, d_allowed_origins')
            ->where('decryptedCode(c_clave)', $clientSecret)
            ->where('m_habilitado', 1)
            ->get();

        $ret = $query->getResultArray();

        $resp = new \stdClass();
        if (!count($ret)) {
            $resp->state = 'NO_OK';
            $resp->msj = 'Client not enabled';
        } else {
            $resp->state = 'OK';
            $resp->clientId = $ret[0]['id_cliente'];
            $resp->clientName = $ret[0]['d_cliente'];
            $resp->uriEndpoints = $ret[0]['d_url_endpoint'];
            $resp->headerAuthorization = $ret[0]['d_header_authorization'];
            $resp->allowedOrigins = $ret[0]['d_allowed_origins'];
        }

        return $resp;
    }

    // public function loginUser($user, $pass)
    // {

    //     $resp = new \stdClass();
    //     $res = new \stdClass();
    //     if (($user != null && $user != '') && ($pass != null && $pass != '')) {
    //         // $this->setKeyApp();

    //         //armar peticion curl
    //         $params = array(
    //             "user" => $user,
    //             "password" => $pass,
    //         );

    //         // $resultServiceClient = executeServiceClient(getClientCredentials(), 'POST', '/security/login', $params);
    //         $resultServiceClient = $this->dbLoginUser($params);

    //         //evaluar resultado
    //         $res = json_decode($resultServiceClient);
    //         if ($res->state === 'OK') {
    //             $resp->state = 'OK';
    //             $resp->msj = 'Valid access';
    //             $resp->fristName = $res->fristName;
    //             $resp->userId = $res->userId;
    //         } else {
    //             $resp->state = 'NO_OK';
    //             $resp->msj = 'Invalid credentials';
    //         }
    //     } else {
    //         $resp->state = 'NO_OK';
    //         $resp->msj = 'Invalid parameters';
    //     }

    //     return $resp;
    // }



    public function registerLoginUser($user, $accessToken)
    {
        $resp = new \stdClass();
        $resultRevoke = $this->revokeUserLogin($user);
        if ($resultRevoke->state != 'OK') {
            return $resultRevoke;
        }

        try {
            $data = [
                'id_sesion'     => new RawSql('DEFAULT'),
                'c_usuario'      => $user,
                'c_token'   => $accessToken,
                'm_valido'   => true,
            ];

            $builder = $this->db->table('registro_sesiones');
            $builder->insert($data);

            $resp->state = 'OK';
            $resp->msj = 'Registered entry';
        } catch (\Exception $e) {
            $resp->state = 'NO_OK';
            $resp->msj = 'Error registering entry';
            $resp->exception = $e;
        }

        return $resp;
    }

    private function revokeUserLogin($user)
    {
        $resp = new \stdClass();

        $builder = $this->db->table('registro_sesiones');
        $query = $builder->select('COUNT(1) AS SESSION')
            ->where('c_usuario', $user)
            ->get();
        $ret = $query->getResultArray();

        if ($ret[0]['SESSION'] != '0') {
            $builder = $this->db->table('registro_sesiones');
            $builder->set('m_valido', false)
                ->where('c_usuario', $user);
            $builder->update();

            $resp->state = 'OK';
            $resp->msj = 'Revoked records';
        } else {
            $resp->state = 'OK';
            $resp->msj = 'No admission history';
        }

        return $resp;
    }

    private function setKeyApp()
    {
        $query = $this->db->query("SET @app_key = ?", [getenv('app_key')]);
    }

    // private function dbLoginUser($params)
    // {

    //     $resp = new \stdClass();

    //     $builder = $this->db->table('usuarios');
    //     $query = $builder->select('id_usuario, d_nombre, d_apellido, d_mail, d_telefono, m_habilitado, m_verificado')
    //         ->where('decryptedCode(c_identificacion)', $params['user'])
    //         ->where('decryptedCode(c_clave)', $params['password'])
    //         ->get();
    //     $ret = $query->getResultArray();

    //     if (count($ret) == 0) {
    //         $resp->state = 'NO_OK';
    //         $resp->message = 'Invalid login';
    //     } else {
    //         if (!$ret[0]['m_habilitado']) {
    //             $resp->state = 'NO_OK';
    //             $resp->message = 'Invalid login';
    //             return json_encode($resp);
    //         }

    //         $resp->state = 'OK';
    //         $resp->userId = $ret[0]['id_usuario'];
    //         $resp->fristName = $ret[0]['d_nombre'];
    //         $resp->lastName = $ret[0]['d_apellido'];
    //         $resp->contactEmail = decryptedAES($ret[0]['d_mail'], 'db');
    //         $resp->contactPhone = decryptedAES($ret[0]['d_telefono'], 'db');
    //         $resp->verified = $ret[0]['m_verificado'];
    //         $resp->message = 'Valid login';
    //     }

    //     return json_encode($resp);
    // }
}
