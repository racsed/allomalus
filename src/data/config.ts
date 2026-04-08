export const SITE = {
  name: 'allomalus.',
  tagline: 'Assurance auto malussé et résilié',
  phone: '',
  email: '',
  whatsapp: '+33631825992',
  url: 'https://allomalus.fr',
  siren: '815 205 067',
  orias: '16 000 722',
  address: '35 allée des Impressionnistes, 93420 Villepinte',
  director: 'Rachid Seddar',
};

export const PROFILS = [
  { id: 'malus', label: 'Malussé', emoji: '📉', desc: 'Coefficient supérieur a 1.00 après sinistres' },
  { id: 'resilie', label: 'Résilié', emoji: '❌', desc: 'Contrat résilié par votre assureur' },
  { id: 'suspendu', label: 'Permis suspendu', emoji: '🚫', desc: 'Suspension ou annulation de permis' },
  { id: 'alcool', label: 'Alcoolémie', emoji: '🍷', desc: 'Sinistre ou infraction sous alcool ou stupéfiants' },
  { id: 'jeune', label: 'Jeune conducteur', emoji: '🔰', desc: 'Permis de moins de 3 ans, malussé' },
  { id: 'pro', label: 'Véhicule pro', emoji: '🚐', desc: 'Utilitaire, flotte, artisan BTP' },
];

export const VEHICULES = [
  { id: 'auto', label: 'Voiture', emoji: '🚗', desc: 'Citadine, berline, SUV, coupé', from: '45' },
  { id: 'utilitaire', label: 'Utilitaire', emoji: '🚐', desc: 'Fourgon, camionnette, pick-up', from: '55' },
  { id: 'moto', label: 'Moto / Scooter', emoji: '🏍️', desc: '50cc a gros cube, scooter, trail', from: '35' },
  { id: 'camping-car', label: 'Camping-car', emoji: '🏕️', desc: 'Fourgon aménagé, camping-car', from: '60' },
];

export const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un conducteur malussé ?",
    a: "Un conducteur dont le coefficient bonus-malus dépasse 1.00 après un ou plusieurs sinistres responsables. Chaque sinistre responsable augmente le coefficient de 25%. A 1.25 ou plus, vous êtes considéré malussé par les assureurs.",
  },
  {
    q: "Mon assureur m'a résilié, que faire ?",
    a: "La résiliation par l'assureur est inscrite au fichier AGIRA pendant 5 ans. Vous restez assurable, mais chez des assureurs spécialisés. Allomalus travaille avec des compagnies qui acceptent les profils résiliés, avec des tarifs adaptés.",
  },
  {
    q: "Combien coûte une assurance malus ?",
    a: "Comptez 30 a 100% de plus qu'un contrat standard selon votre coefficient et l'historique. Un malussé a 1.50 avec un dossier propre depuis 2 ans trouvera des offres raisonnables. Un résilié pour alcoolémie paiera plus cher, mais c'est possible.",
  },
  {
    q: "Peut-on assurer un véhicule pro en étant malussé ?",
    a: "Oui. Artisans, commerçants, livreurs : votre utilitaire ou votre véhicule de société peut être assuré même avec un malus. Les tarifs sont adaptés a l'usage professionnel et au profil du conducteur.",
  },
  {
    q: "Combien de temps dure un malus ?",
    a: "Le malus diminue chaque année sans sinistre responsable. Après 2 ans sans sinistre, votre coefficient revient a 1.00. Si vous avez été résilié, l'inscription AGIRA reste 5 ans, mais les tarifs s'améliorent bien avant.",
  },
  {
    q: "Quels documents fournir pour un devis ?",
    a: "Permis de conduire, carte grise, relevé d'information (demandez-le a votre ancien assureur, il est obligé de vous le fournir), et éventuellement le courrier de résiliation. Avec ces 4 documents, on peut vous faire un devis en 24h.",
  },
];
