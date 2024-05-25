<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\SecureHeaders;
use App\Filters\CorsFilter;
use App\Filters\Cli;
use App\Filters\Check;
use App\Filters\ApiCheck;

class Filters extends BaseConfig
{
    /**
     * Configures aliases for Filter classes to
     * make reading things nicer and simpler.
     *
     * @var array<string, string>
     * @phpstan-var array<string, class-string>
     */
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'cors'          => CorsFilter::class,
        // 'cli'           => Cli::class,
        'check'         => Check::class, 
        'Apicheck'      => ApiCheck::class,
    ];

    /**
     * List of filter aliases that are always
     * applied before and after every request.
     *
     * @var array<string, array<string, array<string, string>>>|array<string, array<string>>
     * @phpstan-var array<string, list<string>>|array<string, array<string, array<string, string>>>
     */
    public array $globals = [
        'before' => [
            // 'honeypot',
            // 'csrf',
            // 'invalidchars',
            'cors',
            // 'check'
            // 'cli',
            'Apicheck'=>[
                'except' => [
                    '/Framework/UserController/postUserValidation',
                    'Framework/UserController/postToken',

                    '/',
                    '/framework/isalive',
                    // '/client/ddjj',
                    // '/client/tramites',
                    // '/client/pdf',
                    // '/client/notif',
                    // '/client/calendarData',
                ]
            ],
            'check' => [
                'except' => [
                    '/Framework/UserController/postUserValidation',
                    '/login',
                    '/framework/token', 
                    'Framework/UserController/postToken',
                    '/pruebaOracle',
                ]
            ],
        ],
        'after' => [
            'toolbar',
            // 'honeypot',
            // 'secureheaders',
            'cors',
            'check' => [
                'except' => [
                    '/Framework/UserController/postUserValidation',
                    '/login',
                    '/framework/token', 
                    'Framework/UserController/postToken',
                    '/pruebaOracle',
                ]
            ],
        ],
    ];

    /**
     * List of filter aliases that works on a
     * particular HTTP method (GET, POST, etc.).
     *
     * Example:
     * 'post' => ['foo', 'bar']
     *
     * If you use this, you should disable auto-routing because auto-routing
     * permits any HTTP method to access a controller. Accessing the controller
     * with a method you don't expect could bypass the filter.
     */
    public array $methods = [];

    /**
     * List of filter aliases that should run on any
     * before or after URI patterns.
     *
     * Example:
     * 'isLoggedIn' => ['before' => ['account/*', 'profiles/*']]
     */
    public array $filters = [];
}