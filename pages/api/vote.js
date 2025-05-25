import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log('Received POST data:', body);
      
      // Determine vote based on button clicked
      let team;
      if (body.untrustedData?.buttonIndex === 1) {
        team = 'yes';
      } else if (body.untrustedData?.buttonIndex === 2) {
        team = 'no';
      } else {
        // Fallback - check if team is directly provided
        team = body.team || 'unknown';
      }
      
      const username = body.untrustedData?.fid || body.untrustedData?.frameUser?.username || 'anonymous';
      
      // Save vote to database
      const { error } = await supabase.from('votes').insert([
        { team, username: String(username) }
      ]);
      
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
      }
      
      // Return frame response showing result
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:title" content="Vote recorded! Thanks for voting ${team.toUpperCase()}!" />
            <meta property="fc:frame:image" content="https://farcaster-btc-predictions-vspv.vercel.app/og/result.png" />
            <meta property="fc:frame:button:1" content="🔄 Vote Again" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta property="fc:frame:button:1:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/frame" />
            <meta property="fc:frame:button:2" content="📊 See Results" />
            <meta property="fc:frame:button:2:action" content="link" />
            <meta property="fc:frame:button:2:target" content="https://farcaster-btc-predictions-vspv.vercel.app/api/results" />
          </head>
          <body>
            <h1>Vote Recorded!</h1>
            <p>You voted: ${team.toUpperCase()}</p>
          </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
      
    } catch (error) {
      console.error('Error processing vote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}