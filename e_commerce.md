## W2 - Projets web

### E-commerce

**repositoryname** : e-commerce
**repositoryrights** : ramassage-tek
**language** : PHP

- Your repository must contain the totality of your source files, but no useless files
  (binary, temp files, obj files,...).
- Introduction
- Les sprints
- La méthodologie
- Client et product owner
- Notation
- Note technique individuelle
- Note individuelle de gestion de projet
- Note finale de groupe
- Les rushs
- Contraintes
- Côté serveur
- Côté client
- Git
- Fonctionnalités
- Gestion utilisateurs
- Le catalogue
- Les commandes et les livraisons
- Administation des comptes clients
- Search Engine Optimisation

## Introduction

Le but de ce projet est de créer une plateforme de site marchand «high-tech», avec le maximum de fonctionnalités. Il ne devra y être vendu que des composants informatiques. L’atout principal de votre site marchand consistera à vendre du matériel dit "compatible". Ainsi, vos clients ne pourront plus se tromper lors de leurs achats et vous aurez moins de matériel retourné !
Dans ce projet nous utiliserons la méthodologie Agile et mettrons en place un environnement de gestion de projet comme vous pourrez en rencontrer en entreprise : votre projet s’étalera sur 4 semaines découpées en 7 sprints.

Vous prendrez en main la méthodologie agile. Cette méthodologie se veut beaucoup plus flexible que celles traditionnelles. Les méthodes agiles reposent sur un cycle de développement itératif, incrémental et adaptatif permettant de plus impliquer le client et d’être plus réactif à ses demandes tout en lui donnant une meilleure visibilité du projet à chaque étape de développement.
Ce que ne permet que très peu la gestion de projet Waterfall (cycle en V) : "tout" est décidé avant de passer au développement et il est plus difficile et/ou plus coûteux de procéder aux éventuels changements demandés par le client en court de développement, client ayant également une visibilité extrêmement faible du produit avant la fin du projet.
Les méthodes agiles s’articulent autour de la définition d’objectifs sur le court terme répartis sous forme de sprint s’axant sur le développement itératif.

Vous aurez la responsabilité d’organiser des réunions de groupe au début de chaque sprint. Ces rendez-vous seront pour vous l’occasion de définir les objectifs à accomplir pour le sprint suivant, en prenant en compte ce qui a été réalisé ou non pendant le précédent sprint.
Une fois que vos objectifs sont atteints, vous réitérerez le processus, et ce, jusqu’à l’accomplissement de l’objectif final.

**Il vous sera également demandé lors de la soutenance finale, de présenter une fonctionnalité permettant de démarquer votre produit de la concurrence. Vous devrez ainsi justifier le choix de vos innovations et réussir à nous convaincre.**

### Les sprints

Les sprints commencent les lundis matin et les jeudis après-midi. Au début du rush vous vous verrez remet-
tre vos "user stories" (US) pour le rush par votre "product owner" (PO). Après chacun des sprints vous devrez
présenter votre réalisation lors d’une soutenance d’un point de vue technique et organisationnel.

### La méthodologie

Tout le projet devra être organisé autour de la méthodologie Agile, vous devrez donc nommé un SCRUM
master. Ce SCRUM master pourra changer à votre gré après chaque soutenance. Vous devrez organiser vos
milestones autour des sprints, gérer vos deadlines, mettre en place un gitflow avec au moins un système
de code review via des "pull requests" (PR), etc.

### Client et product owner

Tout au long du projet, votre groupe sera suivi par un PO représenté par un membre de l’équipe pédagogique.
Le PO organisera les réunions de transition de rush, donnera les US et ré-organisera le groupe si nécessaire.

**Le PO est tout à fait en mesure de modifier vos US en fonction de votre avancée lors des soutenances (RDV client).**

### Notation

### Note technique individuelle

Pour chaque rush, chaque membre du groupe se verra attribuer une note technique individuelle. Cette note
reflète :

- L’ambition des US effectuées
- Le nombre d’US effectuées

### Note individuelle de gestion de projet

Pour chaque rush, chaque membre du groupe se verra attribuer une note individuelle de gestion de projet.
Cette note est le reflet de :

- La participation globale au projet
- L’impact dans le projet
- L’utilisation des outils et de la méthodologie agile
- Le pitch & la présentation du projet et de ses avancées

### Note finale de groupe

À la fin du projet, vous devrez faire une présentation du produit à votre client. Vous devrez à cette occasion
faire une présentation où tous les membres de votre groupe devront prendre la parole.

**Vous devez montrer toutes les fonctionnalités de votre projet. Les fonctionnalités qui ne seront pas montrées seront considérées comme absentes et se verront attribuer la note de zéro.**

**Dorénavant, tous les projets de groupe devront être présentés accompagnés d’un Powerpoint contenant au minimum 5 slides (et au maximum 10).**

Voici la liste des slides requises (à minima) :

- La présentation des membres du groupe ainsi que les rôles de chacun, un rapide récapitulatif du projet
  (Qui sont les membres de notre équipe? Quels sont nos objectifs? Qui est notre client? Quel est notre projet? Pourquoi ce projet est réalisé?... ).
- La liste des tâches à effectuer, le temps de travail estimé pour chacune d’entre elles, ainsi que les
  dépendances entre ces dernières (on ne met pas la charrue avant les bœufs)
- La répartition des tâches, entre les membres du groupe et les deadlines associées.
- Une démonstration des tâches fraîchement réalisées et des mockups pour les tâches imminentes (on vous demande de ne plus coder les yeux fermés, mais de maquetter)
- Les difficultés rencontrées, techniques ou humaines, ainsi que les solution apportées pour y remédier.

