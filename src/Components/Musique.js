import { Card, Image } from "semantic-ui-react";
import { useState } from "react";

const Musique = (props) => {
  const [voirAnnee, setVoirAnnee] = useState(false);

  const afficherAnnee = () => {
    setVoirAnnee(!voirAnnee);
  };

  let duree = null;

  if (props.type === "track" && props.duration_ms) {
    const minutes = Math.floor(props.duration_ms / 60000);
    const secondes = Math.floor((props.duration_ms % 60000) / 1000);
    duree = `${minutes} min ${secondes} sec`;
  }

  return (
    <Card onClick={props.type === "albums" ? afficherAnnee : undefined}>
      <Image src={props.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.titre}</Card.Header>
        <Card.Meta>{props.artiste}</Card.Meta>
        {voirAnnee && <Card.Meta>{props.annee}</Card.Meta>}
      </Card.Content>
      <Card.Content extra>
        <a>
          <i className="music icon"></i>
          {props.type === "albums"
            ? `${props.nbTempsChansons} chansons`
            : duree
            ? `Durée : ${duree}`
            : "Durée inconnue"}
        </a>
      </Card.Content>
    </Card>
  );
};

export default Musique;
