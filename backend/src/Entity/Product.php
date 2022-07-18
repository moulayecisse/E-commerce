<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
),
ApiFilter(SearchFilter::class, properties: ['id' => 'exact','categories'=>'exact', 'name' => 'partial', 'description' => 'partial']
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:collection"])]
    private $id;

    #[Groups(["read:collection"])]
    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[Groups(["read:collection"])]
    #[ORM\Column(type: 'string', length: 255)]
    private $slug;
    
    #[Groups(["read:collection"])]
    #[ORM\Column(type: 'text', nullable: true)]
    private $description;
    
    #[Groups(["read:collection"])]
    #[ORM\Column(type: 'float')]
    private $price;

    #[Groups(["read:collection"])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private $stock;
    
    #[Groups(["read:collection"])]
    #[ORM\ManyToOne(targetEntity: Categories::class)]
    private $categories;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getCategories(): ?Categories
    {
        return $this->categories;
    }

    public function setCategories(?Categories $categories): self
    {
        $this->categories = $categories;

        return $this;
    }

}
