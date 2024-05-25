<?php

namespace  App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\RawSql;
use App\Models\Framework\MenuModel;
use App\Models\Framework\TokenModel;
use App\Helpers\CookieHelper;
use Firebase\JWT\JWT;
use stdClass;

class UserModel extends Model
{

    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function loginUser($user, $pass)
    {
        $resp = new \stdClass();
        $menuModel = new MenuModel();

        $menus = [];

        if (($user != null && $user != '') && ($pass != null && $pass != '')) {

            $params = array(
                "user" => $user,
                "password" => $pass,
            );

            try {
                $objClient = getClientCredentials();
                $moduloCliente = $objClient->c_modulo;  // obtener el modulo del cliente
                $d_url_endopoint = $objClient ->uriEndpoints;
                //curl
                $resultServiceClient = executeServiceClient($objClient, 'POST', '/login', $params); //TODO 
                
           
                    
                $resultServiceObject = json_decode($resultServiceClient);

                if ($resultServiceObject->state == 'NO_OK') {
                    $state = $resultServiceObject->state;
                    $message = $resultServiceObject->message;
                    $resp->$state;
                    $resp->$message;
                    // Mensaje de error adecuado
                    return $resp;
                }

                $perfiles = $resultServiceObject->perfiles;
          
                $accessToken = $resultServiceObject->accessToken;
                $_SERVER['ACCESS_TOKEN'] = $accessToken;
  
                $menusResult = $menuModel->getMenusPorModuloYPerfil($moduloCliente, $perfiles, 'ASC');

                if ($menusResult->state === 'OK') {
                    $menus = $menusResult->menus;
                    //$filtros = $menuModel->getFiltrosXMenu($menus);
                } else {
                    $resp->state = 'NO_OK';
                    $resp->message = 'Formato de respuesta incorrecto del backend';
                }
            
                // Crear un objeto stdClass para almacenar los datos combinados
                $combinedData = new stdClass();
                $combinedData->state = 'OK';
                $combinedData->message = 'Valido';
                // $combinedData->accessToken = $accessToken;
                $combinedData->usuario = new stdClass();
                $combinedData->usuario->state = 'OK';
                $combinedData->usuario->id_alumno = $resultServiceObject->id_alumno;
                $combinedData->usuario->lastName = $resultServiceObject->lastName;
                $combinedData->usuario->d_url_endopoint = $d_url_endopoint;
                $combinedData->usuario->mensaje = 'Usuario válido';
                $combinedData->usuario->c_usuario = encryptedAES(decryptedAES($resultServiceObject->c_usuario, 'db'));
                $combinedData->usuario->nombre = $resultServiceObject->fristName;
                $combinedData->menus = $menus;

                // Devolver el objeto $combinedData
              

                // $tk = $tokenModel->getTokenData();
                // $secret = $tk['SECRET'];
                // $exp_time = $tk['EXP'];
                // $time = time();
                // $header = ['typ' => 'JWT', 'alg' => 'HS256'];
                // $payload = [
                //     'user' => encryptedAES($resultServiceObject->c_usuario),
                //     'iat' => $time,
                //     'exp' => $time + $exp_time
                // ];
                // $token = JWT::encode($payload, $secret, 'HS256', null, $header);

                // // Creacion de cookie HTTP ONLY
                // CookieHelper::setCookie('accessToken', $token, $exp_time);

                return $combinedData;
            } catch (\Exception $e) {
                $resp->state = 'NO_OK';
                $resp->message = 'Error al procesar la respuesta del backend: ' . $e->getMessage();

                // DB ERROR LOG TABLE
                $data = [
                    'd_error'       => 'loginUser - ' . $resp->message,
                    'id_sesion'     => new RawSql('DEFAULT'),
                ];
                $builder = $this->db->table('errores');
                $builder->insert($data);

                return $resp;
            }
        } else {
            $resp->state = 'NO_OK';
            $resp->message = 'Invalid parameters';
        }
    }

