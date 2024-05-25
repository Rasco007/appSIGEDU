<?php

namespace App\Controllers;

class NotificationController extends BaseController
{
    public function index()
    {
        $data = [
            "estado" => "OK",
            "mensaje" => "OK",
            "encabezado" => [
                [
                    "clave" => "title",
                    "titulo" => "Titulo",
                    "visible" => true
                ],
                [
                    "clave" => "priority",
                    "titulo" => "Prioridad",
                    "visible" => true
                ],
                [
                    "clave" => "reference",
                    "titulo" => "Referencia",
                    "visible" => true
                ],
                [
                    "clave" => "date",
                    "titulo" => "Fecha de Envío",
                    "visible" => true
                ],
                [
                    "clave" => "codigo_de_referencia",
                    "titulo" => "codigo_de_referencia",
                    "visible" => true
                ]
               ,
                [
                    "clave" => "body",
                    "titulo" => "body",
                    "visible" => true
                ]
            ],
            "datos" => [
                [
                    "title" => "Documentación Rechazadaazaaaaaaaaaa",
                    "read" => false,
                    "priority" => "Alta",
                    "reference" => "Legajo Único",
                    "date" => "dd/mm/yyyy hh:mm",
                    "body" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringill. Fusce id purus eu magna mollis posuere sit amet id justo"
                ],
                [
                    "title" => "Documentación Rechazadaaaa",
                    "read" => true,
                    "priority" => "Alta",
                    "reference" => "Legajo Único",
                    "date" => "dd/mm/yyyy hh:mm",
                    "body" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricrem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentrem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentes quam a fermentum fringill. Fusce id purus eu magna mollis posuere sit amet id justo"
                ]
               ,
                [
                    "title" => "Documentación Rechazadaaa",
                    "read" => true,
                    "priority" => "Alta",
                    "reference" => "Legajo Único",
                    "date" => "dd/mm/yyyy hh:mm",
                    "body" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringill. Fusce id purus eu magna mollis posuere sit amet id justo"
                ] 
            ]
        ];

        $this->response
            ->setContentType('application/json')
            ->setStatusCode(200);

        // Convierte los datos en JSON y envíalos como respuesta
        return $this->response->setJSON($data);
    }
}