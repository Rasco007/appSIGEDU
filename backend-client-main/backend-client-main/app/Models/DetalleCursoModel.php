<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class DetalleCursoModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function obtenerDetalleCurso($id_alu_cur)
    {
        $resp = new \stdClass();

        try {
            $query = $this->db->query("
                select distinct
                    c.d_descrip curso,
                    CASE WHEN c.c_tipo_periodo = 'CUAT' THEN CONCAT(c.n_periodo, '° ', tg2.d_dato, ' ', c.c_año_lectivo) ELSE CONCAT(tg2.d_dato, ' ', c.c_año_lectivo) END as periodo,
                    (select GROUP_CONCAT(cp.d_profesor SEPARATOR ' - ')  from cursos_profesores cp where cp.n_id_curso = c.n_id_curso) profesores,
                    (select GROUP_CONCAT(CONCAT(tg.d_dato, ' de ', FLOOR(ch.n_hora_desde / 100), ':', CASE WHEN MOD(ch.n_hora_desde, 100) = 0 THEN '00' ELSE MOD(ch.n_hora_desde, 100) END, ' a ', FLOOR(ch.n_hora_hasta / 100), ':', CASE WHEN MOD(ch.n_hora_hasta, 100) = 0 THEN '00' ELSE MOD(ch.n_hora_hasta, 100) END) SEPARATOR ' - ') from cursos_horarios ch join cursos_tipoclase ct on ct.n_id_cur_tipoclase = ch.n_id_cur_tipoclase join tablas_generales tg on tg.n_tabla = ch.n_tabla_dia_semanal and tg.c_dato = ch.c_dia_semanal where ct.n_id_curso = c.n_id_curso) horario,
                    tg3.d_dato estado
                from cursos c 
                join cursos_tipoclase ct on ct.n_id_curso = c.n_id_curso 
                join cursos_horarios ch on ch.n_id_cur_tipoclase = ct.n_id_cur_tipoclase 
                join cursos_profesores cp on cp.n_id_cur_horario = ch.n_id_cur_horario 
                join tablas_generales tg2 on tg2.n_tabla = c.n_tabla_tipo_periodo and tg2.c_dato = c.c_tipo_periodo
                join alumnos_cursos ac on ac.n_id_curso = c.n_id_curso
                join tablas_generales tg3 on tg3.n_tabla = ac.n_tabla_estado and tg3.c_dato = ac.c_estado
                where ac.n_id_alu_cur = ".$id_alu_cur."
            ");

            $arr = $query->getResultArray();
            $resp->result['curso'] = $arr[0]['curso'];
            $resp->result['periodo'] = $arr[0]['periodo'];
            $resp->result['profesores'] = $arr[0]['profesores'];
            $resp->result['horario'] = $arr[0]['horario'];
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

    public function obtenerExamenesRendidos($id_alumno, $id_alu_cur)
    {
        $resp = new \stdClass();

        try {
            $query = $this->db->query("
                select 
                    n_id_libreta,
                    tg.d_dato instancia,
                    DATE_FORMAT(m.f_mesa, '%d/%m/%Y') fecha,
                    COALESCE(al.n_nota_numero, al.d_nota_letra) nota
                from mesas m
                join alumnos_libretas al on al.n_id_mesa = m.n_id_mesa
                join tablas_generales tg on tg.n_tabla = m.n_tabla_clase_evalua and tg.c_dato = m.c_clase_evalua 
                where al.id_alumno = ".$id_alumno."
                and n_id_curso = (select n_id_curso from alumnos_cursos ac where n_id_alu_cur = ".$id_alu_cur.")
                and m.f_mesa <= SYSDATE()
                order by m.f_mesa asc
            ");

            $arr = $query->getResultArray();
            $resp->state = 'OK';
            $resp->result = $arr;

            return $resp;
        } catch (\Exception $e) {
            $resp->state = 'NO_OK';
            $resp->result = null;
            $resp->msj = 'Error al ejecutar la query';
            $resp->exception = $e;
        }

        return $resp;
    }

    public function obtenerProximosExamenes($id_alu_cur)
    {
        $resp = new \stdClass();

        try {
            $query = $this->db->query("
                select
                    n_id_curso,
                    tg.d_dato instancia,
                    DATE_FORMAT(m.f_mesa, '%d/%m/%Y') fecha,
                    CONCAT(FLOOR(m.n_hora_desde / 100), ':', CASE WHEN MOD(m.n_hora_desde, 100) = 0 THEN '00' ELSE MOD(m.n_hora_desde, 100) END, ' a ', FLOOR(m.n_hora_hasta / 100), ':', CASE WHEN MOD(m.n_hora_hasta, 100) = 0 THEN '00' ELSE MOD(m.n_hora_hasta, 100) END) horario,
                    (select e.d_descrip from espacios e join espacios_asignados ea on e.n_id_espacio = ea.n_id_espacio where ea.n_id_mesa = m.n_id_mesa) aula
                from mesas m
                join tablas_generales tg on tg.n_tabla = m.n_tabla_clase_evalua and tg.c_dato = m.c_clase_evalua
                where n_id_curso = (select n_id_curso from alumnos_cursos ac where n_id_alu_cur = ".$id_alu_cur.")
                and m.f_mesa >= SYSDATE()
                order by m.f_mesa asc
            ");

            $arr = $query->getResultArray();
            $resp->state = 'OK';
            $resp->result = $arr;

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
