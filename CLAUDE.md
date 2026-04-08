# CLAUDE.md - allomalus.fr

## Projet
Courtier digital spécialisé en assurance auto risques aggravés (malussés, résiliés, permis suspendus, alcoolémie).
Particuliers et professionnels (artisans BTP, livreurs, VTC).

## Stack
- **Astro 6** (SSG, static export) + **React 19** (islands) + **Tailwind CSS 3**
- Déploiement : **Netlify** (static)
- Node.js **v22+**

## Design
- Palette : brand orange `#F97316` (light `#FDBA74`, pale `#FFF7ED`, dark `#EA580C`), accent violet `#6B5CE7`, ink `#0F172A`
- Surfaces : `#F8FAFC` (surface), `#E2E8F0` (border), `#64748B` (muted)
- Typographies : Satoshi (display), Instrument Serif (serif/accent), Space Grotesk (body)
- Logo : "allomalus." en Satoshi Black, point orange
- Ton : vouvoiement simple, direct, rassurant mais pas commercial

## Fichiers clés
- `src/data/config.ts` → données centralisées (SITE, PROFILS, FAQ)
- `src/components/DevisAutoForm.tsx` → formulaire React 4 étapes
- `src/pages/index.astro` → landing page
- `src/layouts/Base.astro` → layout racine (SEO, fonts, header/footer)

## Réseau de sites (backlinks)
- **prossur.fr** → courtier décennale BTP (lien dans footer + article BTP)
- **formacourtage.fr** → formation courtier IAS (lien dans footer)
- **trefleassurance.fr** → courtier généraliste (lien dans footer, échange backlink)

## Commandes
```bash
npm run dev      # Dev server (port 4321)
npm run build    # Build statique → dist/
npm run preview  # Preview du build
```
