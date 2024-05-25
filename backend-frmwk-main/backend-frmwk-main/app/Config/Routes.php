<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');
$routes->get('/menu', 'MenuController::index');
// $routes->get('/getClientes', 'Framework\ClientController::getConsultaCliente');
$routes->get('/framework/getConsultaCliente', 'Framework\ClientController::getConsultaCliente');
$routes->get('/notif', 'NotificationController::index');
// Options request for CORS
$routes->options('(:any)', 'Options::index', ['filter' => 'cors']);
// $routes->post('/getDataClientes', 'Framework\ClientController::getConsultaCliente');
$routes->post('/framework/getDataCliente', 'Framework\ClientController::postDatosCliente');
$routes->post('/framework/iniciarSesion', 'Framework\ClientController::iniciarSesion');

//endpoint idioma
$routes->post('/framework/postIdioma', 'Framework\ClientController::postIdioma');

// $arrRoutesGet = array(
//     "/is_alive_several" => "Framework\Is_alive_several",
//     "/is_alive_pagar_cep" => "Framework\Is_alive_several::isAlivePagarCep",
//     "/framework/security/get_cookie_data" => "Framework\Security::get_cookie_data"
// );

$arrRoutesPost = [
    "/framework/login" => "Framework\Login",
    "/framework/logout" => "Framework\Login::logout",
    "/framework/security" => "Framework\Security",
    "/framework/security/del_cookie" => "Framework\Security::delete_cookie",
];
// foreach ($arrRoutesGet as $from => $to) {
//     if (str_contains($to, 'Framework')) {
//         $routes->get($from, $to, ['filter' => ['corsfilter', 'cli']]);
//     } else {
//         $routes->get($from, $to, ['filter' => ['corsfilter', 'cli', 'check']]);
//     }
// }

// foreach ($arrRoutesPost as $from => $to) {
//     if (str_contains($to, 'Framework')) {
//         $routes->post($from, $to, ['filter' => ['corsfilter', 'cli']]);
//     } else {
//         $routes->post($from, $to, ['filter' => ['corsfilter', 'cli', 'check']]);
//     }
// }

// /*Oauth*/
// $routes->post("/oauth/authorize", "Framework\Oauth", ['filter' => ['corsfilter']]);

$routes->setAutoRoute(true);
