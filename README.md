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
8. [Personnaliser le contenu du site](#8--personnaliser-le-contenu-du-site)
9. [Ajouter vos images](#9--ajouter-vos-images)
10. [Mettre le site en ligne](#10--mettre-le-site-en-ligne)
11. [Questions fréquentes](#11--questions-fréquentes)

---

## 1. 🤔 C'est quoi ce projet ?

C'est le **site web e-commerce** de la marque Maison Cerya. Il permet à vos clientes de :

- Voir vos produits (robes, ensembles, accessoires)
- Filtrer et trier les produits
- Voir le détail d'un produit (photos, tailles, couleurs, description)
- Ajouter des articles au panier
- Passer commande (via Shopify)
- Lire votre histoire de marque
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

- ❌ Le texte de la page d'accueil (slogan, description)
- ❌ La barre d'annonce en haut ("Livraison disponible partout en Algérie")
- ❌ La page "Notre Histoire"
- ❌ La page "Contact"
- ❌ Le design et les couleurs
- ❌ Les images du héro (bannière), de la page About, et d'Instagram
- ❌ Les liens des réseaux sociaux
- ❌ Le formulaire de newsletter

---

## 3. 📁 Les fichiers : à quoi sert chaque fichier

Voici tous les fichiers du projet et ce qu'ils font :

```
Maison Cerya site/
│
├── index.html          ← Page d'accueil
├── shop.html           ← Page boutique (catalogue de tous les produits)
├── product.html        ← Page détail d'un produit
├── about.html          ← Page "Notre Histoire"
├── contact.html        ← Page "Contact"
│
├── css/
│   └── style.css       ← Tout le design visuel du site
│
├── js/
│   └── app.js          ← Le cerveau du site (logique, panier, Shopify)
│
├── images/             ← Vos images (à créer, voir section 9)
│
├── README.md           ← Ce fichier que vous lisez
└── SHOPIFY-SETUP.md    ← Guide technique Shopify (plus condensé)
```

### Détail de chaque fichier :

#### 📄 `index.html` — Page d'accueil

C'est la première page que vos clientes voient. Elle contient :

- La **barre d'annonce** noire en haut (ex: "Livraison disponible partout en Algérie")
- Le **menu de navigation** (Accueil, Boutique, Notre Histoire, Contact)
- Le **héro** (grande bannière avec le slogan "L'Élégance à l'Algérienne")
- Les **catégories** (Robes, Ensembles, Accessoires)
- Les **produits phares** (4 produits mis en avant)
- La **bannière histoire** ("Tradition & Modernité")
- Les **nouveautés** (4 derniers produits)
- Le **feed Instagram** (liens vers votre page Instagram)
- Le **formulaire newsletter**
- Le **pied de page** (footer) avec les liens et informations

#### 📄 `shop.html` — Page boutique

La page catalogue avec **tous** vos produits. Elle contient :

- Des **filtres** par catégorie (Tout, Robes, Ensembles, Accessoires)
- Un **tri** (par prix croissant/décroissant, par nom)
- La **grille de produits** (4 colonnes sur ordinateur, 2 sur mobile)
- Un bouton "**Ajouter au panier**" qui apparaît au survol de chaque produit

#### 📄 `product.html` — Page détail produit

Quand une cliente clique sur un produit, elle arrive ici. Cette page affiche :

- La **galerie d'images** du produit
- Le **nom** et le **prix**
- La **description**
- Le choix de **taille** (XS, S, M, L, XL)
- Le choix de **couleur**
- Le sélecteur de **quantité** (+ et −)
- Le bouton "**Ajouter au panier**"
- Des **onglets** avec : description détaillée, détails du produit, infos livraison
- Des **produits similaires** en bas

#### 📄 `about.html` — Page Notre Histoire

Présente votre marque avec :

- Votre **histoire d'origine** (pourquoi et comment la marque a été créée)
- Votre **vision** (héritage + modernité)
- Vos **valeurs** (Qualité, Authenticité, Intemporalité)

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

- La **connexion à Shopify** (récupérer les produits, créer des commandes)
- Les **produits de démonstration** (affichés quand Shopify n'est pas connecté)
- Le **panier** (ajouter, supprimer, modifier les quantités)
- La **sauvegarde du panier** (le panier est sauvegardé même si la cliente ferme le navigateur)
- Les **filtres et le tri** de la page boutique
- Le **menu mobile** (hamburger)
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

## 8. ✏️ Personnaliser le contenu du site

### Modifier le texte de la barre d'annonce

Ouvrez **n'importe quel fichier HTML** et trouvez :

```html
<div class="announcement-bar">
  <p>
    Livraison disponible partout en Algérie — Nouvelle collection disponible
  </p>
</div>
```

Changez le texte entre `<p>` et `</p>`.

> ⚠️ La barre d'annonce est présente dans **chaque** fichier HTML. Si vous la modifiez, faites-le dans les 5 fichiers (index.html, shop.html, product.html, about.html, contact.html).

### Modifier le slogan de la page d'accueil

Ouvrez **`index.html`** et cherchez :

```html
<h1 class="hero-title fade-up">L'Élégance<br />à l'Algérienne</h1>
```

Modifiez le texte entre les balises.

### Modifier le texte de la page "Notre Histoire"

Ouvrez **`about.html`** et modifiez les paragraphes `<p>` dans la section `about-text`.

### Modifier les informations de contact

Ouvrez **`contact.html`** et modifiez :

- L'adresse email
- L'adresse physique
- Les horaires
- Le lien Instagram

### Modifier les liens des réseaux sociaux

Dans **chaque fichier HTML**, dans le footer, cherchez les liens `<a href="...">` des icônes sociales et remplacez les URLs.

### Modifier les couleurs du site

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

### Image du héro (bannière d'accueil)

1. Placez votre image dans `images/hero.jpg`
2. Ouvrez **`css/style.css`**, trouvez la section `.hero` et remplacez le fond :

```css
.hero {
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../images/hero.jpg") center/cover no-repeat;
}
```

3. Ajoutez `color: white;` aux textes du héro si votre image est foncée.

### Images de la page About

1. Placez vos images dans `images/about-1.jpg` et `images/about-2.jpg`
2. Dans **`about.html`**, remplacez :

```html
<div class="about-image"></div>
```

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
