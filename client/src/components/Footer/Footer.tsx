import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import { IconButton, Link } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.secondWrapper}>
          <p className={styles.text}>{t('footer')}</p>
          <Link href="https://t.me/+a5s69KRcGxFjMjYy" isExternal>
            <IconButton
              aria-label="Telegram"
              icon={<FaTelegramPlane />}
              size="xs"
              fontSize="15px"
              colorScheme="telegram"
              className={styles.iconButton}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
