<?php
// TDI Helpers

if (!function_exists('pre')) {

    /*** imprime una variable y corta la ejecucion de un proceso
     * @param $variable
     * @return string
     */
    function pre($variable)
    {
        echo "<pre>";
        print_r($variable);
        echo "</pre>";
        die();
    }
}

if (!function_exists('nvl')) {
    /**
     funcion de php que simula nvl de ORACLE
     */
    function nvl($key, $else)
    {
        return ($key != '' ? $key : $else);
    }
}

if (!function_exists('like_match')) {
    /**
     compara como un LIKE de sql
        $esp = (like_match('ESP-%', $p_tipo)==true)? 'TRUE' : 'FALSE';
     **/
    function like_match($pattern, $subject)
    {
        $pattern = str_replace('%', '.*', preg_quote($pattern, '/'));
        return (bool) preg_match("/^{$pattern}$/i", $subject);
    }
}

if (!function_exists('truncateText')) {
    /****
     corta el texto en cantidad de palabra
         $short_string = truncateText($long_string, 100, ' ');
     **/
    function truncateText($string, $limit, $break = ".", $pad = "...")
    {
        // return with no change if string is shorter than $limit
        if (strlen($string) <= $limit)
            return $string;

        // is $break present between $limit and the end of the string?
        if (false !== ($breakpoint = strpos($string, $break, $limit))) {
            if ($breakpoint < strlen($string) - 1) {
                $string = substr($string, 0, $breakpoint) . $pad;
            }
        }
        return $string;
    }
}

if (!function_exists('create_zip')) {
    /**
      $files=array('file1.jpg', 'file2.jpg', 'file3.gif');
          create_zip($files, 'myzipfile.zip', true);
     */
    function create_zip($files = array(), $destination = '', $overwrite = false)
    {
        //if the zip file already exists and overwrite is false, return false
        if (file_exists($destination) && !$overwrite) {
            return false;
        }
        //vars
        $valid_files = array();
        //if files were passed in...
        if (is_array($files)) {
            //cycle through each file
            foreach ($files as $file) {
                //make sure the file exists
                if (file_exists($file)) {
                    $valid_files[] = $file;
                }
            }
        }
        //if we have good files...
        if (count($valid_files)) {
            //create the archive
            $zip = new ZipArchive();
            if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
                return false;
            }
            //add the files
            foreach ($valid_files as $file) {
                $zip->addFile($file, $file);
            }
            //debug
            //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

            //close the zip -- done!
            $zip->close();

            //check to make sure the file exists
            return file_exists($destination);
        } else {
            return false;
        }
    }
}

//if (!function_exists('buscar_parametro')){
//    /**
//     * Funcion que busca parametro $p_constante en la tabla parámetros y devuelve el d_variable
//     * @param c_constante de tabla parametros
//     * @return valor d_variable de tabla parametros
//     */
//    function buscar_parametro($p_constante) {
//        $parametro = new \App\Models\Framework\TdiModel();
//        $row = $parametro->getParamConstante($p_constante);
//        return $row['VALOR'];
//    }
//}

