// pages/api/.well-known/farcaster.js
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const manifest = {
    "accountAssociation": {
      "header": "eyJmaWQiOjAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0",
      "payload": "eyJkb21haW4iOiJmYXJjYXN0ZXItYnRjLXByZWRpY3Rpb25zLXZzcHYudmVyY2VsLmFwcCJ9",
      "signature": "MHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA"
    },
    "frame": {
      "name": "BTC Price Prediction",
      "iconUrl": "https://farcaster-btc-predictions-vspv.vercel.app/icon.png", 
      "splashImageUrl": "https://farcaster-btc-predictions-vspv.vercel.app/og/result.png",
      "webhookUrl": "https://farcaster-btc-predictions-vspv.vercel.app/api/webhook"
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).json(manifest);
}