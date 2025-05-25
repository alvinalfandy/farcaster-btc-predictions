import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { team, untrustedData } = req.body;
    const username = untrustedData?.frameUser?.username || 'anonymous';

    const { error } = await supabase.from('votes').insert([
      { team, username }
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Vote counted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
