import { Link } from 'react-router-dom';
import '../../App.css';
import styles from './MinimuseumForSlider.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default function MinimuseumForSlider({
  museum,
}: MuseumProps): JSX.Element {
  return (
    <div className={styles['carousel-container']}>
      <Link to={`/allmuseums/${museum.id}`}>
        <div className={styles['image-container']}>
          <img className={styles.photo} src={museum.photo} alt={museum.name} />
          <div className={styles['image-overlay']}></div>
        </div>
        <Carousel.Caption>
          <h3 className={styles.title}>{museum.name}</h3>
        </Carousel.Caption>
      </Link>
    </div>
  );
}
