import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data: votes, error } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const yesCount = votes.filter(v => v.team === 'yes').length;
    const noCount = votes.filter(v => v.team === 'no').length;
    const lastVote = votes[0] || null;

    res.status(200).json({ yesCount, noCount, lastVote });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
