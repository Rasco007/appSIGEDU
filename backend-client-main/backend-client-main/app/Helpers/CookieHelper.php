<?php

namespace App\Helpers;

class CookieHelper
{

    public static function setCookie($name, $value, $expire)
    {
        helper('cookie');
        $cookie = [
            'name' => $name,
            'value' => $value,
            'expire' => $expire,
            'domain' => getenv('cookie.domain'),
            'path' => getenv('cookie.path'),
            'secure' => (getenv('cookie.secure') == 'false') ? false : true,
            'httponly' => (getenv('cookie.httponly') == 'false') ? false : true,
            'samesite' => getenv('cookie.samesite')
        ];
        set_cookie($cookie);
        return $cookie;
    }
}
