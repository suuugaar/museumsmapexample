import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchAddFavorite,
  fetchRemoveFavorite,
} from '../../redux/thunkActionsCurrentMuseum';

import type { RouteParams } from '../../Pages/CurrentMuseum/currMusTypes';
import Button from 'react-bootstrap/Button';
import styles from './FavIcon.module.css';

export default function FavIcon() {
  const { id } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.userSlice.user);
  const favorites = useAppSelector((store) => store.favoritesSlice.favorites);

  const isFavorite = favorites.some(
    (fav) => fav.museumId === parseInt(id, 10) && fav.userId === user.id,
  );

  const handleFavoriteClick = () => {
    if (id) {
      const favoriteMuseum = favorites.find(
        (fav) => fav.museumId === parseInt(id, 10) && fav.userId === user.id,
      );

      if (favoriteMuseum) {
        dispatch(fetchRemoveFavorite(favoriteMuseum.id));
      } else {
        dispatch(
          fetchAddFavorite({ userId: user.id, museumId: parseInt(id, 10) }),
        );
      }
    }
  };

  return (
    <>
      <Button
        className={styles.button}
        style={{
          backgroundColor: '#d3f85acf',
          borderRadius: '50px',
          border: 'none',
        }}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <span>❤️</span> : <span>🖤</span>}
      </Button>
    </>
  );
}
