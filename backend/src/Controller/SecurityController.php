<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $user = $this->getUser();
        return $this->json(
            [
                'email' => $user->getUserIdentifier(),
                'roles' => $user->getRoles(),
            ]
        );
    }
}
