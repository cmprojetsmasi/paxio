import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Checkout() {
  const router = useRouter();
  const { titre, prix } = router.query;
  const [method, setMethod] = useState('optgateway');
  
  const livreTitre = titre || "Forfait Premium PaXio";
  const livrePrix = prix || "5.00 $";
  const numeroWhatsApp = "243999024287"; // ton WhatsApp
  const mesNumeros = {
    airtel: "0999024287", // <-- METS TON NUMERO AIRTEL ICI
    mpesa: "0812826017", // <-- METS TON NUMERO M-PESA ICI
  }

  const payer = () => {
    const message = `Bonjour PaXio 👋, je veux payer ${livrePrix} pour "${livreTitre}" via ${method.toUpperCase()}.`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const methods = [
    { id: 'optgateway', name: 'OPTGATEWAY', sub: 'Paiement sécurisé via OPTGATEWAY', badge: 'RECOMMANDÉ' },
    { id: 'orange', name: 'Orange Money', sub: 'Paiement via votre compte Orange Money' },
    { id: 'airtel', name: 'Airtel Money', sub: 'Paiement via votre compte Airtel Money' },
    { id: 'mpesa', name: 'M-Pesa', sub: 'Paiement via votre compte M-Pesa' },
    { id: 'carte', name: 'Carte Bancaire', sub: 'Visa • Mastercard • Verve' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#F0F5FF', minHeight: '100vh', padding: 15 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
          <a href="/livres" style={{textDecoration:'none', fontWeight: 900, fontSize: 28, color: '#0A2A6B'}}>▶PAXIO</a>
          <div><div style={{ fontWeight: 800, fontSize: 20, color: '#0A2A6B' }}>Checkout</div><div style={{ fontSize: 12, color: '#6B7A99' }}>Finalisez votre commande en toute sécurité</div></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 12, color: '#0A2A6B' }}>🛍️ Récapitulatif de la commande</div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#E6F0FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📥</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{livreTitre}</div><div style={{ fontSize: 12, color: '#666' }}>Accès immédiat • Numérique</div></div>
              <div style={{ fontWeight: 800, color: '#0A2A6B' }}>{livrePrix}</div>
            </div>
            <div style={{ marginTop: 18 }}><div style={{ fontWeight: 800, fontSize: 18 }}>Total à payer: {livrePrix} / 14,500 CDF</div></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '2px solid #0A2A6B' }}>
            <div style={{ fontWeight: 800 }}>Méthode de paiement</div>
            <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 12 }}>Choisissez votre moyen de paiement préféré</div>
            {methods.map(m => (
              <div key={m.id} onClick={() => setMethod(m.id)} style={{ border: method === m.id ? '2px solid #2D7FFF' : '1px solid #eee', background: method === m.id ? '#E6F0FF' : '#fff', borderRadius: 12, padding: 12, marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name} {m.badge && <span style={{ background: '#2D7FFF', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>{m.badge}</span>}</div>
                <div style={{ fontSize: 11, color: '#2D7FFF' }}>{m.sub}</div>
              </div>
            ))}
            <button onClick={payer} style={{ width: '100%', background: '#0A4ED6', color: '#fff', padding: 14, borderRadius: 10, border: 'none', fontWeight: 800, marginTop: 10 }}>
              Payer maintenant {livrePrix}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
