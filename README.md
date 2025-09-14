# Road Quiz Suisse

Site d’entraînement au code de la route suisse (panneaux, priorités, sécurité) avec conservation de vos résultats via Convex.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Convex (backend serverless) – URL dev/prod via `NEXT_PUBLIC_CONVEX_URL`

## Démarrage
1. Installez les dépendances.
2. Lancez Convex en dev pour obtenir l’URL et copiez-la dans `.env.local`.
3. Démarrez le site.

Variables d’environnement:
- `NEXT_PUBLIC_CONVEX_URL` – URL Convex (dev ou prod).

## Ajout de questions
- Voir les pages dans `app/quiz/*` et suivez l’exemple. Les images SVG sont dans `public/svg`.

## Avertissement
Contenu non-officiel. Référez-vous à la LCR et aux ordonnances (OSR) pour les textes applicables.
