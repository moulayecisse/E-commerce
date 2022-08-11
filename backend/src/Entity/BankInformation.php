<?php

namespace App\Entity;

use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * BankInformation
 */
#[ORM\Table(name: 'bank information')]
#[ORM\Entity]
class BankInformation
{
    #[ORM\Column(name: 'bank_name', type: 'text', length: 65535, nullable: true)]
    private ?string $bankName = null;
    #[ORM\Column(name: 'iban', type: 'text', length: 65535, nullable: true)]
    private ?string $iban = null;
    #[ORM\Column(name: 'user_id', type: 'integer', nullable: true)]
    private ?int $userId = null;
    #[ORM\Column(name: 'credit_cart', type: 'text', length: 65535, nullable: true)]
    private ?string $creditCart = null;
    /**
     * @var DateTime|null
     */
    #[ORM\Column(name: 'expiration_date', type: 'datetime', nullable: true)]
    private $expirationDate;
    #[ORM\Column(name: 'key', type: 'integer', nullable: true)]
    private ?int $key = null;
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'NONE')]
    #[ORM\OneToOne(targetEntity: 'User')]
    #[ORM\JoinColumn(name: 'id', referencedColumnName: 'id')]
    private ?User $id = null;

    public function getBankName(): ?string
    {
        return $this->bankName;
    }

    public function setBankName(?string $bankName): self
    {
        $this->bankName = $bankName;

        return $this;
    }

    public function getIban(): ?string
    {
        return $this->iban;
    }

    public function setIban(?string $iban): self
    {
        $this->iban = $iban;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(?int $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    public function getCreditCart(): ?string
    {
        return $this->creditCart;
    }

    public function setCreditCart(?string $creditCart): self
    {
        $this->creditCart = $creditCart;

        return $this;
    }

    public function getExpirationDate(): ?DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(?DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getKey(): ?int
    {
        return $this->key;
    }

    public function setKey(?int $key): self
    {
        $this->key = $key;

        return $this;
    }

    public function getId(): ?User
    {
        return $this->id;
    }

    public function setId(?User $id): self
    {
        $this->id = $id;

        return $this;
    }
}
