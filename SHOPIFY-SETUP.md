# Maison Cerya — Guide de Configuration Shopify

## Vue d'ensemble

Ce site web est conçu pour fonctionner avec **Shopify** comme système de gestion de stock (back-end). Le site affiche les produits depuis Shopify et redirige vers le checkout Shopify pour les commandes.

**Architecture :**

- **Front-end** : Site web statique (HTML/CSS/JS) — ce que vous avez ici
- **Back-end** : Shopify (gestion de stock, paiements, commandes)
- **Connexion** : Shopify Buy SDK (Storefront API)

---

## Étape 1 : Créer un compte Shopify

1. Allez sur [shopify.com](https://www.shopify.com/) et créez un compte
2. Choisissez un plan (le plan Basic suffit pour commencer)
3. Complétez la configuration de votre boutique :
   - Nom de la boutique : **Maison Cerya**
   - Devise : **DZD (Dinar algérien)**
   - Adresse : Votre adresse en Algérie

---

## Étape 2 : Ajouter vos produits dans Shopify

Dans le dashboard Shopify :

1. Allez dans **Produits** → **Ajouter un produit**
2. Pour chaque produit, remplissez :
   - **Titre** : Nom du produit (ex: "Robe Alger")
   - **Description** : Description détaillée
   - **Images** : Photos haute qualité du produit
   - **Prix** : Prix en DZD
   - **Stock** : Quantité disponible (activez le suivi de stock)
   - **Variantes** : Tailles (XS, S, M, L, XL) et couleurs
   - **Type de produit** : Catégorie (Robes, Ensembles, Accessoires)
   - **Tags** : "Nouveau", "Best-seller", "Édition limitée", etc.

3. Organisez vos produits en **Collections** :
   - Robes
   - Ensembles
   - Accessoires
   - Nouvelle Collection

---

## Étape 3 : Créer une application Storefront API

C'est cette étape qui connecte votre site web à Shopify.

1. Dans Shopify Admin, allez dans **Paramètres** → **Applications et canaux de vente**
2. Cliquez sur **Développer des applications** (en bas)
3. Cliquez **Créer une application** :
   - Nom : "Maison Cerya Website"
4. Dans l'application créée, allez dans **Configuration** → **Storefront API**
5. Cochez les accès suivants :
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
6. Cliquez **Enregistrer**
7. Allez dans **Identifiants de l'API** et copiez :
   - **Storefront API access token** (le token d'accès)

---

## Étape 4 : Connecter le site web à Shopify

Ouvrez le fichier `js/app.js` et modifiez les lignes de configuration :

```javascript
const SHOPIFY_CONFIG = {
  domain: "maison-cerya.myshopify.com", // Remplacez par votre domaine Shopify
  storefrontAccessToken: "votre-token-ici", // Collez votre token Storefront API
};
```

**Où trouver ces valeurs :**

- **domain** : C'est `votre-nom-de-boutique.myshopify.com` (visible dans Paramètres → Domaines)
- **storefrontAccessToken** : Le token copié à l'étape 3

---

## Étape 5 : Configurer les paiements

Dans Shopify Admin → **Paramètres** → **Paiements** :

### Pour l'Algérie, les options recommandées :

- **Paiement à la livraison (COD)** : Activez le paiement manuel
- **Virement bancaire** : Ajoutez vos coordonnées bancaires
- **CCP/Baridi Mob** : Ajoutez comme méthode de paiement manuelle

Pour ajouter un paiement manuel :

1. Allez dans **Paiements** → **Méthodes de paiement manuelles**
2. Cliquez **Créer un paiement personnalisé**
3. Ajoutez :
   - "Paiement à la livraison"
   - "Virement CCP / Baridi Mob"

---

## Étape 6 : Configurer la livraison

Dans **Paramètres** → **Expédition et livraison** :

1. Définissez vos zones de livraison :
   - **Alger** : Tarif livraison (ex: 400 DA)
   - **Autres wilayas** : Tarif livraison (ex: 600-800 DA)
2. Ou proposez la livraison gratuite au-dessus d'un certain montant

---

## Étape 7 : Héberger le site web

### Option A : Netlify (Gratuit — Recommandé)

1. Créez un compte sur [netlify.com](https://www.netlify.com/)
2. Faites glisser le dossier du site dans Netlify
3. Configurez votre domaine personnalisé (ex: maisoncerya.com)

### Option B : Vercel (Gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com/)
2. Uploadez le projet
3. Configurez votre domaine

### Option C : GitHub Pages (Gratuit)

1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres

---

## Étape 8 : Domaine personnalisé

1. Achetez un domaine (ex: maisoncerya.com ou maisoncerya.dz)
   - Fournisseurs recommandés : Namecheap, GoDaddy, ou un registrar algérien
2. Configurez les DNS vers votre hébergeur (Netlify, Vercel, etc.)
3. Activez le HTTPS (automatique sur Netlify/Vercel)

---

## Structure des fichiers

```
Maison Cerya site/
├── index.html          # Page d'accueil
├── shop.html           # Page boutique (catalogue)
├── product.html        # Page détail produit
├── about.html          # Page "Notre Histoire"
├── contact.html        # Page contact
├── css/
│   └── style.css       # Styles globaux
├── js/
│   └── app.js          # JavaScript + Shopify integration
└── SHOPIFY-SETUP.md    # Ce guide
```

---

## Personnalisations

### Ajouter vos images

Les images du site sont actuellement des placeholders (zones grises). Pour les remplacer :

1. **Produits** : Les images sont chargées automatiquement depuis Shopify une fois connecté
2. **Hero (page d'accueil)** : Remplacez le gradient dans `.hero` par une image de fond dans `css/style.css` :
   ```css
   .hero {
     background: url("../images/hero.jpg") center/cover no-repeat;
   }
   ```
3. **Instagram** : Ajoutez vos photos dans les éléments `.insta-placeholder`
4. **About** : Ajoutez vos photos dans les éléments `.about-image`

### Modifier les couleurs

Dans `css/style.css`, modifiez les variables CSS au début du fichier :

```css
:root {
  --color-warm: #c9a96e; /* Couleur dorée/accent */
  --color-warm-dark: #b8944f; /* Variante foncée */
  /* ... */
}
```

### Modifier les textes

Tous les textes sont dans les fichiers HTML. Ouvrez-les et modifiez directement.

---

## Fonctionnalités du site

- ✅ Page d'accueil avec hero, collections, produits phares
- ✅ Boutique avec filtres par catégorie et tri
- ✅ Page détail produit (tailles, couleurs, quantité)
- ✅ Panier avec gestion des quantités (sauvegardé localement)
- ✅ Checkout via Shopify
- ✅ Page "Notre Histoire"
- ✅ Page contact avec formulaire
- ✅ Newsletter
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Barre d'annonce
- ✅ Recherche
- ✅ Animations au scroll
- ✅ Lien Instagram

---

## Support

Pour toute question technique, consultez :

- [Documentation Shopify Buy SDK](https://shopify.github.io/js-buy-sdk/)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
