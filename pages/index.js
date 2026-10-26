import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const livreVedette = {
    titre: "Micro-SaaS et Solopreneuriat Tech",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    note: "4,8",
    avis: "189 avis",
    categories: "Entrepreneur • Tech • Business",
    description: "Le guide complet pour créer et faire croître un Micro-SaaS rentable en tant que solopreneur. Stratégies pratiques, outils no-code/low-code, acquisition de clients et automatisation.",
    prixUSD: "$9,99",
    prixCDF: "28 970 CDF",
  };

  const acheter = () => {
    router.push(`/checkout?titre=${encodeURIComponent(livreVedette.titre)}&prix=${livreVedette.prixUSD}`);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0F1015', minHeight: '100vh', color: '#fff' }}>
      {/* HEADER */}
      <header style={{ background: '#151821', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #232631' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
            <span style={{ color: '#FF8A24' }}>◆</span>Pa<span style={{ color: '#FF8A24' }}>X</span>io
          </div>
          <nav style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: '#FF8A24', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>Ebooks</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Journaux</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Livres</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Annonces</button>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 22 }}>
          <span>♡</span>
          <span style={{ position: 'relative' }}>🛒<span style={{ position: 'absolute', top: -8, right: -8, background: '#FF8A24', fontSize: 10, padding: '2px 5px', borderRadius: 10 }}>2</span></span>
          <span>○</span>
        </div>
      </header>

      <div style={{ padding: '20px' }}>
        {/* SEARCH */}
        <div style={{ background: '#1E212E', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #2A2E3E' }}>
          <span style={{ color: '#FF8A24', fontSize: 22 }}>⌕</span>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher un ebook, journal, livre, annonce..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: 16 }} />
        </div>

        {/* VEDETTE */}
        <div style={{ marginTop: 30 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>En vedette cette semaine</h1>
          <p style={{ color: '#9CA0B0', marginTop: 6, fontSize: 14 }}>Découvrez notre sélection mise en avant pour les entrepreneurs et créateurs.</p>

          <div style={{ background: '#1A1D28', borderRadius: 16, marginTop: 20, padding: 20, border: '1px solid #2A2E3E', display: 'flex', gap: 25 }}>
            {/* COVER */}
            <div style={{ minWidth: 180, maxWidth: 220 }}>
              <img src={livreVedette.image} style={{ width: '100%', borderRadius: 10, border: '1px solid #2A2E3E' }} />
            </div>

            {/* INFOS */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{livreVedette.titre}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 13, color: '#D1D3DB' }}>
                <span style={{ color: '#FFB800' }}>★★★★★</span> {livreVedette.note} · {livreVedette.avis} · {livreVedette.categories}
              </div>

              <p style={{ color: '#C2C5D1', fontSize: 14, lineHeight: 1.5, marginTop: 12 }}>{livreVedette.description}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 18 }}>
                <div style={{ fontSize: 36, fontWeight: 900 }}>{livreVedette.prixUSD}</div>
                <div style={{ color: '#FF8A24', fontWeight: 700, fontSize: 18 }}>{livreVedette.prixCDF}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: '#A3E3A3' }}>
                <span style={{ background: '#2E4A2E', borderRadius: 20, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span> Téléchargement instantané • PDF, ePub, Kindle
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
                <button onClick={acheter} style={{ background: '#FF8A24', color: '#000', border: 'none', padding: '12px 20px', borderRadius: 8, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  Acheter maintenant 🛒
                </button>
                <button style={{ background: 'transparent', color: '#FF8A24', border: '1px solid #FF8A24', padding: '12px 20px', borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ⬇ Téléchargement instantané
                </button>
              </div>

              <div style={{ marginTop: 16, fontSize: 12, color: '#8A8E9E', display: 'flex', gap: 5, alignItems: 'center' }}>
                🛡 Accès immédiat après l'achat • Mise à jour gratuite incluse
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: '#8A8E9E' }}>
                Paiement sécurisé • Support 24/7 • Remboursé sous 7 jours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        }
