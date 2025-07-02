import logo from "./logo.svg";
import "./App.css";

function App() {
  state = { data: [], error: "" };
  onChercher = async (a, b) => {
    if (a && b) {
      try {
        let reponse = await fetch(
          `https://etablissements-publics.api.gouv.fr/v3/departements/${a}/${b}`
        );
        let donnee = await reponse.json();
        console.log(donnee);
      } catch (e) {}
    } else {
    }
  };
}

export default App;
