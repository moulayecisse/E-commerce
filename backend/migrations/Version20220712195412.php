<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220712195412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE orders_details ADD product_id INT NOT NULL, ADD quantity INT NOT NULL, ADD price INT NOT NULL');
        $this->addSql('ALTER TABLE orders_details ADD CONSTRAINT FK_835379F14584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('CREATE INDEX IDX_835379F14584665A ON orders_details (product_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE orders_details DROP FOREIGN KEY FK_835379F14584665A');
        $this->addSql('DROP INDEX IDX_835379F14584665A ON orders_details');
        $this->addSql('ALTER TABLE orders_details DROP product_id, DROP quantity, DROP price');
    }
}
