import { useState, useEffect } from 'react';

export default function Admin() {
  const [livres, setLivres] = useState([]);
  const [form, setForm] = useState({ titre: '', auteur: '', prix: '', image: '' });

  useEffect(() => {
    const saved = localStorage.getItem('paxio_livres');
    if (saved) setLivres(JSON.parse(saved));
  }, []);

  const saveLivres = (newLivres) => {
    setLivres(newLivres);
    localStorage.setItem('paxio_livres', JSON.stringify(newLivres));
  };

  const ajouterLivre = (e) => {
    e.preventDefault();
    if (!form.titre || !form.prix) return alert('Titre et Prix obligatoires');
    const nouveau = { id: Date.now(), ...form, image: form.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' };
    saveLivres([...livres, nouveau]);
    setForm({ titre: '', auteur: '', prix: '', image: '' });
    alert('Livre ajouté ! Va voir sur /livres');
  };

  const supprimer = (id) => {
    saveLivres(livres.filter(l => l.id !== id));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({...form, image: reader.result});
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>🔒 Admin PaXio</h1>
      <p style={{color:'#666'}}>Ajoute tes livres ici depuis ton téléphone</p>
      
      <form onSubmit={ajouterLivre} style={{ background: '#f9f9f9', padding: 20, borderRadius: 12, display: 'grid', gap: 12 }}>
        <input placeholder="Titre du livre *" value={form.titre} onChange={e=>setForm({...form, titre: e.target.value})} style={{padding:12, borderRadius:8, border:'1px solid #ddd'}} />
        <input placeholder="Auteur" value={form.auteur} onChange={e=>setForm({...form, auteur: e.target.value})} style={{padding:12, borderRadius:8, border:'1px solid #ddd'}} />
        <input placeholder="Prix ex: 5$" value={form.prix} onChange={e=>setForm({...form, prix: e.target.value})} style={{padding:12, borderRadius:8, border:'1px solid #ddd'}} />
        <label style={{fontSize:14}}>Photo couverture (depuis ta galerie) :</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {form.image && <img src={form.image} style={{width:100, height:140, objectFit:'cover', borderRadius:8}} />}
        <button type="submit" style={{background:'#000', color:'#fff', padding:14, borderRadius:8, border:'none', fontWeight:'bold'}}>➕ Ajouter le livre</button>
      </form>

      <h3 style={{marginTop:30}}>Tes livres ({livres.length})</h3>
      {livres.map(l => (
        <div key={l.id} style={{display:'flex', gap:10, border:'1px solid #eee', padding:10, borderRadius:8, marginBottom:10, alignItems:'center'}}>
          <img src={l.image} style={{width:50, height:70, objectFit:'cover', borderRadius:5}} />
          <div style={{flex:1}}><b>{l.titre}</b><br/><span style={{fontSize:13, color:'#666'}}>{l.prix}</span></div>
          <button onClick={()=>supprimer(l.id)} style={{color:'red', background:'none', border:'none'}}>Supprimer</button>
        </div>
      ))}
      <a href="/livres" style={{display:'block', marginTop:20, textAlign:'center', background:'#25D366', color:'#fff', padding:12, borderRadius:8, textDecoration:'none'}}>Voir ma boutique →</a>
    </div>
  );
      }
