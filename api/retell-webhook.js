
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("Retell Webhook Running");
});

// Receive webhook events from Retell
app.post("/retell-webhook", async (req, res) => {
  console.log("Webhook event received:", req.body);

  res.json({
    status: "ok",
    received: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
