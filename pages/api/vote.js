// pages/api/vote.js
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  console.log('Vote endpoint hit:', req.method);
  console.log('Request body:', req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // Validate frame data exists
    if (!body.untrustedData || !body.trustedData) {
      console.error('Missing frame data');
      return res.status(400).json({ error: 'Invalid frame data' });
    }
    
    // Determine vote based on button clicked
    let team = 'unknown';
    let voteText = 'Unknown';
    
    const buttonIndex = body.untrustedData?.buttonIndex;
    
    if (buttonIndex === 1) {
      team = 'yes';
      voteText = 'YES - $120K+';
    } else if (buttonIndex === 2) {
      team = 'no';
      voteText = 'NO - Under $120K';
    } else {
      console.error('Invalid button index:', buttonIndex);
      return res.status(400).json({ error: 'Invalid button' });
    }
    
    const fid = body.untrustedData?.fid || body.trustedData?.messageBytes || 'anonymous';
    
    console.log('Processing vote:', { team, fid, buttonIndex });
    
    // Save vote to database
    const { error } = await supabase.from('votes').insert([
      { 
        team, 
        username: String(fid),
        created_at: new Date().toISOString()
      }
    ]);
    
    if (error) {
      console.error('Database error:', error);
      // Continue anyway, show result even if save failed
    }
    
    // Get current vote counts
    const { data: votes } = await supabase
      .from('votes')
      .select('team');
    
    const yesCount = votes?.filter(v => v.team === 'yes').length || 0;
    const noCount = votes?.filter(v => v.team === 'no').length || 0;
    const total = yesCount + noCount;
    
    // Return success frame
    const resultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vote Recorded - BTC Frame</title>
    
    <!-- Farcaster Frame Meta Tags -->
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:button:1" content="🔄 Vote Again" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:1:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
    <meta property="fc:frame:button:2" content="📊 View Results" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="https://farcaster-btc-predictions-vspv.vercel.app/results" />
    <meta property="fc:frame:post_url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Vote Recorded!" />
    <meta property="og:description" content="You voted: ${voteText} | YES: ${yesCount} NO: ${noCount}" />
    <meta property="og:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
        <h1>✅ Vote Recorded!</h1>
        <p><strong>You voted:</strong> ${voteText}</p>
        <p>Current Results:</p>
        <p>YES: ${yesCount} | NO: ${noCount}</p>
        <p style="color: #666;">Total votes: ${total}</p>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(resultHtml);
    
  } catch (error) {
    console.error('Error processing vote:', error);
    
    const errorHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
    <meta property="fc:frame:button:1" content="🔄 Try Again" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:button:1:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
    <meta property="fc:frame:post_url" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
        <h1>❌ Error occurred</h1>
        <p>Please try again</p>
        <p style="color: #666; font-size: 12px;">${error.message}</p>
    </div>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(500).send(errorHtml);
  }
}