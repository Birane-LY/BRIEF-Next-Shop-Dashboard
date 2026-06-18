# Next-Shop Dashboard

Interface d'administration e-commerce — Single Page Application (SPA) React + Vite

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Installation et lancement](#2-installation-et-lancement)
3. [Installation des bibliothèques](#3-installation-des-bibliothèques)
4. [Architecture et découpage des composants](#4-architecture-et-découpage-des-composants)
5. [Gestion de la donnée](#5-gestion-de-la-donnée)
6. [Wireframe minimaliste](#6-wireframe-minimaliste)

---

## 1. Présentation du projet

Next-Shop Dashboard est une interface d'administration conçue pour permettre à un e-commerçant de piloter son activité depuis un espace centralisé. L'application est une Single Page Application (SPA) : elle ne recharge jamais la page entière, seule la zone de contenu change lors de la navigation, ce qui offre une expérience fluide et instantanée.

Elle propose trois fonctionnalités principales :

- Un tableau de bord avec les statistiques clés de la boutique (KPIs et graphiques Recharts)
- Un catalogue produits sous forme de tableau interactif (MUI) avec un système d'alerte de stock dynamique à quatre niveaux (critique, faible, limité, en stock) et des prix formatés via `.toLocaleString()`
- Une page de détail produit accessible via une URL dynamique (`/produits/:id`), avec gestion des cas d'erreur si l'identifiant est introuvable

Les données sont simulées localement via des fichiers mock JavaScript. Aucune API externe n'est requise pour faire tourner le projet.

Stack : React 18, Vite 5, Tailwind CSS v4, Material UI v5, React Router DOM v6, Recharts, SCSS.

---

## 2. Installation et lancement

### Prérequis

- Node.js version 18 ou supérieure
- npm version 9 ou supérieure

Vérifier les versions installées :

```bash
node -v
npm -v
```

### Étapes

**Cloner le dépôt**

```bash
git clone https://github.com/Birane-LY/BRIEF-Next-Shop-Dashboard.git
```

**Se placer dans le dossier React du projet**

Le projet React se trouve dans le sous-dossier `Next/`, pas à la racine du repo.

```bash
cd BRIEF-Next-Shop-Dashboard/Next
```

**Installer les dépendances**

```bash
npm install
```

**Lancer le serveur de développement**

```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173` (port par défaut de Vite).

### Scripts disponibles

```bash
npm run dev      # Lance le serveur de développement
npm run build    # Génère le build de production dans /dist
npm run preview  # Prévisualise le build de production localement
```

---

## 3. Installation des bibliothèques

Cette section documente toutes les commandes d'installation dans l'ordre chronologique de mise en place du projet.

### 3.1 Création du projet avec Vite

```bash
npm create vite@latest Next -- --template react
cd Next
npm install
```

### 3.2 Tailwind CSS v4

Tailwind CSS v4 s'installe via un plugin Vite natif, sans fichier `tailwind.config.js`.

```bash
npm install tailwindcss @tailwindcss/vite
```

Configuration dans `vite.config.js` :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Import dans `src/App.css` :

```css
@import 'tailwindcss';
```

Note : avec Tailwind v4, la directive `@import 'tailwindcss'` remplace les trois directives `@tailwind base`, `@tailwind components` et `@tailwind utilities` utilisées en v3.

### 3.3 Material UI

MUI est utilisé pour les icônes (Sidebar, NavBar) et les composants de tableau (TableContainer, TableHead, TableBody, etc.). L'installation du package d'icônes requiert obligatoirement ses dépendances de style (Emotion).

```bash
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
```

Détail des packages :

- `@mui/icons-material` — bibliothèque d'icônes SVG React
- `@mui/material` — composants UI (Table, Button, Paper, etc.)
- `@emotion/react` — moteur CSS-in-JS requis par MUI
- `@emotion/styled` — API `styled()` requise par MUI

### 3.4 React Router DOM

```bash
npm install react-router-dom
```

Hooks utilisés dans le projet :

- `useParams()` — extrait le paramètre dynamique `:id` de l'URL
- `useNavigate()` — redirige l'utilisateur par programmation

### 3.5 Recharts

```bash
npm install recharts
```

Utilisé pour les graphiques de statistiques sur la page Dashboard.

### 3.6 SASS

```bash
npm install -D sass
```

Installé en dépendance de développement (flag `-D`). Permet d'utiliser des fichiers `.scss` par composant.

### Récapitulatif — toutes les commandes dans l'ordre

```bash
npm create vite@latest Next -- --template react
cd Next
npm install
npm install tailwindcss @tailwindcss/vite
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
npm install react-router-dom
npm install recharts
npm install -D sass
npm run dev
```

---

## 4. Architecture et découpage des composants

### Structure des fichiers

```
src/
├── main.jsx                    Point d'entrée — monte App dans le DOM
├── App.jsx                     Racine — configure BrowserRouter et les Routes
│
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx          Composant parent structurel
│   │   └── layout.scss
│   ├── Sidebar/
│   │   ├── Sidebar.jsx         Enfant de Layout — menu de navigation latéral
│   │   └── sidebar.scss
│   └── NavBar/
│       ├── NavBar.jsx          Enfant de Layout — barre supérieure
│       └── navbar.scss
│
├── pages/
│   ├── Dashboard/
│   │   ├── Dashboard.jsx       Page injectée dans Layout via children
│   │   └── dashboard.scss
│   ├── Products/
│   │   ├── Products.jsx        Tableau MUI + logique de stock dynamique
│   │   └── table.scss
│   └── ProductDetail/
│       ├── ProductDetail.jsx   Page /produits/:id
│       └── productDetail.scss
│
└── data/
    └── productsMock.js         Source de données locale (mock)
```

### Hiérarchie parent / enfants

`Layout` est le composant parent structurel. Il rend `Sidebar` et `NavBar` une seule fois, et injecte la page active via la prop spéciale `children`.

```
App
└── Layout                  (parent structurel)
    ├── Sidebar             (enfant fixe)
    ├── NavBar              (enfant fixe)
    └── {children}          (zone dynamique — page active)
        ├── Dashboard
        ├── Products
        └── ProductDetail
```

### Le rôle de `children` dans Layout

```jsx
// Layout.jsx
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <NavBar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
```

```jsx
// App.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Layout><Dashboard /></Layout>} />
        <Route path="/produits"   element={<Layout><Products /></Layout>} />
        <Route path="/produits/:id" element={<Layout><ProductDetail /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
```

Sidebar et NavBar ne se rechargent jamais. Seul le contenu entre `{children}` change lors de la navigation.

### Composants MUI utilisés dans le tableau

```
TableContainer (component={Paper})   Enveloppe avec fond blanc et ombre
└── Table
    ├── TableHead                    En-tête — titres des colonnes
    │   └── TableRow
    │       └── TableCell (x N)
    └── TableBody                    Corps — lignes de données
        └── TableRow (x produit)     Généré par .map()
            └── TableCell (x N)
```

La méthode `.map()` parcourt le tableau `productsMock` et transforme chaque objet produit en un `TableRow`. La prop `key={product.id}` est obligatoire dans une boucle `.map()` pour permettre à React d'identifier chaque ligne de manière unique.

---

## 5. Gestion de la donnée

Il n'y a pas de state global (pas de Redux, pas de Context API). Les données sont lues depuis un fichier mock statique à chaque affichage.

**Source unique de vérité :** `src/data/productsMock.js`

### Tableau récapitulatif

| Donnée | Emplacement | Mécanisme |
| --- | --- | --- |
| Catalogue produits | `data/productsMock.js` | Objet JS exporté, lu directement |
| Produit sélectionné | `ProductDetail.jsx` | `useParams()` puis accès par clé dans l'objet |
| Statut de stock | Fonction `getStockStatus()` | Retourne un objet `{ label, class }` |
| Navigation entre pages | React Router DOM | `<Link>`, `useNavigate()`, `<Route>` |

### La fonction `getStockStatus()`

Cette fonction centralise la logique d'alerte de stock. Elle prend la quantité disponible en paramètre et retourne un objet contenant le texte à afficher et la classe CSS correspondante.

```js
function getStockStatus(stock) {
  if (stock <= 3)  return { label: 'Stock critique', class: 'stock-critical' }
  if (stock <= 10) return { label: 'Stock faible',   class: 'stock-low'      }
  if (stock <= 20) return { label: 'Stock limité',   class: 'stock-medium'   }
  return           { label: 'En stock',              class: 'stock-high'     }
}
```

Usage dans le JSX :

```jsx
const stockInfo = getStockStatus(product?.stocks)

<span className={`status ${stockInfo.class}`}>
  {stockInfo.label}
</span>
```

L'opérateur `?.` (optional chaining) sur `product?.stocks` évite un crash si le produit est `undefined` au moment du rendu.

Dans `table.scss`, chaque classe reçoit une couleur :

```scss
.status {
  &.stock-critical { color: #d32f2f; }
  &.stock-low      { color: #f57c00; }
  &.stock-medium   { color: #fbc02d; }
  &.stock-high     { color: #388e3c; }
}
```

### Formatage des prix avec `.toLocaleString()`

```js
// Sans formatage
120000

// Avec .toLocaleString()
(120000).toLocaleString()   // "120 000" en FR, "120,000" en EN
```

Cette méthode native de JavaScript ajoute automatiquement les séparateurs de milliers selon la langue du navigateur de l'utilisateur.

### Récupération d'un produit via l'URL

```jsx
// ProductDetail.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { productsData } from '../data/productsMock'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = productsData[id]

  if (!product) {
    return (
      <div>
        <p>Produit non trouvé.</p>
        <button onClick={() => navigate('/produits')}>Retour aux produits</button>
      </div>
    )
  }

  const stockInfo = getStockStatus(product?.stocks)
  // ...
}
```

`useParams()` extrait la valeur `:id` depuis l'URL (ex: `/produits/12342` → `id = '12342'`). Cette valeur sert de clé pour accéder directement au produit dans l'objet `productsData`. Si l'identifiant n'existe pas, un message d'erreur s'affiche avec un bouton de retour.

---

## 6. Wireframe minimaliste

### Vue principale — Dashboard et Catalogue

```
+----------------------------------------------------------+
|  NavBar                                       Profil     |
+------------------+---------------------------------------+
|                  |                                       |
|  SIDEBAR         |   ZONE CONTENU  (children)            |
|                  |                                       |
|  Dashboard       |   +----------+ +----------+ +------+  |
|                  |   | CA Total | | Produits | | Cmds |  |
|  Produits        |   | 120 000  | |    48    | |  12  |  |
|                  |   +----------+ +----------+ +------+  |
|  Ajouter         |                                       |
|                  |   +-----------------------------------+|
|                  |   | Tableau Produits (MUI)            ||
|                  |   | Image | Nom       | Prix  | Stock ||
|                  |   |  [x]  | Produit A | 15000 | OK   ||
|                  |   |  [x]  | Produit B |  8500 | Lim. ||
|                  |   |  [x]  | Produit C |  4200 | Crit.||
|                  |   +-----------------------------------+|
|                  |                                       |
+------------------+---------------------------------------+
```

### Vue détail produit — `/produits/:id`

```
+----------------------------------------------------------+
|  NavBar                                       Profil     |
+------------------+---------------------------------------+
|                  |                                       |
|  SIDEBAR         |  < Retour aux produits                |
|                  |                                       |
|  Dashboard       |  +-----------+  Nom du produit        |
|                  |  |           |  Prix : 32 000 FCFA    |
|  Produits  <--   |  |  [Image]  |  Categorie : Vetements |
|  (actif)         |  |           |                        |
|                  |  +-----------+  Stock :               |
|                  |                 Stock critique (3)    |
|                  |                                       |
|                  |  Description du produit...            |
|                  |                                       |
+------------------+---------------------------------------+
```

---

## Auteur

Birane LY — Formation Développement Web & Mobile  
[github.com/Birane-LY](https://github.com/Birane-LY)