## US_1

1. Utilisateur : Je dois pouvoir accéder à un certain nombre d’articles avec description, photo, caractéristiques et prix sur la page d’accueil, afin de les visualiser. Le but est de commencer à organiser la DB, faire une route pour avoir les articles. Une page doit afficher tous les articles, dans des cards.

Priorité : **Essentiel**

Difficulté : 1/5

- [x]

---

1. Utilisateur : Je dois pouvoir avoir accès à la fiche détaillée de chaque article. Préparer la page de détail qui sera complétée plus tard, on doit au moins avoir une route GET / :id pour aller chercher l’article en question. On aimerait un component différent des cards de la page des articles.

Priorité : **Essentiel**

Difficulté : 1/5

- [x]

---

3. Administrateur : Je dois pouvoir ajouter, modifier et supprimer des articles, Je dois pouvoir paramétrer la fiche d’un produit en y ajoutant de grandes quantités de texte et pouvoir y ajouter des images. On veut compléter le CRUD des articles, on doit voir les articles présentés sous forme de liste, avec les actions edit/delete.

- [x]

---

4. Utilisateur et Administrateur : Je dois pouvoir créer un compte, me connecter et me déconnecter. Les comptes administrateurs doivent avoir des permissions différentes des simples utilisateurs. On doit pouvoir utiliser un formulaire pour ajouter/éditer un article

Priorité : **Essentiel**

Difficulté : 2/5

- [x]

---

## US_2

1. Utilisateur : La page d’accueil affiche les articles les plus populaires, basé sur le nombre de visites.
   On doit pouvoir voir sur la page d’accueil les articles qui ont été le plus consultés ou recherchés.

Priorité : Secondaire

Difficulté : 1/5

- [ ]

---

2. Utilisateur : Je dois pouvoir trier les articles par nom et/ou catégorie afin de les rechercher de manière avancée.
   Une barre de recherche avec plusieurs options de recherche (par nom/catégorie) et une page de résultats.

Priorité : **Essentiel**

Difficulté : 2/5

- [-]

---

3. Utilisateur : Je dois pouvoir voir facilement dans quelle catégorie et sous-catégorie je me situe (breadcrumbs)
   Un enchaînement de catégories/sous catégories qui permettent de situer le produit dans les catégories. Des liens peuvent être présents sur chaque élément des breadcrumbs pour pointer sur la page de recherche (et démarrer une recherche par catégorie).

Priorité : Facultatif Difficulté : 2/5

- [x]

---

4. Utilisateur : Je dois pouvoir voir combien d’exemplaires d’un même article il reste en vente.
   Sur la page détails d’un article, on doit voir le nombre d’articles en stock (défini dans la DB, et par l’admin dans l’user story plus bas).

Priorité : **Essentiel**

Difficulté : 0/5

- [x]

---

5. Administrateur : Je dois pouvoir gérer les catégories afin de pouvoir en ajouter et en supprimer.

- [x]

---

L’implémentation des catégories est à l’appréciation des étudiants, le CRUD dans le back admin doit correspondre à leur implémentation.

Priorité : **Essentiel**

Difficulté : 2/5

- [x]

---

6. Administrateur : Je dois gérer le statut des articles afin de renseigner s’ils sont disponibles ou en rupture de stock. L’interface doit être compréhensible par l’user non-habitué, on peut avoir un code couleur pour signifier en stock. Vous pouvez rajouter une alerte sur les produits en rupture de stock.

Priorité : **Essentiel**

Difficulté : 1/5

- [x]

---

## US_3

1. Utilisateur : Je dois pouvoir, quand j’effectue une recherche dans la barre de recherche, voir des suggestions de produits qui correspondent à ce que je viens de taper. On peut voir, dans un dropdown dynamique, les recherches liées les plus pertinentes.
   On aimerait avoir image + nom + prix.

Priorité : Secondaire

Difficulté : 4/5

- [x]

---

2. Utilisateur : Je peux mettre des articles dans un panier afin de n’acheter que ce dont je suis vraiment certain.
   Les articles doivent posséder un bouton « Ajouter au panier ».

Priorité : **Essentiel**

Difficulté : 3/5

- [x]

---

3. Utilisateur : Je peux visualiser mon panier n’importe où et connaître la liste des produits, leur quantité, leur prix et le total.
   Le panier peut être persistant ou pas, stocké dans le localstorage. Plus tard, le panier devra être stocké en DB pour être lié à l’user. On peut avoir un dropdown « panier » dans la navbar, qui montre les infos succinctes du panier, avec un lien pour accéder à la vue panier.

Priorité : **Essentiel**

Difficulté : 4/5

- [ ]

---

4. Utilisateur : Je dois pouvoir visualiser sur toutes les pages, le nombre d’article, ou la somme du prix des articles de mon panier.
   On a une icône près du/sur le panier qui montre combien d’article il comporte.

Priorité : Facultatif

Difficulté : 1/5

- [ ]

---

5. Administrateur : Je dois pouvoir gérer les stocks.
   Avec la gestion des stocks, l’admin a une option pour recommander un objet.

Priorité : Secondaire

Difficulté : 2/5

- [-]

---

## US_4

1. Utilisateur : Je dois pouvoir visualiser le prix d’un article si j’en change la couleur ou la taille.
   On peut avoir des select avec les options disponibles, changer dynamiquement le prix (et les photos/frais de port).

Priorité : Facultatif

Difficulté : 2/5

- [ ]

---

2. Utilisateur : Je dois connaître les frais de port de mon caddie, qui dépendend du poids, du pays de livraison et du mode d’expédition.
   Pour cela, l’étudiant doit implémenter une version réaliste, et devra trouver une API pour connaître les options des transporteurs.

