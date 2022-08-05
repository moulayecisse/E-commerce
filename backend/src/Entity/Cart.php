<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * Cart
 */
#[ORM\Table(name: 'cart')]
#[ORM\UniqueConstraint(name: 'cart_id_uindex', columns: ['id'])]
#[ORM\Index(name: 'cart_user_id_fk', columns: ['user_id'])]
 #[ORM\Entity(repositoryClass: CartRepository::class)]

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
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'carts')]
    #[ORM\JoinColumn(nullable: false)]  
    private ?\App\Entity\User $user = null;
    #[ORM\ManyToMany(targetEntity: Product::class)]
    private $products;
    #[ORM\Column(type: 'string', length: 30)]
    private $status;
    public function __construct()
    {
        $this->products = new ArrayCollection();
    }
    public function getId(): ?int
    {
        return $this->id;
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
    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }
    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
        }

        return $this;
    }
    public function removeProduct(Product $product): self
    {
        $this->products->removeElement($product);

        return $this;
    }
    public function getStatus(): ?string
    {
        return $this->status;
    }
    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
    public function getTotal(): int
    {
        $total = 0;
        foreach ($this->getProducts() as $product) {
            $total += $product->getPrice();
        }
        return $total;
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
}
