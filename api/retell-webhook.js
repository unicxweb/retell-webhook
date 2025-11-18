export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Webhook received:", req.body);
    return res.status(200).json({ message: "Webhook received" });
  }

  res.status(200).send("Retell webhook is live!");
}
