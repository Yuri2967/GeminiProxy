const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemma-2-9b-it:generateContent";

app.post("/proxy", async (req, res) => {
  try {
    const robloxData = req.body;
    const googleResponse = await axios.post(
      GEMINI_URL,
      robloxData,
      { headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" } }
    );
    res.json(googleResponse.data);
  } catch (error) {
    console.error("An error occurred:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Proxy server failed to get a response from Google." });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your proxy server is live and listening on port " + listener.address().port);
});
