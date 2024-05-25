<?php

namespace App\Controllers\Framework;

use App\Controllers\BaseController;
use App\Models\Framework\UserModel;
use App\Models\Framework\TokenModel;
use Firebase\JWT\JWT;
use App\Helpers\CookieHelper;
// use App\Models\Framework\MenuModel;


class UserController extends BaseController
{

    public function index()
    {
    }

    public function postUserValidation()
    {
        $result = new \stdClass();
        $usuarioModel = new UserModel();
        $tokenModel = new TokenModel();
        // Recibe los datos POST
        $userEncryp = $this->request->getPost('user');
        $passEncryp = $this->request->getPost('password');
        $user = decryptedAES($userEncryp);
        $pass = decryptedAES($passEncryp);

        // Verifica si se recibieron datos y si tienen el formato esperado
        if (($user != null && $user != '') && ($pass != null && $pass != '')
        ) {
            // Aquí puedes realizar las acciones necesarias con los datos recibidos

            $params = array(
                "user" => $user,
                "password" => $pass,
            );
            // Ejemplo: Verificar las credenciales del usuario
            $ObjetUser = $usuarioModel->dbLoginUser($params);
        
            $result = json_decode(json_encode($ObjetUser));
            if ($result->state === 'OK') {
                $tk = $tokenModel->getTokenData();
                $secret = $tk['SECRET'];
                $exp_time = $tk['EXP'];
                $time = time();
                $header = ['typ' => 'JWT', 'alg' => 'HS256'];
                $payload = [
                    'user' => encryptedAES($result->c_usuario),
                    'iat' => $time,
                    'exp' => $time + $exp_time
                ];
                $token = JWT::encode($payload, $secret, 'HS256', null, $header);

                $registerLogin = $usuarioModel->registerLoginUser($result->c_usuario, $token);
                if ($registerLogin->state != 'OK') {
                    return $this->response->setJSON($registerLogin)->setStatusCode(403);
                }
                $result->accessToken = $token;
                // Creacion de cookie HTTP ONLY
                // CookieHelper::setCookie('accessToken', $token, $exp_time);
           
                return $this->response->setJSON(json_encode($result))->setStatusCode(200);
            } else {
                return $this->response->setJSON(json_encode($result))->setStatusCode(403);
            }
        } else {
            // Si los datos no están en el formato esperado, devuelve un mensaje de error
            return $this->response->setJSON(array('error' => 'Datos no válidos'))->setStatusCode(200);
        }
    }
    public function postToken()
    {
        $result = new \stdClass();
        $usuarioModel = new UserModel();
        $tokenModel = new TokenModel();
        // Recibe los datos POST
        $userEncryp = $this->request->getPost('user');
        $passEncryp = $this->request->getPost('password');
        $user = decryptedAES($userEncryp);
        $pass = decryptedAES($passEncryp);

        // Verifica si se recibieron datos y si tienen el formato esperado
        if (($user != null && $user != '') && ($pass != null && $pass != '')
        ) {
            // Aquí puedes realizar las acciones necesarias con los datos recibidos

            $params = array(
                "user" => $user,
                "password" => $pass,
            );
            // Ejemplo: Verificar las credenciales del usuario
            $ObjetUser = $usuarioModel->dbLoginUser($params);

            $result = json_decode(json_encode($ObjetUser));
            if ($result->state === 'OK') {
                $tk = $tokenModel->getTokenData();
                $secret = $tk['SECRET'];
                $exp_time = $tk['EXP'];
                $time = time();
                $header = ['typ' => 'JWT', 'alg' => 'HS256'];
                $payload = [
                    'user' => encryptedAES($result->c_usuario),
                    'iat' => $time,
                    'exp' => $time + $exp_time
                ];
                $token = JWT::encode($payload, $secret, 'HS256', null, $header);

                $registerLogin = $usuarioModel->registerLoginUser($result->c_usuario, $token);
                if ($registerLogin->state != 'OK') {
                    return $this->response->setJSON($registerLogin)->setStatusCode(403);
                }
    
                // Creacion de cookie HTTP ONLY
                CookieHelper::setCookie('accessToken', $token, $exp_time);
                
                return $this->response->setJSON(json_encode($result))->setStatusCode(200);
            } else {
                return $this->response->setJSON(json_encode($result))->setStatusCode(403);
            }
        } else {
            // Si los datos no están en el formato esperado, devuelve un mensaje de error
            return $this->response->setJSON(array('error' => 'Datos no válidos'))->setStatusCode(200);
        }
    }

    // private function dbLoginUser($params)
    // {
    //     $resp = new \stdClass();
    //     $builder = $this->db->table('usuarios');

    //     $query = $builder->select('u.c_usuario, u.d_nombre, u.d_apellido, GROUP_CONCAT(p.id_perfil) as perfiles')
    //         ->join('usuarios_perfiles up', 'up.c_usuario = u.c_usuario')
    //         ->join('perfiles p', 'p.id_perfil = up.id_perfil')
    //         ->where('u.c_usuario', encryptedAES($params['user'], 'db'))
    //         ->where('u.f_baja is null')
    //         ->groupBy('u.c_usuario')
    //         ->get();

    //     $ret = $query->getResultArray();

    //     if (count($ret) == 0) {
    //         $resp->state = 'NO_OK';
    //         $resp->message = 'Invalid login';
    //     } else {
    //         $resp->state = 'OK';
    //         $resp->c_usuario = $ret[0]['c_usuario'];
    //         $resp->fristName = $ret[0]['d_nombre'];
    //         $resp->lastName = $ret[0]['d_apellido'];
    //         // $resp->contactEmail = decryptedAES($ret[0]['d_mail'], 'db');
    //         $resp->perfiles = explode(',', $ret[0]['perfiles']);
    //         $resp->message = 'Usuario Valido';
    //     }

    //     return json_encode($resp);
    // }
}
