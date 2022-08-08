<?php

namespace App\Controller;

use GuzzleHttp\Client;
use App\Entity\ShippingFees;
use App\Repository\CartRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
 

#[Route('/shipping', name: 'shipping')]
class ShippingCostController extends AbstractController
{
    public $cartRepository;
    public $requests;

    public function __construct(private ProductRepository $products)
    {
        $this->products = $products;
        $this->requests = new Request();
        $this->index();
    }
    #[Route(path: '/get', name: 'get_shipping_cost')]

    public function
    index()
    {
        $response = new Response();

        $id = $_GET['id'] ?? null;
        $location = $_GET['location'] ?? null;
        var_dump($id);
        var_dump($location);

        $product = $this->products->find($id);
        $productWeight = $product->getWeight();
        // $data = $this->products->findOneBy(['id' => $id]);
        $data = $this->products->findAll();
        // var_dump($data);
        if ($productWeight) {
            $response->setContent(json_encode([
                'distance' => ($this->calculate($productWeight)),
            ]));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        // return $this->json($data);
    }
    public function calculate($productWeight)
    {
        // $client = new Client();
        // $req = new Request(['GET', 'https://nominatim.openstreetmap.org/search/24%20Rue%20Pasteur,%2094270%20Le%20Kremlin-Bic%C3%AAtre%20france%2520?format=json&limit=1']);
        // $res = $client->sendAsync($req)->wait();
        // dd($res->getBody());
        return $this->distance(48.856614, 2.3522219, 50.8503396, 4.3517103, 'K');
    }
    function distance($lat1, $lon1, $lat2, $lon2, $unit)
    {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
        } else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == "K") {
                return ($miles * 1.609344);
            } else if ($unit == "N") {
                return ($miles * 0.8684);
            } else {
                return $miles;
            }
        }

        // var_dump($this->distance(32.9697, -96.80322, 29.46786, -98.53506, "M") . " Miles<br>");
        // var_dump($this->distance(32.9697, -96.80322, 29.46786, -98.53506, "K") . " Kilometers<br>");
        // var_dump($this->distance(32.9697, -96.80322, 29.46786, -98.53506, "N") . " Nautical Miles<br>");
    }
    public function getShippingCostForWeight()
    {
    }
}
