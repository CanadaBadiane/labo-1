import "./App.css";
import { Component } from "react";
import { Card, Message } from "semantic-ui-react";
import Recherche from "./Components/Recherche";
import Musique from "./Components/Musique";

class App extends Component {
  state = {
    data: [],
    error: "",
    albums: [],
    topTracks: [],
    type: "",
  };

  getArtistId = async (nomArtiste, type, market) => {
    console.log(market);
    const accessToken = process.env.REACT_APP_SPOTIFY_TOKEN;

    if (!nomArtiste || !type || !market) {
      this.setState({ error: "Veuillez remplir tous les champs" });
      return;
    }

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
      if (!artist || artist.name.toLowerCase() !== nomArtiste.toLowerCase()) {
        this.setState({
          error: `Aucun artiste trouvé pour "${nomArtiste}"`,
          albums: [],
          topTracks: [],
          type: "",
        });
        return;
      }

      this.setState({ type });

      const artistId = artist.id;

      if (type === "albums") {
        let res = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?market=${market}`,
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
  };

  onViderFunction = () => {
    this.setState({ data: [], error: "", albums: [], topTracks: [] });
  };

  retournerResultat = () => {
    const data =
      this.state.type === "albums" ? this.state.albums : this.state.topTracks;

    return (data || []).map((element) => (
      <Musique
        key={element.id}
        type={this.state.albums?.length > 0 ? "albums" : "tracks"}
        properties={{
          titre: element.name,
          image:
            this.state.type === "albums"
              ? element.images?.[0]?.url
              : element.album?.images?.[0]?.url,
          artiste: element.artists?.[0]?.name,
          duration_ms: element.duration_ms,
          total_tracks: element.total_tracks,
          annee:
            this.state.type === "albums"
              ? element.release_date?.slice(0, 4)
              : undefined,
        }}
      />
    ));
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
        {(this.state.albums?.length > 0 ||
          this.state.topTracks?.length > 0) && (
          <Card.Group>{this.retournerResultat()}</Card.Group>
        )}
      </div>
    );
  }
}

export default App;
