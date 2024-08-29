import { Button } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './AllMuseums.module.css';

export default function AllMuseums() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.buttonsWrapper}>
              <Link to="list">
                <Button
                  className={styles.button}
                  _hover={{
                    bg: 'transparent',
                    color: '#d3f85acf',
                    border: '2px solid #d3f85acf',
                  }}
                  bg={'d3f85acf'}
                >
                  {t('list')}
                </Button>
              </Link>
              <Link to="map">
                <Button
                  className={styles.button}
                  _hover={{
                    bg: 'transparent',
                    color: '#d3f85acf',
                    border: '2px solid #d3f85acf',
                  }}
                  bg={'d3f85acf'}
                >
                  {t('map')}
                </Button>
              </Link>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}