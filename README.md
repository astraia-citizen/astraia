# Astraia - Site Vitrine Premium

Site vitrine moderne orienté SEO local et conversion. Stack Next.js 15, Tailwind CSS, déploiement Docker.

## ✨ Caractéristiques

- ✅ **Performance**: LCP mobile < 2s, scores Lighthouse ≥ 90
- ✅ **SEO**: Metadata complets, JSON-LD (Organization, LocalBusiness, FAQ), sitemap
- ✅ **Conversion**: Formulaire avec captcha HMAC + honeypot, rate limiting
- ✅ **Design**: Palette premium, micro-interactions, secret interactions (Konami code, triple tap)
- ✅ **Accessibilité**: WCAG AA, contrastes OK, labels ARIA, focus visibles
- ✅ **Code**: NASA rules (assertions, fonctions courtes, validation I/O), TypeScript strict
- ✅ **Production**: Docker multi-stage, standalone, healthcheck, logs propres

## 🚀 Installation Locale

### Prérequis

- Node.js 20 LTS ou supérieur
- npm, pnpm ou yarn

### Étapes

1. **Cloner et installer**

```bash
git clone <repo-url> astraia
cd astraia
npm install
# ou: pnpm install
```

2. **Configuration environnement**

Copier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Renseigner les 3 variables obligatoires dans `.env.local` :

```env
RESEND_API_KEY=re_Mr9dwgr1_DtZxNVNm56CVPGkzNtcSCiux
LEADS_TO=astraia.holding@gmail.com
CAPTCHA_SECRET=long_random_secret_value_minimum_32_characters_for_hmac_security_2024
```

**Variables optionnelles** :

```env
SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=+33123456789
GOOGLE_SITE_VERIFICATION=your-verification-code
```

3. **Ajouter les images**

Placer vos images dans :
- `public/screens/` : before.webp, after.webp, pagespeed.webp, portfolio-example.webp, demo.mp4
- `public/logos/` : client-1.svg, client-2.svg, client-3.svg
- `public/` : favicon.ico, logo.png, og-image.jpg

Voir `public/README.md` pour les dimensions recommandées.

4. **Lancer en développement**

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🧪 Tests & Validation

### Vérification TypeScript

```bash
npm run typecheck
```

### Linter

```bash
npm run lint
```

### Build de production

```bash
npm run build
npm start
```

### Test du captcha

**Success flow** :
1. Cliquer "Demander une proposition"
2. Remplir le formulaire correctement
3. Répondre au captcha (ex: 5 + 3 = 8)
4. Laisser le champ `website` vide (honeypot)
5. Soumettre → Redirection `/thank-you`

**Failure flow** :
- Mauvaise réponse captcha → Erreur "Captcha invalide"
- Honeypot rempli → Erreur silencieuse (bot détecté)
- > 5 soumissions en 60s → Erreur 429 "Trop de tentatives"

## 🐳 Déploiement Docker

### Build et démarrage

```bash
npm run docker:build
npm run docker:up
```

Ou manuellement :

```bash
docker build -t astraia:latest .
docker run -p 80:3000 --env-file .env.production astraia:latest
```

### Avec docker-compose

1. Créer `.env.production` avec les 3 variables obligatoires
2. Lancer :

```bash
docker compose up -d
```

3. Vérifier :

```bash
docker compose ps
docker compose logs -f web
```

