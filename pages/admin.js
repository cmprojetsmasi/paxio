import { useState, useEffect } from 'react'

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({email:'', pass:''})
  const [livres, setLivres] = useState([])
  const [form, setForm] = useState({titre:'', prix:'5 $', couverture:'', pdf:''})

  // CHANGE TON MOT DE PASSE ADMIN ICI - PAS TON MOT DE PASSE GMAIL !
  const ADMIN_EMAIL = "enakahosa7@gmail.com"
  const ADMIN_PASS = "PaXio2026Admin!" // <-- Mets ton propre mot de passe secret ici

  useEffect(() => {
    setIsAdmin(localStorage.getItem('paxio_admin') === 'true')
    setLivres(JSON.parse(localStorage.getItem('paxio_livres') || '[]'))
  }, [])

  const seConnecter = () => {
    if(login.email === ADMIN_EMAIL && login.pass === ADMIN_PASS) {
      localStorage.setItem('paxio_admin', 'true')
      setIsAdmin(true)
    } else {
      alert('Email ou mot de passe Admin incorrect')
    }
  }

  const deconnecterAdmin = () => {
    localStorage.removeItem('paxio_admin')
    setIsAdmin(false)
  }

  const ajouter = () => {
    if(!form.titre || !form.couverture || !form.pdf) return alert('Remplis tout')
    const newLivre = {id: Date.now(), ...form}
    const newList = [...livres, newLivre]
    localStorage.setItem('paxio_livres', JSON.stringify(newList))
    setLivres(newList)
    setForm({titre:'', prix:'5 $', couverture:'', pdf:''})
    alert('Livre ajouté ! ' + newList.length + ' livres en vitrine')
  }

  if(!isAdmin) {
    return (
      <div style={{fontFamily:'Arial', background:'#131921', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
        <div style={{background:'white', padding:'25px', borderRadius:'8px', width:'100%', maxWidth:'360px'}}>
          <h2 style={{textAlign:'center'}}>🔒 Admin PaXio</h2>
          <p style={{fontSize:'12px', color:'#666', textAlign:'center'}}>Accès réservé au propriétaire</p>
          <input placeholder="Email admin" value={login.email} onChange={e=>setLogin({...login, email:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #aaa', borderRadius:'4px'}}/>
          <input type="password" placeholder="Mot de passe admin" value={login.pass} onChange={e=>setLogin({...login, pass:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #aaa', borderRadius:'4px'}}/>
          <button onClick={seConnecter} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>Se connecter</button>
          <p style={{fontSize:'10px', color:'#999', marginTop:'15px', textAlign:'center'}}>Email autorisé : enakahosa7@gmail.com<br/>Mot de passe : celui que tu as mis dans le code</p>
          <a href="/" style={{display:'block', textAlign:'center', marginTop:'15px', fontSize:'12px'}}>← Retour boutique</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{fontFamily:'Arial', padding:'20px', background:'#EAEDED', minHeight:'100vh'}}>
      <div style={{maxWidth:'600px', margin:'0 auto', background:'white', padding:'20px', borderRadius:'8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Admin PaXio - {livres.length} livres</h2>
          <button onClick={deconnecterAdmin} style={{background:'#f0f0f0', border:'1px solid #ddd', padding:'6px 12px', borderRadius:'4px', fontSize:'12px'}}>Déconnexion</button>
        </div>
        <input placeholder="Titre du livre" value={form.titre} onChange={e=>setForm({...form, titre:e.target.value})} style={{width:'100%', padding:'10px', margin:'6px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>
        <input placeholder="Prix ex: 5 $" value={form.prix} onChange={e=>setForm({...form, prix:e.target.value})} style={{width:'100%', padding:'10px', margin:'6px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>
        <input placeholder="Lien image couverture" value={form.couverture} onChange={e=>setForm({...form, couverture:e.target.value})} style={{width:'100%', padding:'10px', margin:'6px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>
        <input placeholder="Lien PDF du livre" value={form.pdf} onChange={e=>setForm({...form, pdf:e.target.value})} style={{width:'100%', padding:'10px', margin:'6px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>
        <button onClick={ajouter} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', marginTop:'10px', cursor:'pointer'}}>Ajouter à la vitrine</button>
        <a href="/" style={{display:'block', textAlign:'center', marginTop:'15px', color:'#0066c0'}}>Voir la boutique</a>
      </div>
    </div>
  )
    }
