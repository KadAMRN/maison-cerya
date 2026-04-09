# 🏠 Maison Cerya — Guide Complet du Site Web

Bienvenue ! Ce document explique **tout** sur votre site web Maison Cerya : comment il fonctionne, ce que contient chaque fichier, comment le personnaliser, et comment le connecter à Shopify pour gérer vos produits et commandes.

Pas besoin de connaissances techniques avancées — tout est expliqué pas à pas.

---

## 📋 Table des matières

1. [C'est quoi ce projet ?](#1--cest-quoi-ce-projet-)
2. [Comment le site fonctionne](#2--comment-le-site-fonctionne)
3. [Les fichiers : à quoi sert chaque fichier](#3--les-fichiers--à-quoi-sert-chaque-fichier)
4. [Voir le site sur votre ordinateur](#4--voir-le-site-sur-votre-ordinateur)
5. [Comprendre le mode démo vs Shopify](#5--comprendre-le-mode-démo-vs-shopify)
6. [Connecter le site à Shopify (étape par étape)](#6--connecter-le-site-à-shopify-étape-par-étape)
7. [Gérer vos produits via Shopify](#7--gérer-vos-produits-via-shopify)
8. [Le système de Collections (via tags Shopify)](#8--le-système-de-collections-via-tags-shopify)
9. [La navigation Sidebar](#9--la-navigation-sidebar)
10. [Personnaliser le contenu du site](#10--personnaliser-le-contenu-du-site)
11. [Ajouter vos images et vidéos](#11--ajouter-vos-images-et-vidéos)
12. [Mettre le site en ligne](#12--mettre-le-site-en-ligne)
13. [Questions fréquentes](#13--questions-fréquentes)

---

## 1. 🤔 C'est quoi ce projet ?

C'est le **site web e-commerce** de la marque Maison Cerya. Il permet à vos clientes de :

- Découvrir la marque via une **page d'accueil immersive** (vidéo ou image plein écran)
- Voir vos produits dans la **Boutique** (robes, ensembles, accessoires)
- Explorer vos **Collections** thématiques (actives et archivées)
- Filtrer et trier les produits par catégorie
- Voir le détail d'un produit (photos, tailles, couleurs, description)
- Ajouter des articles au panier et passer commande (via Shopify)
- Vous contacter

Le site est **indépendant** : ce n'est pas un thème Shopify. C'est un site web classique (HTML/CSS/JavaScript) qui **se connecte à Shopify** pour récupérer les produits et gérer les commandes.

### Pourquoi cette approche ?

| Avantage                 | Explication                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| Design sur mesure        | Le design est 100% personnalisé, contrairement aux thèmes Shopify standards    |
| Rapide                   | Le site est très léger et se charge rapidement                                 |
| Gratuit à héberger       | Pas besoin de payer un hébergement (Netlify, Vercel = gratuit)                 |
| Shopify gère le business | Stock, paiements, commandes, clients — tout est géré dans le dashboard Shopify |

---

## 2. ⚙️ Comment le site fonctionne

Le site fonctionne en **deux parties** :

```
┌─────────────────────────────┐       ┌──────────────────────────┐
│     VOTRE SITE WEB          │       │       SHOPIFY            │
│  (ce que la cliente voit)   │◄─────►│  (ce que vous gérez)     │
│                             │       │                          │
│  • Pages HTML               │       │  • Produits & photos     │
│  • Design CSS               │       │  • Stock & inventaire    │
│  • Interactions JavaScript  │       │  • Prix                  │
│                             │       │  • Commandes             │
│  Hébergé sur Netlify/Vercel │       │  • Paiements             │
│  (gratuit)                  │       │  • Clients               │
└─────────────────────────────┘       └──────────────────────────┘
```

### Ce que Shopify contrôle automatiquement :

- ✅ Les noms des produits
- ✅ Les descriptions des produits
- ✅ Les prix
- ✅ Les photos des produits
- ✅ Les tailles et couleurs disponibles
- ✅ Le stock (si un produit est en rupture, il apparaît comme tel)
- ✅ Le paiement et la commande

### Ce que Shopify ne contrôle PAS (vous le modifiez dans les fichiers HTML) :

- ❌ La vidéo/image plein écran de la page d'accueil (landing hero)
- ❌ La barre d'annonce en haut ("Livraison disponible partout en Algérie") — présente sur toutes les pages sauf l'accueil
- ❌ Les noms et l'organisation des collections (gérés via les **tags** Shopify, voir section 8)
- ❌ La page "Contact"
- ❌ Le design et les couleurs
- ❌ Les liens des réseaux sociaux (Instagram, Facebook, TikTok)
- ❌ Le formulaire de newsletter

---

## 3. 📁 Les fichiers : à quoi sert chaque fichier

Voici tous les fichiers du projet et ce qu'ils font :

```
Maison Cerya site/
│
├── index.html          ← Page d'accueil (landing page immersive)
├── shop.html           ← Page boutique (catalogue de tous les produits)
├── product.html        ← Page détail d'un produit
├── collections.html    ← Page des collections thématiques
├── about.html          ← Page "À propos"
├── contact.html        ← Page "Contact"
│
├── css/
│   └── style.css       ← Tout le design visuel du site
│
├── js/
│   └── app.js          ← Le cerveau du site (logique, panier, Shopify, collections)
│
├── images/             ← Vos images (à créer, voir section 11)
│
├── README.md           ← Ce fichier que vous lisez
└── SHOPIFY-SETUP.md    ← Guide technique Shopify (plus condensé)
```

### Détail de chaque fichier :

#### 📄 `index.html` — Page d'accueil (Landing Page)

C'est la première page que vos clientes voient. C'est une **page immersive minimaliste** qui donne le ton de la marque. Elle contient :

- **Pas de barre d'annonce** — contrairement aux autres pages, la page d'accueil est épurée
- Un **menu de navigation transparent** qui flotte au-dessus du héro (se solidifie au scroll)
- Un **héro plein écran** (vidéo ou image) avec le nom "MAISON CERYA" et un bouton vers les collections
- Un indicateur "Défiler" en bas pour inviter à scroller
- Le **pied de page** (footer)

> 💡 La navbar utilise la classe `navbar--landing` qui la rend transparente avec des icônes blanches. Les autres pages utilisent la navbar standard (fond blanc, icônes noires).

#### 📄 `shop.html` — Page boutique

La page catalogue avec **tous** vos produits. Elle contient :

- La **barre d'annonce** noire en haut
- Des **filtres** par catégorie (Tout, Robes, Ensembles, Accessoires) — générés dynamiquement depuis Shopify
- Un **tri** (par prix croissant/décroissant, par nom)
- La **grille de produits** (3 colonnes sur ordinateur, 2 sur mobile)
- Un bouton "**Ajouter au panier**" qui apparaît au survol de chaque produit

#### 📄 `product.html` — Page détail produit

Quand une cliente clique sur un produit, elle arrive ici. Cette page affiche :

- Un **fil d'Ariane** (Accueil > Boutique > Nom du produit)
- La **galerie d'images** du produit
- Le **nom** et le **prix**
- La **description**
- Le choix de **taille** (XS, S, M, L, XL)
- Le choix de **couleur**
- Le sélecteur de **quantité** (+ et −)
- Le bouton "**Ajouter au panier**"
- Des **onglets** avec : description détaillée, détails du produit, infos livraison
- Des **produits similaires** en bas

#### 📄 `collections.html` — Page Collections

Affiche vos produits organisés par **collections thématiques** (ex: "Collection Printemps 2026"). Le contenu est **entièrement dynamique** — il vient des tags Shopify (voir section 8). Elle contient :

- Un **héro** avec le titre "Collections" et un sous-titre
- Les **collections actives** — grandes sections éditoriales avec les produits en grille 3 colonnes
- Les **collections archivées** — section grisée "Collections Précédentes" avec grille plus compacte (4 colonnes)
- Un message "Aucune collection disponible" si aucun produit n'a de tag collection

#### 📄 `about.html` — Page À propos

Présente votre marque avec :

- Votre **histoire d'origine** (pourquoi et comment la marque a été créée)
- Votre **vision** (héritage + modernité)
- Vos **valeurs** (Qualité, Authenticité, Intemporalité)
- Un bouton "Voir la boutique"

#### 📄 `contact.html` — Page Contact

Permet aux clientes de vous contacter :

- Vos **coordonnées** (email, Instagram, adresse, horaires)
- Un **formulaire** (prénom, nom, email, téléphone, sujet, message)

#### 🎨 `css/style.css` — Le design

Ce fichier contrôle **tout l'aspect visuel** du site :

- Les couleurs (noir, blanc, doré)
- Les polices d'écriture (Cormorant Garamond pour les titres, Montserrat pour le texte)
- La mise en page (grilles, espacements, tailles)
- Les animations (apparition au défilement, effets de survol)
- L'adaptation mobile (responsive design)

Les couleurs principales sont définies tout en haut du fichier dans les **variables CSS** :

```css
--color-black: #0a0a0a; /* Noir principal */
--color-warm: #c9a96e; /* Doré / accent */
--color-cream: #faf8f5; /* Crème / fond clair */
```

#### 🧠 `js/app.js` — Le cerveau du site

C'est le fichier le plus important techniquement. Il gère :

- La **connexion à Shopify** (récupérer les produits via Buy SDK + Storefront GraphQL API pour les tags)
- Les **produits de démonstration** (affichés quand Shopify n'est pas connecté)
- Le **système de collections** (parsing des tags `collection:Nom:status`, rendu dynamique sur la page Collections et dans les teasers)
- Le **panier** (ajouter, supprimer, modifier les quantités)
- La **sauvegarde du panier** (le panier est sauvegardé même si la cliente ferme le navigateur)
- Les **filtres et le tri** de la page boutique (catégories dynamiques depuis Shopify)
- La **sidebar de navigation** (ouverture/fermeture, catégories dynamiques)
- Le **rendu dynamique** des catégories en footer et sidebar
- La **recherche**
- Les **animations** au défilement
- Le **formulaire de contact**
- Le **formulaire newsletter**

**C'est dans ce fichier que vous mettez vos identifiants Shopify** (lignes 14-15).

---

## 4. 👀 Voir le site sur votre ordinateur

### Méthode simple : double-clic

1. Allez dans le dossier `Maison Cerya site` sur votre ordinateur
2. **Double-cliquez** sur `index.html`
3. Le site s'ouvre dans votre navigateur (Chrome, Firefox, Edge...)

### Méthode recommandée : Live Server (VS Code)

Si vous utilisez VS Code (l'éditeur de code) :

1. Installez l'extension **"Live Server"** (par Ritwick Dey)
2. Cliquez-droit sur `index.html`
3. Choisissez **"Open with Live Server"**
4. Le site s'ouvre ET **se met à jour automatiquement** quand vous modifiez un fichier

---

## 5. 🔄 Comprendre le mode démo vs Shopify

### Mode démo (situation actuelle)

En ce moment, le site fonctionne en **mode démo**. Cela signifie :

- Les produits affichés sont des **exemples fictifs** codés dans le fichier `js/app.js`
- Les images sont des **zones grises** (placeholders)
- Le bouton "Passer la commande" affiche un message qui invite à contacter par Instagram
- **Le site fonctionne quand même** — vous pouvez naviguer, ajouter au panier, filtrer, etc.

### Mode Shopify (après connexion)

Une fois Shopify connecté :

- Les produits de démo **disparaissent automatiquement**
- Les **vrais produits** (avec photos, prix, stock) apparaissent à la place
- Le bouton "Passer la commande" **redirige vers le checkout sécurisé de Shopify**
- Le stock est **synchronisé en temps réel** (si vous modifiez un stock dans Shopify, ça change sur le site)

**Vous n'avez rien à supprimer manuellement.** Le code détecte automatiquement si Shopify est connecté ou non.

---

## 6. 🔗 Connecter le site à Shopify (étape par étape)

### Étape 1 : Créer un compte Shopify

1. Allez sur **[shopify.com](https://www.shopify.com/)**
2. Cliquez sur "Commencer l'essai gratuit"
3. Créez votre compte avec votre email
4. Donnez un nom à votre boutique : **Maison Cerya**
5. Répondez aux questions de configuration
6. Choisissez un plan (le **plan Basic** à ~36$/mois suffit largement)

> 💡 Shopify propose un **essai gratuit de 3 jours** puis un tarif réduit de 1$/mois pendant 3 mois pour tester.

### Étape 2 : Configurer la boutique

Dans le dashboard Shopify (admin.shopify.com) :

1. Allez dans **Paramètres** (icône ⚙️ en bas à gauche)
2. **Informations de la boutique** :
   - Nom : Maison Cerya
   - Email : votre email
3. **Devise** :
   - Allez dans **Paramètres** → **Marchés**
   - Définissez la devise sur **DZD (Dinar algérien)**
   - Ou utilisez EUR si vous vendez aussi à l'international

### Étape 3 : Ajouter vos produits

C'est l'étape la plus importante ! Dans Shopify :

1. Allez dans **Produits** (menu de gauche)
2. Cliquez **Ajouter un produit**
3. Remplissez pour chaque produit :

| Champ               | Quoi mettre                               | Exemple                                          |
| ------------------- | ----------------------------------------- | ------------------------------------------------ |
| **Titre**           | Nom du produit                            | Robe Alger                                       |
| **Description**     | Description détaillée                     | Robe élégante inspirée du patrimoine algérien... |
| **Images**          | Photos du produit (plusieurs si possible) | photo1.jpg, photo2.jpg                           |
| **Prix**            | Prix de vente                             | 12500 (= 12 500 DA)                              |
| **Stock**           | Quantité en stock                         | 15                                               |
| **Type de produit** | La catégorie                              | Robes                                            |
| **Tags**            | Étiquettes pour filtrer                   | Nouveau, Best-seller                             |

4. **Pour les tailles et couleurs** :
   - En bas de la page produit, section **Variantes**
   - Cliquez "Ajouter des options comme la taille ou la couleur"
   - Ajoutez l'option **Taille** avec les valeurs : XS, S, M, L, XL
   - Ajoutez l'option **Couleur** avec les valeurs : Noir, Doré, Blanc, etc.
   - Shopify créera automatiquement des combinaisons (ex: M/Noir, L/Doré...)
   - Vous pouvez définir un stock différent pour chaque combinaison

5. **Organisez en collections** :
   - Allez dans **Produits** → **Collections**
   - Créez : "Robes", "Ensembles", "Accessoires", "Nouvelle collection"
   - Affectez chaque produit à sa collection

> ⚠️ **Important** : Le champ **"Type de produit"** doit correspondre aux catégories du site. Utilisez exactement : `Robes`, `Ensembles`, ou `Accessoires` (avec la majuscule).

### Étape 4 : Créer le token API (la "clé" de connexion)

C'est cette étape qui crée le lien entre votre site web et Shopify :

1. Dans Shopify Admin, allez dans **Paramètres** → **Applications et canaux de vente**
2. Cliquez **Développer des applications** (tout en bas)
3. Si demandé, cliquez **Autoriser le développement personnalisé**
4. Cliquez **Créer une application**
5. Donnez-lui un nom : `Site Web Maison Cerya`
6. Cliquez **Créer l'application**

Maintenant, configurez les permissions :

7. Cliquez sur l'onglet **Configuration**
8. Dans **Storefront API**, cliquez **Configurer**
9. **Cochez ces cases** :
   - ✅ `unauthenticated_read_product_listings` (lire les produits)
   - ✅ `unauthenticated_read_product_inventory` (lire le stock)
   - ✅ `unauthenticated_write_checkouts` (créer des commandes)
   - ✅ `unauthenticated_read_checkouts` (lire les commandes)
10. Cliquez **Enregistrer**

Récupérez le token :

11. Cliquez sur l'onglet **Identifiants de l'API**
12. Dans la section **Storefront API**, cliquez **Installer l'application**
13. Copiez le **Storefront API access token** — c'est un long texte comme `shpat_abc123def456...`

> 🔒 **Ce token est confidentiel** — ne le partagez avec personne et ne le publiez pas sur les réseaux sociaux.

### Étape 5 : Mettre le token dans le site web

C'est la seule modification de code nécessaire !

1. Ouvrez le fichier **`js/app.js`** avec n'importe quel éditeur de texte (VS Code, Bloc-notes, etc.)
2. Tout en haut du fichier, vous verrez ces lignes (vers la ligne 14) :

```javascript
const SHOPIFY_CONFIG = {
  domain: "YOUR-STORE.myshopify.com",
  storefrontAccessToken: "YOUR-TOKEN-HERE",
};
```

3. Remplacez-les avec vos vraies valeurs :

```javascript
const SHOPIFY_CONFIG = {
  domain: "maison-cerya.myshopify.com", // ← votre domaine Shopify
  storefrontAccessToken: "shpat_abc123def456", // ← votre token copié à l'étape 4
};
```

**Où trouver votre domaine** : Dans Shopify, allez dans **Paramètres** → **Domaines**. C'est le `.myshopify.com` affiché (ex: `maison-cerya.myshopify.com`).

4. Sauvegardez le fichier
5. Rechargez le site dans votre navigateur

**C'est fait !** Vos vrais produits devraient maintenant apparaître sur le site.

### Étape 6 : Configurer les paiements

Dans Shopify → **Paramètres** → **Paiements** :

Pour l'Algérie, les options les plus adaptées sont les **paiements manuels** :

1. En bas de la page, cliquez **Ajouter un mode de paiement manuel**
2. Créez ces modes :

| Mode de paiement            | Instructions à afficher                                                              |
| --------------------------- | ------------------------------------------------------------------------------------ |
| **Paiement à la livraison** | "Payez en espèces à la réception de votre colis"                                     |
| **Virement CCP**            | "Envoyez le montant au CCP : [votre numéro]. Envoyez la preuve par Instagram"        |
| **Baridi Mob**              | "Envoyez le montant via Baridi Mob au [votre RIP]. Envoyez la capture par Instagram" |

### Étape 7 : Configurer la livraison

Dans Shopify → **Paramètres** → **Expédition et livraison** :

1. Supprimez les zones de livraison par défaut
2. Créez une zone **"Algérie"** :
   - Ajoutez le pays "Algérie"
   - Ajoutez un tarif : ex. "Livraison standard" → 500 DA
3. Optionnel : ajoutez un seuil de livraison gratuite (ex: gratuite au-dessus de 15 000 DA)

---

## 7. 📦 Gérer vos produits via Shopify

Une fois connecté, voici votre flux de travail quotidien :

### Ajouter un nouveau produit

1. Connectez-vous à **admin.shopify.com**
2. Allez dans **Produits** → **Ajouter un produit**
3. Remplissez les infos et ajoutez les photos
4. Cliquez **Enregistrer**
5. **Le produit apparaît automatiquement sur votre site web** (pas besoin de toucher au code)

### Modifier un produit

1. Dans Shopify → **Produits** → cliquez sur le produit
2. Modifiez le prix, la description, les photos, le stock...
3. Sauvegardez
4. **Le site se met à jour automatiquement**

### Supprimer un produit

1. Dans Shopify → **Produits** → cliquez sur le produit
2. En bas, cliquez **Supprimer le produit**
3. **Il disparaît du site automatiquement**

### Gérer le stock

1. Dans Shopify → **Produits** → **Inventaire**
2. Vous voyez tous vos produits avec les quantités en stock
3. Modifiez directement les quantités
4. Quand un produit passe à 0, il est automatiquement marqué comme "épuisé"

### Voir les commandes

1. Dans Shopify → **Commandes**
2. Vous voyez toutes les commandes passées
3. Vous pouvez les traiter (préparer, expédier, marquer comme livrées)

---

## 8. 🏷️ Le système de Collections (via tags Shopify)

Les collections sont un moyen d'organiser vos produits par **thème** ou **saison** (ex: "Collection Printemps 2026", "Ramadan 2026"). Contrairement aux catégories (Robes, Ensembles...) qui organisent par **type de produit**, les collections regroupent des produits de différentes catégories autour d'un **concept**.

### Comment ça fonctionne

Le système utilise les **tags Shopify** avec un format spécial :

```
collection:Nom de la collection:status
```

Où **status** est soit `active` soit `archived`.

### Exemples de tags

| Tag Shopify                        | Collection affichée | Statut   |
| ---------------------------------- | ------------------- | -------- |
| `collection:Printemps 2026:active` | Printemps 2026      | Active   |
| `collection:Ramadan 2026:active`   | Ramadan 2026        | Active   |
| `collection:Été 2025:archived`     | Été 2025            | Archivée |

### Comment ajouter un produit à une collection

1. Dans Shopify Admin → **Produits** → cliquez sur le produit
2. Dans le champ **Tags** (étiquettes), ajoutez le tag au format ci-dessus
3. Exemple : pour ajouter une robe à la collection "Printemps 2026", ajoutez le tag : `collection:Printemps 2026:active`
4. **Sauvegardez** — la collection apparaît automatiquement sur le site

> 💡 Un même produit peut appartenir à **plusieurs collections**. Ajoutez simplement plusieurs tags `collection:...`.

### Où les collections apparaissent

- **Page Collections** (`collections.html`) — Les collections actives sont affichées comme de grandes sections éditoriales. Les archivées apparaissent en bas dans une section grisée "Collections Précédentes"
- **Footer** — La colonne "Collections" dans le pied de page liste dynamiquement toutes les collections actives
- **Page d'accueil** (`index.html`) — Si un élément `#collectionsTeaser` est présent, une liste élégante des collections actives s'affiche (liens cliquables vers la page Collections)

### Changer le statut d'une collection

Pour **archiver** une collection (la saison est terminée) :

1. Modifiez le tag de chaque produit concerné : changez `:active` en `:archived`
2. Exemple : `collection:Printemps 2026:active` → `collection:Printemps 2026:archived`
3. La collection passe automatiquement de la section principale à la section "Collections Précédentes"

Pour **supprimer** une collection entièrement : retirez simplement les tags `collection:...` des produits.

> ⚠️ **Important** : Shopify met tous les tags en minuscules automatiquement. Le code JavaScript remet la première lettre en majuscule pour l'affichage. Donc `collection:printemps 2026:active` s'affichera comme "Printemps 2026".

### Tags normaux vs tags collection

Les tags qui ne commencent PAS par `collection:` fonctionnent comme avant — ils servent de **badges** sur les produits (ex: "Nouveau", "Best-seller", "Édition limitée"). Seuls les tags au format `collection:...:...` sont interprétés comme des collections.

---

## 9. 📱 La navigation Sidebar

Le site utilise un **panneau de navigation latéral** (sidebar) au lieu d'un menu mobile classique. Ce sidebar s'ouvre quand on clique sur le **hamburger** (≡) en haut à gauche.

### Contenu du sidebar

Le sidebar est divisé en **deux colonnes** :

1. **Liens principaux** (à gauche) — liens vers les pages : Accueil, Boutique, Collections, Contact
2. **Catégories** (à droite) — liste dynamique des catégories de produits (Robes, Ensembles, etc.) + un lien "Tout voir". Ces catégories sont **générées automatiquement** depuis les types de produits Shopify

### Comportement

- **Hamburger → X** : quand le sidebar est ouvert, les 3 barres se transforment en X avec une animation fluide
- **Overlay** : un voile semi-transparent couvre le contenu derrière le sidebar. Sur la page d'accueil, l'overlay est un voile chaud frosted glass (verre dépoli) pour adoucir le contraste avec le héro sombre
- **Logo et icônes masqués** : quand le sidebar est ouvert, le logo et les icônes de recherche/panier disparaissent — seul le bouton X reste visible
- **Fermeture** : cliquer sur l'overlay, un lien du sidebar, ou le X ferme le panneau

### Modifier les liens du sidebar

Les liens du sidebar sont définis dans **chaque fichier HTML**. Cherchez la section `<!-- Sidebar Navigation -->` :

```html
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<nav class="sidebar-nav" id="sidebarNav">
  <div class="sidebar-content">
    <div class="sidebar-col sidebar-main-links">
      <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="shop.html">Boutique</a></li>
        <li><a href="collections.html">Collections</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="sidebar-col sidebar-shop-categories">
      <h4>Catégories</h4>
      <ul id="sidebarCategories"></ul>
      <!-- Rempli dynamiquement par JS -->
    </div>
  </div>
</nav>
```

> ⚠️ Le sidebar est présent dans **chaque** fichier HTML. Si vous ajoutez ou supprimez un lien, faites-le dans les 6 fichiers.

---

## 10. ✏️ Personnaliser le contenu du site

### Modifier le texte de la barre d'annonce

La barre d'annonce apparaît en haut de **toutes les pages sauf la page d'accueil** (l'accueil a un design immersif sans barre). Ouvrez un fichier HTML et trouvez :

```html
<div class="announcement-bar">
  <p>
    Livraison disponible partout en Algérie — Nouvelle collection disponible
  </p>
</div>
```

Changez le texte entre `<p>` et `</p>`.

> ⚠️ La barre d'annonce est présente dans 5 fichiers HTML (tous sauf `index.html`). Si vous la modifiez, faites-le dans les 5 fichiers : `shop.html`, `product.html`, `collections.html`, `about.html`, `contact.html`.

### Modifier le héro de la page d'accueil

Ouvrez **`index.html`** et cherchez :

```html
<section class="landing-hero">
  <div class="landing-hero-media">
    <!-- Replace with your video: <video autoplay muted loop playsinline><source src="your-video.mp4" type="video/mp4"></video> -->
    <div class="landing-hero-placeholder"></div>
  </div>
  <div class="landing-hero-overlay"></div>
  <div class="landing-hero-content">
    <h1 class="fade-up">MAISON CERYA</h1>
    <a href="collections.html" class="btn btn-outline-light fade-up"
      >Découvrez notre dernière collection</a
    >
  </div>
</section>
```

- Pour changer le **titre**, modifiez le texte dans `<h1>`
- Pour changer le **bouton**, modifiez le texte et le `href` du lien
- Pour ajouter une **vidéo**, voir la section 11

### Modifier le slogan de la page d'accueil

Ouvrez **`index.html`**, trouvez la ligne `<h1 class="fade-up">MAISON CERYA</h1>` et changez le texte.

### Modifier le texte de la page "À propos"

Ouvrez **`about.html`** et modifiez les paragraphes `<p>` dans la section `about-text`.

### Modifier les informations de contact

Ouvrez **`contact.html`** et modifiez :

- L'adresse email
- L'adresse physique
- Les horaires
- Le lien Instagram

### Modifier les liens des réseaux sociaux

Dans **chaque fichier HTML**, dans le footer, cherchez les liens `<a href="...">` des icônes sociales (Instagram, Facebook, TikTok) et remplacez les URLs. Le site inclut actuellement trois réseaux :

- **Instagram** — lien vers `https://www.instagram.com/maison.cerya/`
- **Facebook** — lien placeholder `#` (à remplacer)
- **TikTok** — lien placeholder `#` (à remplacer)

### Modifier le contenu du footer

Le footer contient **5 colonnes** :

1. **Maison Cerya** — description de la marque + icônes sociales
2. **Boutique** — liens vers les catégories (remplis dynamiquement par JS)
3. **Collections** — liens vers les collections actives (remplis dynamiquement par JS)
4. **Informations** — liens Contact, Guide des tailles, Politique de retour
5. **Contact** — adresse, email, lien Instagram

Les colonnes Boutique et Collections sont **auto-générées** depuis Shopify. Les colonnes Informations et Contact sont définies en HTML — modifiez-les directement dans chaque fichier.

### Modifier les couleurs du site

11. 🖼️ Ajouter vos images et vidéo
    Ouvrez **`css/style.css`** et modifiez les variables en haut :

```css
:root {
  --color-warm: #c9a96e; /* La couleur dorée/accent — changez ici */
  --color-warm-dark: #b8944f; /* Version plus foncée */
  --color-warm-light: #e8d5b0; /* Version plus claire */
  --color-cream: #faf8f5; /* Fond crème */
}
```

Pour trouver un code couleur, utilisez [htmlcolorcodes.com](https://htmlcolorcodes.com/fr/).

---

## 9. 🖼️ Ajouter vos images

### Images des produits

**Rien à faire !** Les images des produits viennent automatiquement de Shopify. Quand vous ajoutez des photos à un produit dans Shopify, elles apparaissent sur le site.

### Logo de la marque

Actuellement, le logo est en texte ("MAISON CERYA"). Pour le remplacer par une image :

1. Placez votre logo dans le dossier `images/` (ex: `images/logo.png`)
2. Dans **chaque fichier HTML**, trouvez :

```html
<a href="index.html" class="logo">
  <span class="logo-text">MAISON CERYA</span>
</a>
```

3. Remplacez par :

```html
<a href="index.html" class="logo">
  <img src="images/logo.png" alt="Maison Cerya" style="height: 40px;" />
</a>
```

### Image du héro (bannière d'accueil) — Vidéo ou Image

La page d'accueil prend en charge une **vidéo** ou une **image** en plein écran. Par défaut, un dégradé sombre (placeholder) est affiché.

#### Option A : Ajouter une vidéo (recommandé)

1. Placez votre vidéo dans `images/hero.mp4` (format MP4, 10-30 secondes, en boucle)
2. Ouvrez **`index.html`**, trouvez :

```html
<div class="landing-hero-media">
  <!-- Replace with your video: <video autoplay muted loop playsinline><source src="your-video.mp4" type="video/mp4"></video> -->
  <div class="landing-hero-placeholder"></div>
</div>
```

3. Remplacez par :

```html
<div class="landing-hero-media">
  <video autoplay muted loop playsinline>
    <source src="images/hero.mp4" type="video/mp4" />
  </video>
</div>
```

> 💡 **Conseils vidéo** : Utilisez une résolution de 1920×1080, compressez à ~5 Mo max pour le chargement rapide. Des sites comme [HandBrake](https://handbrake.fr/) permettent de compresser gratuitement.

#### Option B : Ajouter une image

---

## 12

par :

```html
<div
  class="about-image"
  style="background: url('images/about-1.jpg') center/cover no-repeat;"
></div>
```

### Photos Instagram

1. Placez 6 photos dans `images/` (ex: `insta-1.jpg` à `insta-6.jpg`)
2. Dans **`index.html`**, remplacez chaque :

```html
<div class="insta-placeholder"></div>
```

par :

```html
<div
  class="insta-placeholder"
  style="background: url('images/insta-1.jpg') center/cover no-repeat;"
></div>
```

---

## 10. 🌐 Mettre le site en ligne

Pour que vos clientes puissent accéder au site sur Internet, il faut l'**héberger**.

### Option recommandée : Netlify (gratuit)

1. Allez sur **[netlify.com](https://www.netlify.com/)**
2. Créez un compte (gratuit)
3. Sur le dashboard, vous verrez une zone "**Drag and drop**"
4. **Faites glisser tout le dossier** `Maison Cerya site` dans cette zone
5. Netlify va automatiquement publier votre site
6. Vous recevrez une URL du type `random-name.netlify.app`
7. Votre site est en ligne ! 🎉

### Ajouter un nom de domaine personnalisé

Pour avoir `maisoncerya.com` au lieu de `random.netlify.app` :

1. **Achetez un domaine** sur [Namecheap](https://www.namecheap.com/) (environ 10-15$ par an)
   - Cherchez `maisoncerya.com` ou `maisoncerya.dz`
2. Dans Netlify → **Domain settings** → **Add custom domain**
3. Suivez les instructions pour pointer le domaine vers Netlify
4. Le **HTTPS** (cadenas de sécurité) est activé automatiquement

### Mettre à jour le site après des modifications

Si vous modifiez un fichier (texte, couleur, etc.) :

1. Connectez-vous à Netlify
2. Allez dans **Deploys**
3. Faites glisser de nouveau le dossier complet
4. Le site est mis à jour en quelques secondes

---

## 11. ❓ Questions fréquentes

### "J'ai connecté Shopify mais les produits ne s'affichent pas"

- Vérifiez que le **domain** dans `js/app.js` est correct (avec `.myshopify.com`)
- Vérifiez que le **token** est bien celui de la Storefront API (pas l'Admin API)
- Vérifiez que les permissions sont bien cochées (étape 4.9)
- Ouvrez la **console du navigateur** (F12 → onglet Console) pour voir les messages d'erreur

### "Les produits de démo s'affichent encore"

- Le site est toujours en mode démo. Vérifiez que vous avez bien remplacé `YOUR-STORE.myshopify.com` et `YOUR-TOKEN-HERE` dans `js/app.js`

### "Le panier ne se vide pas"

- Le panier est sauvegardé dans le navigateur (localStorage). Pour le vider manuellement : ouvrez la console (F12) et tapez `localStorage.removeItem('maisoncerya_cart')` puis rechargez la page.

### "Comment changer la devise ?"

- Les prix viennent de Shopify. Configurez la devise dans **Shopify** → **Paramètres** → **Marchés**
- Le symbole "DA" est ajouté automatiquement par le code JavaScript

### "Le formulaire de contact ne fonctionne pas"

- En mode démo, le formulaire affiche juste un message de confirmation. Pour qu'il envoie vraiment des emails, vous devez le connecter à un service comme [Formspree](https://formspree.io/) (gratuit) ou [EmailJS](https://www.emailjs.com/)

### "Comment ajouter une promotion ou un prix barré ?"

- Dans Shopify, quand vous modifiez un produit, remplissez le champ **"Prix comparatif"** (Compare at price). Le site affichera l'ancien prix barré à côté du nouveau prix.

### "Le site est lent"

- Optimisez vos images (utilisez [tinypng.com](https://tinypng.com/) pour les réduire)
- Les images de produits dans Shopify sont optimisées automatiquement

### "Je veux que quelqu'un d'autre gère le site"

- Pour les produits/commandes : ajoutez cette personne comme **collaborateur** dans Shopify
- Pour le design/contenu : cette personne aura besoin d'accéder aux fichiers HTML et de les modifier

---

## 📞 Besoin d'aide ?

- **Produits & commandes** : Consultez l'aide de [Shopify](https://help.shopify.com/fr)
- **API Shopify** : [Documentation Shopify Buy SDK](https://shopify.github.io/js-buy-sdk/)
- **Hébergement** : [Documentation Netlify](https://docs.netlify.com/)

---

_Ce README a été créé pour le projet Maison Cerya. Dernière mise à jour : Avril 2026._
