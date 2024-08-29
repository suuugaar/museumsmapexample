import React, { useState, useEffect } from 'react';
import FavoriteNews from '../../components/FavoriteNews/FavoriteNews';
import FavoritesMuseums from '../../components/FavoritesMuseums/FavoritesMuseums';
import Visit from '../../components/VisitedMuseums/Visit';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import styles from './Profile.module.css';

interface CardInfoType {
  id: number;
  validity: string;
}

export default function Profile() {
  const { t } = useTranslation();

  const user = useAppSelector((store) => store.userSlice.user);

  const [cardInfo, setCardInfo] = useState<CardInfoType | null>(null);

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cards/?userId=${user.id}`,
        );
        if (response.data.length > 0) {
          setCardInfo(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user.email) {
      fetchCardInfo();
    }
  }, [user.id]);

  if (!user.email) {
    return <div>Загрузка...{user?.anon && <Navigate to="/" />}</div>;
  }

  return (
    <div>
      {user.email === 'admin_museums@mail.ru' ? (
        <>
          <div className={styles.wrapper}>
            <div className="container">
              <div className={styles.secondWrapper}>
                <div className={styles.adminSkills}>
                  <Link to="addmuseum">
                    <Button colorScheme="green" margin="2px">
                      Добавить музей
                    </Button>
                  </Link>
                  <Link to="qrcodegenerator">
                    <Button colorScheme="green" margin="2px">
                      QRCode
                    </Button>
                  </Link>
                  <Link to="addnews">
                    <Button colorScheme="green" margin="2px">
                      Добавить новость
                    </Button>
                  </Link>
                  <Link to="stat">
                    <Button colorScheme="green" margin="2px">
                      Статистика
                    </Button>
                  </Link>
                  <Link to="orders">
                    <Button colorScheme="green" margin="2px">
                      Заказы
                    </Button>
                  </Link>
                </div>
                <div className={styles.workArea}>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <FavoriteNews cardInfo={cardInfo} />
          <FavoritesMuseums />
          <Visit />
        </>
      )}
    </div>
  );
}
