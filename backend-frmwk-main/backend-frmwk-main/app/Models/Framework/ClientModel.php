<?php

namespace App\Models\Framework;


use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class ClientModel extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';
    protected $fields = ['logo', 'color_primario', 'color_secundario', 'color_fondo'];

    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }
    public function getDataClient($clientSecret)
    {
        $this->setKeyApp();
        $builder = $this->db->table('clientes c');
        $query = $builder->select('c.id_cliente, d_cliente, d_url_endpoint, d_cabecera_autorizacion,d_color_primario,cm.c_modulo')
            ->join('clientes_modulos cm', 'cm.id_cliente = c.id_cliente')
            ->where('c_cli', $clientSecret)
            ->where('f_baja is null')
            ->where('f_vig_desde is null')
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
            $resp->headerAuthorization = $ret[0]['d_cabecera_autorizacion'];
            $resp->c_modulo = $ret[0]['c_modulo'];
        }

        return $resp;
    }
    public function obtenerIdiomas($idioma)
    {
        try {
            $params = array(
                "endpoint" => 'postIdioma',
                "idioma" => $idioma
            );
            //Consulto a la base los clientes disponibles
            $resultServiceClient = $this->dbClientes($params);

            //retorno el resultado de los clientes indistinto si es OK o NO_OK  
            return $resultServiceClient;
        } catch (\Exception $e) {
            throw new \Exception('Error al obtener el idioma: ' . $e->getMessage());
        }
    }
    //funcion usada por el endpoint ClientController/getConsultaCliente para obtener todos los clientes
    public function obtenerClientes()
    {
        try {
            $params = array(
                "endpoint" => 'getConsultaCliente',
            );
            //Consulto a la base los clientes disponibles
            $resultServiceClient = $this->dbClientes($params);

            //retorno el resultado de los clientes indistinto si es OK o NO_OK  
            return $resultServiceClient;
        } catch (\Exception $e) {
            throw new \Exception('Error al obtener el menu: ' . $e->getMessage());
        }
    }
    //funcion usada por el endpoint ClientController/getDatosCliente para obtener los datos de un cliente
    public function obtenerConexionCliente($id_cliente)
    {
        try {
            $params = array(
                "id_cliente" => $id_cliente,
                "endpoint" => 'postDatosConexionCliente',
            );
            //Consulto a la base los clientes disponibles
            $resultServiceClient = $this->dbClientes($params);

            //retorno el resultado de los clientes indistinto si es OK o NO_OK  
            return $resultServiceClient;
        } catch (\Exception $e) {
            throw new \Exception('Error al obtener los datos: ' . $e->getMessage());
        }
    }
    public function obtenerDatosCliente($id_cliente)
    {
        try {
            $params = array(
                "id_cliente" => $id_cliente,
                "endpoint" => 'postDatosCliente',
            );
            //Consulto a la base los clientes disponibles
            $resultServiceClient = $this->dbClientes($params);

            //retorno el resultado de los clientes indistinto si es OK o NO_OK  
            return $resultServiceClient;
        } catch (\Exception $e) {
            throw new \Exception('Error al obtener el menu: ' . $e->getMessage());
        }
    }

    private function dbClientes($params)
    {

        $resp = new \stdClass();
        $aux = new \stdClass();
        $builder = $this->db->table('clientes c');
        $query = null;
        $aux1 = null;
        $message = '';

        switch ($params['endpoint']) {
            case 'getConsultaCliente':
                $query = $builder->select('id_cliente,  d_cliente')->get();
                $message = 'No se encontraron clientes.';

                break;
            case 'postIdioma':
                $idioma = $params['idioma'];
                $query = $this->db->query("
                    SELECT c_tabla as tabla, c_columna as clave, d_texto as valor
                    FROM idiomas_columnas
                    WHERE c_idioma = '$idioma'
                    GROUP BY c_tabla, c_columna, d_texto
                ");
                if (!$query) {
                    $error = $this->db->error();
                    die("Error en la consulta SQL: " . $error['message']);
                } else {
                    $clientes = $query->getResultArray();
                    $resultado = array();
                    foreach ($clientes as $cliente) {
                        $tabla = $cliente['tabla'];
                        $clave = $cliente['clave'];
                        $valor = $cliente['valor'];
                
                        // Verifica si la tabla ya existe en $resultado
                        if (!array_key_exists($tabla, $resultado)) {
                            $resultado[$tabla] = array();
                        }
                        // Agrega la clave y valor al array correspondiente a la tabla
                        $resultado[$tabla][$clave] = $valor;
                    }
                    if ($resultado) {
                        $resp->state = 'OK';
                        $resp->datos = array();
                        $resp->datos['traducciones']  = $resultado;
                        return json_encode($resp, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                    } else {
                        $resp->state = 'NO_OK';
                        $resp->message = 'No se encontraron datos del cliente.';
                        return json_encode($resp, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                    }
                }

                break;

            case 'postDatosCliente':
                $query = $builder->select('ci.c_idioma')
                    ->join('clientes_idiomas ci', 'c.id_cliente = ci.id_cliente')
                    ->where('c.id_cliente', $params['id_cliente'])
                    ->get();
                $idiomas = $query->getResultArray();

                $query1 = $builder->select('d_url_endpoint,d_logo, d_color_primario, d_color_secundario,c_cli')
                    ->where('id_cliente', $params['id_cliente'])
                    ->get();

                if (!$query1) {
                    $error = $this->db->error();
                    die("Error en la consulta SQL: " . $error['message']);
                } else {
                    $row = $query1->getRow();
                    if ($row) {
                        $logoBlob = $row->d_logo;
                        $encodedLogo = base64_encode($logoBlob);
                        $resp->state = 'OK';
                        $resp->datos = array();
                        $resp->datos['d_url_endpoint']  = $row->d_url_endpoint;
                        $resp->datos['d_color_primario']  = $row->d_color_primario;
                        $resp->datos['d_color_secundario']  = $row->d_color_secundario;
                        $resp->datos['c_cli']  = $row->c_cli;
                        $resp->datos['idiomas']  = array();
                        $resp->datos['idiomas'] = $idiomas;
                        $resp->datos['d_logo']  = $encodedLogo;
                        return json_encode($resp);
                    } else {
                        $resp->state = 'NO_OK';
                        $resp->message = 'No se encontraron datos del cliente.';
                        return json_encode($resp);
                    }
                }

                break;

            case 'postDatosConexionCliente':
                $query = $builder->select('d_cabecera_autorizacion, c_cli, d_cliente, d_url_endpoint')
                    ->where('id_cliente', $params['id_cliente'])
                    ->get();
                $message = 'No se encontraron datos del cliente.';
                break;

            default:
                $message = 'No se encontro el endpoint.';
                break;
        }


        $clientes = $query->getResultArray();

        if (count($clientes) == 0) {
            $resp->state = 'NO_OK';
            $resp->message = $message;
        } else {
            $resp->state = 'OK';
            $resp->datos = array();

            foreach ($clientes as $cliente) {
                $resp->datos[] = $cliente;
            }
        }
        return json_encode($resp, JSON_UNESCAPED_UNICODE);
    }
    private function setKeyApp()
    {
        $query = $this->db->query("SET @app_key = ?", [getenv('app_key')]);
    }
}
