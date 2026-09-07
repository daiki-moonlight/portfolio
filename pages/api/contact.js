export default function handler(req, res){
  // Contact endpoint stub: replace with real email provider or integration
  if (req.method === 'POST'){
    // normally: validate payload, send email via SMTP/API, store to DB
    console.log('Contact form payload', req.body)
    return res.status(200).json({ ok: true })
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).end('Method Not Allowed')
}
