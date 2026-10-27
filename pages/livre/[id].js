import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Livre() {
  const router = useRouter()
  const { id } = router.query
  const [livre, setLivre] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  
  // LIT TA CONFIG VERCEL
  const gateway = process.env.NEXT_PUBLIC_OPTGATEWAY || process.env.NEXT_PUBLIC_FLEXPAIE_KEY || "simulation"

  useEffect(() => {
    if(!id) return
    const livres = JSON.parse(localStorage.getItem('paxio_livres') || '[]')
    setLivre(livres.find(l => String(l.id) === String(id)) || null)
  }, [id])

  const handleAcheter = () => {
    const user = JSON.parse(localStorage.getItem('paxio_user') || 'null')
    if(!user) {
      alert('Crée ton compte d\'abord')
      router.push('/compte')
      return
    }
    setShowCheckout(true)
  }

  const payer = () => {
    setShowCheckout(false)
    if(gateway === "simulation" || !gateway) {
      alert('Paiement Mobile Money simulé - En attente clé FlexPaie\n\nGateway actuel: ' + gateway)
      const pdfData = localStorage.getItem('pdf_' + livre.id)
      if(pdfData) {
        const a = document.createElement('a')
        a.href = pdfData
        a.download = livre.titre + '.pdf'
        a.click()
      }
    } else {
      // Quand FlexPaie sera prêt, ça appellera ton API
      window.location.href = `/api/pay?livreId=${livre.id}&gateway=${gateway}`
    }
  }

  if(!livre) return <div style={{padding:'20px'}}>Chargement... <a href="/">Accueil</a></div>

  return (
    <div style={{fontFamily:'Arial', background:'white', minHeight:'100vh'}}>
      <div style={{background:'#131921', color:'white', padding:'10px 15px'}}>
        <a href="/" style={{color:'white', textDecoration:'none'}}>← Retour</a> <b style={{marginLeft:'10px'}}>PAXIO</b>
        <span style={{float:'right', fontSize:'11px', background:'#333', padding:'3px 6px', borderRadius:'4px'}}>Gateway: {gateway}</span>
      </div>
      <div style={{maxWidth:'900px', margin:'0 auto', padding:'15px'}}>
        <img src={livre.couverture} style={{width:'100%', maxWidth:'400px', borderRadius:'8px'}}/>
        <h1 style={{fontSize:'20px'}}>{livre.titre}</h1>
        <p style={{fontSize:'26px', fontWeight:'bold'}}>{livre.prix}</p>
        <button onClick={handleAcheter} style={{width:'100%', background:'#FFD814', padding:'16px', borderRadius:'20px', fontWeight:'900', fontSize:'17px', border:'none'}}>
          Acheter maintenant - Payer {livre.prix}
        </button>
      </div>

      {showCheckout && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:'15px'}}>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', maxWidth:'350px', width:'100%'}}>
            <h3 style={{marginTop:0}}>paxio-vm9y.vercel.app indique</h3>
            <p>Paiement Mobile Money simulé - En attente clé FlexPaie</p>
            <p style={{fontSize:'12px', color:'#666'}}>Gateway détecté: {gateway}<br/>Après paiement, le PDF sera téléchargé automatiquement.</p>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px', marginTop:'15px'}}>
              <button onClick={()=>setShowCheckout(false)}>Annuler</button>
              <button onClick={payer} style={{background:'#0066c0', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px'}}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
  }
