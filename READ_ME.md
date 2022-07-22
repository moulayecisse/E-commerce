## À  LIRE !!!
__sam. 23 juillet 2022__
 Pour installer le projet : 
```sh
git fetch; # mettre à jour
```
il y a deux dossiers importants : 
- backend
- frontend

Pour backend il faut y aller puis s'assurer qu'un point env (.env) soit présent
> backend/.env

Qu'il soit rempli avec les bons paramètre en fonction de votre configuration SQL (mariadb, mysql etc).
```sh
cd backend &&
mv .env.example .env; # personnaliser ici

mysql -u$USER -p$PASS < e_commerce.sql; 
# remplacer USER et PASS par vos identifiants sql

composer update && composer install 
|| composer install && composer update;
```
On utililse LexikJWTAuthenticationBundle pour se logguer et gérer les ROLES;
Il faut faire une dernière manip pour l'utiliser : 
S'assurer que le .env contienne quelque chose de ce genre :
```
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=b5acb11672bc8309ad9453de0f04152cc
```
Puis : 
```sh
php bin/console lexik:jwt:generate-keypair --overwrite
```
Pour le front :
```sh
#!/bin/bash 
cd frontend && 
npm install && 
npm start;
# >>> Communiquer si problème <<< !!!!
```


<!-- https://papaly.com/ -->

