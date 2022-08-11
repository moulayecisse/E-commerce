<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\CartRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Nowakowskir\JWT\TokenEncoded;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PersistCartController extends AbstractController
{
    public function __construct(RequestStack $requestStack, CartRepository $cartRepository, UserRepository $userRepository)
    {
        $this->requestStack = $requestStack;
        $this->cartRepository = $cartRepository;
        $this->userRepository = $userRepository;
    }

    #[Route('/persist_cart', name: 'persist_cart', methods: ['POST'])]
    public function persistCart(Request $request, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        if (!$data) {
            return new JsonResponse(['error' => 'not data'], Response::HTTP_BAD_REQUEST);
        }
        $user_token = $data['user']['token'];
        // dd($user_token);
        $cart_token = json_encode($data['cartItems']);
        $tokenEncoded = new TokenEncoded($user_token);
        $payload = $tokenEncoded->decode()->getPayload();
        $username = ($payload['username']);
        $userRepository = $this->userRepository->findOneBy(['email' => $username]);
        $cartRepository = $this->cartRepository;
        // dd($cartRepository);
        // dd($username, $cart_token);
        $test = $cartRepository->persistCart($username, $cart_token);
        if ($test) {
            return new JsonResponse(['success' => 'Cart persisted'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['error' => 'Neheh'], Response::HTTP_I_AM_A_TEAPOT);
        }
    }
}
