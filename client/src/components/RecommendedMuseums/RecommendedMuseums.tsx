import '../../App.css';
import styles from './RecommendedMuseums.module.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import MinimuseumForSlider from '../MinimuseumForSlider/MinimuseumForSlider';

export default function RecommendedMuseums() {
  const { t, i18n } = useTranslation();
  //const { i18n } = useTranslation();
  type Museum = {
    name: string;
    description: string;
    location: string;
    city: string;
    photo: string;
    workedTime: string;
    holidays: string;
    theme: string;
  };

  const [museums, setMuseums] = useState([]);
  const userCity = useAppSelector((store) => store.userSlice.user.city);

  useEffect(() => {
    const getAllMuseums = async () => {
      // Получение всех музеев
      const response = await fetch(
        `http://localhost:3000/api/museums?lang=${i18n.language}`,
      );
      const data = await response.json();
      
      let museumsToShow; // Переменная для хранения отфильтрованных музеев

      // Фильтрация музеев по городу
      if (userCity === 'moscow') {
        museumsToShow = data.filter(
          // (museum: Museum) => museum.city === 'Москва',
          (museum: Museum) =>
            museum.city === 'Москва' ||
            museum.city === 'Moscow' ||
            museum.city === 'Moskau',
        );
      } else {
        museumsToShow = data.filter(
          // museum: Museum) => museum.city === 'Санкт-Петербург',
          (museum: Museum) =>
            museum.city === 'Санкт-Петербург' ||
            museum.city === 'Saint Petersburg' ||
            museum.city === 'Sankt Petersburg',
        );
      }

      // Получение четырех рандомных музеев
      function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const recommendedMuseums: Museum[] = [];

      while (recommendedMuseums.length < 4) {
        const randomIndex = getRandomInt(0, museumsToShow.length - 1);
        if (!recommendedMuseums.includes(museumsToShow[randomIndex])) {
          recommendedMuseums.push(museumsToShow[randomIndex]);
        }
      }

      setMuseums(recommendedMuseums);
    };

    getAllMuseums();
  }, [userCity, i18n.language]);

  return (
    <>
      <div className={styles.wrapper}>
        {/* <h2>{t('recommendedMus')}</h2> */}
        <div className={styles['carousel-container']}>
          <Carousel>
            {museums.map((museum, index) => (
              <Carousel.Item key={index}>
                <MinimuseumForSlider museum={museum} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