Le site est accessible sur [http://localhost](http://localhost)

### Healthcheck

Le conteneur expose un healthcheck sur `/api/captcha`. Vérifier :

```bash
docker inspect --format='{{.State.Health.Status}}' astraia-web
```

## 🌐 Déploiement VPS (Production)

### Option 1 : Docker + Nginx

1. **Installer Docker sur VPS**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

2. **Cloner le projet**

```bash
git clone <repo-url> /var/www/astraia
cd /var/www/astraia
```

3. **Configurer `.env.production`**

```bash
cp .env.example .env.production
nano .env.production
```

Renseigner `SITE_URL` avec votre domaine :

```env
SITE_URL=https://votre-domaine.fr
RESEND_API_KEY=re_Mr9dwgr1_DtZxNVNm56CVPGkzNtcSCiux
LEADS_TO=astraia.holding@gmail.com
CAPTCHA_SECRET=long_random_secret_value_minimum_32_characters_for_hmac_security_2024
```

4. **Lancer Docker**

```bash
docker compose up -d
```

5. **Configurer Nginx en reverse proxy**

Créer `/etc/nginx/sites-available/astraia` :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr www.votre-domaine.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer :

```bash
ln -s /etc/nginx/sites-available/astraia /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

6. **HTTPS avec Certbot**

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d votre-domaine.fr -d www.votre-domaine.fr
```

### Option 2 : Docker + Caddy (plus simple)

1. **Installer Caddy**

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
```

2. **Configurer Caddyfile**

Éditer `/etc/caddy/Caddyfile` :

```caddy
votre-domaine.fr, www.votre-domaine.fr {
    reverse_proxy localhost:3000
    encode gzip
    log {
        output file /var/log/caddy/astraia.log
    }
}
```

3. **Redémarrer Caddy**

```bash
systemctl reload caddy
```

Caddy gère automatiquement HTTPS via Let's Encrypt.

### Option 3 : Docker + Traefik

Modifier `docker-compose.yml` pour inclure Traefik :

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/etc/traefik/traefik.yml:ro
      - ./acme.json:/acme.json
    networks:
      - web

  web:
    build: .
    image: astraia:latest
    container_name: astraia-web
    restart: unless-stopped
    env_file: .env.production
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.astraia.rule=Host(`votre-domaine.fr`, `www.votre-domaine.fr`)"
      - "traefik.http.routers.astraia.entrypoints=websecure"
      - "traefik.http.routers.astraia.tls.certresolver=letsencrypt"
      - "traefik.http.services.astraia.loadbalancer.server.port=3000"
    networks:
      - web

networks:
  web:
    external: true
```

Créer `traefik.yml` :

```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: votre@email.com
      storage: /acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false
```

Créer réseau et lancer :

```bash
docker network create web
touch acme.json
chmod 600 acme.json
docker compose up -d
```

## 📊 Monitoring & Logs

### Voir les logs

```bash
docker compose logs -f web
```

### Health status

```bash
curl http://localhost:3000/api/captcha
# Devrait retourner un JSON avec a, b, nonce, mac
```

### Métriques

Utiliser un service externe type :
- **Uptime monitoring** : UptimeRobot, Pingdom
- **Analytics** : Plausible, Google Analytics
- **Performance** : PageSpeed Insights, WebPageTest

## 🔐 Sécurité

- ✅ Pas de secrets en variables client (`NEXT_PUBLIC_*`)
- ✅ Captcha HMAC côté serveur
- ✅ Honeypot anti-bot
- ✅ Rate limiting en mémoire
- ✅ Conteneur read-only avec tmpfs
- ✅ User non-root dans Docker
- ✅ Headers sécurisés (à configurer dans Nginx/Caddy)

### Headers recommandés (Nginx)

Ajouter dans le bloc `server` :

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

## 🛠️ Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Développement local (port 3000) |
| `npm run build` | Build de production |
| `npm start` | Lancer le build de production |
| `npm run lint` | Vérifier le code avec ESLint |
| `npm run typecheck` | Vérifier TypeScript |
| `npm run docker:build` | Build image Docker |
| `npm run docker:up` | Lancer avec docker-compose |
| `npm run docker:down` | Arrêter docker-compose |

## 📁 Structure du projet

```
astraia/
├── app/
│   ├── layout.tsx              # Layout racine avec metadata
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles Tailwind
│   ├── thank-you/              # Page de remerciement
│   ├── (campaign)/[slug]/      # Pages campagne sans nav
│   └── api/
│       ├── captcha/route.ts    # Génération challenge captcha
│       └── contact/route.ts    # Soumission formulaire
├── components/
│   ├── Header.tsx              # Header avec tel sticky mobile
│   ├── Hero.tsx                # Section hero avec CTA
│   ├── Story.tsx               # PAS/BAB
│   ├── Proof.tsx               # Logos, témoignages, badges
│   ├── Features.tsx            # Avant/après, perf, démo
│   ├── FAQ.tsx                 # Questions fréquentes
│   ├── CTA.tsx                 # Modal formulaire + captcha
│   ├── FooterBare.tsx          # Footer minimal
│   └── SecretInteractions.tsx  # Easter eggs
├── lib/
│   ├── utils.ts                # Utilitaires généraux
│   ├── validators.ts           # Validation Zod
│   ├── captcha.ts              # Helpers HMAC
│   ├── rateLimit.ts            # Rate limiting mémoire
│   ├── seo.ts                  # Helpers metadata
│   └── schema.ts               # Builders JSON-LD
├── public/
│   ├── screens/                # Images démonstration
│   ├── logos/                  # Logos clients
│   └── robots.txt
├── scripts/
│   └── postinstall.mjs         # Vérifications post-install
├── Dockerfile                  # Multi-stage production
├── docker-compose.yml          # Orchestration Docker
├── .env.example                # Template environnement
├── next.config.js              # Config Next.js standalone
├── tailwind.config.ts          # Palette Astraia
└── README.md
```

## 🎨 Palette de couleurs

```css
--base: #0D1624      /* Fond principal */
--gold: #D5A04C      /* Titres, CTA secondaire */
--accent: #4BA3F0    /* Hover, liens */
--lightgold: #E4BB6C /* Variante gold sur base */
--white: #FFFFFF     /* Texte principal */
```

## 🎯 Checklist de mise en production

- [ ] Variables d'environnement renseignées dans `.env.production`
- [ ] `SITE_URL` configuré avec le domaine réel
- [ ] Images ajoutées dans `public/screens/` et `public/logos/`
- [ ] `favicon.ico`, `logo.png`, `og-image.jpg` présents
- [ ] Build Docker réussit : `npm run docker:build`
- [ ] Conteneur démarre : `npm run docker:up`
- [ ] Healthcheck OK : `docker inspect astraia-web`
- [ ] Nginx/Caddy configuré en reverse proxy
- [ ] HTTPS activé (Let's Encrypt)
- [ ] DNS pointé vers le VPS
- [ ] Test formulaire de contact (succès + échecs)
- [ ] Lighthouse mobile : Perf ≥ 90, A11y ≥ 95
- [ ] JSON-LD valides : https://search.google.com/test/rich-results
- [ ] Sitemap accessible : `https://votre-domaine.fr/sitemap.xml`
- [ ] Monitoring uptime configuré

## 📞 Support

- **Email** : astraia.holding@gmail.com
- **Documentation Next.js** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Docker** : https://docs.docker.com

## 📄 Licence

Propriétaire - Tous droits réservés © 2024 Astraia

---

Construit avec ❤️ par l'équipe Astraia