Priorité : **Essentiel**

Difficulté : 4/5

- [ ]

---

3. Utilisateur : Je dois avoir la possibilité de commander avec et sans compte. Au moment où je commande, le site me propose de me connecter ou de payer directement.
   Introduction du compte, où on pourra stocker toutes les infos de paiement. On peut avoir une pop-up au moment de payer qui propose de se connecter/inscrire, ou de passer au paiement.

Priorité : **Essentiel**

Difficulté : 2/5

- [ ]

---

4. Administrateur : Je veux être capable de gérer les frais de port que je commercialise en fonction du pays et du mode de livraison, afin de maximiser la rentabilité de mon E-commerce.
   Cela peut se présenter sous forme de blacklist/whitelist, ou de différence de distance en fonction de celui qui commande.

Priorité : Secondaire

Difficulté : 1/5

- [ ]

---

## US_5

1. Utilisateur : Je dois pouvoir consulter les différents tarifs de livraison en fonction du mode d'expédition afin de choisir le plus adapté à mon cas.
   ( Il s’agit de pouvoir optimiser les frais de port en fonction du poids des articles. Par exemple, la possibilité de regrouper les articles dans un colis. )

Priorité : Facultatif

Difficulté : 4/5 2.

- [ ]

---

2. Utilisateur : Je dois pouvoir passer une commande, sans avoir à entrer mes identifiants bancaires ni mon adresse postale à chaque achat, afin de faciliter et fluidifier mon expérience sur la plateforme.
   ( Lier les informations entrées lors du paiement à l’utilisateur, les sauvegarder, et les auto-compléter pour les autres paiements. )

Priorité : **Essentiel**

Difficulté : 1/5

- [ ]

---

3. Utilisateur : Je dois, grâce à la référence de mes commandes, être dans la capacité de visualiser le statut de cette dernière, et visualiser les différents détails.
   ( Pour le moment, lorsqu’un utilisateur passe commande, cela doit avoir une répercussion sur le back / la DB, et notamment générer un numéro de commande. L’utilisateur doit pouvoir vérifier ses commandes. )

Priorité : **Essentiel**

Difficulté : 1/5

- [ ]

---

4. Administrateur : Je dois pouvoir définir des rabais.
   ( Chaque objet doit avoir un nouveau champs « % de réduction », éditable dans le back admin. )

Priorité : **Essentiel**

Difficulté : 1/5

- [ ]

---

5. Administrateur : Je dois savoir si un article est en promotion ou classé comme nouveauté.
   ( L’admin doit pouvoir décider de mettre en avant des articles. On doit voir le résultat en front. )

Priorité : Secondaire

Difficulté : 2/5
( Le résultat doit être visible par le client. )

- [ ]

---

## US_06

1. Utilisateur : Je peux passer des commandes pour différentes adresses. Soit on a une liste d’adresses enregistrées, soit on laisse l’utilisateur rentrer l’adresse à laquelle il veut faire livrer ses articles.

Priorité : **Essentiel**

Difficulté : 0/5

- [ ]

---

1. Utilisateur : Je peux modifier mes informations personnelles et avoir un suivi de mes livraisons afin d’avoir le contrôle de mon compte. Une page de compte avec des champs éditables pré-remplis, les cartes bancaires et les adresses enregistrées.

Priorité : **Essentiel**

Difficulté : 1/5

- [ ]

---

1. Administrateur : Je veux être gratifié d’un emballage cadeau au cours de certaines périodes de l’année ou à partir d’un certain montant de commande, afin de me fidéliser à la plateforme et la recommander. Par exemple : L’admin peut définir des périodes sur lesquelles appliquer des rabais.

Priorité : Facultatif 7

Difficulté : 3/5 4.

- [ ]

---

Administrateur : Je dois pouvoir restreindre les méthodes de paiement pour chaque client : restreindre par pays, par utilisateur connecté. Blacklist/whitelist en fonction des pays. Ou ne pas permettre de passer des commandes au-delà d’un certain montant sans être connecté.

Priorité : Secondaire

Difficulté : 2/5

- [ ]

---

## US_07

1. Utilisateur : Je peux enregistrer mes coordonnées sur la plateforme et être dans la possibilité d’effectuer des achats uniquement à l’aide de mon CVV (série de 3 chiffres), afin de faciliter mes futurs achats.

#hint( Avoir une option pour ne pas enregistrer le CVV (page de paiement ou profil). )

Priorité : Essentiel
Difficulté : 1/5

2. Utilisateur : Je dois avoir la possibilité d’imprimer mes différentes factures afin de conserver une trace de mes achats.

#hint( Sur l’interface pour suivre les commandes, avoir une option « imprimer » qui lance le téléchargement de la facture. )

Priorité : Essentiel
Difficulté : 3/5

3. Administrateur : Je dois être dans la capacité de pouvoir télécharger un fichier EXCEL qui contiendra toutes les informations de mes clients (leurs commandes, les articles commandés…), toutes les informations du stock, afin d'obtenir des statistiques (clients réguliers, types de produits les plus achetés...).

#hint( Sur la page principale du back admin, avoir une option « exporter » qui lance le téléchargement du fichier excel. )

Priorité : Essentiel
Difficulté : 2/5

4. Utilisateur : Je dois avoir la possibilité de laisser un avis sur les articles du catalogue.

#hint( Sur chaque page d'article un champs texte et un bouton de validation doivent être présents (uniquement pour les utilisateurs connectés) permettant d'enregistrer un avis. )

Priorité : Secondaire
Difficulté : 1/5
