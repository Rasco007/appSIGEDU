<?php
namespace App\Controllers\Framework;
use App\Controllers\BaseController;

use App\Models\Framework\TokenModel;
use App\Models\Framework\UserModel;
use App\Models\Framework\OauthModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use http\Exception;

class Oauth extends BaseController
{
    public function index()
    {
        // request data:
        //  - "response_type": "code"
        //  - "state": "<RANDOM>"

/* Errors de Response
|:----:|:---------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
|  Cód |        Mensaje        |                                                       Descripción                                                                         |
|:----:|:---------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
| N/A  | access_denied         | El propietario del recurso o el servidor de autorización denegó la solicitud.                                                             |
| 400  | invalid_request       | A la solicitud le falta un parámetro obligatorio, incluye un parámetro o valor de parámetro no compatible, o tiene un formato incorrecto. |
| 401  | unauthorized_client   | El cliente no está autorizado a solicitar un código de autorización utilizando este método.                                               |
|  /   |         /             | El client_id no es válido o ha sido deshabilitado.                                                                                        |
|  /   |         /             | Falta el parámetro codigo de cliente en la solicitud de autorización. 	                                                                   |
| 400  | unauthorized_type     | Falta el tipo_respuesta o el valor no es válido; el valor debe ser "código" para el flujo del servidor.                                   |
|  /   |         /             | La solicitud de autorización no incluía un parámetro redirect_uri.                                   	                                   |
| 403  | unauthorized_code     | Falta el codigo de autorizacion o el valor no es válido.                                                                                  |
| 403  | unauthorized_redirect | El redirect_uri proporcionado no es válido o es diferente de la configuración de la aplicación.                                           |
|:----:|:---------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
*/

        $arrPost = $this->request->getPost();
        if(!isset($arrPost['state'])){
            $data = [
                'error' => 'invalid_request',
                'message' => 'A la solicitud le falta un parámetro obligatorio, incluye un parámetro o valor de parámetro no compatible, o tiene un formato incorrecto.'
            ];
            return $this->response->setJSON($data)->setStatusCode(400);
        }

        switch ((isset($arrPost['response_type'])) ? $arrPost['response_type'] : null){
            case "code":
                if(!isset($arrPost['client_id'])){
                    $data = [
                        'error' => 'unauthorized_client',
                        'message' => 'Falta el parámetro codigo de cliente en la solicitud de autorización.'
                    ];
                    return $this->response->setJSON($data)->setStatusCode(401);
                }
                $result = $this->authorizationCode($arrPost['client_id']);
                
                $params = [];
                if(isset($arrPost['token'])){
                    $resToken = $this->checkToken($arrPost['token'], $arrPost['client_id'], true);
                    if ($resToken->code >= 400){
                        $data = [
                            'error' => 'access_denied',
                            'message' => $resToken->mensaje
                        ];
                        return $this->response->setJSON($data)->setStatusCode($resToken->code);
                    }
                    $params += (array)$resToken->variables;
                }

                if(isset($arrPost['params'])){$params += $arrPost['params'];}
                if(empty($params)){
                    $setParams = $this->setParamsAuthorizationCode($result->data->code, json_encode($params));
                    if($setParams->code >= 400){
                        $data = [
                            'error' => $setParams->error,
                            'message' => $setParams->message
                        ];
                        return $this->response->setJSON($data)->setStatusCode($setParams->code);
                    }
                }

                $result->data += ["state" => $arrPost['state']];
                return $this->response->setJSON($result->data)->setStatusCode($result->code);
                break;
            case "redirect_uri":
                if(!isset($arrPost['client_id'])){
                    $data = [
                        'error' => 'unauthorized_client',
                        'message' => 'Falta el parámetro codigo de cliente en la solicitud de autorización.'
                    ];
                    return $this->response->setJSON($data)->setStatusCode(401);
                }
                $result = $this->authorizationCode($arrPost['client_id']);                
                $authorizationCode = $result->data["code"];
                
                $params = [];
                $token = null;
                if(isset($arrPost['token'])){
                    $resToken = $this->checkToken($arrPost['token'], $arrPost['client_id'], true);
                    if ($resToken->code >= 400){
                        $data = [
                            'error' => 'access_denied',
                            'message' => $resToken->mensaje
                        ];
                        return $this->response->setJSON($data)->setStatusCode($resToken->code);
                    }
                    $params += (array)$resToken->variables;
                    $token = $arrPost['token'];
                }

                

                if(!isset($arrPost['redirect_uri'])){
                    $data = [
                        'error' => 'unauthorized_redirect',
                        'message' => 'El redirect_uri proporcionado no es válido o es diferente de la configuración de la aplicación..'
                    ];
                    return $this->response->setJSON($data)->setStatusCode(401);
                }

                $resultUri = $this->validateAuthorizationRedirect($authorizationCode, $arrPost['redirect_uri']);

                $resultUri->data += ["code" => $authorizationCode];
                $resultUri->data += ["state" => $arrPost['state']];

                if(isset($arrPost['params'])){$params += $arrPost['params'];}
                if(count($params) > 0 || $token != null){
                    $setParams = $this->setParamsAuthorizationCode($authorizationCode, json_encode($params), $token, $resultUri->redirect);
                    if($setParams->code >= 400){
                        $data = [
                            'error' => $setParams->error,
                            'message' => $setParams->message
                        ];
                        return $this->response->setJSON($data)->setStatusCode($setParams->code);
                    }
                }

                return $this->response->setJSON($resultUri->data)->setStatusCode($resultUri->code);
                break;
            case "authorization_code":
                if(!isset($arrPost['code'])){
                    $data = [
                        'error' => 'unauthorized_code',
                        'message' => 'Falta el codigo de autorizacion o el valor no es válido.'
                    ];
                    return $this->response->setJSON($data)->setStatusCode(401);
                }

                $result = $this->validateAuthorizationCode($arrPost['code']);
                $result->data += ["state" => $arrPost['state']];
                return $this->response->setJSON($result->data)->setStatusCode($result->code);
                break;
            default:
                $data = [
                    'error' => 'unauthorized_type',
                    'message' => 'Falta el tipo de respuesta o el valor no es válido.'
                ];
                return $this->response->setJSON($data)->setStatusCode(400);
                break;
        }

    }

