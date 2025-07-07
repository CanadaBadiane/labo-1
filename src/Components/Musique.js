import { Card, Image } from "semantic-ui-react";
import { useState } from "react";

const Musique = (props) => {
  const [voirAnnee, setVoirAnnee] = useState(false);

  const afficherAnnee = () => {
    setVoirAnnee(!voirAnnee);
  };

  const { titre, image, artiste, total_tracks, annee, duration_ms } =
    props.properties || {};

  const type = props.type;

  let duree = null;

  if (type === "tracks" && typeof duration_ms === "number") {
    const minutes = Math.floor(duration_ms / 60000);
    const secondes = Math.floor((duration_ms % 60000) / 1000);
    duree = `${minutes} min ${secondes} sec`;
  }

  return (
    <Card onClick={type === "albums" ? afficherAnnee : undefined}>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{titre}</Card.Header>
        <Card.Meta>{artiste}</Card.Meta>
        {voirAnnee && <Card.Meta>{annee}</Card.Meta>}
      </Card.Content>
      <Card.Content extra>
        <a>
          <i className="music icon"></i>
          {type === "albums" && total_tracks
            ? `${total_tracks} chanson(s)`
            : type === "tracks" && duree
            ? `Durée : ${duree}`
            : null}
        </a>
      </Card.Content>
    </Card>
  );
};

export default Musique;
