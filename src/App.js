import "./App.css";
import { Component } from "react";

class App extends Component {
  state = { data: [], error: "" };

  getArtistId = async (nomArtiste, choice, market) => {
    const accessToken = "TON_TOKEN_ICI"; // remplace par ton token
    if (nomArtiste) {
      try {
        let response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            nomArtiste
          )}&type=artist`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let donnee = await response.json();
        this.setState({ data: donnee, error: "" });
        const artist = donnee.artists.items[0];
        const artistId = artist.id;

        if (choice === "albums") {
          let res = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/albums`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          let albumsDonnee = await res.json();
          const albums = albumsDonnee.items;
          this.setState({ albums, error: "" });
        } else if (choice === "tracks") {
          let res = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          let topTracksDonnee = await res.json();
          const topTracks = topTracksDonnee.tracks;
          this.setState({ topTracks, error: "" });
        }
      } catch (e) {
        this.setState({ error: "Connexion non aboutie avec l'Api" });
      }
    } else {
      this.setState({ error: "Veuillez écrire le nom d'un artiste" });
    }
  };

  onViderFunction = () => {
    this.setState({ data: [], error: "" });
  };

  render() {
    return (
      <div>
        <h1>Spotify</h1>
      </div>
    );
  }
}

export default App;
