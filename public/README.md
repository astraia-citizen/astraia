# Public Assets

Ce dossier contient les assets publics du site Astraia.

## Structure

```
public/
├── screens/
│   ├── before.webp          # Screenshot "avant refonte"
│   ├── after.webp           # Screenshot "après refonte"
│   ├── pagespeed.webp       # Screenshot PageSpeed Insights
│   ├── portfolio-example.webp # Exemple de réalisation
│   └── demo.mp4             # Vidéo de démonstration
├── logos/
│   ├── client-1.svg         # Logo client 1
│   ├── client-2.svg         # Logo client 2
│   └── client-3.svg         # Logo client 3
├── favicon.ico
├── logo.png
├── og-image.jpg             # Image Open Graph
└── robots.txt
```

## Images requises

Placez vos vraies images dans ce dossier. Les dimensions recommandées :

- **before.webp / after.webp** : 1200x800px minimum
- **pagespeed.webp** : Screenshot réel de PageSpeed Insights
- **portfolio-example.webp** : 1600x1200px, format 4:3
- **demo.mp4** : Vidéo 30-60s, max 5MB, résolution 1080p
- **logos clients** : SVG vectoriel de préférence
- **og-image.jpg** : 1200x630px pour réseaux sociaux
- **logo.png** : 512x512px minimum

## Placeholder

Le script `postinstall.mjs` crée automatiquement les dossiers `screens/` et `logos/` s'ils n'existent pas.

Pour tester en local sans images, Next.js affichera des erreurs mais le site fonctionnera. En production, assurez-vous d'avoir toutes les images.
