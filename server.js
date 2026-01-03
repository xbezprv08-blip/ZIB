// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8159357714:AAF6gwXTTqwyTTfSYaqzQqZvhI49BwdprAQ";
const CHAT_ID = "-1003594948098";

app.post("/view", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];

  const text = `
👀 Page View
IP: ${ip}
UA: ${ua}
Time: ${new Date().toISOString()}
  `;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text
    })
  });

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running on 3000"));
