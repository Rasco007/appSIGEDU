<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

use Config\Services;
use CodeIgniter\HTTP\Request;
use CodeIgniter\HTTP\Response;

class CorsFilter implements FilterInterface
{
    protected $options;

    public function __construct()
    {
        $this->options = [
            'allowedHeaders'         => [getenv('CORS_ALLOWEDHEADERS')],
            'allowedMethods'         => ['*'],
            'allowedOrigins'         => [getenv('CORS_ALLOWEDORIGINS')],
            'allowedOriginsPatterns' => [],
            'exposedHeaders'         => ['accessToken'],
            'maxAge'                 => 0,
            'supportsCredentials'    => getenv('CORS_SUPPORTSCREDENTIALS') == 'true' ? true : false,
        ];
    }

    public function before(RequestInterface $request, $arguments = null)
    {
        if ($this->isPreflightRequest($request)) {
            $response = $this->handlePreflightRequest($request);
            $this->varyHeader($response, 'Access-Control-Request-Method');
            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        if (! $response->hasHeader('Access-Control-Allow-Origin')) {
            return $this->addActualRequestHeaders($response, $request);
        }
    }

//######################################################################################################################

    public function sendResponse ($message, $code, $contentType = 'application/json'){
        $response = Services::response();
        $request = Services::request();

        $response
            ->setJSON($message)
            ->setContentType($contentType)
            ->setStatusCode($code);

        return $this->after($request, $response);
    }

    protected function isPreflightRequest(Request $request):bool{
        return $request->getMethod() === 'options' && $request->hasHeader('Access-Control-Request-Method');
    }

    protected function handlePreflightRequest(Request $request)
    {
        $response = service('response');
        $response->setStatusCode(204);
        return $this->handleRequest($response, $request);
    }

    protected function varyHeader(Response $response, $header)
    {
        if (! $response->hasHeader('Vary')) {
            $response->setHeader('Vary', $header);
        } elseif (! in_array($header, explode(', ', $response->getHeaderLine('Vary')))) {
            $response->setHeader('Vary', $response->getHeaderLine('Vary') . ', ' . $header);
        }

        return $response;
    }

    protected function handleRequest(Response $response, Request $request)
    {
        $this->configureAllowedOrigin($response, $request);

        if ($response->hasHeader('Access-Control-Allow-Origin')) {
            $this->configureAllowCredentials($response);

            $this->configureAllowedMethods($response, $request);

            $this->configureAllowedHeaders($response, $request);

            $this->configureMaxAge($response);
        }

        return $response;
    }

    protected function configureAllowedOrigin(Response $response, Request $request)
    {
        if ($this->options['allowedOrigins'] === true && ! $this->options['supportsCredentials']) {
            // Safe+cacheable, allow everything
            $response->setHeader('Access-Control-Allow-Origin', '*');
        } elseif ($this->isSingleOriginAllowed()) {
            // Single origins can be safely set
            $response->setHeader('Access-Control-Allow-Origin', array_values($this->options['allowedOrigins'])[0]);
        } else {
            // For dynamic headers, check the origin first
            if ($this->isOriginAllowed($request)) {
                $response->setHeader('Access-Control-Allow-Origin', $request->getHeaderLine('Origin'));
            }

            $this->varyHeader($response, 'Origin');
        }
    }

    protected function isSingleOriginAllowed():bool{
        if ($this->options['allowedOrigins'] === true || ! empty($this->options['allowedOriginsPatterns'])) {
            return false;
        }

        return count($this->options['allowedOrigins']) === 1;
    }

    protected function isOriginAllowed(Request $request):bool{
        if ($this->options['allowedOrigins'] === true) {
            return true;
        }

        if (! $request->hasHeader('Origin')) {
            return false;
        }

        $origin = $request->getHeaderLine('Origin');

        if (in_array($origin, $this->options['allowedOrigins'])) {
            return true;
        }

        foreach ($this->options['allowedOriginsPatterns'] as $pattern) {
            if (preg_match($pattern, $origin)) {
                return true;
            }
        }

        return false;
    }

    protected function configureAllowCredentials(Response $response)
    {
        if ($this->options['supportsCredentials']) {
            $response->setHeader('Access-Control-Allow-Credentials', 'true');
        }
    }

    protected function configureAllowedMethods(Response $response, Request $request)
    {
        if ($this->options['allowedMethods'] === true) {
            $allowMethods = strtoupper($request->getHeaderLine('Access-Control-Request-Method'));
            $this->varyHeader($response, 'Access-Control-Request-Method');
        } else {
            $allowMethods = implode(', ', $this->options['allowedMethods']);
        }

        $response->setHeader('Access-Control-Allow-Methods', $allowMethods);
    }

    protected function configureAllowedHeaders(Response $response, Request $request)
    {
        if ($this->options['allowedHeaders'] === true) {
            $allowHeaders = $request->getHeaderLine('Access-Control-Request-Headers');
            $this->varyHeader($response, 'Access-Control-Request-Headers');
        } else {
            $allowHeaders = implode(', ', $this->options['allowedHeaders']);
        }

        $response->setHeader('Access-Control-Allow-Headers', $allowHeaders);
    }

    protected function configureMaxAge(Response $response)
    {
        if ($this->options['maxAge'] !== null) {
            $response->setHeader('Access-Control-Max-Age', (string) $this->options['maxAge']);
        }
    }

    protected function configureExposedHeaders(Response $response)
    {
        if ($this->options['exposedHeaders']) {
            $response->setHeader('Access-Control-Expose-Headers', implode(', ', $this->options['exposedHeaders']));
        }
    }

    protected function addActualRequestHeaders(Response $response, Request $request)
    {
        $this->configureAllowedOrigin($response, $request);

        if ($response->hasHeader('Access-Control-Allow-Origin')) {
            $this->configureAllowCredentials($response);

            $this->configureExposedHeaders($response);
        }

        return $response;
    }
}