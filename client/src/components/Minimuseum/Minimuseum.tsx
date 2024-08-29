import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Minimuseum.module.css';
type MuseumType = {
  id: number;
  name: string;
  description: string;
  location: string;
  city: string;
  photo: string;
  workedTime: string;
  holiday: string;
  theme: string;
  coordinates: string;
  createdAt: Date;
  updatedAt: Date;
};

type MuseumProps = {
  museum: MuseumType;
};

export default function Minimuseum({ museum }: MuseumProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <Link to={`/allmuseums/${museum.id}`}>
            <div className={styles.imageContainer}>
              <div className={styles.overlay}></div>

              <Card.Img
                className={styles.museumLogo}
                src={museum.photo}
                alt={museum?.name || museum?.name_en || museum?.name_de}
              />
            </div>
          </Link>
          <Link to={`/allmuseums/${museum.id}`}>
            <Card.Title className={styles.title}>
              {museum?.name || museum?.name_en || museum?.name_de}
            </Card.Title>
          </Link>
          <Link to={`/allmuseums/${museum.id}`}>
            <Button className={styles.button}>Перейти</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