if (!function_exists('fun_valida_obligatoriedad')) {
    /**
    Funcion de obligatoriedad de campo
     * @param $valor
     * @param $m_oblig
     * @return bool
     */
    function fun_valida_obligatoriedad($valor, $m_oblig)
    {
        $ret = true;
        if ($m_oblig == 'S') {
            $doble_barp = getenv('DOBLE_BARP');
            $ret = (preg_match($doble_barp, $valor)) ? true : false;
        }
        return $ret;
    }
}
if (!function_exists('fun_valida_texto')) {
    /**
    Funcion de obligatoriedad de campo texto
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_texto($valor, $m_oblig, $d_titulo)
    {
        $ret = (!fun_valida_obligatoriedad($valor, $m_oblig)) ? 'El campo ' . $d_titulo . ' es obligatorio' : 'OK';
        return $ret;
    }
}
if (!function_exists('fun_valida_numerico')) {
    /**
    Funcion de obligatoriedad y de formato numerico
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_numerico($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_NUMERICO'), $valor))
                $ret = 'El campo ' . $d_titulo . ' no tiene el formato correcto';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}
if (!function_exists('fun_valida_importe')) {
    /**
    Funcion de obligatoriedad y de formato importe
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_importe($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_IMPORTE'), $valor) && $valor != NULL)
                $ret = 'El campo ' . $d_titulo . ' no tiene el formato correcto';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}
if (!function_exists('fun_valida_entero')) {
    /**
    Funcion de obligatoriedad y de formato entero
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_entero($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_ENTERO'), $valor))
                $ret = 'El campo ' . $valor . ' no tiene el formato correcto';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}
if (!function_exists('fun_valida_fecha')) {
    /**
    Funcion de obligatoriedad y de formato fecha
     * @param $fecha
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_fecha($fecha, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($fecha, $m_oblig)) {
            if (!datecheck($fecha, "") && $fecha != NULL)
                $ret = 'La fecha ingresada debe tener el siguiente formato dd/mm/aaaa';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}
if (!function_exists('datecheck')) {
    /**
    Funcion que se usa para la validacion de fecha
     * @param $fecha
     * @param string $format
     * @return bool
     */
    function datecheck($fecha, $format = "")
    {
        if ($fecha) {
            $separator_type = array("/", "-", ".");
            foreach ($separator_type as $separator) {
                $find = stripos($fecha, $separator);
                if ($find <> false) {
                    $separator_used = $separator;
                }
            }
            $input_array = explode($separator_used, $fecha);
            if ($format == "mdy") {
                return checkdate($input_array[0], $input_array[1], $input_array[2]);
            } elseif ($format == "ymd") {
                return checkdate($input_array[1], $input_array[2], $input_array[0]);
            } else {
                return checkdate($input_array[1], $input_array[0], $input_array[2]);
            }
        }
    }
}
if (!function_exists('fun_valida_porc')) {
    /**
    Funcion de obligatoriedad y de formato porcentaje
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_porc($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_PORC'), $valor) && $valor != NULL)
                $ret = 'El campo ' . $d_titulo . ' no tiene el formato correcto, debe estar entre 0,00-100,00';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}
if (!function_exists('fun_valida_hora')) {
    /**
    Funcion de obligatoriedad y de formato hora
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_hora($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_HORA'), $valor))
                $ret = 'El campo ' . $valor . ' no tiene el formato correcto. Valores posibles entre 00:00 y 23:59';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}

if (!function_exists('getTokenVal')) {

    function getTokenVal($val)
    {
        $model = new \App\Models\Framework\TokenModel();
        $secret = $model->getSecret();
        $key = new \Firebase\JWT\key($secret, 'HS256');
        try {
            $vars = \Firebase\JWT\JWT::decode($_SERVER['ACCESS_TOKEN'], $key);
        } catch (\Throwable $e) {
            $vars = '';
        }
        return $vars->$val;
    }
}

if (!function_exists('getClientCredentials')) {

    function getClientCredentials()
    {
        $model = new \App\Models\Framework\ClientModel();
        $ObjClient = $model->getDataClient($_SERVER['CLI']);

        return $ObjClient;
    }
}
if (!function_exists('formatPrice')) {
    function formatPrice($price)
    {
        $formattedPrice = number_format(floatval($price), 2, ",", ".");
        return '$' . $formattedPrice;
    }
}

if (!function_exists('executeServiceClient')) {

    function executeServiceClient($ObjClient, $method, $endpoint, $params)
    {
        // $strParams = '';
        // foreach ($params as $key => $value) {
        //     $strParams .= $key . '=' . $value . '&';
        // }
        // $strParams = substr($strParams, 0, -1);
        
        $uriEndpoints = $ObjClient->uriEndpoints;
        
        if ($ObjClient->uriEndpoints == 'http://desarrolloypruebas.com.ar:5000/sigedu-mobile/client'
            || $ObjClient->uriEndpoints == 'http://sigedumobile.tdi.com.ar:5000/sigedu-mobile/client'){
            $uriEndpoints = 'http://sigedu-mobile-client/sigedu-mobile/client';
        }

        $curl = curl_init();
        $data = http_build_query($params);
        curl_setopt_array($curl, array(
            CURLOPT_URL => $uriEndpoints . $endpoint,
            // CURLOPT_URL => 'http://' . $_SERVER['REMOTE_ADDR'] . ':5002/sistema/login',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                $ObjClient->headerAuthorization,
                'Content-Type: application/x-www-form-urlencoded'
            ),
        ));

        $response = curl_exec($curl);

        if ($response === false) {
            $errorMessage = curl_error($curl);
            curl_close($curl);
            throw new Exception("Error al ejecutar la petición: $errorMessage");
        }

        curl_close($curl);

        return $response;
    }
}
if (!function_exists('fun_valida_entero_positivo')) {

    /**
    Funcion de obligatoriedad y de formato entero y positivo
     * @param $valor
     * @param $m_oblig
     * @param $d_titulo
     * @return string
     */
    function fun_valida_entero_positivo($valor, $m_oblig, $d_titulo)
    {
        $ret = 'OK';
        if (fun_valida_obligatoriedad($valor, $m_oblig)) {
            if (!preg_match(getenv('VAL_ENTERO_POSITIVO'), $valor))
                $ret = 'El campo ' . $valor . ' no tiene el formato correcto';
        } else {
            $ret = 'El campo ' . $d_titulo . ' es obligatorio';
        }
        return $ret;
    }
}

