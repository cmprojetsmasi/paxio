import { useState, useEffect } from 'react'

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({email:'', pass:''})
  const [livres, setLivres] = useState([])
  const [form, setForm] = useState({titre:'', prix:'5 $', couverture:'', pdf:'', pdfName:''})

  const ADMIN_EMAIL = "enakahosa7@gmail.com"
  const ADMIN_PASS = "PaXio2026Admin!"

  useEffect(() => {
    setIsAdmin(localStorage.getItem('paxio_admin') === 'true')
    setLivres(JSON.parse(localStorage.getItem('paxio_livres') || '[]'))
  }, [])

  const seConnecter = () => {
    if(login.email === ADMIN_EMAIL && login.pass === ADMIN_PASS) {
      localStorage.setItem('paxio_admin', 'true')
      setIsAdmin(true)
    } else {
      alert('Email ou mot de passe incorrect')
    }
  }

  const deconnecterAdmin = () => {
    localStorage.removeItem('paxio_admin')
    setIsAdmin(false)
  }

  // UPLOAD IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm({...form, couverture: reader.result})
      alert('Image chargée ✅')
    }
    reader.readAsDataURL(file)
  }

  // UPLOAD PDF
  const handlePdf = (e) => {
    const file = e.target.files[0]
    if(!file) return
    if(file.size > 5000000) return alert('PDF trop gros (max 5Mo)')
    const reader = new FileReader()
    reader.onload = () => {
      setForm({...form, pdf: reader.result, pdfName: file.name})
      alert('PDF chargé ✅ : ' + file.name)
    }
    reader.readAsDataURL(file)
  }

  const ajouter = () => {
    if(!form.titre) return alert('Mets le titre')
    if(!form.couverture) return alert('Choisis une image de couverture')
    if(!form.pdf) return alert('Choisis le fichier PDF')
    const newLivre = {id: Date.now(), titre: form.titre, prix: form.prix, couverture: form.couverture, pdf: form.pdf}
    const newList = [...livres, newLivre]
    localStorage.setItem('paxio_livres', JSON.stringify(newList))
    setLivres(newList)
    setForm({titre:'', prix:'5 $', couverture:'', pdf:'', pdfName:''})
    alert('Livre ajouté ! Maintenant ' + newList.length + ' livres en boutique 🎉')
  }

  const supprimer = (id) => {
    if(!confirm('Supprimer ce livre ?')) return
    const newList = livres.filter(l=>l.id !== id)
    localStorage.setItem('paxio_livres', JSON.stringify(newList))
    setLivres(newList)
  }

  if(!isAdmin) {
    return (
      <div style={{fontFamily:'Arial', background:'#131921', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
        <div style={{background:'white', padding:'25px', borderRadius:'8px', width:'100%', maxWidth:'360px'}}>
          <h2 style={{textAlign:'center'}}>🔒 Admin PaXio</h2>
          <input placeholder="Email admin" value={login.email} onChange={e=>setLogin({...login, email:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #aaa', borderRadius:'4px'}}/>
          <input type="password" placeholder="Mot de passe admin" value={login.pass} onChange={e=>setLogin({...login, pass:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #aaa', borderRadius:'4px'}}/>
          <button onClick={seConnecter} style={{width:'100%', background:'#FFD814', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>Se connecter</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{fontFamily:'Arial', padding:'15px', background:'#EAEDED', minHeight:'100vh'}}>
      <div style={{maxWidth:'500px', margin:'0 auto', background:'white', padding:'20px', borderRadius:'8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:0}}>Admin PaXio</h2>
          <button onClick={deconnecterAdmin} style={{background:'#f0f0f0', border:'1px solid #ddd', padding:'6px 12px', borderRadius:'4px', fontSize:'11px'}}>Déco</button>
        </div>
        <p style={{fontSize:'12px', color:'#666'}}>{livres.length} livres en boutique</p>

        <input placeholder="Titre du livre ex: L'IA en 2026" value={form.titre} onChange={e=>setForm({...form, titre:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>
        <input placeholder="Prix ex: 5 $ ou 14 500 CDF" value={form.prix} onChange={e=>setForm({...form, prix:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0', border:'1px solid #ccc', borderRadius:'4px'}}/>

        {/* BOUTON IMAGE */}
        <div style={{margin:'10px 0', border:'1px dashed #aaa', padding:'12px', borderRadius:'6px', background:form.couverture?'#e8f5e9':'#fafafa'}}>
          <label style={{display:'block', fontSize:'13px', fontWeight:'bold', marginBottom:'6px'}}>📸 Couverture du livre</label>
          <input type="file" accept="image/*" onChange={handleImage} style={{width:'100%'}}/>
          {form.couverture && <img src={form.couverture} style={{width:'100px', marginTop:'10px', borderRadius:'4px', border:'1px solid #ddd'}}/>}
          {form.couverture && <p style={{fontSize:'11px', color:'green', margin:'5px 0 0'}}>✅ Image prête</p>}
        </div>

        {/* BOUTON PDF */}
        <div style={{margin:'10px 0', border:'1px dashed #aaa', padding:'12px', borderRadius:'6px', background:form.pdf?'#e8f5e9':'#fafafa'}}>
          <label style={{display:'block', fontSize:'13px', fontWeight:'bold', marginBottom:'6px'}}>📄 Fichier PDF à vendre</label>
          <input type="file" accept="application/pdf" onChange={handlePdf} style={{width:'100%'}}/>
          {form.pdfName && <p style={{fontSize:'11px', color:'green', margin:'8px 0 0'}}>✅ {form.pdfName} prêt</p>}
        </div>

        <button onClick={ajouter} style={{width:'100%', background:'#FFD814', border:'2px solid #FCD200', padding:'14px', borderRadius:'8px', fontWeight:'900', marginTop:'10px', cursor:'pointer', fontSize:'15px'}}>➕ AJOUTER À LA VITRINE</button>

        <div style={{marginTop:'20px', borderTop:'1px solid #eee', paddingTop:'10px'}}>
          <h4 style={{fontSize:'13px'}}>Tes livres ({livres.length}) :</h4>
          {livres.map(l=>(
            <div key={l.id} style={{display:'flex', alignItems:'center', gap:'10px', margin:'8px 0', padding:'8px', background:'#f7f7f7', borderRadius:'4px'}}>
              <img src={l.couverture} style={{width:'40px', height:'50px', objectFit:'cover', borderRadius:'2px'}}/>
              <div style={{flex:1, fontSize:'12px'}}><b>{l.titre}</b><br/>{l.prix}</div>
              <button onClick={()=>supprimer(l.id)} style={{background:'#ff4444', color:'white', border:'none', padding:'5px 8px', borderRadius:'4px', fontSize:'10px'}}>X</button>
            </div>
          ))}
        </div>

        <a href="/" style={{display:'block', textAlign:'center', marginTop:'20px', color:'#0066c0', fontSize:'14px', fontWeight:'bold', textDecoration:'none'}}>→ Voir la boutique avec {livres.length} livres</a>
      </div>
    </div>
  )
      }
