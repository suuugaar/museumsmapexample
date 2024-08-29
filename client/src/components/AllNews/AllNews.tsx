import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import styles from './AllNews.module.css';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function AllNews() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const user = useAppSelector((store) => store.userSlice.user);
  const toast = useToast();

  useEffect(() => {
    const getAllNews = async () => {
      // Получение всех новостей
      const response = await fetch(
        `http://localhost:3000/api/news?lang=${i18n.language}`,
      );
      const data = await response.json();

      let newsToShow; // Переменная для хранения отфильтрованных музеев

      // Фильтрация новостей по городу
      if (user.city === 'moscow') {
        newsToShow = data.filter(
          (el) =>
            el.museumCity === 'Москва' ||
            el.museumCity === 'Moscow' ||
            el.museumCity === 'Moskau',
        );
      } else {
        newsToShow = data.filter(
          (el) =>
            el.museumCity === 'Санкт-Петербург' ||
            el.museumCity === 'Saint Petersburg' ||
            el.museumCity === 'Sankt Petersburg',
        );
      }

      // Сортировка по дате
      const sortedByTimeNews = newsToShow.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setNews(sortedByTimeNews);
    };

    getAllNews();
  }, [user, i18n.language]);

  const handleDelete = (e: any) => {
    axios
      .delete(`http://localhost:3000/api/news/${e.target.parentNode.id}`)
      .then(() => {
        setNews((data) => [
          ...data.filter((el) => el.id !== Number(e.target.parentNode.id)),
        ]);
        toast({
          title: `новость удалена`,
          status: 'success',
          isClosable: true,
          duration: 1000,
          position: 'bottom-right',
        });
      });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('events')}</h2>
      <div className={styles['carousel-container']}>
        <Carousel interval={2500} fade>
          {news.map((el) => (
            <Carousel.Item key={el.id}>
              <div className={styles['image-container']}>
                <img
                  className={styles.photo}
                  src={el.photo}
                  alt="Тут должно быть фото музея"
                />

                <div className={styles['image-overlay']}></div>
              </div>
              {user.email === 'admin_museums@mail.ru' && (
                <Button onClick={handleDelete} id="delete" m={2}>
                  Удалить новость
                </Button>
              )}
              <Carousel.Caption>
                <h3 className={styles.cardTitle}>{el.title}</h3>
                <p>{el.text}</p>
                <p>
                  {t('eventPlace')} {el.museumName}.
                </p>
                <p>
                  {t('eventDate')}{' '}
                  {new Date(el.date).toLocaleString(i18n.language, {
                    timeZone: 'Europe/Moscow',
                  })}
                  .
                </p>
                <p>
                  {t('address')} {el.museumLocation}.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