if (!function_exists('validField')) {
    /**
    Funcion de validacion de campos
     * @param array $validFields
     * @param string $inputField
     * @return bool
     */
    function validField($validFields, $inputField)
    {
        return array_key_exists($inputField, $validFields);
    }
}

if (!function_exists('validOperator')) {
    /**
    Funcion de validacion de campos
     * @param string $inputField
     * @param string $inputOperator
     * @return bool
     */
    function validOperator($validOperators, $inputOperator)
    {
        return in_array($inputOperator, $validOperators);
    }
}

if (!function_exists('validValue')) {
    /**
    Funcion de validacion de campos
     * @param string $inputField
     * @param $inputValue
     * @return bool
     */
    function validValue($validValues, $inputValue)
    {
        return preg_match($validValues, $inputValue);
    }
}

if (!function_exists('decryptedAES')) {
    /**
     * Funcion para desesncriptado AES
     */
    function decryptedAES($codeEncrypted, $method = 'ctr')
    {
        if ($method != 'db') {
            // return openssl_decrypt(hex2bin($codeEncrypted), getenv('aes_cipher_method'), getenv('aes_secret'), OPENSSL_RAW_DATA, getenv('aes_iv'));
            return openssl_decrypt(base64_decode($codeEncrypted), getenv('aes_cipher_method'), getenv('aes_secret'), OPENSSL_RAW_DATA, getenv('aes_iv'));
        }

        return openssl_decrypt(base64_decode($codeEncrypted), getenv('aes_cipher_method_db'), getenv('app_key'), OPENSSL_RAW_DATA);
    }
}

if (!function_exists('encryptedAES')) {
    /**
     * Funcion para encriptado AES
     */
    function encryptedAES($codeDecrypted, $method = 'ctr')
    {
        if ($method != 'db') {
            // return bin2hex(openssl_encrypt($codeDecrypted, getenv('aes_cipher_method'), getenv('aes_secret'), OPENSSL_RAW_DATA, getenv('aes_iv')));
            return base64_encode(openssl_encrypt($codeDecrypted, getenv('aes_cipher_method'), getenv('aes_secret'), OPENSSL_RAW_DATA, getenv('aes_iv')));
        }
        return base64_encode(openssl_encrypt($codeDecrypted, getenv('aes_cipher_method_db'), getenv('app_key'), OPENSSL_RAW_DATA));
    }
}
