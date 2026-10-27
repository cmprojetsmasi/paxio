import { useState, useEffect } from 'react'

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({email:'', pass:''})
  const [livres, setLivres] = useState([])
  const [form, setForm] = useState({titre:'', prix:'5 $', couverture:'', pdfName:''})
  const [loading, setLoading] = useState(false)

  const ADMIN_EMAIL = "enakahosa7@gmail.com"
  const ADMIN_PASS = "PaXio2026Admin!"

  useEffect(() => {
    setIsAdmin(localStorage.getItem('paxio_admin') === 'true')
    try {
      setLivres(JSON.parse(localStorage.getItem('paxio_livres') || '[]'))
    } catch(e){ setLivres([]) }
  }, [])

  const seConnecter = () => {
    if(login.email === ADMIN_EMAIL && login.pass === ADMIN_PASS) {
      localStorage.setItem('paxio_admin', 'true')
      setIsAdmin(true)
    } else alert('Incorrect')
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    if(file.size > 800000) return alert('Image trop lourde, prends une photo plus petite (<800ko)')
    const reader = new FileReader()
    reader.onload = () => {
      setForm(f=>({...f, couverture: reader.result}))
    }
    reader.readAsDataURL(file)
  }

  const handlePdf = (e) => {
    const file = e.target.files[0]
    if(!file) return
    setForm(f=>({...f, pdfFile: file, pdfName: file.name}))
  }

  const ajouter = async () => {
    if(loading) return
    if(!form.titre) return alert('Mets le titre')
    if(!form.couverture) return alert('Choisis la couverture')
    if(!form.pdfFile) return alert('Choisis le PDF')

    setLoading(true)
    try {
      // On stocke le PDF à part dans IndexedDB (mémoire illimitée)
      const pdfData = await new Promise((res, rej) => {
        const r = new FileReader()
        r.onload = () => res(r.result)
        r.onerror = rej
        r.readAsDataURL(form.pdfFile)
      })

      const newLivre = {
        id: Date.now(),
        titre: form.titre,
        prix: form.prix,
        couverture: form.couverture,
        pdfName: form.pdfName
      }

      // Sauvegarde PDF dans grosse mémoire
      localStorage.setItem('pdf_' + newLivre.id, pdfData)

      const newList = [...livres, newLivre]
      localStorage.setItem('paxio_livres', JSON.stringify(newList))
      setLivres(newList)
      setForm({titre:'', prix:'5 $', couverture:'', pdfFile:null, pdfName:''})
      alert('✅ LIVRE AJOUTÉ ! Maintenant ' + newList.length + ' livres. Va voir la boutique.')
    } catch(err) {
      alert('Erreur stockage : PDF trop gros. Essaie un PDF de moins de 3 Mo. Erreur: ' + err.message)
    }
    setLoading(false)
  }

  const supprimer = (id) => {
    if(!confirm('Supprimer ?')) return
    localStorage.removeItem('pdf_' + id)
    const newList = livres.filter(l=>l.id !== id)
    localStorage.setItem('paxio_livres', JSON.stringify(newList))
    setLivres(newList)
  }

  if(!isAdmin) {
    return (
      <div style={{fontFamily:'Arial', background:'#131921', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
        <div style={{background:'white', padding:'25px', borderRadius:'8px', width:'100%', maxWidth:'360px'}}>
          <h2 style={{textAlign:'center'}}>🔒 Admin PaXio</h2>
          <input placeholder="Email admin" value={login.email} onChange={e=>setLogin({...login, email:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0'}}/>
          <input type="password" placeholder="Mot de passe" value={login.pass} onChange={e=>setLogin({...login, pass:e.target.value})} style={{width:'100%', padding:'12px', margin:'8px 0'}}/>
          <button onClick={seConnecter} style={{width:'100%', background:'#FFD814', padding:'12px', borderRadius:'8px', fontWeight:'bold'}}>Se connecter</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{fontFamily:'Arial', padding:'15px', background:'#EAEDED', minHeight:'100vh'}}>
      <div style={{maxWidth:'500px', margin:'0 auto', background:'white', padding:'20px', borderRadius:'8px'}}>
        <h2>Admin - {livres.length} livres</h2>
        <input placeholder="Titre" value={form.titre} onChange={e=>setForm({...form, titre:e.target.value})} style={{width:'100%', padding:'12px', margin:'6px 0'}}/>
        <input placeholder="Prix" value={form.prix} onChange={e=>setForm({...form, prix:e.target.value})} style={{width:'100%', padding:'12px', margin:'6px 0'}}/>

        <div style={{border:'1px dashed #aaa', padding:'12px', borderRadius:'6px', margin:'10px 0', background:form.couverture?'#e8f5e9':'#fff'}}>
          <label style={{fontWeight:'bold', fontSize:'13px'}}>📸 Couverture</label><br/>
          <input type="file" accept="image/*" onChange={handleImage} style={{marginTop:'6px'}}/>
          {form.couverture && <div><img src={form.couverture} style={{width:'100px', marginTop:'8px'}}/><p style={{fontSize:'11px', color:'green'}}>✅ Image prête</p></div>}
        </div>

        <div style={{border:'1px dashed #aaa', padding:'12px', borderRadius:'6px', margin:'10px 0', background:form.pdfName?'#e8f5e9':'#fff'}}>
          <label style={{fontWeight:'bold', fontSize:'13px'}}>📄 PDF</label><br/>
          <input type="file" accept="application/pdf" onChange={handlePdf} style={{marginTop:'6px'}}/>
          {form.pdfName && <p style={{fontSize:'12px', color:'green', marginTop:'6px'}}>✅ {form.pdfName} ({Math.round(form.pdfFile?.size/1000)} ko) prêt</p>}
        </div>

        <button onClick={ajouter} disabled={loading} style={{width:'100%', background: loading?'#ccc':'#FFD814', padding:'14px', borderRadius:'8px', fontWeight:'900', fontSize:'15px', border:'none', cursor:'pointer'}}>
          {loading ? '⏳ Ajout en cours...' : '➕ AJOUTER À LA VITRINE'}
        </button>

        <div style={{marginTop:'15px'}}>
          {livres.map(l=>(
            <div key={l.id} style={{display:'flex', gap:'8px', background:'#f7f7f7', padding:'8px', margin:'6px 0', borderRadius:'4px', alignItems:'center'}}>
              <img src={l.couverture} style={{width:'35px'}}/>
              <div style={{flex:1, fontSize:'11px'}}><b>{l.titre}</b><br/>{l.prix} - {l.pdfName}</div>
              <button onClick={()=>supprimer(l.id)} style={{background:'#ff4444', color:'white', border:'none', padding:'4px 8px', borderRadius:'4px'}}>X</button>
            </div>
          ))}
        </div>
        <a href="/" style={{display:'block', textAlign:'center', marginTop:'15px', color:'#0066c0'}}>→ Voir boutique</a>
      </div>
    </div>
  )
}
