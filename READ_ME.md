```sh
#!/bin/bash 
cd e_commerce && 
mv .env.example .env &&

mysql -u$USER -p$PASS < e_commerce.sql && 

composer update && composer install &&

# !!! Il faut peut-être modifier le fichier suivant pour effectuer correctement une des étapes de l'installation
## vendor_symfony_doctrine-bridge_PropertyInfo_DoctrineExtractor.php doit remplacer :
## /vendor/symfony/doctrine-bridge/bridge/PropertyInfo/DoctrineExtractor.php
# (https://github.com/symfony/maker-bundle/issues/998)

symfony server:start && 

# Créer un utilisateur
curl --location --request POST 'https://127.0.0.1:8000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email_de_test@gmail.com",
    "password": "password"
}'

&&
# Récupérer un token

curl --location --request POST 'https://127.0.0.1:8000/api/login_check' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "email_de_test@gmail.com",
    "password": "password"
}'

# Créer une ressource

curl --location --request POST 'https://127.0.0.1:8000/api/demos' \
--header 'Authorization: Bearer {TOKEN_HERE}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "number": 796,
  "name": "texte par defaut",
  "description": "texte par defaut"
}'
```