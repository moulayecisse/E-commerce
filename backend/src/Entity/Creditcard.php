<?php

namespace App\Entity;

use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * Creditcard
 */
#[ORM\Table(name: 'creditcard')]
#[ORM\Entity]
class Creditcard
{
    #[ORM\Column(name: 'CreditCardID', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private ?int $creditcardid = null;
    #[ORM\Column(name: 'CardType', type: 'string', length: 50, nullable: true)]
    private ?string $cardtype = null;
    #[ORM\Column(name: 'CardNumber', type: 'string', length: 25, nullable: true)]
    private ?string $cardnumber = null;
    #[ORM\Column(name: 'ExpMonth', type: 'boolean', nullable: true)]
    private ?bool $expmonth = null;
    #[ORM\Column(name: 'ExpYear', type: 'smallint', nullable: true)]
    private ?int $expyear = null;
    #[ORM\Column(name: 'ModifiedDate', type: 'datetime', nullable: true, options: ['default' => 'CURRENT_TIMESTAMP'])]
    private string|DateTime|null $modifieddate = 'CURRENT_TIMESTAMP';

    public function getCreditcardid(): ?int
    {
        return $this->creditcardid;
    }

    public function getCardtype(): ?string
    {
        return $this->cardtype;
    }

    public function setCardtype(?string $cardtype): self
    {
        $this->cardtype = $cardtype;

        return $this;
    }

    public function getCardnumber(): ?string
    {
        return $this->cardnumber;
    }

    public function setCardnumber(?string $cardnumber): self
    {
        $this->cardnumber = $cardnumber;

        return $this;
    }

    public function isExpmonth(): ?bool
    {
        return $this->expmonth;
    }

    public function setExpmonth(?bool $expmonth): self
    {
        $this->expmonth = $expmonth;

        return $this;
    }

    public function getExpyear(): ?int
    {
        return $this->expyear;
    }

    public function setExpyear(?int $expyear): self
    {
        $this->expyear = $expyear;

        return $this;
    }

    public function getModifieddate(): ?DateTimeInterface
    {
        return $this->modifieddate;
    }

    public function setModifieddate(?DateTimeInterface $modifieddate): self
    {
        $this->modifieddate = $modifieddate;

        return $this;
    }
}
