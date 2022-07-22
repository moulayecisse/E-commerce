<?php

namespace App\Entity;

use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * Notation
 */
#[ORM\Table(name: 'notation')]
#[ORM\UniqueConstraint(name: 'notation_id_uindex', columns: ['id'])]
#[ORM\Index(name: 'notation_product_id_fk', columns: ['product_id'])]
#[ORM\Index(name: 'notation_orders_id_fk', columns: ['user_id'])]
#[ORM\Entity]
#[ApiResource]
class Notation
{
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private ?int $id = null;
    #[ORM\Column(name: 'notation_date', type: Types::DATETIME_MUTABLE, nullable: true)]
    private string|DateTimeInterface|null $notationDate = null;
    #[ORM\Column(name: 'commentary', type: 'text', length: 65535, nullable: true)]
    private ?string $commentary = null;
    #[ORM\Column(name: 'suggestions', type: 'text', length: 65535, nullable: true)]
    private ?string $suggestions = null;
    #[ORM\Column(name: 'ranking_stars', type: 'integer', nullable: true)]
    private ?int $rankingStars = null;
    #[ORM\ManyToOne(targetEntity: 'Orders')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id')]
    private ?\App\Entity\Orders $user = null;
    #[ORM\ManyToOne(targetEntity: 'Product')]
    #[ORM\JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private ?\App\Entity\Product $product = null;
    
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getNotationDate(): ?\DateTimeInterface
    {
        return $this->notationDate;
    }
    public function setNotationDate(?\DateTimeInterface $notationDate): self
    {
        $this->notationDate = $notationDate;

        return $this;
    }
    public function getCommentary(): ?string
    {
        return $this->commentary;
    }
    public function setCommentary(?string $commentary): self
    {
        $this->commentary = $commentary;

        return $this;
    }
    public function getSuggestions(): ?string
    {
        return $this->suggestions;
    }
    public function setSuggestions(?string $suggestions): self
    {
        $this->suggestions = $suggestions;

        return $this;
    }
    public function getRankingStars(): ?int
    {
        return $this->rankingStars;
    }
    public function setRankingStars(?int $rankingStars): self
    {
        $this->rankingStars = $rankingStars;

        return $this;
    }
    public function getUser(): ?Orders
    {
        return $this->user;
    }
    public function setUser(?Orders $user): self
    {
        $this->user = $user;

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
}
