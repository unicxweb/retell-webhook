import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // YOUR FIXED TEST NUMBER HERE
    const phoneNumber = "+919009960102";  // ← change this to the number you want to call

    // YOUR RETELL AGENT ID HERE
    const agentId = "agent_061d7f7bd0d3188076c630cbdb";     // ← replace with actual Agent ID

    // YOUR RETELL API KEY
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing RETELL_API_KEY env variable" });
    }

    const response = await fetch("https://api.retellai.com/v1/calls", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to_number: phoneNumber,
        agent_id: agentId,
        webhook_url: "https://retell-webhook-fg4j.vercel.app/api/retell-webhook"
      })
    });

    const data = await response.json();
    console.log("CALL API RESPONSE:", data);

    return res.status(200).json({
      message: "Call triggered successfully",
      response: data
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error", details: err });
  }
}
