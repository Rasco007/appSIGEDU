<?php

namespace App\Controllers;
use App\Models\Framework\MenuModel;
class MenuController extends BaseController
{
    public function index()
    {
        $data = [
            'state' => 'OK',
            'cardsGeneral' => [
                [
                    'title' => '¿Qué necesitas hacer hoy?',
                    'cards' => [
                        [
                            'title' => 'Ver/Pagar impuestos',
                            'icon' => 'ui-icon-pay',
                            'screen' => 'Ddjj',
                        ],
                        [
                            'title' => 'Declaraciones Juradas',
                            'icon' => 'ui-icon-lorem',
                            'screen' => 'Ddjj',
                        ],
                        [
                            'title' => 'Trámites',
                            'icon' => 'ui-icon-lorem',
                            'screen' => 'Tramites',
                        ],
                    ],
                ],
                [
                    'title' => 'Titulo 2',
                    'cards' => [
                        [
                            'id' => 4,
                            'title' => 'Lorem',
                            'icon' => 'ui-icon-pay',
                            'screen' => 'Ddjj',
                        ],
                        [
                            'id' => 5,
                            'title' => 'Lorem',
                            'icon' => 'ui-icon-lorem',
                            'screen' => 'Ddjj',
                        ],
                        [
                            'id' => 6,
                            'title' => 'Lorem',
                            'icon' => 'ui-icon-lorem',
                            'screen' => 'Novedades',
                        ],
                    ],
                ],
            ],
        ];

        $this->response
        ->setContentType('application/json')
        ->setStatusCode(200);

    // Convierte los datos en JSON y envíalos como respuesta
    return $this->response->setJSON($data);
    }
    public function getMenusPorModuloYPerfil()
    {
        // Supongamos que obtienes el módulo y perfiles de alguna manera
        $modulo = 'MOD_1';
        $perfiles = [1, 2, 3]; // Cambia esto con los perfiles correctos

        // Instancia tu modelo (reemplaza "TuModelo" con el nombre real de tu modelo)
        $menuModel = new MenuModel();

        // Llama a la función para obtener los menús
        $menuData = $menuModel->getMenusPorModuloYPerfil($modulo, $perfiles);

        // Devuelve los datos en formato JSON
        return $this->response->setJSON($menuData);
    }
}

