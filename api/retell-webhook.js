export default function handler(req, res) {
  console.log("Incoming webhook from Retell:", req.body);

  // Always respond success
  res.status(200).json({ received: true });
}
