import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import styles from './FavoritesMuseums.module.css';
import FavoriteMuseum from '../FavoriteMuseum/FavoriteMuseum';

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

type Museums = Array<MuseumType>;

export default function FavoritesMuseums() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const user = useAppSelector((store) => store.userSlice.user);

  const [favorites, setFavorites] = useState<Museums>([]);

  useEffect(() => {
    if (user.id) {
      axios
        .get(`http://localhost:3000/api/user/favorites/${user.id}?lang=${i18n.language}`)
        .then((res) => {
          const [userData] = res.data;
          setFavorites(userData?.favoriteMuseums);
        });
    }
  }, [user.id, i18n.language]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.secondWrapper}>
          <h2 className={styles.title}>{t('favMuseums')}</h2>
          <div className={styles.museumsWrapper}>
            {favorites.length ? (
              favorites.map((museum) => (
                <FavoriteMuseum key={museum.id} museum={museum} />
              ))
            ) : (
              <h3>{t('noFavMuseums')}</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
