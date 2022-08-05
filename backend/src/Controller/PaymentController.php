<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Stripe\Stripe;

class PaymentController extends AbstractController
{
    #[Route('/payment', name: 'app_payment')]
    public function index(): Response
    {
        return $this->render(
            'payment/index.html.twig', [
            'controller_name' => 'PaymentController',
            ]
        );
    }


    #[Route('/checkout', name: 'app_payment')]
    public function checkout($stripeSK): \Symfony\Component\HttpFoundation\Response
    {
        Stripe::setApiKey($stripeSK);

        $session = \Stripe\Checkout\Session::create(
            [
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'T-shirt',
                    ],
                    'unit_amount' => 2000,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => 'https://localhost:3000/success',
            'cancel_url' => 'https://localhost:3000/cart',
            ]
        );


        return $this->redirect($session->url, \Symfony\Component\HttpFoundation\Response::HTTP_SEE_OTHER);
    }
}
