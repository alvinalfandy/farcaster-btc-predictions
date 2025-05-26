// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BTC Vote Frame</title>
        
        {/* Farcaster Frame meta tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="✅ Yes - $120K+" />
        <meta property="fc:frame:button:2" content="❌ No - Under $120K" />
        <meta property="fc:frame:post_url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/vote" />
        
        {/* Mini App Manifest */}
        <link rel="manifest" href="/api/manifest" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Will BTC reach $120K this year?" />
        <meta property="og:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
        <meta property="og:description" content="Cast your vote on Bitcoin price prediction" />
        <meta property="og:url" content="https://farcaster-btc-predictions-vspv.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1>🚀 BTC Vote Frame</h1>
        <p>Will BTC reach $120K this year?</p>
        <p style={{ color: '#666' }}>
          Share this URL on Warpcast to let people vote:<br/>
          <code style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>
            https://farcaster-btc-predictions-vspv.vercel.app
          </code>
        </p>
        
        <div style={{ marginTop: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Debug Info:</h3>
          <p>Frame endpoint: /api/frame</p>
          <p>Vote endpoint: /api/vote</p>
          <p>Results endpoint: /api/results</p>
        </div>
      </div>
    </>
  )
}