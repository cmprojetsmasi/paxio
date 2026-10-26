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
    <div style={{fontFamily:'Arial, sans-serif', background:'#EAEDED', minHeight:'100vh'}}>
      
      {/* HEADER STYLE AMAZON */}
      <div style={{background:'#131921', color:'white', padding:'10px 15px', position:'sticky', top:0, zIndex:100}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px', maxWidth:'1200px', margin:'0 auto'}}>
          <h1 style={{margin:0, fontSize:'22px', fontWeight:'900', letterSpacing:'1px'}}>PAXIO</h1>
          <div style={{fontSize:'11px', lineHeight:'12px', display:'none'}}>
            <span style={{color:'#ccc'}}>Livrer à</span><br/><b>Kinshasa</b>
          </div>
          
          {/* BARRE DE RECHERCHE AMAZON - CORRIGÉE 1 SEULE LOUPE */}
          <div style={{flex:1, display:'flex', margin:'0 10px', borderRadius:'4px', overflow:'hidden', height:'40px'}}>
            <div style={{background:'#f3f3', color:'#555', padding:'0 8px', display:'flex', alignItems:'center', fontSize:'12px', borderRight:'1px solid #ddd'}}>Tous</div>
            <input 
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher sur PaXio"
              style={{flex:1, border:'none', padding:'0 10px', fontSize:'15px', outline:'none'}}
            />
            <button style={{background:'#febd69', border:'none', padding:'0 15px', fontSize:'18px'}}>⌕</button>
          </div>

          <div style={{fontSize:'13px', textAlign:'right'}}>
            <span style={{fontSize:'11px'}}>Bonjour, Identifiez-vous</span><br/><b>Compte & Listes</b>
          </div>
        </div>
      </div>

      {/* SOUS-MENU CATEGORIES */}
      <div style={{background:'#232f3e', color:'white', padding:'8px 15px', fontSize:'13px', display:'flex', gap:'15px', overflowX:'auto'}}>
        <span>☰ Tous</span><span>Meilleures ventes</span><span>IA</span><span>Business</span><span>SaaS</span><span>Tech</span><span style={{color:'#febd69'}}>Nouveautés PaXio</span>
      </div>

      {/* HERO */}
      <div style={{background:'linear-gradient(#febd69, #EAEDED)', padding:'20px 15px 0', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{background:'white', padding:'15px', borderRadius:'4px', marginBottom:'-20px', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}>
          <h2 style={{margin:'0 0 5px', fontSize:'18px'}}>Bienvenue sur PaXio, Emmanuel</h2>
          <p style={{margin:0, fontSize:'13px', color:'#565959'}}>{filtres.length} livre(s) • Livraison instantanée par téléchargement • Paiement Mobile Money</p>
        </div>
      </div>

      {/* VITRINE PRODUITS STYLE AMAZON */}
      <div style={{maxWidth:'1200px', margin:'40px auto 0', padding:'15px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'15px'}}>
        {filtres.length === 0 ? (
          <div style={{gridColumn:'1/-1', background:'white', padding:'40px', textAlign:'center', borderRadius:'4px'}}>
            <p style={{fontSize:'50px', margin:0}}>📚</p>
            <p>Aucun résultat pour "{search}"</p>
            <a href="/admin" style={{color:'#0066c0'}}>Ajouter un livre dans l'admin</a>
          </div>
        ) : filtres.map((l,i)=>(
          <div key={i} style={{background:'white', borderRadius:'4px', padding:'12px', display:'flex', flexDirection:'column', boxShadow:'0 2px 5px rgba(15,17,17,0.15)'}}>
            <div style={{background:'#f7f7f7', borderRadius:'4px', padding:'10px', textAlign:'center', height:'200px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <img src={l.couverture} style={{maxWidth:'100%', maxHeight:'180px', objectFit:'contain'}}/>
            </div>
            <div style={{marginTop:'10px', flex:1}}>
              <span style={{background:'#e67a00', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'3px'}}>Best Seller</span>
              <h3 style={{fontSize:'14px', margin:'8px 0 4px', fontWeight:'400', lineHeight:'18px', height:'54px', overflow:'hidden', color:'#0F1111'}}>{l.titre}</h3>
              <div style={{color:'#FFA41C', fontSize:'13px'}}>★★★★★ <span style={{color:'#007185', fontSize:'11px'}}> 127</span></div>
              <div style={{marginTop:'6px'}}>
                <span style={{fontSize:'18px', fontWeight:'700'}}>{l.prix || '5$'}</span> <span style={{fontSize:'12px', color:'#565959'}}>14 500 CDF</span>
              </div>
              <p style={{fontSize:'11px', color:'#067D62', margin:'4px 0'}}>✔️ Téléchargement instantané</p>
            </div>
            <a href={l.pdf} download style={{marginTop:'10px', background:'#FFD814', border:'1px solid #FCD200', padding:'8px', borderRadius:'8px', textAlign:'center', textDecoration:'none', color:'#0F1111', fontSize:'13px', boxShadow:'0 2px 5px rgba(213,217,0.5)'}}>📥 Voir le livre</a>
            <a href="/admin" style={{textAlign:'center', fontSize:'11px', color:'#565959', marginTop:'8px', textDecoration:'none'}}>Vendu par PaXio</a>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', padding:'30px', fontSize:'12px', color:'#565959'}}>
        <a href="/admin" style={{background:'white', border:'1px solid #ddd', padding:'10px 20px', borderRadius:'8px', textDecoration:'none', color:'#0F1111'}}>⚙️ Admin - Ajouter un e-book</a>
        <p style={{marginTop:'15px'}}>© 2026 PaXio - Kinshasa, RDC</p>
      </div>
    </div>
  )
        }