    private function authorizationCode ($client_id){
        // Se valida codigo de cliente al igual que en el filter
        // en caso de que el codigo sea correcto se registra un hast SHA256 el cual sera devuelto y este poseera una vigencia de tiempo definida
        // en caso de error, se devulvera la descripcion del error, junto con el codigo de error correspondiente

        $validCLI = $this->checkClient($client_id);
        if($validCLI->code >= 400){
            $validCLI->data = [
                'error' => $validCLI->error,
                'message' => $validCLI->message
            ];
            return $validCLI;
        }

        srand(date('YmdHis'));
        $code = hash("sha256", $client_id."-".mt_rand());

        $model = new OauthModel();
        $resOathCode = $model->setAuthorizationCode($validCLI->clientId, $code);

        if ($resOathCode->state != 'OK'){
            $res = new \stdClass();
            $res->error = 'access_denied';
            $res->message = 'El propietario del recurso o el servidor de autorización denegó la solicitud.';
            $res->code = 400;
            return $res;
        }

        $ret = new \stdClass();
        $ret->code = 200;
        $ret->data = [
            'code' => $code,
            'error' => null,
            'message' => "save authorizationCode"
        ];
        return $ret;
    }

    private function checkClient($cli){
        $ret = new \stdClass();
        $model = new UserModel();

        try{
            $valido = $model->getDataClient($cli);
        }catch (Exception $e){
            $ret->error = 'unauthorized_client';
            $ret->message = 'El cliente no está autorizado a solicitar un código de autorización utilizando este método';
            $ret->code = 401;
            return $ret;
        }

        $ret->error = '';
        $ret->message = '';
        $ret->code = 200;

        if ($valido->state != 'OK'){
            $ret->error = 'unauthorized_client';
            $ret->message = 'El codigo de cliente no es válido o ha sido deshabilitado';
            $ret->code = 401;

            return $ret;
        }

        $ret->clientId = $valido->clientId;
        $ret->clientName = $valido->clientName;

        return $ret;
    }

    private function checkToken($token, $secret, $show_vbl){
        $model = new TokenModel();
        $ret = new \stdClass();
        $key = new key ($secret,'HS256');
        try{
            $vars = JWT::decode($token, $key);
            if($show_vbl === true){
                $ret->variables = $vars;
            }
            $ret->mensaje = 'OK';
            $ret->code = 200;
        }
        catch (\Throwable $e){
            $ret->mensaje = 'Token invalid: '.$e->getMessage();
            $ret->code = 403;
        }
        return $ret;
    }

