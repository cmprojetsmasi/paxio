import { useState, useEffect } from 'react'

export default function Compte() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('login') // login ou signup
  const [form, setForm] = useState({nom:'', email:'', tel:''})

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('paxio_user') || 'null'))
  }, [])

  const getUsers = () => JSON.parse(localStorage.getItem('paxio_users') || '[]')

  const signup = () => {
    if(!form.email || !form.nom || !form.tel) return alert('Remplis nom, email et téléphone')
    const users = getUsers()
    if(users.find(u => u.email === form.email)) return alert('Cet email a déjà un compte, connecte-toi')
    users.push(form)
    localStorage.setItem('paxio_users', JSON.stringify(users))
    localStorage.setItem('paxio_user', JSON.stringify(form))
    alert('Compte créé ! Bienvenue ' + form.nom)
    window.location.href = '/'
  }

  const login = () => {
    const users = getUsers()
    const found = users.find(u => u.email === form.email && u.tel === form.tel)
    if(!found) return alert('Compte non trouvé. Vérifie email et téléphone, ou crée un compte.')
    localStorage.setItem('paxio_user', JSON.stringify(found))
    alert('Bon retour ' + found.nom + ' !')
    window.location.href = '/'
  }

  const logout = () => {
    localStorage.removeItem('paxio_user')
    setUser(null)
    setForm({nom:'', email:'', tel:''})
  }

  return (
    <div style={{fontFamily:'Arial', background:'#EAEDED', minHeight:'100vh', padding:'20px'}}>
      <div style={{maxWidth:'400px', margin:'40px auto', background:'white', padding:'25px', borderRadius:'8px', border:'1px solid #ddd'}}>
        <h2 style={{textAlign:'center'}}>👤 PaXio - Mon Compte</h2>
        {!user ? (
          <>
            <div style={{display:'flex', gap:'10px', margin:'15px 0'}}>
              <button onClick={()=>setMode('login')} style={{flex:1, padding:'8px', background:mode==='login'?'#131921':'#eee', color:mode==='login'?'white':'black', border:'none', borderRadius:'4px'}}>Se connecter</button>
              <button onClick={()=>setMode('signup')} style={{flex:1, padding:'8px', background:mode==='signup'?'#131921':'#eee', color:mode==='signup'?'white':'black', border:'none', borderRadius:'4px'}}>Créer compte</button>
            </div>
            {mode==='signup' && <input placeholder="Nom complet" value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>}
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>
            <input placeholder="N° Mobile Money (pour se connecter)" value={form.tel} onChange={e=>setForm({...form, tel:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', borderRadius:'4px', border:'1px solid #aaa'}}/>
            {mode==='signup' ? (
              <button onClick={signup} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', marginTop:'10px', cursor:'pointer'}}>Créer mon compte</button>
            ) : (
              <button onClick={login} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', marginTop:'10px', cursor:'pointer'}}>Se connecter avec Email + Téléphone</button>
            )}
            <p style={{fontSize:'11px', color:'#777', marginTop:'10px', textAlign:'center'}}>Ton identité (email + téléphone) sert de mot de passe pour te reconnecter.</p>
          </>
        ) : (
          <div style={{textAlign:'center'}}>
            <p style={{fontSize:'50px', margin:0}}>👤</p>
            <h3>{user.nom}</h3>
            <p style={{fontSize:'13px', color:'#555'}}>{user.email}<br/>{user.tel}</p>
            <button onClick={logout} style={{width:'100%', background:'#f0f0f0', border:'1px solid #ddd', padding:'10px', borderRadius:'8px', marginTop:'15px', cursor:'pointer'}}>Se déconnecter</button>
            <a href="/" style={{display:'block', marginTop:'15px', background:'#131921', color:'white', padding:'12px', borderRadius:'8px', textDecoration:'none'}}>🛒 Retour boutique</a>
          </div>
        )}
      </div>
    </div>
  )
                                                            }
