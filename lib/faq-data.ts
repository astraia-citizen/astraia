/**
 * FAQ data - shared between client component and server schema
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Combien de temps prend une refonte ?',
    answer: 'Entre 2 et 6 semaines selon la complexité. Nous commençons par un audit de 48h, puis itérons par sprints hebdomadaires. Vous gardez le contrôle à chaque étape.',
  },
  {
    question: 'Dois-je fournir le contenu ?',
    answer: 'Idéalement oui, vous connaissez votre métier mieux que personne. Mais nous pouvons vous accompagner : structure SEO, réécriture orientée conversion, banque d\'images libres de droits.',
  },
  {
    question: 'Y a-t-il un engagement de durée ?',
    answer: 'Aucun. Vous êtes propriétaire du code source et pouvez héberger où vous voulez. Nous proposons une maintenance optionnelle mensuelle, résiliable à tout moment.',
  },
  {
    question: 'Qui héberge le site ?',
    answer: 'Vous choisissez. Nous configurons tout chez votre hébergeur actuel (OVH, O2Switch...) ou recommandons des solutions modernes (Vercel, Netlify). Docker inclus pour VPS.',
  },
  {
    question: 'Le site sera-t-il vraiment plus rapide ?',
    answer: 'Garanti. Nous visons un LCP mobile < 2s et un score Lighthouse ≥ 90. Si nous n\'atteignons pas ces objectifs, nous corrigeons sans surcoût.',
  },
  {
    question: 'Que se passe-t-il après la mise en ligne ?',
    answer: 'Formation à l\'administration, documentation complète, suivi Google Search Console pendant 30 jours. Support email illimité le premier mois.',
  },
];
