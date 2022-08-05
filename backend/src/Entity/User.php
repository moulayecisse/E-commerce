<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\DBAL\Types\Types;
use Doctrine\Common\Collections\Collection;

/**
 * User
 */
#[ORM\UniqueConstraint(name: 'UNIQ_8D93D649E7927C74', columns: ['email'])]

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[Assert\Length(min: 3, max: 255, minMessage: 'Le prénom doit faire entre 3 et 255 caractères', maxMessage: 'Le prénom doit faire entre 3 et 255 caractères')]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string')]
    private string $password;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $firstname = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $lastname = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]

    private ?string $address = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $zipcode = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $city = null;
    #[ORM\Column(name: 'contact_id', type: 'integer', nullable: true)]
    private ?int $contactId = null;
    #[ORM\Column(name: 'title', type: 'string', length: 8, nullable: true)]
    private ?string $title = null;
    #[ORM\Column(name: 'suffix', type: 'string', length: 50, nullable: true)]
    private ?string $suffix = null;
    #[ORM\Column(name: 'password_hash', type: 'string', length: 255, nullable: true)]
    private ?string $passwordHash = null;
    #[ORM\Column(name: 'password_salt', type: 'string', length: 10, nullable: true)]
    private ?string $passwordSalt = null;
    #[ORM\Column(name: 'additional_contact_info', type: 'text', length: 16_777_215, nullable: true)]
    private ?string $additionalContactInfo = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $modifiedDate = null;

    #[ORM\OneToMany(targetEntity: Cart::class, mappedBy: 'user')]
    private $carts;

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
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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
    public function setRoles(string $roles): self
    {
        $this->roles = $roles;

        return $this;
    }
    public function getPassword(): ?string
    {
        return $this->password;
    }
    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
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
    public function getContactId(): ?int
    {
        return $this->contactId;
    }
    public function setContactId(?int $contactId): self
    {
        $this->contactId = $contactId;

        return $this;
    }
    public function getTitle(): ?string
    {
        return $this->title;
    }
    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }
    public function getSuffix(): ?string
    {
        return $this->suffix;
    }
    public function setSuffix(?string $suffix): self
    {
        $this->suffix = $suffix;

        return $this;
    }
    public function getPasswordHash(): ?string
    {
        return $this->passwordHash;
    }
    public function setPasswordHash(?string $passwordHash): self
    {
        $this->passwordHash = $passwordHash;

        return $this;
    }
    public function getPasswordSalt(): ?string
    {
        return $this->passwordSalt;
    }
    public function setPasswordSalt(?string $passwordSalt): self
    {
        $this->passwordSalt = $passwordSalt;

        return $this;
    }
    public function getAdditionalContactInfo(): ?string
    {
        return $this->additionalContactInfo;
    }
    public function setAdditionalContactInfo(?string $additionalContactInfo): self
    {
        $this->additionalContactInfo = $additionalContactInfo;

        return $this;
    }

    public function getModifiedDate(): ?\DateTimeInterface
    {
        return $this->modifiedDate;
    }

    public function setModifiedDate(\DateTimeInterface $modifiedDate): self
    {
        $this->modifiedDate = $modifiedDate;

        return $this;
    }
    /**
     * @return Collection|Cart[]
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }
    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts[] = $cart;
            $cart->setUser($this);
        }

        return $this;
    }
    public function removeCart(Cart $cart): self
    {
        if ($this->carts->removeElement($cart)) {
            // set the owning side to null (unless already changed)
            if ($cart->getUser() === $this) {
                $cart->setUser(null);
            }
        }

        return $this;
    }
}