## Contraintes

### Côté serveur

Le framework à utiliser pour ce projet est Symfony en version 4.x.

### Côté client

Vous devrez impérativement utiliser React.js pour réaliser le client.

Aucune alternative ne sera acceptée.

### Git

Vous devez utiliser les "commandes natives" de GIT pour travailler sur le projet. C’est l’occasion de découvrir le potentiel de ce puissant outil de versionning et de comprendre comment il est utilisé par l’interface GitHub ou celle de GitKraken.

Vous devrez présenter votre git flow lors de la soutenance finale.

## Fonctionnalités

Dans le but de vous aiguiller pour la réalisation de votre projet, nous avons réuni toute les users stories qui devront être prises en compte dans votre backlog, elles correspondent aux besoins utilisateur.

### Gestion utilisateurs

En tant qu’utilisateur :

- **Je veux pouvoir créer un compte, m’y connecter et me déconnecter.**
  En tant qu’administrateur :
- **Je veux pouvoir avoir un compte avec des droits administrateurs (différents de ceux utilisateurs).**

### Le catalogue

En tant qu’utilisateur :

- **Je dois pouvoir accéder à un certain nombre d’articles avec description, photo, caractéristiques et**
  **prix afin de les visualiser.**
- Je dois pouvoir trier les articles par descriptif, nom et catégorie afin de les rechercher de manière
  avancée.
- Je peux mettre des articles dans un panier afin de n’acheter que ce dont je suis vraiment certain.
- Je peux visualiser mon panier depuis n’importe quelle page et connaître la liste des produits qui le
  composent, leur quantité, leur prix et le total.
- Je dois pouvoir visualiser le prix d’un article si j’en change la couleur ou la taille.
- Je dois connaître les frais de port de mon panier, qui dépendent du poids, du pays de livraison et du
  mode d’expédition.
- Je dois pouvoir consulter les différents tarifs de livraison en fonction du mode d’expédition afin de
  choisir le plus adapté à mon cas.
- Je dois pouvoir avoir accès à la fiche détaillée de chaque article.
- Je dois pouvoir laisser un avis.

En tant qu’administrateur :

- **Je dois pouvoir paramétrer la fiche d’un produit en y ajoutant de grandes quantités de texte et**
  **pouvoir y ajouter des images.**
- Je dois connaître l’état de mes commandes sur la page de garde, afin d’avoir un suivi de mes livraisons.
- Je dois pouvoir ajouter, modifier et supprimer des articles, et également pouvoir en sélectionner
  plusieurs afin de les traiter par lot.
- Je dois gérer le statut des articles afin de renseigner s’ils sont disponibles ou en rupture de stock.
- Je dois savoir si un article est en promotion ou classé comme nouveauté.
- Je dois pouvoir gérer les stocks et les commandes à effectuer.
- Je dois pouvoir gérer les catégories afin de pouvoir en ajouter et en supprimer.

### Les commandes et les livraisons

En tant qu’utilisateur :

- Lors d’un achat, je dois pouvoir modifier la quantité de mes articles, les supprimer, visualiser le mon-
  tant de ma commande afin de n’acheter que ce dont je suis certain.
- Je dois pouvoir passer une commande, sans avoir à entrer mes identifiants bancaires ni mon adresse
  postale à chaque achat, afin de faciliter et fluidifier mon expérience sur la plateforme.
- Je dois, grâce à la référence de mes commandes, être dans la capacité de visualiser le statut de cette
  dernière, et visualiser les différents détails.
- Je peux enregistrer mes coordonnées sur la plateforme et être dans la possibilité d’effectuer des achats
  uniquement à l’aide de mon CVV (série de 3 chiffres), afin de faciliter mes futurs achats.
- Je peux modifier mes informations personnelles et avoir un suivi sur mes livraisons afin d’avoir le
  contrôle de mon compte.
- Je dois avoir la possibilité d’imprimer mes différentes factures afin de conserver une trace de mes
  achats en cas de problèmes.
- Je peux passer des commandes pour différentes adresses.
- Je peux commander sans avoir à me créer un compte.
- Je veux être gratifier d’un emballage cadeau au cours de certaines périodes de l’année ou à partir d’un
  certain montant de commande, afin de me fidéliser à la plateforme et la recommander.

En tant qu’administrateur :

- Je veux être capable de gérer les frais de port.
- Lors de la saisie du poids de chaque article, je peux visualiser les frais de port correspondant au poids
  de l’article, afin de faciliter le calcul final du prix de chaque article.
- Je dois être dans la capacité de pouvoir télécharger un fichier EXCEL qui contiendra toutes les infor-
  mations de mes clients (leurs commandes, les articles commandés... ), afin d’obtenir des statistiques
  (clients réguliers, types de produits les plus acheté... ).

### Administation des comptes clients

En tant qu’administrateur :

- Je dois pouvoir restreindre les méthodes de paiement pour chaque client.
- Je dois pouvoir définir des rabais.

## Search Engine Optimisation

Nous attendons de votre projet qu’il soit optimisé pour les moteurs de recherche. Le but de cette étape
est d’améliorer la visibilité de votre site dans les résultats d’un moteur de recherche. Vous devrez donc
comprendre comment les pages web sont indexées par un moteur de recherche afin d’obtenir un meilleur
référencement.

- Balises meta
- Analyse des liens
- Optimisation de votre projet
- Etc.
