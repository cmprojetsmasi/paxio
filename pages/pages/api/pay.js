export default function handler(req, res) {
  const apiKey = process.env.OPTSOLUTION_API_KEY || '';
  const gateway = process.env.NEXT_PUBLIC_OPTGATEWAY || 'simulation';
  const isLive = apiKey.startsWith('sk_live_') && gateway === 'live';
  
  return res.status(200).json({ 
    live: isLive, 
    gateway: gateway,
    hasKey: !!apiKey 
  });
}
