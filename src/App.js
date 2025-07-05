import "./App.css";
import { Component } from "react";
import { Card, Message } from "semantic-ui-react";
import Recherche from "./Components/Recherche";

class App extends Component {
  state = { data: [], error: "" };

  getArtistId = async (nomArtiste, type, market) => {
    const accessToken = "TON_TOKEN_ICI"; // remplace par ton token
    if (nomArtiste && type && market) {
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

        if (type === "albums") {
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
        } else if (type === "tracks") {
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
      this.setState({ error: "Veuillez remplir tous les champs" });
    }
  };

  onViderFunction = () => {
    this.setState({ data: [], error: "" });
  };

  render() {
    return (
      <div>
        <h1>Spotify</h1>
        <Recherche
          onPropagateToParent={this.getArtistId}
          onViderProps={this.onViderFunction}
        />
        {this.state.error ? (
          <Message warning>{this.state.error}</Message>
        ) : undefined}
      </div>
    );
  }
}

export default App;
