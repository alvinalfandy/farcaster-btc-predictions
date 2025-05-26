export default async function handler(req, res) {
  console.log('Webhook called:', req.method, req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Handle webhook events dari Farcaster
    const { type, data } = req.body;
    
    switch (type) {
      case 'frame.added':
        console.log('Frame added to user:', data);
        break;
      case 'frame.removed':
        console.log('Frame removed from user:', data);
        break;
      case 'notifications.enabled':
        console.log('Notifications enabled:', data);
        break;
      case 'notifications.disabled':
        console.log('Notifications disabled:', data);
        break;
      default:
        console.log('Unknown webhook type:', type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}