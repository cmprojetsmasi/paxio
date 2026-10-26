import { useState, useEffect } from 'react'

export default function Compte() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({nom:'', email:'', tel:''})

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('paxio_user') || 'null'))
  }, [])

  const login = () => {
    if(!form.email || !form.nom) return alert('Nom et email obligatoires')
    localStorage.setItem('paxio_user', JSON.stringify(form))
    setUser(form)
    alert('Bienvenue ' + form.nom + ' !')
    window.location.href = '/'
  }

  const logout = () => {
    localStorage.removeItem('paxio_user')
    setUser(null)
  }

  return (
    <div style={{fontFamily:'Arial', background:'#EAEDED', minHeight:'100vh', padding:'20px'}}>
      <div style={{maxWidth:'400px', margin:'40px auto', background:'white', padding:'25px', borderRadius:'8px', border:'1px solid #ddd'}}>
        <h2 style={{textAlign:'center'}}>PAXIO - Compte Client</h2>
        {!user ? (
          <>
            <p style={{fontSize:'13px', color:'#555'}}>Créez votre compte pour acheter et recevoir vos livres instantanément.</p>
            <input placeholder="Nom complet" value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>
            <input placeholder="Tél Mobile Money (ex: 082...)" value={form.tel} onChange={e=>setForm({...form, tel:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>
            <button onClick={login} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', marginTop:'10px'}}>Créer / S'identifier</button>
          </>
        ) : (
          <div style={{textAlign:'center'}}>
            <p style={{fontSize:'50px'}}>👤</p>
            <h3>{user.nom}</h3>
            <p style={{fontSize:'13px', color:'#555'}}>{user.email}<br/>{user.tel}</p>
            <button onClick={logout} style={{width:'100%', background:'#f0f0f0', border:'1px solid #ddd', padding:'10px', borderRadius:'8px', marginTop:'15px'}}>Se déconnecter</button>
            <a href="/" style={{display:'block', marginTop:'15px', background:'#131921', color:'white', padding:'12px', borderRadius:'8px', textDecoration:'none'}}>Retour à la boutique</a>
          </div>
        )}
      </div>
    </div>
  )
          }
