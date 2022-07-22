<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Suppliers
 */
#[ORM\Table(name: 'suppliers')]
#[ORM\UniqueConstraint(name: 'suppliers_id_uindex', columns: ['id'])]
#[ORM\Entity]
class Suppliers
{
    #[ORM\Column(name: 'name', type: 'text', length: 65535, nullable: true)]
    private ?string $name = null;
    #[ORM\Column(name: 'adresse', type: 'text', length: 65535, nullable: true)]
    private ?string $adresse = null;
    #[ORM\Column(name: 'phone_number', type: 'text', length: 65535, nullable: true)]
    private ?string $phoneNumber = null;
    #[ORM\Column(name: 'invoices', type: 'integer', nullable: true, options: ['unsigned' => true])]
    private ?int $invoices = null;
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'NONE')]
    #[ORM\OneToOne(targetEntity: 'Stock')]
    #[ORM\JoinColumn(name: 'id', referencedColumnName: 'id')]
    private ?\App\Entity\Stock $id = null;
    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }
    public function getAdresse(): ?string
    {
        return $this->adresse;
    }
    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }
    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }
    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }
    public function getInvoices(): ?int
    {
        return $this->invoices;
    }
    public function setInvoices(?int $invoices): self
    {
        $this->invoices = $invoices;

        return $this;
    }
    public function getId(): ?Stock
    {
        return $this->id;
    }
    public function setId(?Stock $id): self
    {
        $this->id = $id;

        return $this;
    }
}
