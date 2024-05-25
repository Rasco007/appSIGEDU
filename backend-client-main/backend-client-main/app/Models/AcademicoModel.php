<?php
namespace App\Models;
use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class AcademicoModel extends Model{
    public function __construct(){
        parent::__construct();
        $entorno = (isset($_SERVER['entorno']))? $_SERVER['entorno']: 'default';
        $this->db = \Config\Database::connect($entorno);
    }

    public function obtenerCarreras($id_alumno){
        $resp = new \stdClass();

        try{
            $builder = $this->db->table('alumnos_carreras ac');
            $builder->join('carreras ca', 'ac.c_carrera = ca.c_carrera');
            $builder->select('ca.c_carrera as value, ca.d_descripcion as label, ac.n_promedio as promedio');
            $builder->where('ac.id_alumno', $id_alumno);
            $query = $builder->get();
            
            $resp->result = $query->getResultArray();
            $resp->state = 'OK';

            return $resp;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al ejecutar la query';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function obtenerEnCurso($id_alumno, $c_carrera){
        $resp = new \stdClass();

        try{
            // CON STRING DE QUERY
            $query = $this->db->query("
                select 
                    cu.d_descred as nombreCurso, 
                    (select tg.d_dato from tablas_generales tg where tg.n_tabla = ac.n_tabla_estado and tg.c_dato = ac.c_estado) as estado, 
                    cu.d_profesor as docente, 
                    concat(cu.n_periodo, '° ', (select tg.d_dato from tablas_generales tg where tg.n_tabla = cu.n_tabla_tipo_periodo and tg.c_dato = cu.c_tipo_periodo), ' ', cu.c_año_lectivo) as periodo, 
                    ac.n_id_alu_cur 
                from alumnos_cursos ac 
                join cursos cu on ac.n_id_curso = cu.n_id_curso 
                where ac.id_alumno = ". $id_alumno ." 
                and ac.c_carrera = '". $c_carrera ."' 
                and cu.f_fin >= SYSDATE()
            ");

            // CON QUERY BUILDER
            // $builder = $this->db->table('alumnos_carreras ac');
            // $builder->join('cursos cu', 'ac.n_id_curso = cu.n_id_curso');
            // $builder->select("cu.d_curso as nombreCurso, ac.d_estado as estado, cu.d_profesor as docente, concat(cu.n_periodo, '° ', cu.c_tipo_periodo, ' ', cu.c_año_lectivo) as periodo");
            // $builder->where('ac.id_alumno', $id_alumno);
            // $builder->where('ac.c_carrera', $c_carrera);
            // $builder->where('cu.f_fin >=', 'SYSDATE()');

            // $query = $builder->get();


            $arr = $query->getResultArray();
            $resp->state = 'OK';
            $resp->result = $arr;

            return $resp;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al ejecutar la query';
            $resp->exception=$e;
        }

        return $resp;
    }

    public function obtenerHistorial($id_alumno, $c_carrera){
        $resp = new \stdClass();

        try{
            // CON STRING DE QUERY
            $query = $this->db->query("
                select 
                    al.n_id_libreta,
                    ma.d_descrip as nombreLargoCurso,
                    ma.d_descred as nombreCurso, 
                    al.c_estado as estado,
                    cu.d_profesor as docente,
                    CONCAT(cu.n_periodo, '° ', (select d_dato from tablas_generales tg where n_tabla = 104 and c_dato = cu.c_tipo_periodo), ' ', cu.c_año_lectivo) as periodo,
                    case when al.c_estado = 'APRB' then COALESCE(al.n_nota_numero, al.d_nota_letra) else null end as nota
                from alumnos_libretas al
                join mesas me on me.n_id_mesa = al.n_id_mesa
                join materias ma on ma.n_id_materia = al.n_id_materia  
                join cursos cu on cu.n_id_materia = al.n_id_materia  
                where al.id_alumno = ". $id_alumno ."
                and al.c_carrera = '". $c_carrera ."'
                and al.c_clase_evalua in (select c_dato from tablas_generales tg where n_tabla = 105 and d_dato1 = 'FINAL')
            ");

            $arr = $query->getResultArray();
            $resp->state = 'OK';
            $resp->result = $arr;

            return $resp;
        }catch (\Exception $e){
            $resp->state='NO_OK';
            $resp->result=null;
            $resp->msj='Error al ejecutar la query';
            $resp->exception=$e;
        }
        return $resp;
    }

}