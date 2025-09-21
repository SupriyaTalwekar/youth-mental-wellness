import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { GoogleAuth } from "google-auth-library";

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG
const PROJECT_ID = "singular-server-472206-b6"; // <-- Replace with your project ID
const LOCATION = "us-central1";
const MODEL = "text-bison@001";
const SERVICE_ACCOUNT_PATH = "./vertex-key.json";

// Google Auth
const auth = new GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

// Get fresh access token
async function getAccessToken() {
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token;
}

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const accessToken = await getAccessToken();

    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ instances: [{ content: message }] }),
    });

    const data = await response.json();
    const reply =
      data.predictions?.[0]?.content || "❌ Failed to get AI response";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () =>
  console.log("✅ Backend running at http://localhost:5000")
);
