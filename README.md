# Ecolab — application web

Application Ecolab construite avec Vite, React et TypeScript. Les fonctionnalités reprises comprennent le tableau de bord, la gestion des élèves, les classes, les présences, les paiements et les paramètres. À ce stade, les données sont stockées dans le navigateur (`localStorage`) ; l’authentification et la synchronisation Supabase ne sont pas encore intégrées.

## Prérequis

- Node.js 20 ou supérieur
- npm

## Installation et lancement

```bash
npm install
npm run dev
```

Vite affiche l’adresse de développement dans le terminal.

## Vérifications

```bash
npm run lint
npm run build
```

Le site compilé est produit dans `dist/`.

## Structure

- `src/App.tsx` : pages et logique des fonctionnalités
- `src/components/` : composants d’interface réutilisables
- `src/hooks/usePersistedState.ts` : persistance navigateur
- `src/data.ts` : données de démonstration
- `src/styles.css` : styles
- `ecolab-supabase-schema.sql` : schéma SQL de démarrage Supabase, à appliquer uniquement lors de l’intégration backend

## Variables d’environnement

`.env.example` est un modèle sans identifiants. Le fichier `.env` local est volontairement exclu de l’archive et ignoré par Git. Aucune variable Supabase n’est actuellement consommée par l’application.
