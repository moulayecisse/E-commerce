<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NotationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotationRepository::class)]
#[ApiResource]
class Notation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    private ?Product $product_id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $notation_date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $commentary = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $suggestions = null;

    #[ORM\Column(nullable: true)]
    private ?int $ranking_stars = null;

    #[ORM\ManyToOne(inversedBy: 'notations')]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductId(): ?Product
    {
        return $this->product_id;
    }

    public function setProductId(?Product $product_id): self
    {
        $this->product_id = $product_id;

        return $this;
    }

    public function getNotationDate(): ?\DateTimeInterface
    {
        return $this->notation_date;
    }

    public function setNotationDate(\DateTimeInterface $notation_date): self
    {
        $this->notation_date = $notation_date;

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
        return $this->ranking_stars;
    }

    public function setRankingStars(?int $ranking_stars): self
    {
        $this->ranking_stars = $ranking_stars;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }
}
