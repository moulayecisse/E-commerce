<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Notation
 */
#[ORM\Table(name: 'notation')]
#[ORM\Index(name: 'notation_product_id_fk', columns: ['product_id'])]
#[ORM\Index(name: 'foreign_key_name', columns: ['user_id'])]
#[ORM\Entity]
#[ApiResource]
class Notation
{
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private int $id;
    #[ORM\Column(name: 'product_id', type: 'integer', nullable: false)]
    private int $productId;
    #[ORM\Column(name: 'notation_date', type: Types::DATETIME_MUTABLE, nullable: true)]
    private string|DateTimeInterface|null $notationDate = null;
    #[ORM\Column(name: 'commentary', type: 'text', length: 65535, nullable: true)]
    private ?string $commentary = null;
    #[ORM\Column(name: 'suggestions', type: 'text', length: 65535, nullable: true)]
    private ?string $suggestions = null;
    #[ORM\Column(name: 'ranking_stars', type: 'integer', nullable: true)]
    private ?int $rankingStars = null;
    #[ORM\ManyToOne(targetEntity: 'User')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id')]
    private User $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductId(): ?int
    {
        return $this->productId;
    }

    public function setProductId(int $productId): self
    {
        $this->productId = $productId;

        return $this;
    }

    public function getNotationDate(): ?DateTimeInterface
    {
        return $this->notationDate;
    }

    public function setNotationDate(?DateTimeInterface $notationDate): self
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
