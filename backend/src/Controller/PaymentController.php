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
    #[Route('/api/stripe/create-checkout-session', name: 'app_payment')]
    public function checkout($stripeSK, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return new JsonResponse(['error' => 'not data'], 400);
        }
        $cartItems = $data['cartItems'];
        Stripe::setApiKey("sk_test_51HkPZdCc8KoQEaMIodCH66kPI9mFdk8OgmP8hzJBHjqKnKthr828wbmUCXWWzeSX4kH9JerKiMHlkPmAM84XEBTw00iPzzRsK7", $request);
        $session = Session::create([
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 0,
                            'currency' => 'eur',
                        ],
                        'display_name' => 'Free shipping',
                        // Delivers between 5-7 business days
                        'delivery_estimate' => [
                            'minimum' => [
                                'unit' => 'business_day',
                                'value' => 5,
                            ],
                            'maximum' => [
                                'unit' => 'business_day',
                                'value' => 7,
                            ],
                        ]
                    ]
                ],
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 1500,
                            'currency' => 'eur',
                        ],
                        'display_name' => 'Next day air',
                        // Delivers in exactly 1 business day
                        'delivery_estimate' => [
                            'minimum' => [
                                'unit' => 'business_day',
                                'value' => 1,
                            ],
                            'maximum' => [
                                'unit' => 'business_day',
                                'value' => 1,
                            ],
                        ]
                    ]
                ],
            ],
            'line_items' => [
                array_map(fn (array $cartItem) => [
                    'quantity' => $cartItem['cartQuantity'],
                    'price_data' => [
                        'currency' => 'EUR',
                        'product_data' => [
                            'name' => $cartItem['name'],
                            'images' => ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"],
                        ],
                        'unit_amount' => $cartItem['price'] * 100,
                    ]
                ], $cartItems)
            ],
            'mode' => 'payment',
            'success_url' => 'http://localhost:3000/success',
            'cancel_url' => 'http://localhost:3000/cancel',
            'billing_address_collection' => 'required',
            'shipping_address_collection' => [
                'allowed_countries' => ['FR']
            ],
        ]);
        return new JsonResponse(['url' => $session->url]);
    }
}
