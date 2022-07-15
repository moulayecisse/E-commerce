# US_1

> Voici les User Stories pour le rush 1 (qui se termine jeudi soir)

1. Utilisateur : Je dois pouvoir accéder à un certain nombre d’articles avec description, photo, caractéristiques et prix sur la page d’accueil, afin de les visualiser.
   Le but est de commencer à organiser la DB, faire une route pour avoir les articles. Une page doit afficher tous les articles, dans des cards.
   > Priorité : Essentiel • Difficulté : 1/5
2. Utilisateur : Je dois pouvoir avoir accès à la fiche détaillée de chaque article.
   Préparer la page de détail qui sera complétée plus tard, on doit au moins avoir une route GET / :id pour aller chercher l’article en question. On aimerait un component différent des cards de la page des articles.
   > Priorité : Essentiel • Difficulté : 1/5

[gildas]
[dorian]
3. Administrateur : Je dois pouvoir ajouter, modifier et supprimer des articles, Je dois pouvoir paramétrer la fiche d’un produit en y ajoutant de grandes quantités de texte et pouvoir y ajouter des images.
   On veut compléter le CRUD des articles, on doit voir les articles présentés sous forme de liste, avec les actions edit/delete.
4. Utilisateur et Administrateur : Je dois pouvoir créer un compte, me connecter et me déconnecter.
   Les comptes administrateurs doivent avoir des permissions différentes des simples utilisateurs.
   On doit pouvoir utiliser un formulaire pour ajouter/éditer un article
   > Priorité : Essentiel • Difficulté : 2/5

# US_2

Hello Général, voici les US pour le second sprint :

1. Utilisateur : La page d’accueil affiche les articles les plus populaires, basé sur le nombre de visites.

On doit pouvoir voir sur la page d’accueil les articles qui ont été le plus consultés ou recherchés.

> Priorité : Secondaire • Difficulté : 1/5

2. Utilisateur : Je dois pouvoir trier les articles par nom et/ou catégorie afin de les rechercher de manière avancée.

Une barre de recherche avec plusieurs options de recherche (par nom/catégorie) et une page de résultats.

> Priorité : Essentiel • Difficulté : 2/5

3. Utilisateur : Je dois pouvoir voir facilement dans quelle catégorie et sous-catégorie je me situe (breadcrumbs)

Un enchaînement de catégories/sous catégories qui permettent de situer le produit dans les catégories.
Des liens peuvent être présents sur chaque élément des breadcrumbs pour pointer sur la page de recherche (et démarrer une recherche par catégorie).

> Priorité : Facultatif • Difficulté : 2/5

4. Utilisateur : Je dois pouvoir voir combien d’exemplaires d’un même article il reste en vente.

Sur la page détails d’un article, on doit voir le nombre d’articles en stock (défini dans la DB, et par l’admin dans l’user story plus bas).

> Priorité : Essentiel • Difficulté : 0/5

5. Administrateur : Je dois pouvoir gérer les catégories afin de pouvoir en ajouter et en supprimer.

L’implémentation des catégories est à l’appréciation des étudiants, le CRUD dans le back admin doit correspondre à leur implémentation.

> Priorité : Essentiel • Difficulté : 2/5

6. Administrateur : Je dois gérer le statut des articles afin de renseigner s’ils sont disponibles ou en rupture de stock.

L’interface doit être compréhensible par l’user non-habitué, on peut avoir un code couleur pour signifier en stock. Vous pouvez rajouter une alerte sur les produits en rupture de stock.

> Priorité : Essentiel • Difficulté : 1/5
