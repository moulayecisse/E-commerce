<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ArticlesRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * Articles
 */
#[ORM\Table(name: 'articles')]
#[ORM\Index(name: 'articles_categories_id_fk', columns: ['category_id'])]
#[ORM\Entity(repositoryClass: ArticlesRepository::class)]
// #[ApiResource(formats: ['json' => ['application/json']])]

#[ApiResource(
    collectionOperations: [
        'get' => [
            // 'security' => [['bearerAuth' => []]],

        ], 'post', 'count' => [
            'method' => 'GET',
            'path' => '/articles/count',
            'openapi_context' => [
                'summary' => 'Count the number of articles',
                'description' => 'Count the number of articles',
                'responses' => [
                    '200' => [
                        'description' => 'The number of articles',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'integer',
                                    'format' => 'int32',
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            //'security' => ['is_granted("ROLE_USER")']
        ],
        'post' => [
           // 'security' => ['is_granted("ROLE_USER")']
        ]
    ],
    itemOperations: [
        'get' => [
           // 'security' => ['is_granted("ROLE_USER")']
        ],
        'put' => [
           // 'security' => ['is_granted("ROLE_USER")']
        ],
        'delete' => [
           // 'security' => ['is_granted("ROLE_USER")']
        ]
    ],
    // normalizationContext: ['groups' => ['read:Articles']],
    // denormalizationContext: ['groups' => ['write:Articles']]
)]

class Articles
{
    /**
     * @var int
     */
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private $id;
    /**
     * @var int|null
     */
    #[ORM\Column(name: 'category_id', type: 'integer', nullable: true)]
    private $categoryId;
    /**
     * @var string
     */
    #[ORM\Column(name: 'name', type: 'string', length: 255, nullable: false)]
    private $name;
    /**
     * @var string|null
     */
    #[ORM\Column(name: 'price', type: 'decimal', precision: 5, scale: 2, nullable: true, options: ['default' => '0.00'])]
    private $price = '0.00';
    /**
     * @var string|null
     */
    #[ORM\Column(name: 'features', type: 'string', length: 255, nullable: true)]
    private $features;
    /**
     * @var DateTime|null
     */
    #[ORM\Column(name: 'created_at', type: 'datetime', nullable: true)]
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategoryId(): ?int
    {
        return $this->categoryId;
    }

    public function setCategoryId(?int $categoryId): self
    {
        $this->categoryId = $categoryId;

        return $this;
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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getFeatures(): ?string
    {
        return $this->features;
    }

    public function setFeatures(?string $features): self
    {
        $this->features = $features;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
