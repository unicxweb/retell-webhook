import fetch from "cross-fetch";

export default async function handler(req, res) {
  try {
    const phone = req.query.to || "+919009960102"; // replace with your number for testing

    const response = await fetch("https://api.retellai.com/v1/calls", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: phone,
        agent_id: process.env.AGENT_ID,
        webhook_url: "https://your-vercel-domain.vercel.app/api/retell-webhook"
      })
    });

    const data = await response.json();
    console.log("📞 Call API:", data);

    return res.status(200).json({ started: true, data });

  } catch (err) {
    console.error("❌ Trigger error:", err);
    return res.status(500).json({ error: true });
  }
}
