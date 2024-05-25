<?php

namespace App\Models\Framework;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class MenuModel extends Model

{
    protected $table = 'menu';
    protected $primaryKey = 'id_menu';
    protected $allowedFields = ['c_tipo_menu', 'd_titulo', 'n_orden', 'd_url'];
    public function __construct()
    {
        parent::__construct();
        $entorno = (isset($_SERVER['entorno'])) ? $_SERVER['entorno'] : 'default';
        $this->db = \Config\Database::connect($entorno);
    }


    public function getMenusPorModuloYPerfil($modulo, $perfiles, $order = 'ASC')
    {
        $resp = new \stdClass();
        $menus = [];

        $builder = $this->db->table('menu m');
        $query = $builder->select('m.id_menu, m.d_url, m.d_titulo, m.d_icono, m.c_tipo_menu as d_tipo, m.id_menu_padre')
            ->join('menu_modulos mm', 'm.id_menu = mm.id_menu')
            ->join('menu_perfiles mp', 'mp.id_menu = m.id_menu')
            ->whereIn('mp.id_perfil', $perfiles)
            ->where('mm.c_modulo', $modulo)
            ->groupBy('m.id_menu')
            ->orderBy('m.id_menu_padre', $order)
            ->orderBy('m.n_orden', $order)
            ->get();

        $responsedb = $query->getResultArray();

        if (count($responsedb) > 0) {
            foreach ($responsedb as $menu) {
                $menuData = [
                    'id_menu' => $menu['id_menu'],
                    'd_url' => $menu['d_url'],
                    'd_title' => $menu['d_titulo'],
                    'd_icon' => $menu['d_icono'],
                    'd_tipo' => $menu['d_tipo'],
                ];
             
                // Agregar 'menuList' o 'parentUrl' según el caso
                $menuData[$menu['d_tipo'] == 'ITEM' ? 'parentUrl' : 'menuList'] = $menu['d_tipo'] == 'ITEM' ? null : [];
                if ($menu['id_menu_padre'] == null) {
                    // Menú padre
                    $menus[] = $menuData;
                } else {
                    // Menú hijo
                    //busco el index del menu padre
                    $parentIndex = $this->findMenuIndex($menus, $menu['id_menu_padre']);
                
                    if ($parentIndex !== null) {
                       
                        if ($menu['d_tipo'] == 'ITEM') {
                            // Si el menú hijo es de tipo 'ITEM', utiliza 'parentUrl' en lugar de 'menuList'
                            $menuData['parentUrl'] = $menus[$parentIndex]['d_url'];
                            $menus[$parentIndex]['menuList'][] = $menuData;
                        }
                    }
                }
            }
        }

        if (empty($menus)) {
            $resp->state = 'NO_OK';
            $resp->message = 'Invalid login';
        } else {
            $resp->state = 'OK';
            $resp->menus = $menus;
        }

        return $resp;
    }

    private function findMenuIndex($menus, $idMenuPadre)
    {

        foreach ($menus as $index => $menu) {
            if ($menu['id_menu'] === $idMenuPadre) {
                
                return $index;
            }
            if (!empty($menu['menuList'])) {
                $childIndex = $this->findMenuIndex($menu['menuList'], $idMenuPadre);
                if ($childIndex !== null) {
                    return $index;
                }
            }
        }
        return null;
    }
}
