<?php

namespace App\Controllers;

class CalendarController extends BaseController
{
    public function index()
    {
        $data = [
            "estado" => "OK",
            "eventos" => [
                [
                    "titulo" => "IMPUESTO AUTOMOTOR",
                    "fecha" => "2024-01-18T10:00:00",
                    "descripcion" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo"
                ],
                [
                    "titulo" => "IMPUESTO AUTOMOTOR",
                    "fecha" => "2024-01-20T10:00:00",
                    "descripcion" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices quam a fermentum fringilla. Fusce id purus eu magna mollis posuere sit amet id justo"
                ],
                [
                    "titulo" => "Impuesto lorem ipsum",
                    "fecha" => "2024-01-20T15:30:00",
                    "descripcion" => "lorem lorem lorem"
                ],
                [
                    "titulo" => "Impuesto lorem ipsum",
                    "fecha" => "2024-01-21T15:30:00",
                    "descripcion" => "lorem lorem lorem"
                ]
                ,
                [
                    "titulo" => "Impuesto lorem ipsum",
                    "fecha" => "2024-01-21T15:30:00",
                    "descripcion" => "lorem lorem lorem"
                ],
                [
                    "titulo" => "Impuesto lorem ipsum",
                    "fecha" => "2024-01-21T15:30:00",
                    "descripcion" => "lorem lorem lorem"
                ],
                [
                    "titulo" => "Impuesto lorem ipsum",
                    "fecha" => "2024-01-21T15:30:00",
                    "descripcion" => "lorem lorem lorem"
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
