import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Livres() {
  const router = useRouter();
  const [livres, setLivres] = useState([{ id: 1, titre: "L'entrepreneur Congolais", prix: "5$", auteur: "M. Kalala", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300" }]);
  useEffect(() => { const saved = localStorage.getItem('paxio_livres'); if (saved) { const custom = JSON.parse(saved); if (custom.length > 0) setLivres(custom); } }, []);
  const acheter = (livre) => { router.push(`/checkout?titre=${encodeURIComponent(livre.titre)}&prix=${encodeURIComponent(livre.prix)}`); };
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <a href="/">← Retour</a>
      <h1 style={{ marginTop: 20 }}>📚 Tous les livres</h1>
      <div style={{ display: 'grid', gap: 20, marginTop: 20 }}>
        {livres.map(livre => (
          <div key={livre.id} style={{ border: '1px solid #eee', padding: 15, borderRadius: 12, display: 'flex', gap: 15 }}>
            <img src={livre.image} style={{ width: 80, height: 110, objectFit: 'cover', borderRadius: 8 }} />
            <div style={{ flex: 1 }}><b>{livre.titre}</b><p style={{ margin: '5px 0', color: '#666', fontSize: 14 }}>{livre.auteur}</p><b>{livre.prix}</b></div>
            <button onClick={() => acheter(livre)} style={{ background: '#000', color: '#fff', padding: '10px 18px', borderRadius: 8, border: 'none', alignSelf: 'center' }}>Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
}
