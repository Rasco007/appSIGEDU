<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class DetalleEvaluacionModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function obtenerDetalleEvaluacion($id_libreta)
    {
        $resp = new \stdClass();

        try {
            $query = $this->db->query("
                select 
                    (select tg.d_dato from tablas_generales tg where n_tabla = al.n_tabla_clase_evalua and c_dato = al.c_clase_evalua) as instancia,
                    concat(DATE_FORMAT(al.f_rinde, '%d/%m/%Y'), ' de ', (select CONCAT(FLOOR(me.n_hora_desde / 100), ':', CASE WHEN MOD(me.n_hora_desde, 100) = 0 THEN '00' ELSE MOD(me.n_hora_desde, 100) END, ' a ', FLOOR(me.n_hora_hasta / 100), ':', CASE WHEN MOD(me.n_hora_hasta, 100) = 0 THEN '00' ELSE MOD(me.n_hora_hasta, 100) END) horario from mesas me where me.n_id_mesa = al.n_id_mesa)) fecha,
                    (select concat(d_descrip, ' - ', d_sede) from espacios e join espacios_asignados ea on ea.n_id_espacio = e.n_id_espacio where ea.n_id_mesa = al.n_id_mesa) lugar,
                    COALESCE(al.n_nota_numero, al.d_nota_letra) nota,
                    c_estado estado
                from alumnos_libretas al
                where al.n_id_libreta = ".$id_libreta."
            ");

            $arr = $query->getResultArray();
            $resp->result['instancia'] = $arr[0]['instancia'];
            $resp->result['fecha'] = $arr[0]['fecha'];
            $resp->result['lugar'] = $arr[0]['lugar'];
            $resp->result['nota'] = $arr[0]['nota'];
            $resp->result['estado'] = $arr[0]['estado'];
            $resp->state = 'OK';
            return $resp;
        } catch (\Exception $e) {
            $resp->state = 'NO_OK';
            $resp->result = null;
            $resp->msj = 'Error al ejecutar la query';
            $resp->exception = $e;
        }

        return $resp;
    }
}
