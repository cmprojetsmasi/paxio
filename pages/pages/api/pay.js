// LIVE OPT SOLUTION - pay.optsolution.pro
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ 
      status: "ready", 
      message: "API OPT Solution prête - Envoie un POST pour payer",
      live: !!process.env.OPTSOLUTION_API_KEY
    });
  }

  const { livreId, montant, phone } = req.body;
  const apiKey = process.env.OPTSOLUTION_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Clé OPTSOLUTION_API_KEY manquante sur Vercel" });
  }

  try {
    // Documentation OPT Solution : init paiement Mobile Money
    // Endpoint officiel OPT Solution
    const response = await fetch("https://pay.optsolution.pro/api/v1/payment/init", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        amount: parseFloat(montant) || 5,
        currency: "USD",
        reference: `PAXIO-${livreId}-${Date.now()}`,
        callback_url: "https://paxio-vm9y.vercel.app/api/callback",
        return_url: `https://paxio-vm9y.vercel.app/livre/${livreId}?paid=true`,
        customer_phone: phone,
        description: `Achat livre ${livreId} PAXIO`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Si l'endpoint exact est différent, OPT Solution renvoie l'erreur - on l'affiche
      return res.status(400).json({ 
        error: "Erreur OPT Solution", 
        details: data,
        hint: "Vérifie sur pay.optsolution.pro > Documentation > API pour l'URL exacte"
      });
    }

    return res.status(200).json({
      success: true,
      mode: "LIVE",
      gateway: "OPT Solution",
      data: data
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
                      }
