<?php

namespace App\Controller;

use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaymentController extends AbstractController
{

    #[Route('/api/stripe/create-checkout-session', name: 'app_payment')]
    public function checkout($stripeSK, Request $request): Response
    {

        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        if (!$data) {
            return new JsonResponse(['error' => 'not data'], Response::HTTP_BAD_REQUEST);
        }
        $cartItems = $data['cartItems'];
        Stripe::setApiKey($stripeSK);
        $session = Session::create([
            'line_items' => [
                array_map(fn(array $cartItem) => [
                    'quantity' => $cartItem['cartQuantity'],
                    'price_data' => [
                        'currency' => 'EUR',
                        'product_data' => [
                            'name' => $cartItem['name'],
                            'images' => ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'],
                        ],
                        'unit_amount' => $cartItem['price'] * 100,
                    ]
                ], $cartItems)
            ],
            'mode' => 'payment',
            'success_url' => 'http://localhost:3000/#/success',
            'cancel_url' => 'http://localhost:3000/#/product/cart',
            'billing_address_collection' => 'required',
            'shipping_address_collection' => [
                'allowed_countries' => ['FR']
            ],
        ]);

        return new JsonResponse(['url' => $session->url]);

    }
}
