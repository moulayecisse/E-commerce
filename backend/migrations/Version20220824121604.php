<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220824121604 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE notation (id INT AUTO_INCREMENT NOT NULL, product_id_id INT DEFAULT NULL, notation_date DATETIME NOT NULL, commentary LONGTEXT DEFAULT NULL, suggestions LONGTEXT DEFAULT NULL, ranking_stars INT DEFAULT NULL, INDEX IDX_268BC95DE18E50B (product_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notation ADD CONSTRAINT FK_268BC95DE18E50B FOREIGN KEY (product_id_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE orders CHANGE date date DATETIME NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notation DROP FOREIGN KEY FK_268BC95DE18E50B');
        $this->addSql('DROP TABLE notation');
        $this->addSql('ALTER TABLE orders CHANGE date date DATETIME DEFAULT \'2022-08-15 18:44:23\'');
        $this->addSql('ALTER TABLE `user` CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
