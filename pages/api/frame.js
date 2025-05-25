export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>BTC Vote Frame</title>
        
        <!-- Farcaster Frame meta tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:title" content="🚀 Will BTC reach $120K this year?" />
        <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
        <meta property="fc:frame:button:1" content="✅ Yes" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:1:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/vote" />
        <meta property="fc:frame:button:2" content="❌ No" />
        <meta property="fc:frame:button:2:action" content="post" />
        <meta property="fc:frame:button:2:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/vote" />
        <meta property="fc:frame:post_url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/vote" />
        
        <!-- Open Graph fallback -->
        <meta property="og:title" content="BTC Vote Frame" />
        <meta property="og:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
      </head>
      <body>
        <h1>BTC Vote Frame</h1>
        <p>Will BTC reach $120K this year?</p>
      </body>
    </html>
  `;
  
  res.status(200).send(html);
}