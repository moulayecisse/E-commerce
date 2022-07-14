<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoriesRepository;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * Categories
 */
#[ORM\Table(name: 'categories')]
#[ORM\UniqueConstraint(name: 'categories_id_uindex', columns: ['id'])]
#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
#[ApiResource()]
class Categories
{
    /**
     * @var int
     */
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private $id;
    /**
     * @var string|null
     */
    #[ORM\Column(name: 'name', type: 'string', length: 255, nullable: true)]
    private $name;
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
