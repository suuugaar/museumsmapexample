import React, { useState } from 'react';
import axios from 'axios';
import styles from './Stat.module.css';
import { Button } from '@chakra-ui/react';

const Stat = () => {
  const [stats, setStats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDailyStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/scans');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setErrorMessage('Ошибка при получении статистики');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.secondWrapper}>
          <h2>Посещения музеев</h2>

          <Button
            variant="solid"
            colorScheme="blue"
            cursor="pointer"
            onClick={fetchDailyStats}
          >
            Статистика за день
          </Button>

          {errorMessage && (
            <div className="error">
              <p>{errorMessage}</p>
            </div>
          )}
          <div>
            <h3>Посещения:</h3>
            <ol>
              {stats.map((scan) => (
                <li key={scan.id}>
                  Пользователь: {scan.User.email}, Музей: {scan.Museum.name},
                  Дата: {new Date(scan.createdAt).toLocaleString()}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
