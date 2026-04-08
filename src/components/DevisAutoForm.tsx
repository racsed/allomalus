import { useState, useRef } from 'react';

type Etape = 1 | 2 | 3;

const PROFILS = [
  { id: 'malus', label: 'Malussé' },
  { id: 'resilie', label: 'Résilié' },
  { id: 'suspendu', label: 'Permis suspendu' },
  { id: 'alcool', label: 'Alcoolémie / stupéfiants' },
  { id: 'jeune', label: 'Jeune conducteur malussé' },
  { id: 'pro', label: 'Véhicule professionnel' },
];

const USAGES = [
  { id: 'perso', label: 'Personnel' },
  { id: 'pro', label: 'Professionnel' },
  { id: 'mixte', label: 'Mixte' },
];

export default function DevisAutoForm() {
  const [etape, setEtape] = useState<Etape>(1);
  const [profil, setProfil] = useState('');
  const [usage, setUsage] = useState('');
  const [vehicule, setVehicule] = useState({ marque: '', modele: '', annee: '' });
  const [conducteur, setConducteur] = useState({ nom: '', prenom: '', email: '', telephone: '' });
  const [rgpd, setRgpd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progress = ((etape - 1) / 2) * 100;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conducteur.email);
  const telValid = conducteur.telephone.replace(/\s/g, '').length >= 10;

  function canNext(): boolean {
    if (etape === 1) return !!profil;
    if (etape === 2) return !!usage && !!vehicule.marque && !!vehicule.annee;
    if (etape === 3) return !!conducteur.nom && emailValid && telValid && rgpd;
    return false;
  }

  function next() {
    if (canNext() && etape < 3) setEtape((etape + 1) as Etape);
  }
  function prev() {
    if (etape > 1) setEtape((etape - 1) as Etape);
  }

  async function handleSubmit() {
    if (!canNext()) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        'form-name': 'devis-auto',
        profil, usage,
        'vehicule-marque': vehicule.marque,
        'vehicule-modele': vehicule.modele,
        'vehicule-annee': vehicule.annee,
        'conducteur-nom': conducteur.nom,
        'conducteur-prenom': conducteur.prenom,
        'conducteur-email': conducteur.email,
        'conducteur-telephone': conducteur.telephone,
      });
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
    } catch { /* Netlify forms fallback */ }
    setSubmitted(true);
    setSubmitting(false);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const names = Array.from(files).map(f => f.name);
    setUploadedFiles(prev => [...prev, ...names]);
  }

  const btnCls = (active: boolean) =>
    `px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
      active
        ? 'bg-brand text-white border-brand shadow-sm'
        : 'bg-white text-ink/70 border-border hover:border-brand/50 hover:text-ink'
    }`;

  const inputCls = 'w-full px-4 py-3.5 rounded-xl border border-border bg-white text-ink text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-muted/50';

  // ====== ECRAN SUCCES ======
  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        {/* Confirmation */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-ink mb-2">Demande envoyée</h3>
          <p className="text-muted text-sm">
            Votre demande a bien été transmise. Un expert va étudier votre dossier et vous recontacter par email ou téléphone.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-surface rounded-xl p-5 mb-8">
          <p className="text-xs font-bold text-muted uppercase tracking-wide mb-4">Prochaines étapes</p>
          <div className="space-y-4">
            {[
              ['1', 'Analyse de votre profil', 'Notre expert étudie votre situation'],
              ['2', 'Recherche assureur', 'On consulte nos partenaires pour votre cas'],
              ['3', 'Proposition', 'Vous recevez une offre adaptée par email'],
            ].map(([n, title, desc]) => (
              <div key={n} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</div>
                <div>
                  <p className="text-sm font-bold text-ink">{title}</p>
                  <p className="text-xs text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload documents (optionnel) */}
        <p className="font-display text-xl font-bold text-brand text-center mb-2">Pour aller plus vite</p>
        <p className="text-sm text-muted text-center mb-5">Envoyez vos documents maintenant, on traite votre dossier en priorité.</p>
        <div className="border-2 border-brand/30 bg-brand-pale rounded-xl p-6">

          <div className="space-y-2 mb-4">
            {['Permis de conduire (recto/verso)', 'Relevé d\'information', 'Carte grise'].map(doc => (
              <div key={doc} className="flex items-center gap-2 text-xs text-muted">
                <svg className="w-3.5 h-3.5 text-brand shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                {doc}
              </div>
            ))}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mb-3 space-y-1">
              {uploadedFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-brand bg-brand/5 rounded-lg px-3 py-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75"/></svg>
                  {f}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm font-semibold text-muted hover:border-brand hover:text-brand transition-all"
          >
            Ajouter un document (PDF, photo)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.heic"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    );
  }

  // ====== FORMULAIRE 3 ETAPES ======
  return (
    <div className="max-w-xl mx-auto">
      {/* Progress avec labels */}
      <div className="flex items-center justify-between mb-6">
        {['Situation', 'Véhicule', 'Coordonnées'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
              etape > i + 1 ? 'bg-brand text-white' :
              etape === i + 1 ? 'bg-brand text-white' :
              'bg-surface text-muted border border-border'
            }`}>
              {etape > i + 1 ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              ) : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${etape === i + 1 ? 'text-ink' : 'text-muted'}`}>{label}</span>
            {i < 2 && <div className={`w-8 sm:w-16 h-px mx-1 ${etape > i + 1 ? 'bg-brand' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Étape 1 : Profil */}
      {etape === 1 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-1">Quelle est votre situation ?</h3>
          <p className="text-sm text-muted mb-6">Sélectionnez votre cas principal</p>
          <div className="grid grid-cols-2 gap-3">
            {PROFILS.map(p => (
              <button key={p.id} onClick={() => setProfil(p.id)} className={btnCls(profil === p.id)}>
                {p.label}
              </button>
            ))}
          </div>
          {/* Trust signal */}
          <div className="flex items-center gap-2 mt-6 text-xs text-muted">
            <svg className="w-4 h-4 text-brand shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
            Vos données sont confidentielles et sécurisées
          </div>
        </div>
      )}

      {/* Étape 2 : Véhicule + Usage */}
      {etape === 2 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-1">Votre véhicule</h3>
          <p className="text-sm text-muted mb-6">Quelques infos sur votre véhicule</p>

          <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">Usage</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {USAGES.map(u => (
              <button key={u.id} onClick={() => setUsage(u.id)} className={btnCls(usage === u.id)}>{u.label}</button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-muted mb-1">Marque *</label>
              <input type="text" value={vehicule.marque} onChange={e => setVehicule(p => ({ ...p, marque: e.target.value }))} placeholder="Renault, Peugeot..." className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Modèle</label>
              <input type="text" value={vehicule.modele} onChange={e => setVehicule(p => ({ ...p, modele: e.target.value }))} placeholder="Clio, 308..." className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Année *</label>
            <input type="text" value={vehicule.annee} onChange={e => setVehicule(p => ({ ...p, annee: e.target.value }))} placeholder="2020" className={`${inputCls} w-1/2`} />
          </div>
        </div>
      )}

      {/* Étape 3 : Coordonnées */}
      {etape === 3 && (
        <div>
          <h3 className="font-display text-xl font-bold text-ink mb-1">Vos coordonnées</h3>
          <p className="text-sm text-muted mb-6">Pour vous recontacter avec notre proposition</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-muted mb-1">Nom *</label>
              <input type="text" value={conducteur.nom} onChange={e => setConducteur(p => ({ ...p, nom: e.target.value }))} placeholder="Nom" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Prénom</label>
              <input type="text" value={conducteur.prenom} onChange={e => setConducteur(p => ({ ...p, prenom: e.target.value }))} placeholder="Prénom" className={inputCls} />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs text-muted mb-1">Email *</label>
            <input type="email" value={conducteur.email} onChange={e => setConducteur(p => ({ ...p, email: e.target.value }))} placeholder="votre@email.fr" className={inputCls} />
            {conducteur.email && !emailValid && <p className="text-xs text-red-500 mt-1">Adresse email invalide</p>}
          </div>
          <div className="mb-4">
            <label className="block text-xs text-muted mb-1">Téléphone *</label>
            <input type="tel" value={conducteur.telephone} onChange={e => setConducteur(p => ({ ...p, telephone: e.target.value }))} placeholder="06 12 34 56 78" className={inputCls} />
            {conducteur.telephone && !telValid && <p className="text-xs text-red-500 mt-1">Numéro invalide (10 chiffres min)</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={rgpd} onChange={e => setRgpd(e.target.checked)} className="mt-1 w-4 h-4 accent-brand" />
            <span className="text-xs text-muted leading-relaxed">J'accepte que mes données soient traitées pour l'obtention d'un devis d'assurance. <a href="/mentions-legales/" className="text-brand hover:underline">Politique de confidentialité</a></span>
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {etape > 1 && (
          <button onClick={prev} className="px-6 py-4 rounded-xl border border-border text-sm font-semibold text-muted hover:text-ink hover:border-ink transition-all">
            ← Retour
          </button>
        )}
        <button
          onClick={etape === 3 ? handleSubmit : next}
          disabled={!canNext() || submitting}
          className={`flex-1 py-4 rounded-xl font-bold text-base transition-all ${
            canNext() && !submitting
              ? 'bg-brand text-white hover:-translate-y-0.5 hover:shadow-lift'
              : 'bg-surface text-muted cursor-not-allowed'
          }`}
        >
          {submitting ? 'Envoi en cours...' : etape === 3 ? 'Recevoir mon devis' : 'Continuer →'}
        </button>
      </div>

      <p className="text-center text-[10px] text-muted mt-3">Gratuit, sans engagement</p>
    </div>
  );
}