    private function setParamsAuthorizationCode($code, $params=null, $token=null, $redirect_uri=null){
        $ret = new \stdClass();
        $model = new OauthModel();
        try{
            $setParams = $model->setParamsAuthorizationCode($code, $params, $token, $redirect_uri);
            if($setParams->state != 'OK'){
                $ret->error = 'unauthorized_code';
                $ret->message = 'Falta el codigo de autorizacion o el valor no es válido';
                $ret->code = 403;
                return $ret;
            }
        }catch (\Exception $e){
            $ret->error = 'unauthorized_code';
            $ret->message = 'Falta el codigo de autorizacion o el valor no es válido';
            $ret->code = 403;
            return $ret;
        }

        $ret->error = '';
        $ret->message = '';
        $ret->code = 200;
        return $ret;
    }

    private function validateAuthorizationCode($code){
        $ret = new \stdClass();
        $validCODE = $this->checkAuthorizationCode($code);
        if($validCODE->code >= 400){
            $validCODE->data = [
                'error' => $validCODE->error,
                'message' => $validCODE->message
            ];
            return $validCODE;
        }

        try {
            $model = new OauthModel();
            $paramsAuth = $model->getParamsAuthorizationCode($code);
            if($paramsAuth->state != 'OK'){
                $ret->error = 'unauthorized_code';
                $ret->message = 'Falta el codigo de autorizacion o el valor no es válido 01';
                $ret->code = 403;
                return $ret;
            }
        } catch (\Throwable $th) {
            $ret->error = 'unauthorized_code';
            $ret->message = 'Falta el codigo de autorizacion o el valor no es válido 02';
            $ret->code = 403;
            return $ret;
        }

        $ret->code = 200;
        $ret->data = [
            // 'params' => json_decode($paramsAuth->result),
            'error' => null,
            'message' => "valid code"
        ];
        ($paramsAuth->params != null && $paramsAuth->cli != '') ? $ret->data += ["params" => json_decode($paramsAuth->params)] : null;
        ($paramsAuth->token != null && $paramsAuth->token != '') ? $ret->data += ["token" => $paramsAuth->token] : null;
        ($paramsAuth->redirect_uri != null && $paramsAuth->redirect_uri != '') ? $ret->data += ["redirect_uri" => $paramsAuth->redirect_uri] : null;
        ($paramsAuth->cli != null && $paramsAuth->cli != '') ? $ret->data += ["cli" => base64_encode($paramsAuth->cli)] : null;
        
        return $ret;
    }

    private function validateAuthorizationRedirect ($code, $redirect_uri){
        $ret = new \stdClass();
        // $validCODE = $this->checkAuthorizationCode($code);
        // if($validCODE->code >= 400){
        //     $validCODE->data = [
        //         'error' => $validCODE->error,
        //         'message' => $validCODE->message
        //     ];
        //     return $validCODE;
        // }

        //recuperar URL correspondiente al redirect solicitante
        try{
            $model = new OauthModel();
            $redirectUri = $model->getRedirectUri($redirect_uri);
            if($redirectUri->state != 'OK'){
                $ret->code = 403;
                $ret->data = [
                    'error' => 'unauthorized_redirect',
                    'message' => 'El redirect_uri proporcionado no es válido o es diferente de la configuración de la aplicación.'
                ];
                return $ret;
            }
        }catch (\Exception $e){
            $ret->code = 403;
            $ret->data = [
                'error' => 'unauthorized_redirect',
                'message' => 'El redirect_uri proporcionado no es válido o es diferente de la configuración de la aplicación.'
            ];
            return $ret;
        }

        $ret->code = 200;
        $ret->redirect = $redirectUri->redirect;
        $ret->data = [
            'redirect_uri' => $redirectUri->security,
            'error' => null,
            'message' => "set redirect"
        ];
        return $ret;
    }

    private function checkAuthorizationCode ($code){
        $ret = new \stdClass();
        $model = new OauthModel();

        try{
            $validateAuth = $model->validateAuthorizationCode($code);        
            if($validateAuth->result == 0 || $validateAuth->state != 'OK'){
                $ret->error = 'unauthorized_code';
                $ret->message = 'Falta el codigo de autorizacion o el valor no es válido 00';
                $ret->code = 403;
                return $ret;
            }
            $revokeAuth = $model->revokeAuthorizationCode($code);
        }catch (\Exception $e){
            $ret->error = 'unauthorized_code';
            $ret->message = 'Falta el codigo de autorizacion o el valor no es válido';
            $ret->code = 403;
            return $ret;
        }

        $ret->error = '';
        $ret->message = '';
        $ret->code = 200;

        return $ret;
    }

}