    public function loginUser_deprecado($user, $pass)
    {
        $resp = new \stdClass();
        $menuModel = new MenuModel();
        $tokenModel = new TokenModel();
        $menus = [];

        if (($user != null && $user != '') && ($pass != null && $pass != '')) {

            $params = array(
                "user" => $user,
                "password" => $pass,
            );

            try {
                $objClient = getClientCredentials();
                $moduloCliente = $objClient->c_modulo;  // obtener el modulo del cliente
                $d_url_endopoint = $objClient ->uriEndpoints;
                //curl
                $resultServiceClient = executeServiceClient($objClient, 'POST', '/login', $params);
                $resultServiceObject = json_decode($resultServiceClient);
                
                if ($resultServiceObject->state !== 'OK') {
                    return $resultServiceObject;
                }

                $perfiles = $resultServiceObject->perfiles;
                $menusResult = $menuModel->getMenusPorModuloYPerfil($moduloCliente, $perfiles, 'ASC');

                if ($menusResult->state === 'OK') {
                    $menus = $menusResult->menus;
                } else {
                    $resp->state = 'NO_OK';
                    $resp->msj = 'Formato de respuesta incorrecto del backend';
                }
                // Combinar información del usuario y menús en un solo array
                $combinedData = array(
                    'state' => 'OK', // Agregamos el estado OK al nivel superior.
                    'message' => 'Valido', // Agregamos el mensaje "Valido" al nivel superior.
                    'usuario' => array(
                        'state' => 'OK',
                        'mensaje' => 'Usuario válido',
                        'd_url_endpoint_cliente' => $d_url_endopoint,
                        'c_usuario' => $resultServiceObject->c_usuario,
                        'nombre' => $resultServiceObject->fristName,
                        'perfiles' => $perfiles,
                    ),
                    'menus' => $menus,
                );
                
                $tk = $tokenModel->getTokenData();
                $secret = $tk['SECRET'];
                $exp_time = $tk['EXP'];
                $time = time();
                $header = ['typ' => 'JWT', 'alg' => 'HS256'];
                $payload = [
                    'user' => encryptedAES($resultServiceObject->c_usuario),
                    'iat' => $time,
                    'exp' => $time + $exp_time
                ];
                $token = JWT::encode($payload, $secret, 'HS256', null, $header);
                
                // Creacion de cookie HTTP ONLY
                CookieHelper::setCookie('accessToken', $token, $exp_time);

                return $combinedData;
            } catch (\Exception $e) {
                $resp->state = 'NO_OK';
                $resp->msj = 'Error al procesar la respuesta del backend: ' . $e->getMessage();
                
                // DB ERROR LOG TABLE
                $data = [
                    'd_error'       => 'loginUser - ' . $resp->msj,
                    'id_sesion'     => new RawSql('DEFAULT'),
                ];
                $builder = $this->db->table('errores');
                $builder->insert($data);
                
                return $resp;
            }
        } else {
            $resp->state = 'NO_OK';
            $resp->msj = 'Invalid parameters';
        }
    }


    public function registerLoginUser($user, $accessToken)
    {
        $resp = new \stdClass();
        $ObjClient = getClientCredentials();
        $resultRevoke = $this->revokeUserLogin($ObjClient->clientId, $user);
        if ($resultRevoke->state != 'OK') {
            return $resultRevoke;
        }

        try {
            $data = [
                'id_sesion'     => new RawSql('DEFAULT'),
                'id_cliente'      => $ObjClient->clientId,
                'id_usuario'      => $user,
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

    private function revokeUserLogin($clientId, $user)
    {
        $resp = new \stdClass();

        $builder = $this->db->table('registro_sesiones');
        $query = $builder->select('COUNT(1) AS SESSION')
            ->where('id_cliente', $clientId)
            ->where('id_usuario', $user)
            ->get();
        $ret = $query->getResultArray();

        if ($ret[0]['SESSION'] != '0') {
            $builder = $this->db->table('registro_sesiones');
            $builder->set('m_valido', false)
                ->where('id_cliente', $clientId)
                ->where('id_usuario', $user);
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

    private function dbLoginUser($params)
    {

        $resp = new \stdClass();
        $builder = $this->db->table('usuarios');
        $query = $builder->select('c_usuario, d_nombre, d_apellido, d_mail, id_rel_persona, f_baja')
            ->where('c_usuario', encryptedAES($params['user'], 'db'))
            ->where('f_baja is null')
            ->get();
        $ret = $query->getResultArray();

        if (count($ret) == 0) {
            $resp->state = 'NO_OK';
            $resp->message = 'Invalid login';
        } else {
            $resp->state = 'OK';
            $resp->userId = $ret[0]['id_rel_persona'];
            $resp->fristName = $ret[0]['d_nombre'];
            $resp->lastName = $ret[0]['d_apellido'];
            $resp->contactEmail = decryptedAES($ret[0]['d_mail'], 'db');
            $resp->message = 'Valid login';
        }
        return json_encode($resp);
    }
}
