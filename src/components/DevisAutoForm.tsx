import { useState } from 'react';

type Etape = 1 | 2 | 3 | 4 | 5;

const PROFILS = [
  { id: 'malus', label: 'Malussé', emoji: '📉' },
  { id: 'resilie', label: 'Résilié', emoji: '❌' },
  { id: 'suspendu', label: 'Permis suspendu', emoji: '🚫' },
  { id: 'alcool', label: 'Alcoolémie / stupéfiants', emoji: '🍷' },
  { id: 'jeune', label: 'Jeune conducteur malussé', emoji: '🔰' },
  { id: 'pro', label: 'Véhicule professionnel', emoji: '🚐' },
];

const USAGES = [
  { id: 'perso', label: 'Personnel' },
  { id: 'pro', label: 'Professionnel' },
  { id: 'mixte', label: 'Mixte' },
];

const FORMULES = [
  { id: 'tiers', label: 'Au tiers', desc: 'Minimum légal' },
  { id: 'intermediaire', label: 'Tiers +', desc: 'Vol, incendie, bris de glace' },
  { id: 'tous-risques', label: 'Tous risques', desc: 'Protection maximale' },
];

const COEF_OPTIONS = ['1.00 - 1.25', '1.25 - 1.50', '1.50 - 2.00', '2.00 - 2.50', '2.50 - 3.50', 'Je ne sais pas'];

export default function DevisAutoForm() {
  const [etape, setEtape] = useState<Etape>(1);
  const [profil, setProfil] = useState('');
  const [usage, setUsage] = useState('');
  const [formule, setFormule] = useState('');
  const [coef, setCoef] = useState('');
  const [vehicule, setVehicule] = useState({ marque: '', modele: '', annee: '', immatriculation: '' });
  const [conducteur, setConducteur] = useState({ nom: '', prenom: '', email: '', telephone: '', datePermis: '', dateNaissance: '' });
  const [submitted, setSubmitted] = useState(false);

  const progress = ((etape - 1) / 4) * 100;

  function canNext(): boolean {
    if (etape === 1) return !!profil;
    if (etape === 2) return !!usage && !!formule && !!coef;
    if (etape === 3) return !!vehicule.marque && !!vehicule.annee;
    if (etape === 4) return !!conducteur.nom && !!conducteur.email && !!conducteur.telephone;
    return false;
  }

  function next() {
    if (canNext() && etape < 5) setEtape((etape + 1) as Etape);
  }
  function prev() {
    if (etape > 1) setEtape((etape - 1) as Etape);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const btnCls = (active: boolean) =>
    `px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
      active
        ? 'bg-brand text-white border-brand shadow-sm'
        : 'bg-white text-ink/70 border-border hover:border-brand/50 hover:text-ink'
    }`;

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-border bg-white text-ink text-sm outline-none focus:border-brand transition-colors placeholder:text-muted/50';

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display text-2xl font-bold text-ink mb-2">Demande envoyée</h3>
        <p className="text-muted max-w-md mx-auto">
          Votre demande de devis auto a été transmise. Vous recevrez une proposition par email sous 24h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">Étape {etape}/4</span>
        {etape > 1 && (
          <button onClick={prev} className="text-xs text-muted hover:text-brand transition-colors">← Retour</button>
        )}
      </div>
      <div className="h-1.5 bg-surface rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Étape 1 : Profil */}
      {etape === 1 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-2">Votre situation</h3>
          <p className="text-sm text-muted mb-6">Sélectionnez ce qui correspond le mieux</p>
          <div className="grid grid-cols-2 gap-3">
            {PROFILS.map(p => (
              <button key={p.id} onClick={() => setProfil(p.id)} className={btnCls(profil === p.id)}>
                <span className="text-xl block mb-1">{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 2 : Couverture */}
      {etape === 2 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-2">Votre besoin</h3>
          <p className="text-sm text-muted mb-6">Usage, formule et coefficient actuel</p>

          <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">Usage du véhicule</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {USAGES.map(u => (
              <button key={u.id} onClick={() => setUsage(u.id)} className={btnCls(usage === u.id)}>{u.label}</button>
            ))}
          </div>

          <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">Formule souhaitée</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {FORMULES.map(f => (
              <button key={f.id} onClick={() => setFormule(f.id)} className={btnCls(formule === f.id)}>
                <span className="block font-bold text-sm">{f.label}</span>
                <span className="block text-[10px] text-muted mt-0.5">{f.desc}</span>
              </button>
            ))}
          </div>

          <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">Coefficient bonus-malus actuel</label>
          <div className="grid grid-cols-2 gap-2">
            {COEF_OPTIONS.map(c => (
              <button key={c} onClick={() => setCoef(c)} className={btnCls(coef === c)}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 3 : Véhicule */}
      {etape === 3 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-2">Votre véhicule</h3>
          <p className="text-sm text-muted mb-6">Les informations de votre carte grise</p>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value={vehicule.marque} onChange={e => setVehicule(p => ({ ...p, marque: e.target.value }))} placeholder="Marque (Renault, Peugeot...)" className={inputCls} />
            <input type="text" value={vehicule.modele} onChange={e => setVehicule(p => ({ ...p, modele: e.target.value }))} placeholder="Modèle (Clio, 308...)" className={inputCls} />
            <input type="text" value={vehicule.annee} onChange={e => setVehicule(p => ({ ...p, annee: e.target.value }))} placeholder="Année (2020)" className={inputCls} />
            <input type="text" value={vehicule.immatriculation} onChange={e => setVehicule(p => ({ ...p, immatriculation: e.target.value }))} placeholder="Immatriculation (optionnel)" className={inputCls} />
          </div>
        </div>
      )}

      {/* Étape 4 : Coordonnées */}
      {etape === 4 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-2">Vos coordonnées</h3>
          <p className="text-sm text-muted mb-6">Pour recevoir votre devis personnalisé</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input type="text" value={conducteur.nom} onChange={e => setConducteur(p => ({ ...p, nom: e.target.value }))} placeholder="Nom" className={inputCls} />
            <input type="text" value={conducteur.prenom} onChange={e => setConducteur(p => ({ ...p, prenom: e.target.value }))} placeholder="Prénom" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input type="email" value={conducteur.email} onChange={e => setConducteur(p => ({ ...p, email: e.target.value }))} placeholder="Email" className={inputCls} />
            <input type="tel" value={conducteur.telephone} onChange={e => setConducteur(p => ({ ...p, telephone: e.target.value }))} placeholder="Téléphone" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">Date de naissance</label>
              <input type="date" value={conducteur.dateNaissance} onChange={e => setConducteur(p => ({ ...p, dateNaissance: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Date du permis</label>
              <input type="date" value={conducteur.datePermis} onChange={e => setConducteur(p => ({ ...p, datePermis: e.target.value }))} className={inputCls} />
            </div>
          </div>
        </div>
      )}

      {/* Bouton */}
      <button
        onClick={etape === 4 ? handleSubmit : next}
        disabled={!canNext()}
        className={`mt-8 w-full py-4 rounded-full font-bold text-base transition-all ${
          canNext()
            ? 'bg-brand text-white hover:-translate-y-0.5 hover:shadow-lift'
            : 'bg-surface text-muted cursor-not-allowed'
        }`}
      >
        {etape === 4 ? 'Recevoir mon devis gratuit' : 'Continuer'}
      </button>

      <p className="text-center text-[10px] text-muted mt-3">Gratuit, sans engagement, réponse sous 24h</p>
    </div>
  );
}
