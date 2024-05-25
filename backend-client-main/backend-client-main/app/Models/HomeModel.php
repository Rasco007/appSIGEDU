<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class HomeModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function obtenerClasesHoy($id_alumno)
    {
        $resp = new \stdClass();

        try {
            $arr = [];
            for($i = -7; $i <= 7; $i++) {
                $fecha = date("Y-m-d", strtotime($i . " day"));

                $query = $this->db->query("
                    select
                        c.d_descred nombreCurso,
                        c.d_profesor docente,
                        CONCAT(FLOOR(ch.n_hora_desde / 100), ':', CASE WHEN MOD(ch.n_hora_desde, 100) = 0 THEN '00' ELSE MOD(ch.n_hora_desde, 100) END, ' - ', FLOOR(ch.n_hora_hasta / 100), ':', CASE WHEN MOD(ch.n_hora_hasta, 100) = 0 THEN '00' ELSE MOD(ch.n_hora_hasta, 100) END) horario,
                        e.d_sede sede,
                        e.d_descrip aula,
                        acur.n_id_alu_cur
                    from
                        usuarios u,
                        alumnos_carreras acar,
                        alumnos_cursos acur,
                        cursos c,
                        cursos_tipoclase ct,
                        cursos_horarios ch,
                        clases cla,
                        espacios_asignados ea,
                        espacios e
                    where
                        u.id_alumno = acar.id_alumno
                        and acar.id_alumno = acur.id_alumno
                        and acar.c_carrera = acur.c_carrera
                        and acar.f_baja is null
                        and acar.f_graduacion is NULL
                        and acur.n_id_curso = c.n_id_curso
                        and c.n_id_curso = ct.n_id_curso
                        and ct.n_id_cur_tipoclase = ch.n_id_cur_tipoclase
                        and ch.n_id_cur_horario = cla.n_id_cur_horario
                        and cla.n_id_clase = ea.n_id_clase
                        and ea.n_id_espacio = e.n_id_espacio
                        and ch.c_dia_semanal != 'DIST'
                            and date(cla.f_clase) = '".$fecha."'
                            and u.id_alumno = ".$id_alumno."
                        order by
                            ch.n_hora_desde
                ");
                $arr[$fecha] = $query->getResultArray();
            }

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

    public function obtenerTodosProximosExamenes($id_alumno)
    {
        $resp = new \stdClass();

        try {
            // CON STRING DE QUERY
            $query = $this->db->query("
            select
                tg.d_dato descripcion,
                c.d_descred curso,
                DATE_FORMAT(m.f_mesa, '%m/%d/%Y') fecha, 
                CONCAT(FLOOR(m.n_hora_desde / 100), ':', CASE WHEN MOD(m.n_hora_desde, 100) = 0 THEN '00' ELSE MOD(m.n_hora_desde, 100) END) horario
            from
                alumnos_carreras acar,
                alumnos_cursos acur,
                cursos c,
                mesas m,
                tablas_generales tg
            where
                acar.id_alumno = acur.id_alumno
                and acar.c_carrera = acur.c_carrera
                and acar.f_baja is null
                and acar.f_graduacion is NULL
                and acur.n_id_curso = c.n_id_curso
                and c.n_id_curso = m.n_id_curso
                and m.n_tabla_clase_evalua = tg.n_tabla
                and m.c_clase_evalua = tg.c_dato
                and ((date(m.f_mesa) > date(SYSDATE()))
                    or (date(m.f_mesa) = date(SYSDATE())
                        and m.n_hora_desde > HOUR(CURRENT_TIME()) ))
                and acar.id_alumno = ".$id_alumno."
                order by m.f_mesa, m.n_hora_desde
                limit 10
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

    public function obtenerNoticia()
    {
        $resp = new \stdClass();

        try {
            $query = $this->db->query("
                select d_url 
                from noticias
                where f_alta <= SYSDATE() 
                and f_baja > SYSDATE() 
                order by f_baja asc
                limit 1
            ");

            $arr = $query->getResultArray();
            $resp->result['d_url'] = $arr[0]['d_url'];
            $resp->state = 'OK';

        } catch (\Exception $e) {
            $resp->state = 'NO_OK';
            $resp->result = null;
            $resp->msj = 'Error al ejecutar la query';
            $resp->exception = $e;
        }

        return $resp;
    }
}
