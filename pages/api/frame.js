export default function handler(req, res) {
  res.status(200).json({
    frames: [
      {
        version: "vNext",
        title: "🚀 Will BTC reach $120K this year?",
        image: "https://your-vercel-url.com/og/result.png",
        buttons: [
          {
            label: "✅ Yes",
            action: "post",
            target: "https://your-vercel-url.com/api/vote",
            postBody: { team: "yes" }
          },
          {
            label: "❌ No",
            action: "post",
            target: "https://your-vercel-url.com/api/vote",
            postBody: { team: "no" }
          }
        ]
      }
    ]
  });
}
