import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import styles from './FavoriteNews.module.css';

type NewsType = {
  id: number;
  title: string;
  text: string;
  museumId: number;
  museumName: string;
  museumLocation: string;
  photo: string;
  date: string;
};

type News = Array<NewsType>;

export default function FavoriteNews({ cardInfo }) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [news, setNews] = useState<News>([]);
  const userCity = useAppSelector((store) => store.userSlice.user.city);

  useEffect(() => {
    const getAllNews = async () => {
      // Получение всех новостей
      const response = await fetch(
        `http://localhost:3000/api/favnews?lang=${i18n.language}`,
        {
          credentials: 'include',
        },
      );
      const data = await response.json();

      // Сортировка по дате
      const sortedByTimeNews = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setNews(sortedByTimeNews);
    };
    getAllNews();
  }, [userCity, i18n.language]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {cardInfo ? (
          <div className={styles.cardInfoWrapper}>
            <p>
              {t('cardNumber')} {cardInfo.id}
            </p>
            <p>
              {t('validity')} {new Date(cardInfo.validity).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className={styles.cardInfoWrapper}>{t('noCard')}</div>
        )}
        {news.length === 0 ? (
          <h2 className={styles.noNewsTitle}>{t('headerEventsFav')}</h2>
        ) : (
          <>
            <div className={styles.secondWrapper}>
              <h2 className={styles.title}>{t('eventsFav')}</h2>
              <div className={styles['carousel-container']}>
                <Carousel interval={2000} fade>
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
                      <Carousel.Caption>
                        <h3 className={styles.cardTitle}>{el.title}</h3>
                        <p>{el.text}</p>
                        <p>
                          {t('eventPlace')} {el?.museumName}.
                        </p>
                        <p>
                          {t('eventDate')}{' '}
                          {new Date(el.date).toLocaleString(i18n.language, {
                            timeZone: 'Europe/Moscow',
                          })}
                          .
                        </p>
                        <p>
                          {t('address')} {el?.museumLocation}.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
