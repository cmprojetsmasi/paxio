import { useState, useEffect } from 'react'

export default function Home() {
  const [livres, setLivres] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('paxio_livres') || '[]')
    setLivres(saved)
  }, [])

  const filtres = livres.filter(l => 
    l.titre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{padding:'20px', maxWidth:'600px', margin:'0 auto', fontFamily:'sans-serif', background:'#000', color:'#fff', minHeight:'100vh'}}>
      
      {/* HEADER */}
      <h1 style={{textAlign:'center', margin:'0', letterSpacing:'2px'}}>📚 PAXIO</h1>
      <p style={{textAlign:'center', color:'#aaa', marginTop:'5px'}}>Achetez. Payez. Accédez.</p>

      {/* CHAMP DE RECHERCHE ACTIVÉ */}
      <div style={{position:'relative', margin:'25px 0'}}>
        <input 
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Rechercher... ex: SaaS, Tech, Business"
          style={{
            width:'100%', 
            padding:'16px 16px 16px 45px', 
            borderRadius:'14px', 
            border:'2px solid #333', 
            background:'#111',
            color:'white',
            fontSize:'16px',
            outline:'none'
          }}
        />
        <span style={{position:'absolute', left:'15px', top:'17px', fontSize:'18px'}}>🔍</span>
        {search && (
          <button onClick={()=>setSearch("")} style={{position:'absolute', right:'12px', top:'12px', background:'#333', color:'white', border:'none', borderRadius:'50%', width:'30px', height:'30px'}}>X</button>
        )}
      </div>
      
      <p style={{color:'#666', fontSize:'13px', marginTop:'-15px', marginBottom:'20px'}}>
        {search ? `${filtres.length} résultat(s) pour "${search}"` : `${livres.length} livre(s) disponible(s)`}
      </p>

      {/* VITRINE */}
      {filtres.length === 0 ? (
        <div style={{textAlign:'center', marginTop:'50px', color:'#666'}}>
          <p style={{fontSize:'50px'}}>🔍</p>
          <p>{search ? `Aucun livre trouvé pour "${search}"` : "Aucun livre encore"}</p>
          <a href="/admin" style={{color:'#0f0'}}>Ajouter un livre sur /admin</a>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
          {filtres.map((l,i)=>(
            <div key={i} style={{background:'#111', borderRadius:'16px', padding:'10px', border:'1px solid #333'}}>
              <img src={l.couverture} style={{width:'100%', height:'200px', objectFit:'cover', borderRadius:'12px'}}/>
              <h3 style={{fontSize:'14px', margin:'10px 0 5px', height:'38px', overflow:'hidden'}}>{l.titre}</h3>
              <p style={{fontWeight:'bold', color:'#0f0', margin:'5px 0'}}>{l.prix || '5$'}</p>
              <a href={l.pdf} download style={{display:'block', background:'white', color:'black', padding:'10px', borderRadius:'8px', fontWeight:'bold', textAlign:'center', textDecoration:'none'}}>📥 Voir le livre</a>
            </div>
          ))}
        </div>
      )}

      <a href="/admin" style={{display:'block', marginTop:'40px', textAlign:'center', color:'#555', textDecoration:'none'}}>⚙️ Aller à Admin</a>
    </div>
  )
            }
