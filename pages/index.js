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
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#0F1015', minHeight: '100vh', color: '#fff', width: '100%', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .header-nav { display: none !important; }
          .vedette-card { flex-direction: column !important; }
          .vedette-cover { max-width: 100% !important; min-width: 100% !important; }
          .action-buttons { flex-direction: column !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ background: '#151821', padding: '15px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #232631', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
            <span style={{ color: '#FF8A24' }}>◆</span>Pa<span style={{ color: '#FF8A24' }}>X</span>io
          </div>
          <nav className="header-nav" style={{ display: 'flex', gap: 6 }}>
            <button style={{ background: '#FF8A24', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}>Ebooks</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '7px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13 }}>Journaux</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '7px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13 }}>Livres</button>
            <button style={{ background: '#3A3D4A', color: '#A0A3B1', border: 'none', padding: '7px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13 }}>Annonces</button>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', fontSize: 20 }}>
          <span>♡</span>
          <span>🛒</span>
        </div>
      </header>

      <div style={{ padding: '16px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* SEARCH */}
        <div style={{ background: '#1E212E', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #2A2E3E', width: '100%' }}>
          <span style={{ color: '#FF8A24', fontSize: 20 }}>⌕</span>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher un ebook, journal, livre, annonce..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: 15 }} />
        </div>

        {/* VEDETTE */}
        <div style={{ marginTop: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>En vedette cette semaine</h1>
          <p style={{ color: '#9CA0B0', marginTop: 6, fontSize: 13 }}>Découvrez notre sélection mise en avant pour les entrepreneurs et créateurs.</p>

          <div className="vedette-card" style={{ background: '#1A1D28', borderRadius: 16, marginTop: 16, padding: 16, border: '1px solid #2A2E3E', display: 'flex', gap: 20, width: '100%' }}>
            <div className="vedette-cover" style={{ minWidth: 180, maxWidth: 220 }}>
              <img src={livreVedette.image} style={{ width: '100%', borderRadius: 10, border: '1px solid #2A2E3E' }} />
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{livreVedette.titre}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: '#D1D3DB' }}>
                <span style={{ color: '#FFB800' }}>★★★★★</span> {livreVedette.note} · {livreVedette.avis} · {livreVedette.categories}
              </div>
              <p style={{ color: '#C2C5D1', fontSize: 13, lineHeight: 1.5, marginTop: 12 }}>{livreVedette.description}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 16 }}>
                <div style={{ fontSize: 32, fontWeight: 900 }}>{livreVedette.prixUSD}</div>
                <div style={{ color: '#FF8A24', fontWeight: 700, fontSize: 16 }}>{livreVedette.prixCDF}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: '#A3E3A3' }}>
                ✓ Téléchargement instantané • PDF, ePub, Kindle
              </div>
              <div className="action-buttons" style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button onClick={acheter} style={{ background: '#FF8A24', color: '#000', border: 'none', padding: '12px 18px', borderRadius: 8, fontWeight: 800, cursor: 'pointer', flex: 1 }}>Acheter maintenant 🛒</button>
                <button style={{ background: 'transparent', color: '#FF8A24', border: '1px solid #FF8A24', padding: '12px 18px', borderRadius: 8, fontWeight: 700, flex: 1 }}>⬇ Téléchargement</button>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: '#8A8E9E' }}>🛡 Accès immédiat • Mise à jour gratuite</div>
              <div style={{ marginTop: 8, fontSize: 11, color: '#8A8E9E' }}>Paiement sécurisé • Support 24/7 • Remboursé 7 jours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        }
