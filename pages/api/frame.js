// pages/api/frame.js
export default function handler(req, res) {
  // Force HTML content type
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  const frameHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BTC Vote Frame</title>
    
    <!-- Farcaster Frame Meta Tags -->
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:button:1" content="✅ Yes - $120K+" />
    <meta property="fc:frame:button:2" content="❌ No - Under $120K" />
    <meta property="fc:frame:post_url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/vote" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Will BTC reach $120K this year?" />
    <meta property="og:description" content="Cast your vote on Bitcoin price prediction" />
    <meta property="og:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
    <meta property="og:url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
    <meta property="og:type" content="website" />
    
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Will BTC reach $120K this year?" />
    <meta name="twitter:description" content="Cast your vote on Bitcoin price prediction" />
    <meta name="twitter:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
        <h1>🚀 BTC Price Prediction</h1>
        <p>Will Bitcoin reach $120,000 this year?</p>
        <p style="color: #666;">Share this frame on Farcaster to vote!</p>
    </div>
</body>
</html>`;

  res.status(200).send(frameHtml);
}