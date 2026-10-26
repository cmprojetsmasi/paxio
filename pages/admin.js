import { useState, useEffect } from 'react'

export default function Admin() {
  const [livres, setLivres] = useState([])
  const [form, setForm] = useState({ titre: '', prix: '5', couverture: '', pdf: '' })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('paxio_livres') || '[]')
    setLivres(saved)
  }, [])

  const saveLivres = (newLivres) => {
    setLivres(newLivres)
    localStorage.setItem('paxio_livres', JSON.stringify(newLivres))
    alert('Livre ajouté ! Va voir sur /')
  }

  const handleAdd = () => {
    if(!form.titre || !form.couverture) return alert('Titre et couverture obligatoires')
    const newLivres = [...livres, { ...form, id: Date.now() }]
    saveLivres(newLivres)
    setForm({ titre: '', prix: '5', couverture: '', pdf: '' })
  }

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm({...form, [type]: ev.target.result})
    }
    reader.readAsDataURL(file)
  }

  const supprimer = (id) => {
    const newLivres = livres.filter(l => l.id !== id)
    saveLivres(newLivres)
  }

  return (
    <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto', fontFamily:'sans-serif'}}>
      <h1>⚙️ Admin PaXio</h1>
      
      <div style={{border:'1px solid #ddd', padding:'15px', borderRadius:'12px', marginBottom:'20px'}}>
        <input placeholder="Titre du livre" value={form.titre} onChange={e=>setForm({...form, titre: e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}} />
        <input placeholder="Prix ex: 5$ " value={form.prix} onChange={e=>setForm({...form, prix: e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}} />
        
        <label>Couverture (image):</label>
        <input type="file" accept="image/*" onChange={e=>handleFile(e, 'couverture')} style={{width:'100%', margin:'5px 0'}}/>
        
        <label>PDF du livre:</label>
        <input type="file" accept=".pdf" onChange={e=>handleFile(e, 'pdf')} style={{width:'100%', margin:'5px 0'}}/>

        {form.couverture && <img src={form.couverture} style={{width:'100px', marginTop:'10px'}}/>}

        <button onClick={handleAdd} style={{width:'100%', background:'black', color:'white', padding:'12px', borderRadius:'8px', marginTop:'15px', fontWeight:'bold'}}>➕ Ajouter le livre</button>
      </div>

      <h3>Mes livres ({livres.length})</h3>
      {livres.map(l=>(
        <div key={l.id} style={{display:'flex', gap:'10px', border:'1px solid #eee', padding:'10px', margin:'5px 0', borderRadius:'8px'}}>
          <img src={l.couverture} style={{width:'50px', height:'60px', objectFit:'cover'}}/>
          <div style={{flex:1}}>
            <b>{l.titre}</b><br/>{l.prix}
          </div>
          <button onClick={()=>supprimer(l.id)} style={{background:'red', color:'white', border:'none', borderRadius:'6px', padding:'5px 10px'}}>X</button>
        </div>
      ))}

      <a href="/" style={{display:'block', textAlign:'center', marginTop:'20px', background:'#0f0', padding:'12px', borderRadius:'8px', textDecoration:'none', color:'black', fontWeight:'bold'}}>👁️ Voir ma boutique</a>
    </div>
  )
  }
