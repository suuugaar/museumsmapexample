import RecommendedMuseums from '../../components/RecommendedMuseums/RecommendedMuseums';
import AllNews from '../../components/AllNews/AllNews';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';

function Home() {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.text}>
              <h1 className={styles.title}>{t('welcome')}</h1>
              <p className={styles.description}>{t('description')}</p>
            </div>
            <RecommendedMuseums />
          </div>
        </div>
      </div>
      <div className={styles.secondWrapper}>
        <div className="container">
          <AllNews />
        </div>
      </div>
    </>
  );
}

export default Home;
