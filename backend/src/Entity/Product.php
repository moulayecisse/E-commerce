<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    paginationClientItemsPerPage: true,
    normalizationContext: ['groups' => ['read:collection']],
),
    ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'categories.slug' => 'exact', 'name' => 'partial', 'description' => 'partial',]
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
    private $id;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $name;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $slug;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'text', nullable: true)]
    private $description;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'float', nullable: true)]
    private $price;
    #[Assert\NotBlank]
    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private $stock;
    #[Groups(['read:collection'])]
    #[ORM\ManyToOne(targetEntity: Categories::class)]
    private $categories;
    #[Groups(['read:collection'])]
    #[ORM\Column(nullable: true, options: ['default', 0])]
    private ?int $click = null;

    #[ORM\OneToMany(mappedBy: 'product_id', targetEntity: Notation::class)]
    private Collection $notations;

    public function __construct()
    {
        $this->notations = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Notation>
     */
    public function getNotations(): Collection
    {
        return $this->notations;
    }

    public function addNotation(Notation $notation): self
    {
        if (!$this->notations->contains($notation)) {
            $this->notations->add($notation);
            $notation->setProductId($this);
        }

        return $this;
    }

    public function removeNotation(Notation $notation): self
    {
        if ($this->notations->removeElement($notation)) {
            // set the owning side to null (unless already changed)
            if ($notation->getProductId() === $this) {
                $notation->setProductId(null);
            }
        }

        return $this;
    }

}
