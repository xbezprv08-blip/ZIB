// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8426138621:AAG3zsV9mxwPCg4m7AmFrLsQVGHqX6GXyc0";
const CHAT_ID = "-1003002990540";

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
