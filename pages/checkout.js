import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();
  const { titre, prix } = router.query;
  const [method, setMethod] = useState('airtel');
  const [showPay, setShowPay] = useState(false);
  
  const livreTitre = titre || "L'entrepreneur Congolais";
  const livrePrix = prix || "5$";
  const numeroWhatsApp = "243999024287";
  const mesNumeros = {
    airtel: "0999024287",
    mpesa: "0812826017",
    orange: "089XXXXXXX"
  };

  const confirmerPaiement = () => {
    setShowPay(true);
  };

  const envoyerPreuve = () => {
    const message = `Bonjour PaXio 👋, j'ai payé ${livrePrix} pour "${livreTitre}" via ${method.toUpperCase()} sur ${mesNumeros[method] || mesNumeros.airtel}. Voici la preuve :`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const methods = [
    { id: 'airtel', name: 'Airtel Money', sub: `Envoyer sur ${mesNumeros.airtel}`, color: '#FF0000' },
    { id: 'mpesa', name: 'M-Pesa', sub: `Envoyer sur ${mesNumeros.mpesa}`, color: '#00A651' },
    { id: 'orange', name: 'Orange Money', sub: `Envoyer sur ${mesNumeros.orange}`, color: '#FF6600' },
    { id: 'carte', name: 'Carte Bancaire', sub: 'Bientôt disponible' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#F0F5FF', minHeight: '100vh', padding: 15 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
          <a href="/livres" style={{textDecoration:'none', fontWeight: 900, fontSize: 28, color: '#0A2A6B'}}>▶PAXIO</a>
          <div><div style={{ fontWeight: 800, fontSize: 20, color: '#0A2A6B' }}>Checkout</div><div style={{ fontSize: 12, color: '#6B7A99' }}>Finalisez votre commande</div></div>
        </div>

        {!showPay ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#0A2A6B' }}>🛍️ Récapitulatif</div>
              <div style={{ background: '#fff', borderRadius: 14, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#E6F0FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📥</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{livreTitre}</div><div style={{ fontSize: 12, color: '#666' }}>Accès immédiat • Numérique</div></div>
                <div style={{ fontWeight: 800, color: '#0A2A6B' }}>{livrePrix}</div>
              </div>
              <div style={{ marginTop: 18, fontWeight: 800, fontSize: 18 }}>Total à payer: {livrePrix}</div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '2px solid #0A2A6B' }}>
              <div style={{ fontWeight: 800 }}>Méthode de paiement</div>
              <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 12 }}>Choisissez votre moyen</div>
              {methods.map(m => (
                <div key={m.id} onClick={() => setMethod(m.id)} style={{ border: method === m.id ? '2px solid #0A4ED6' : '1px solid #eee', background: method === m.id ? '#E6F0FF' : '#fff', borderRadius: 12, padding: 12, marginBottom: 10, cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: m.color || '#000' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#2D7FFF' }}>{m.sub}</div>
                </div>
              ))}
              <button onClick={confirmerPaiement} style={{ width: '100%', background: '#0A4ED6', color: '#fff', padding: 14, borderRadius: 10, border: 'none', fontWeight: 800, marginTop: 10 }}>
                Payer maintenant {livrePrix}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', maxWidth: 400, margin: '40px auto', borderRadius: 20, padding: 25, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 50 }}>💸</div>
            <h2 style={{ color: '#0A2A6B' }}>Payez {livrePrix}</h2>
            <p style={{ color: '#666', fontSize: 14 }}>Envoyez {livrePrix} sur ce numéro :</p>
            <div style={{ background: '#F0F5FF', padding: 15, borderRadius: 12, margin: '15px 0' }}>
              <div style={{ fontSize: 12, color: '#6B7A99' }}>{method.toUpperCase()}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0A2A6B', letterSpacing: 2 }}>{mesNumeros[method] || mesNumeros.airtel}</div>
              <div style={{ fontSize: 12, marginTop: 5 }}>Au nom de PaXio</div>
            </div>
            <p style={{ fontSize: 13, color: '#666' }}>Pour recevoir instantanément : <b>"{livreTitre}"</b></p>
            <button onClick={envoyerPreuve} style={{ width: '100%', background: '#25D366', color: '#fff', padding: 14, borderRadius: 10, border: 'none', fontWeight: 800, marginTop: 15 }}>✅ J'ai payé, envoyer la preuve</button>
            <button onClick={() => setShowPay(false)} style={{ width: '100%', background: 'transparent', color: '#666', padding: 10, border: 'none', marginTop: 10, fontSize: 13 }}>← Changer de méthode</button>
          </div>
        )}
      </div>
    </div>
  );
          }
