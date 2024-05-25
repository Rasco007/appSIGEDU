<?php

namespace Config;

use CodeIgniter\Database\Config;

require_once APPPATH . '/.env.php';

/**
 * Database Configuration
 */
class Database extends Config
{
    /**
     * The directory that holds the Migrations
     * and Seeds directories.
     */
    public string $filesPath = APPPATH . 'Database' . DIRECTORY_SEPARATOR;

    /**
     * Lets you choose which connection group to
     * use if no other is specified.
     */
    public string $defaultGroup = 'default';

    /**
     * The default database connection.
     */
    public array $default = [
        'DSN'          => '',
        'hostname'     => DB_HOSTNAME_DEFAULT,
        'username'     => DB_USERNAME_DEFAULT,
        'password'     => DB_PASSWORD_DEFAULT,
        'database'     => DB_DATABASE_DEFAULT,
        'DBDriver'     => DB_DRIVER_DEFAULT,
        'DBPrefix'     => '',
        'pConnect'     => DB_PCONNECT_DEFAULT,
        'DBDebug'      => true,
        'charset'      => 'utf8',
        'DBCollat'     => 'utf8_general_ci',
        'swapPre'      => '',
        'encrypt'      => false,
        'compress'     => false,
        'strictOn'     => false,
        'failover'     => [],
        'port'         => DB_PORT_DEFAULT,
        'numberNative' => false,
    ];

    public $oracle = [
        // 'DSN'          => DB_DSN_ORACLE,
        'hostname'     => DB_HOSTNAME_ORACLE,
        'database'     => DB_DATABASE_ORACLE,
        'username'     => DB_USERNAME_ORACLE,
        'password'     => DB_PASSWORD_ORACLE,
        'DBDriver'     => DB_DRIVER_ORACLE, 
        'pConnect'     => false,
        'DBDebug'      => (ENVIRONMENT !== 'production'),
        // 'DBDegug'      => DB_DBDEBUG_ORACLE,
        'charset'      => 'utf8',
        'DBCollat'     => 'utf8_general_ci',
        'swapPre'      => '',
        'encrypt'      => false,
        'compress'     => false,
        'strictOn'     => false,
        'failover'     => [],
        'port'         => DB_PORT_ORACLE,
    ];

    // public array $cliente = [
    //     'DSN'          => '',
    //     'hostname'     => '10.10.144.249',
    //     'username'     => 'frmwk',
    //     'password'     => 'Frmwk#2023',
    //     'database'     => 'frmwk_mobile_client',
    //     'DBDriver'     => 'MySQLi',
    //     'DBPrefix'     => '',
    //     'pConnect'     => false,
    //     'DBDebug'      => true,
    //     'charset'      => 'utf8',
    //     'DBCollat'     => 'utf8_general_ci',
    //     'swapPre'      => '',
    //     'encrypt'      => false,
    //     'compress'     => false,
    //     'strictOn'     => false,
    //     'failover'     => [],
    //     'port'         => 3306,
    //     'numberNative' => false,
    // ];
    // public $default = [
    //     'DSN'      => '',
    //     'hostname' => getenv('database.default.hostname'),
    //     'username' => getenv('database.default.username'),
    //     'password' => getenv('database.default.password'),
    //     'database' => getenv('database.default.database'),
    //     'DBDriver' => getenv('database.default.DBDriver'),
    //     'DBPrefix' => getenv('database.default.DBPrefix'),
    //     'pConnect' => getenv('database.default.pConnect'),
    //     'DBDebug'  => (ENVIRONMENT !== 'production'),
    //     'cacheOn'  => false,
    //     'cacheDir' => '',
    //     'charset'  => getenv('database.default.charset'),
    //     'DBCollat' => getenv('database.default.DBCollat'),
    //     'swapPre'  => '',
    //     'encrypt'  => false,
    //     'compress' => false,
    //     'strictOn' => getenv('database.default.strictOn'),
    //     'failover' => [],
    //     'port'     => getenv('database.default.port'),
    // ];

    /**
     * This database connection is used when
     * running PHPUnit database tests.
     */
    public array $tests = [
        'DSN'         => '',
        'hostname'    => '127.0.0.1',
        'username'    => '',
        'password'    => '',
        'database'    => ':memory:',
        'DBDriver'    => 'SQLite3',
        'DBPrefix'    => 'db_',  // Needed to ensure we're working correctly with prefixes live. DO NOT REMOVE FOR CI DEVS
        'pConnect'    => false,
        'DBDebug'     => true,
        'charset'     => 'utf8',
        'DBCollat'    => 'utf8_general_ci',
        'swapPre'     => '',
        'encrypt'     => false,
        'compress'    => false,
        'strictOn'    => false,
        'failover'    => [],
        'port'        => 3306,
        'foreignKeys' => true,
        'busyTimeout' => 1000,
    ];

    public function __construct()
    {
        parent::__construct();

        // Ensure that we always set the database group to 'tests' if
        // we are currently running an automated test suite, so that
        // we don't overwrite live data on accident.
        if (ENVIRONMENT === 'testing') {
            $this->defaultGroup = 'tests';
        }
    }
}
