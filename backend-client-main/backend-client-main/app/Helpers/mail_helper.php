<?php
// mail Helpers

if (!function_exists('configEmail')) {

    /***
     * configEmail Embebe a nuestra clase email de toda la configuracion necesaria
     * @param $c_dato_tabla_general
     * @return mixed
     */

    function configEmail($c_dato_tabla_general){
        $model = new \App\Models\Framework\TdiModel();
        $select = 'D_DATO1 AS EMAIL, D_DATO2 AS HOST, D_DATO3 AS PORT, D_DATO4 AS PASS, D_DATO6 AS CRYPTO';
        $where = ['N_TABLA' => 687, 'C_DATO' => $c_dato_tabla_general];
        $data = $model->getTablaGeneralData($select, $where);
        $config['protocol'] = 'smtp';
        $config['mailPath'] = '/usr/sbin/sendmail';
        $config['SMTPHost'] = $data[0]['HOST'];
        $config['SMTPUser'] = $data[0]['EMAIL'];
        $config['SMTPPass'] = $data[0]['PASS'];
        $config['SMTPPort'] = 587;
        $config['SMTPTimeout'] = 60;
        $config['SMTPCrypto'] = $data[0]['CRYPTO'];
        $config['charset']  = 'utf-8';
        $config['mailType'] = 'html';
        return $config;
    }
}

if (!function_exists('send_email')) {

    /***
     * send_email realiza envio de emails de acuerdo a la configuracion que se tenga en base de datos
     * @param array $config
     * @param null $n_id_mail
     */

    function send_email($config = array(), $n_id_mail = null, $usuario = null){
        $email = \Config\Services::email();
        $email->initialize($config);
        $mailModel = new \App\Models\Framework\MailModel();
        $dbMail = $mailModel->getMailCab($n_id_mail);
        $dbMailTo = $mailModel->getMailTo($n_id_mail);
        $dbMailAtt = $mailModel->getMailAttach($n_id_mail);
        //FROM_MAIL, DESDE, D_ASUNTO, HTML_MAIL, C_ESTADO_ENVIO, F_SOL_ENVIO, F_ENVIO, D_ERROR, M_REENVIA
        $name = ($dbMail['DESDE'] == null)? $dbMail['FROM_MAIL'] : $dbMail['DESDE'];
        $email->setFrom($dbMail['FROM_MAIL'], $name);
        $email->setSubject($dbMail['D_ASUNTO']);
        $email->setMessage($dbMail['HTML_MAIL']->load());
        $to = array();
        foreach ($dbMailTo as $t){
            $to[] = $t['D_MAIL'];
        }
        $email->setTo($to);
        foreach ($dbMailAtt as $a){
            if($a['ATTACH_URL'] != null){
                $email->attach($a['ATTACH_URL'], '', $a['ATTACH_NAME']);
            }
            else{
                $buffer = $a['B_ATTACH']->load();
                $email->attach($buffer, '', $a['ATTACH_NAME'], $a['ATTACH_MIME']);
            }
        }
        $obj = new \stdClass();
        if ($email->send()){
            $mailModel->updateEmailStatus($n_id_mail, $usuario, 'OK');
            $obj->response = 'OK';
        }
        else{
            $mailModel->updateEmailStatus($n_id_mail, $usuario, $email->printDebugger(['body']));
            $obj->response = 'NOOK';
            $obj->error = $email->printDebugger(['body']);
        }
        return $obj;
    }
}