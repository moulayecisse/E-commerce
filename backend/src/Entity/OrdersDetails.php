<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OrdersDetailsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * OrdersDetails
 */
#[ORM\Table(name: 'orders_details')]
#[ORM\UniqueConstraint(name: 'UNIQ_835379F1CFFE9AD6', columns: ['orders_id'])]
#[ORM\Index(name: 'IDX_835379F14584665A', columns: ['product_id'])]
#[ORM\Entity(repositoryClass: OrdersDetailsRepository::class)]
#[ApiResource]
class OrdersDetails
{
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private int $id;
    #[ORM\Column(name: 'quantity', type: 'integer', nullable: false)]
    private int $quantity;
    #[ORM\Column(name: 'price', type: 'integer', nullable: false)]
    private int $price;
    #[ORM\ManyToOne(targetEntity: 'Product')]
    #[ORM\JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;
    #[ORM\ManyToOne(targetEntity: 'Orders')]
    #[ORM\JoinColumn(name: 'orders_id', referencedColumnName: 'id')]
    private Orders $orders;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getOrders(): ?Orders
    {
        return $this->orders;
    }

    public function setOrders(?Orders $orders): self
    {
        $this->orders = $orders;

        return $this;
    }
}
