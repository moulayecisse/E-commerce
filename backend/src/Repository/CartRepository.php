<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Cart;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method Cart|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cart|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cart[]    findAll()
 * @method Cart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CartRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cart::class);
    }

    public function persistCart($email = 'gildas.le-drogoff@epitech.eu', $cart_list = '{CartList: ""}')
    {
        $entityManager = $this->getEntityManager();
        $dql = 'SELECT u.id FROM App\Entity\User u WHERE u.email = :email';
        $query = $entityManager->createQuery($dql);
        $query->setParameter('email', $email);
        $data = $query->getResult();
        $user_id = ($data[0]['id']);
        $date = new DateTime();
        $date = $date->format('Y-m-d H:i:s');
        $queryBuilder = $entityManager->createQueryBuilder();
        $query = $queryBuilder->update(Cart::class, 'c')
            ->set('c.cartList', ':cartList')
            ->set('c.dateAddedToCart', ':dateAddedToCart')
            ->where('c.user = :user')
            ->setParameter('user', $user_id)
            ->setParameter('dateAddedToCart', $date)
            ->setParameter('cartList', $cart_list)
            ->getQuery();
        $result = $query->execute();
        if ($result !== null && $result !== false) {
            return new JsonResponse(['message' => 'success'], Response::HTTP_OK);
        }

        return new JsonResponse(['message' => 'error'], Response::HTTP_I_AM_A_TEAPOT);
        // return JsonResponse::fromJsonString($result);
        // dd($result);
        // return $this->createQueryBuilder('c')
        //     ->innerJoin(User::class, 'u', 'with', 'c.user_id = u.id')
        //     // ->andWhere('c.exampleField = :val')
        //     // ->setParameter('val', $value)
        //     // ->orderBy('c.id', 'ASC')
        //     // ->setMaxResults(10)
        //     ->getQuery()
        //     ->getResult();
    }
    /*
    public function findOneBySomeField($value): ?Cart
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
       console.warn(e)
   }
    */
}
