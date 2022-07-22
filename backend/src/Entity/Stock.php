<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Stock
 */
#[ORM\Table(name: 'stock')]
#[ORM\UniqueConstraint(name: 'stock_id_uindex', columns: ['id'])]
#[ORM\Entity]
class Stock
{
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private int $id;
    #[ORM\Column(name: 'product_id', type: 'integer', nullable: true)]
    private ?int $productId = null;
    #[ORM\Column(name: 'last_order', type: 'datetime', nullable: true)]
    private ?\DateTime $lastOrder = null;
    #[ORM\Column(name: 'suppliers', type: 'integer', nullable: true)]
    private ?int $suppliers = null;
    #[ORM\Column(name: 'stock_count', type: 'integer', nullable: true, options: ['unsigned' => true])]
    private ?int $stockCount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductId(): ?int
    {
        return $this->productId;
    }

    public function setProductId(?int $productId): self
    {
        $this->productId = $productId;

        return $this;
    }

    public function getLastOrder(): ?\DateTimeInterface
    {
        return $this->lastOrder;
    }

    public function setLastOrder(?\DateTimeInterface $lastOrder): self
    {
        $this->lastOrder = $lastOrder;

        return $this;
    }

    public function getSuppliers(): ?int
    {
        return $this->suppliers;
    }

    public function setSuppliers(?int $suppliers): self
    {
        $this->suppliers = $suppliers;

        return $this;
    }

    public function getStockCount(): ?int
    {
        return $this->stockCount;
    }

    public function setStockCount(?int $stockCount): self
    {
        $this->stockCount = $stockCount;

        return $this;
    }
}
