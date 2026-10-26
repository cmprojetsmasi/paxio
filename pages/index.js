import { useState, useEffect } from 'react'

export default function Home() {
  const [livres, setLivres] = useState([])
  const [search, setSearch] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLivres(JSON.parse(localStorage.getItem('paxio_livres') || '[]'))
    setUser(JSON.parse(localStorage.getItem('paxio_user') || 'null'))
  }, [])

  const filtres = livres.filter(l => 
    l.titre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{fontFamily:'Arial, sans-serif', background:'#EAEDED', minHeight:'100vh'}}>
      
      <div style={{background:'#131921', color:'white', padding:'10px 15px', position:'sticky', top:0, zIndex:100}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px', maxWidth:'1200px', margin:'0 auto'}}>
          <h1 style={{margin:0, fontSize:'22px', fontWeight:'900'}}>PAXIO</h1>
          
          <div style={{flex:1, display:'flex', margin:'0 10px', borderRadius:'4px', overflow:'hidden', height:'40px'}}>
            <input 
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher sur PaXio"
              style={{flex:1, border:'none', padding:'0 12px', fontSize:'15px', outline:'none'}}
            />
            <button style={{background:'#febd69', border:'none', padding:'0 15px', fontSize:'18px'}}>⌕</button>
          </div>

          <a href="/compte" style={{color:'white', textDecoration:'none', fontSize:'12px', textAlign:'right', lineHeight:'13px'}}>
            <span>{user ? `Bonjour, ${user.nom}` : 'Bonjour, Identifiez-vous'}</span><br/><b>Compte & Listes</b>
          </a>
        </div>
      </div>

      <div style={{background:'#232f3e', color:'white', padding:'8px 15px', fontSize:'13px', display:'flex', gap:'15px', overflowX:'auto'}}>
        <span>☰ Tous</span><span>Meilleures ventes</span><span>IA</span><span>Business</span><span>SaaS</span><span>Tech</span><a href="/compte" style={{color:'#febd69', textDecoration:'none'}}>Mon Compte</a>
      </div>

      <div style={{maxWidth:'1200px', margin:'20px auto 0', padding:'0 15px'}}>
        <div style={{background:'white', padding:'12px 15px', borderRadius:'4px', fontSize:'13px'}}>
          {user ? `👋 Bonjour ${user.nom} - ` : ''}{filtres.length} livre(s) • Livraison instantanée • <a href="/admin" style={{color:'#0066c0'}}>Admin</a>
        </div>
      </div>

      <div style={{maxWidth:'1200px', margin:'15px auto 0', padding:'15px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'15px'}}>
        {filtres.length === 0 ? (
          <div style={{gridColumn:'1/-1', background:'white', padding:'40px', textAlign:'center', borderRadius:'4px'}}>
            <p>Aucun livre pour "{search}"</p>
            <a href="/admin" style={{color:'#0066c0'}}>Ajouter un livre</a>
          </div>
        ) : filtres.map((l)=>(
          <div key={l.id} style={{background:'white', borderRadius:'4px', padding:'12px', display:'flex', flexDirection:'column', boxShadow:'0 2px 5px rgba(0,0,0,0.15)'}}>
            <a href={`/livre/${l.id}`} style={{background:'#f7f7f7', borderRadius:'4px', padding:'10px', textAlign:'center', height:'200px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>
              <img src={l.couverture} style={{maxWidth:'100%', maxHeight:'180px', objectFit:'contain'}}/>
            </a>
            <div style={{marginTop:'10px', flex:1}}>
              <span style={{background:'#e67a00', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'3px'}}>Best Seller</span>
              <a href={`/livre/${l.id}`} style={{textDecoration:'none', color:'#0F1111'}}><h3 style={{fontSize:'14px', margin:'8px 0 4px', fontWeight:'400', height:'54px', overflow:'hidden'}}>{l.titre}</h3></a>
              <div style={{color:'#FFA41C', fontSize:'13px'}}>★★★★★ <span style={{color:'#007185', fontSize:'11px'}}>127</span></div>
              <div style={{marginTop:'6px'}}><span style={{fontSize:'18px', fontWeight:'700'}}>{l.prix}</span> <span style={{fontSize:'11px', color:'#565959'}}>14 500 CDF</span></div>
            </div>
            <a href={`/livre/${l.id}`} style={{marginTop:'10px', background:'#FFD814', border:'1px solid #FCD200', padding:'8px', borderRadius:'8px', textAlign:'center', textDecoration:'none', color:'#0F1111', fontSize:'13px', display:'block'}}>Voir le détail</a>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', padding:'30px', fontSize:'12px', color:'#565959'}}>
        © 2026 PaXio - Kinshasa
      </div>
    </div>
  )
}
