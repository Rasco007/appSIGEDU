<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');

// Options request for CORS
$routes->options('(:any)', 'Options::index', ['filter' => ['cors', 'cli']]);
$routes->post('/login', 'Framework\UserController::postUserValidation');
$routes->post('/framework/token', 'Framework\UserController::postToken');
$routes->post('/framework/isalive', 'Framework\Is_alive_several::isAlive');
$routes->post('/client/ddjj', 'DdjjController::getDdjj');
$routes->post('/client/tramites', 'DdjjController::getTramites');
$routes->post('/client/pdf', 'DdjjController::getPDF');
$routes->get('/client/notif', 'NotificationController::index');
$routes->get('/client/calendarData', 'CalendarController::index');
$routes->post('/getCarreras', 'AcademicoController::index');
$routes->post('/getEnCurso', 'AcademicoController::getEnCurso');
$routes->post('/getHistorial', 'AcademicoController::getHistorial');
$routes->post('/obtenerClasesHoy', 'HomeController::obtenerClasesHoy');
$routes->post('/obtenerTodosProximosExamenes', 'HomeController::obtenerTodosProximosExamenes');
$routes->post('/obtenerDetalleCurso', 'DetalleCursoController::obtenerDetalleCurso');
$routes->post('/obtenerExamenesRendidos', 'DetalleCursoController::obtenerExamenesRendidos');
$routes->post('/obtenerProximosExamenes', 'DetalleCursoController::obtenerProximosExamenes');
$routes->get('/obtenerNoticia', 'HomeController::obtenerNoticia');
$routes->post('/obtenerDetalleEvaluacion', 'DetalleEvaluacionController::obtenerDetalleEvaluacion');



$routes->post('/test', 'Framework\ApiController::handleRequest'); // esto solamente si es WS

$routes->get('/pruebaOracle', 'EjemploController::pruebaOracle');
// $arrRoutesGet = array(
//     "/is_alive_several" => "Framework\Is_alive_several",
//     "/is_alive_pagar_cep" => "Framework\Is_alive_several::isAlivePagarCep",
//     "/framework/security/get_cookie_data" => "Framework\Security::get_cookie_data"
// );

// $arrRoutesPost = [
//     "/framework/login" => "Framework\Login",
//     "/framework/logout" => "Framework\Login::logout",
//     "/framework/security" => "Framework\Security",
//     "/framework/security/del_cookie" => "Framework\Security::delete_cookie",
// ];

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
