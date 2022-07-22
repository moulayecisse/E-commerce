<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Cart
 */
#[ORM\Table(name: 'cart')]
#[ORM\UniqueConstraint(name: 'cart_id_uindex', columns: ['id'])]
#[ORM\Index(name: 'cart_user_id_fk', columns: ['user_id'])]
#[ORM\Entity]
class Cart
{
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private ?int $id = null;
    #[ORM\Column(name: 'cart_list', type: 'text', length: 0, nullable: true)]
    private ?string $cartList = null;
    #[ORM\Column(name: 'date_added_to_cart', type: 'datetime', nullable: true, options: ['default' => 'CURRENT_TIMESTAMP'])]
    private string|\DateTime|null $dateAddedToCart = 'CURRENT_TIMESTAMP';
    #[ORM\ManyToOne(targetEntity: 'User')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id')]
    private ?\App\Entity\User $user = null;
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getCartList(): ?string
    {
        return $this->cartList;
    }
    public function setCartList(?string $cartList): self
    {
        $this->cartList = $cartList;

        return $this;
    }
    public function getDateAddedToCart(): ?\DateTimeInterface
    {
        return $this->dateAddedToCart;
    }
    public function setDateAddedToCart(?\DateTimeInterface $dateAddedToCart): self
    {
        $this->dateAddedToCart = $dateAddedToCart;

        return $this;
    }
    public function getUser(): ?User
    {
        return $this->user;
    }
    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
