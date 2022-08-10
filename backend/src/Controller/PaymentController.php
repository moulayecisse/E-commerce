<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Stripe\Stripe;
use \Stripe\Checkout\Session;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PaymentController extends AbstractController
{
    public function getProducts(Request $request): array
    {
        if ($request->isXmlHttpRequest()) {
            $lol = $request->getContent();
            $cerealekillers = serialize($lol);
            $products = (json_decode(unserialize($cerealekillers), true));
            return $products;
        }
    }
    #[Route('/api/stripe/create-checkout-session', name: 'app_payment')]
    public function checkout($stripeSK, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $cartItems = $data['cartItems'];
        $fp = fopen('data.txt', 'w');
        fwrite($fp, json_encode($data['cartItems']));
        if (!$cartItems) {
            return new JsonResponse(['error' => 'error']);
        }
        Stripe::setApiKey($stripeSK, $request);
        $session = Session::create([
            'line_items' => [
                array_map(fn (array $cartItem) => [
                    'quantity' => 1,
                    'price_data' => [
                        'currency' => 'EUR',
                        'product_data' => [
                            'name' => $cartItem['name']
                        ],
                        'unit_amount' => $cartItem['price']
                    ]
                ], $cartItems)
            ],
            'mode' => 'payment',
            'success_url' => 'http://localhost:8000/',
            'cancel_url' => 'http://localhost:8000/',
            'billing_address_collection' => 'required',
            'shipping_address_collection' => [
                'allowed_countries' => ['FR']
            ],
        ]);
        return new JsonResponse(['url' => $session->url]);
    }
}
