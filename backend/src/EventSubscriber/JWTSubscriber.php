<?php
declare(strict_types=1);

namespace App\EventSubscriber;

use DateTime;
use JetBrains\PhpStorm\ArrayShape;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class JWTSubscriber implements EventSubscriberInterface
{
    public const REFRESH_TIME = 1800;
    private $payload;
    private $user;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[ArrayShape([Events::AUTHENTICATION_SUCCESS => "string", Events::JWT_AUTHENTICATED => "string", KernelEvents::RESPONSE => "string"])] public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess',
            Events::JWT_AUTHENTICATED => 'onAuthenticatedAccess',
            KernelEvents::RESPONSE => 'onAuthenticatedResponse'
        ];
    }

    public function onAuthenticatedResponse(ResponseEvent $event): void
    {
        if ($this->payload && $this->user) {
            $expireTime = $this->payload['exp'] - time();
            if ($expireTime < static::REFRESH_TIME) {
                // Refresh token
                $jwt = $this->jwtManager->create($this->user);
                $response = $event->getResponse();
                // Set cookie
                $this->createCookie($response, $jwt);
            }
        }
    }

    protected function createCookie(Response $response, $jwt): void
    {
        $response->headers->setCookie(
            new Cookie(
                'BEARER',
                $jwt,
                new DateTime('+1 day'),
                '/',
                null,
                false,
                true,
                false,
                'strict'
            )
        );
    }

    public function onAuthenticatedAccess(JWTAuthenticatedEvent $event): void
    {
        $this->payload = $event->getPayload();
        $this->user = $event->getToken()->getUser();
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $eventData = $event->getData();
        if (isset($eventData['token'])) {
            $response = $event->getResponse();
            $jwt = $eventData['token'];
            // Set cookie
            $this->createCookie($response, $jwt);
        }
    }
}
