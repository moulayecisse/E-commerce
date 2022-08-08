<?php
declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    normalizationContext: ['groups' => ['read:collection']],
    paginationClientItemsPerPage: true,
),
    ApiFilter(
        SearchFilter::class, properties: ['id' => 'exact', 'categories.slug' => 'exact', 'name' => 'partial', 'description' => 'partial',]
    )]
#[ApiFilter(OrderFilter::class, properties: [])]
class Product
{
    #[Groups(['read:collection'])]
    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'https://schema.org/image')]
    public ?MediaObject $image = null;
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection'])]
    private ?int $id = null;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $name = null;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255)]
    private ?string $slug = null;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $price = null;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $stock = null;
    #[Groups(['read:collection'])]
    #[ORM\ManyToOne(targetEntity: Categories::class)]
    private ?Categories $categories = null;
    #[Groups(['read:collection'])]
    #[ORM\Column(options: ['default', 0])]
    private ?int $click = null;

    #[ORM\Column(nullable: true)]
    private ?float $weight = null;

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

    public function getClick(): ?int
    {
        return $this->click;
    }

    public function setClick(int $click): self
    {
        $this->click = $click;

        return $this;
    }

    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    public function setImage(?MediaObject $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

}
