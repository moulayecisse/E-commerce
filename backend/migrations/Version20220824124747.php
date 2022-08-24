<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220824124747 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notation ADD user_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE notation ADD CONSTRAINT FK_268BC959D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_268BC959D86650F ON notation (user_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notation DROP FOREIGN KEY FK_268BC959D86650F');
        $this->addSql('DROP INDEX IDX_268BC959D86650F ON notation');
        $this->addSql('ALTER TABLE notation DROP user_id_id');
    }
}
