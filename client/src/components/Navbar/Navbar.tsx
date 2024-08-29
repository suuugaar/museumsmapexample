import '../../App';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLogout } from '../../redux/thunkActions';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LangSwitch/LangSwitch';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user.email);

  const logoutHandle = () => {
    dispatch(fetchLogout()).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.navbar}>
          <div className={styles.wrapper}>
            <Link to={'/'}>
              <button className={styles.link}>{t('main')}</button>
            </Link>
            <Link to={'/allmuseums/list'}>
              <button className={styles.link}>{t('all')}</button>
            </Link>
            {user ? (
              <>
                {user !== 'admin_museums@mail.ru' && (
                  <Link to={'/card'}>
                    <button className={styles.link}>{t('musCard')}</button>
                  </Link>
                )}
                <Link to={'/profile'}>
                  <button className={styles.link}>{t('profile')}</button>
                </Link>
                <button onClick={logoutHandle} className={styles.link}>
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to={'/register'}>
                  <button className={styles.link}>{t('register')}</button>
                </Link>
                <Link to={'/login'}>
                  <button className={styles.link}>{t('login')}</button>
                </Link>
              </>
            )}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
