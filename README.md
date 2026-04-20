# Vnus — Traductrice cognitive

Interface React pour Vnus, l'IA traductrice cognitive pour conflits relationnels.

## Stack
- React 18 + Vite
- DM Sans + Cormorant Garamond (Google Fonts)
- Anthropic API (couche d'abstraction dans `src/ai/provider.js`)

## Lancer en local

```bash
npm install
npm run dev
```

## Déployer sur Vercel

1. Push sur GitHub
2. Importer le repo sur [vercel.com](https://vercel.com)
3. Framework preset : **Vite** (détecté automatiquement)
4. Deploy ✓

## Changer de modèle IA

Tout se passe dans `src/ai/provider.js` — un seul fichier à modifier pour switcher vers GPT-4, Mistral ou autre.

## Écrans disponibles

- **Accueil / Dashboard** — vue d'ensemble, état du lien, sessions récentes
- **Traduction** — interface principale de traduction cognitive avec l'IA
- **Profils cognitifs** — profils détaillés de chaque personne

## Structure

```
src/
  ai/
    provider.js       ← couche d'abstraction LLM
  components/
    Nav.jsx
    Dashboard.jsx
    Traduction.jsx
    Profils.jsx
  App.jsx
  main.jsx
  index.css
```
