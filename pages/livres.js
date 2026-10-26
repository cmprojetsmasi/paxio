export default function Livres() {
  const numeroWhatsApp = "243999024287"; // <-- REMPLACE PAR TON NUMERO SANS LE +

  const acheter = (titre, prix) => {
    const message = `Bonjour PaXio 👋, je veux acheter le livre "${titre}" à ${prix}. Comment payer ?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const livres = [
    { id: 1, titre: "L'entrepreneur Congolais", prix: "5$", auteur: "M. Kalala" },
    { id: 2, titre: "Apprendre le Business en RDC", prix: "3$", auteur: "J. Mukendi" },
    { id: 3, titre: "Histoire de Kinshasa", prix: "2$", auteur: "P. Ilunga" },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <a href="/" style={{ color: '#000' }}>← Retour accueil</a>
      <h1 style={{ marginTop: 20 }}>📚 Tous les livres</h1>
      <div style={{ display: 'grid', gap: 15, marginTop: 20 }}>
        {livres.map(livre => (
          <div key={livre.id} style={{ border: '1px solid #ddd', padding: 15, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>{livre.titre}</b>
              <p style={{ margin: 0, color: '#666', fontSize: 14 }}>{livre.auteur} - {livre.prix}</p>
            </div>
            <button onClick={() => acheter(livre.titre, livre.prix)} style={{ background: '#000', color: '#fff', padding: '8px 15px', borderRadius: 8, border: 'none' }}>Acheter</button>
          </div>
        ))}
      </div>
    </div>
  );
}
