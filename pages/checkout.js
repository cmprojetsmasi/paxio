import { useState } from 'react';

export default function Checkout() {
  const [method, setMethod] = useState('optgateway');
  
  const methods = [
    { id: 'optgateway', name: 'OPTGATEWAY', sub: 'Paiement sécurisé via OPTGATEWAY', badge: 'RECOMMANDÉ', color: '#E6F0FF', icon: '🛡️' },
    { id: 'orange', name: 'Orange Money', sub: 'Paiement via votre compte Orange Money', color: '#FFF2E6', icon: '🟠' },
    { id: 'airtel', name: 'Airtel Money', sub: 'Paiement via votre compte Airtel Money', color: '#FFE6E6', icon: '🔴' },
    { id: 'mpesa', name: 'M-Pesa', sub: 'Paiement via votre compte M-Pesa', color: '#E6F5E6', icon: '🟢' },
    { id: 'carte', name: 'Carte Bancaire', sub: 'Visa • Mastercard • Verve', color: '#E6F0FF', icon: '💳' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#F0F5FF', minHeight: '100vh', padding: 15 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
          <div style={{ fontWeight: 900, fontSize: 32, color: '#0A2A6B' }}>▶<span style={{color:'#2D7FFF'}}>PAXIO</span></div>
          <div><div style={{ fontWeight: 800, fontSize: 22, color: '#0A2A6B' }}>Checkout</div><div style={{ fontSize: 13, color: '#6B7A99' }}>Finalisez votre commande en toute sécurité</div></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left - Recap */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 12, color: '#0A2A6B' }}>🛍️ Récapitulatif de la commande</div>
            
            <div style={{ background: '#fff', borderRadius: 14, padding: 16, boxShadow: '0 2px 10px #0001', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#E6F0FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📥</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>Forfait Premium PaXio</div><div style={{ fontSize: 12, color: '#666' }}>Accès 1 mois • Renouvelable</div></div>
              <div style={{ fontWeight: 800, color: '#0A2A6B' }}>5.00 $ • 14,500 CDF</div>
            </div>

            <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginTop: 12, boxShadow: '0 2px 10px #0001' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 14 }}><span>Sous-total:</span><b>5.00 $ / 14,500 CDF</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}><span>Frais de service:</span><span style={{color:'#999'}}>0.00 $ / 0 CDF</span></div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#0A2A6B' }}>Total à payer: <span style={{ color: '#0A2A6B' }}>5.00 $ / 14,500 CDF</span></div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>Le paiement sera débité en USD ou équivalent en CDF</div>
            </div>
          </div>

          {/* Right - Paiement */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 4px 20px #0001', border: '2px solid #0A2A6B' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#0A2A6B' }}>Méthode de paiement</div>
            <div style={{ fontSize: 13, color: '#6B7A99', marginBottom: 12 }}>Choisissez votre moyen de paiement préféré</div>

            {methods.map(m => (
              <div key={m.id} onClick={() => setMethod(m.id)} style={{ 
                border: method === m.id ? '2px solid #2D7FFF' : '1px solid #e5e7eb', 
                background: method === m.id ? '#E6F0FF' : '#fff',
                borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, cursor: 'pointer' 
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 50, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', gap: 8, alignItems: 'center' }}>{m.name} {m.badge && <span style={{ background: '#2D7FFF', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 4 }}>{m.badge}</span>}</div>
                  <div style={{ fontSize: 11, color: '#2D7FFF', fontWeight: 600 }}>{m.sub}</div>
                  {m.id === 'optgateway' && <div style={{ fontSize: 10, color: '#666' }}>🔒 Transaction sécurisée • Paiement instantané</div>}
                </div>
                <div style={{ width: 18, height: 18, borderRadius: 50, border: '2px solid ' + (method === m.id ? '#2D7FFF' : '#ddd'), background: method === m.id ? '#2D7FFF' : '#fff' }}></div>
              </div>
            ))}

            <button style={{ width: '100%', background: '#0A4ED6', color: '#fff', padding: 14, borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 15, marginTop: 10 }}>
              Payer maintenant 5.00 $
            </button>
            <div style={{ fontSize: 10, textAlign: 'center', color: '#666', marginTop: 10 }}>🔒 Paiement sécurisé via OPTGATEWAY • Vos données sont chiffrées SSL 256-bit</div>
          </div>
        </div>

        <div style={{ fontSize: 11, textAlign: 'center', marginTop: 20, color: '#666' }}>En procédant au paiement, vous acceptez nos <u>Conditions d'utilisation</u> et <u>Politique de confidentialité</u></div>
      </div>
    </div>
  );
}
