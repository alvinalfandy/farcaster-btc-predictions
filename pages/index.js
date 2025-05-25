export default function Home() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BTC Vote Frame</title>
        
        {/* Farcaster Frame meta tags */}
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
        
        {/* Open Graph */}
        <meta property="og:title" content="BTC Vote Frame" />
        <meta property="og:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
        <meta property="og:description" content="Vote on BTC price predictions" />
      </head>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🚀 BTC Vote Frame</h1>
        <p>Will BTC reach $120K this year?</p>
        <p>Share this frame on Warpcast to let people vote!</p>
      </div>
    </>
  )
}