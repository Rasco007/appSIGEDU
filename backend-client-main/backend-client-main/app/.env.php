<?php

define('DB_HOSTNAME_DEFAULT', getenv('database.default.hostname'));
define('DB_DATABASE_DEFAULT', getenv('database.default.database'));
define('DB_USERNAME_DEFAULT', getenv('database.default.username'));
define('DB_PASSWORD_DEFAULT', getenv('database.default.password'));
define('DB_DRIVER_DEFAULT', getenv('database.default.DBDriver'));
define('DB_PORT_DEFAULT', getenv('database.default.port'));
define('DB_PCONNECT_DEFAULT', getenv('database.default.pConnect'));

define('DB_DSN_ORACLE', getenv('database.oracle.DSN'));
define('DB_HOSTNAME_ORACLE', getenv('database.oracle.hostname'));
define('DB_DATABASE_ORACLE', getenv('database.oracle.database'));
define('DB_USERNAME_ORACLE', getenv('database.oracle.username'));
define('DB_PASSWORD_ORACLE', getenv('database.oracle.password'));
define('DB_DRIVER_ORACLE', getenv('database.oracle.DBDriver'));
define('DB_DBDEBUG_ORACLE', getenv('database.oracle.DBDebug'));
define('DB_PORT_ORACLE', getenv('database.oracle.port'));
