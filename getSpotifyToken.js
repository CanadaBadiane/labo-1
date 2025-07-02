import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Charge les variables du fichier .env

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

async function getSpotifyToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    console.log("🎟️ Ton token d’accès :", data.access_token);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du token :", error);
  }
}

getSpotifyToken();
