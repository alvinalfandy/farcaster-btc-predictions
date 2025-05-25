export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json({
    frames: [
      {
        version: "vNext",
        title: "🚀 Will BTC reach $120K this year?",
        image: "https://farcaster-btc-predictions-vspv.vercel.app/og/result.png",
        buttons: [
          {
            label: "✅ Yes",
            action: "post",
            target: "https://farcaster-btc-predictions-vspv.vercel.app/api/vote",
            postBody: {
              team: "yes"
            }
          },
          {
            label: "❌ No",
            action: "post",
            target: "https://farcaster-btc-predictions-vspv.vercel.app/api/vote",
            postBody: {
              team: "no"
            }
          }
        ]
      }
    ]
  });
}
