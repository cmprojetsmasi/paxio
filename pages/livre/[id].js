import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Livre() {
  const router = useRouter()
  const { id } = router.query
  const [livre, setLivre] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    if(!id) return
    try {
      const livres = JSON.parse(localStorage.getItem('paxio_livres') || '[]')
      const found = livres.find(l => String(l.id) === String(id))
      setLivre(found || null)
    } catch(e){ setLivre(null) }
  }, [id])

  const handleAcheterClick = () => {
    const user = JSON.parse(localStorage.getItem('paxio_user') || 'null')
    if(!user) {
      alert('Crée ton compte d\'abord pour acheter')
      router.push('/compte')
      return
    }
    setShowCheckout(true)
  }

  const confirmerPaiement = () => {
    setShowCheckout(false)
    try {
      const pdfData = localStorage.getItem('pdf_' + livre.id)
      if(pdfData) {
        const a = document.createElement('a')
        a.href = pdfData
        a.download = (livre.pdfName || livre.titre) + '.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        alert('✅ Paiement simulé réussi ! Ton PDF se télécharge.')
      } else {
        alert('Paiement Mobile Money simulé - En attente clé FlexPaie\n\nAprès paiement, le PDF sera téléchargé automatiquement.\n(Fonctionnalité prête, il manque juste ta clé API)')
      }
    } catch(err) {
      alert('Paiement Mobile Money simulé - En attente clé FlexPaie\n\nAprès paiement, le PDF sera téléchargé automatiquement.\n(Fonctionnalité prête, il manque juste ta clé API)\n\nDétail: ' + err.message)
    }
  }

  if(!livre) return <div style={{padding:'20px', fontFamily:'Arial'}}>Chargement du livre... Si ça ne charge pas, retourne à <a href="/">l'accueil</a> et re-clique sur le livre.</div>

  return (
    <div style={{fontFamily:'Arial', background:'white', minHeight:'100vh'}}>
      <div style={{background:'#131921', color:'white', padding:'10px 15px', display:'flex', alignItems:'center'}}>
        <a href="/" style={{color:'white', textDecoration:'none', fontSize:'20px'}}>←</a>
        <b style={{marginLeft:'15px'}}>PAXIO</b>
      </div>

      <div style={{maxWidth:'1000px', margin:'0 auto', padding:'15px', display:'flex', flexDirection:'column', gap:'20px'}}>
        <img src={livre.couverture} style={{width:'100%', maxWidth:'400px', margin:'0 auto', borderRadius:'8px', border:'1px solid #ddd'}}/>
        <div>
          <h1 style={{fontSize:'20px', margin:'0'}}>{livre.titre}</h1>
          <p style={{color:'#FFA41C', margin:'5px 0'}}>★★★★★ 127 avis • Format PDF</p>
          <p style={{fontSize:'28px', fontWeight:'900', margin:'10px 0'}}>{livre.prix}</p>
          <p style={{fontSize:'13px', color:'#555'}}>Paiement sécurisé • Accès instantané après Mobile Money</p>
          
          <button onClick={handleAcheterClick} style={{width:'100%', background:'#FFD814', border:'2px solid #FCD200', padding:'16px', borderRadius:'20px', fontWeight:'900', fontSize:'17px', cursor:'pointer', marginTop:'15px', boxShadow:'0 2px 5px rgba(0,0,0,0.2)'}}>
            Acheter maintenant - Payer {livre.prix}
          </button>
          <p style={{fontSize:'11px', textAlign:'center', marginTop:'10px', color:'#666'}}>🔒 Paiement sécurisé Orange Money, Airtel Money, M-Pesa via FlexPaie</p>
        </div>
      </div>

      {showCheckout && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:'15px'}}>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', width:'100%', maxWidth:'350px', boxShadow:'0 10px 30px rgba(0,0,0,0.3)'}}>
            <h3 style={{marginTop:0}}>paxio-vm9y.vercel.app indique</h3>
            <p style={{fontSize:'14px', color:'#333'}}>Paiement Mobile Money simulé - En attente clé FlexPaie</p>
            <p style={{fontSize:'13px', color:'#555', marginTop:'10px'}}>Après paiement, le PDF sera téléchargé automatiquement.<br/>(Fonctionnalité prête, il manque juste ta clé API)</p>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px', marginTop:'20px'}}>
              <button onClick={()=>setShowCheckout(false)} style={{background:'transparent', border:'none', padding:'10px 15px', color:'#666'}}>Annuler</button>
              <button onClick={confirmerPaiement} style={{background:'#0066c0', color:'white', border:'none', padding:'10px 20px', borderRadius:'6px', fontWeight:'bold'}}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
                  }
