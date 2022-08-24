<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Controller\MeController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    collectionOperations: [
        'post',
        'get',
        'me' => [
            'method' => 'GET',
            'path' => '/me',
            'controller' => MeController::class,
            'read' => false,
            'openapi_context' => [
                'security' => ['cookieAuth' => []]
            ]
        ],
    ],

)]
#[ApiFilter(OrderFilter::class, properties: [])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection'])]
    private $id;

    #[Assert\Length(min: 3, minMessage: 'Le prénom doit faire entre 3 et 255 caractères', max: 255, maxMessage: 'Le prénom doit faire entre 3 et 255 caractères')]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['read:collection'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['read:collection'])]
    private array $roles = [];

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string')]
    private $password;

    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $firstname;

    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $lastname;

    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $address;

    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $zipcode;

    #[Groups(['read:collection'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $city;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Notation::class)]
    private Collection $notations;

    public function __construct()
    {
        $this->notations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

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
            $notation->setUserId($this);
        }

        return $this;
    }

    public function removeNotation(Notation $notation): self
    {
        if ($this->notations->removeElement($notation)) {
            // set the owning side to null (unless already changed)
            if ($notation->getUserId() === $this) {
                $notation->setUserId(null);
            }
        }

        return $this;
    }

}
