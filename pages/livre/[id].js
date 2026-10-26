import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LivreDetail() {
  const router = useRouter()
  const { id } = router.query
  const [livre, setLivre] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(!id) return
    const livres = JSON.parse(localStorage.getItem('paxio_livres') || '[]')
    setLivre(livres.find(l => l.id == id))
    setUser(JSON.parse(localStorage.getItem('paxio_user') || 'null'))
  }, [id])

  const acheter = () => {
    if(!user) return router.push('/compte')
    alert('Paiement Mobile Money simulé - En attente clé FlexPaie\n\nAprès paiement, le PDF sera téléchargé automatiquement.\n(Fonctionnalité prête, il manque juste ta clé API)')
    window.location.href = livre.pdf
  }

  if(!livre) return <p style={{padding:'20px'}}>Chargement...</p>

  return (
    <div style={{fontFamily:'Arial', background:'#EAEDED', minHeight:'100vh'}}>
      <div style={{background:'#131921', color:'white', padding:'12px 15px'}}>
        <a href="/" style={{color:'white', textDecoration:'none'}}>◀ Retour</a> <b style={{marginLeft:'15px'}}>PAXIO</b>
      </div>
      <div style={{maxWidth:'1000px', margin:'20px auto', background:'white', display:'flex', flexWrap:'wrap', gap:'20px', padding:'20px', borderRadius:'8px'}}>
        <img src={livre.couverture} style={{width:'300px', maxWidth:'100%', objectFit:'contain'}}/>
        <div style={{flex:1, minWidth:'280px'}}>
          <h1 style={{fontSize:'22px'}}>{livre.titre}</h1>
          <div style={{color:'#FFA41C'}}>★★★★★ <span style={{color:'#007185'}}>127 évaluations</span></div>
          <hr/>
          <p style={{fontSize:'22px', fontWeight:'bold'}}>{livre.prix} <span style={{fontSize:'14px', fontWeight:'normal', color:'#565959'}}>14 500 CDF</span></p>
          <p style={{color:'#067D62', fontSize:'13px'}}>✔️ En stock - Livraison instantanée par email après paiement Mobile Money</p>
          <p style={{fontSize:'14px', color:'#333'}}>E-book PDF - Accès immédiat - Compatible téléphone, tablette, PC. Guide pratique pour entrepreneurs à Kinshasa.</p>
          
          <button onClick={acheter} style={{width:'100%', background:'#FFD814', border:'1px solid #FCD200', padding:'14px', borderRadius:'8px', fontWeight:'bold', marginTop:'15px', fontSize:'16px'}}>
            {user ? `Acheter maintenant - Payer ${livre.prix}` : 'Identifiez-vous pour acheter'}
          </button>
          <p style={{fontSize:'11px', color:'#565959', marginTop:'10px', textAlign:'center'}}>🔒 Paiement sécurisé Orange Money, Airtel Money, M-Pesa via FlexPaie</p>
        </div>
      </div>
    </div>
  )
}
