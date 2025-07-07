import { Component } from "react";
import { Button, Select } from "semantic-ui-react";
import "./Recherche.css";

class Recherche extends Component {
  state = { artiste: "", type: "", market: "" };

  handleReset = () => {
    this.setState({ artiste: "", type: "", market: "" });
    this.props.onViderProps(); // si tu veux aussi propager ça au parent
  };

  onArtisteChange = (e, data) => {
    this.setState({ artiste: e.target.value });
  };
  onTypeChange = (e, data) => {
    this.setState({ type: data.value });
  };
  onMarketChange = (e, data) => {
    this.setState({ market: data.value });
  };

  render() {
    const optionsType = [
      { value: "albums", key: "albums", text: "Albums" },
      { value: "tracks", key: "tracks", text: "Chansons populaires" },
    ];
    const optionsMarket = [
      { value: "CA", key: "CA", text: "Canada" },
      { value: "US", key: "US", text: "États-Unis" },
      { value: "FR", key: "FR", text: "France" },
      { value: "JP", key: "JP", text: "Japon" },
    ];
    return (
      <div className="recherche">
        <h4>Artiste recherché : {this.state.artiste}</h4>

        <input
          type="text"
          placeHolder="Veuillez entrer le nom de l'artiste"
          value={this.state.artiste}
          onChange={this.onArtisteChange}
          className="champ-artiste"
        />
        <Select
          placeholder="Choisissez le type de contenu"
          options={optionsType}
          value={this.state.type}
          onChange={this.onTypeChange}
        />
        <Select
          placeholder="Choisissez un pays"
          options={optionsMarket}
          value={this.state.market}
          onChange={this.onMarketChange}
        />
        <Button
          primary
          onClick={() =>
            this.props.onPropagateToParent(
              this.state.artiste,
              this.state.type,
              this.state.market
            )
          }
        >
          Lancer la recherche
        </Button>
        <Button secondary onClick={this.handleReset}>
          Vider la recherche
        </Button>
      </div>
    );
  }
}
export default Recherche;
