import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import styles from './AddMuseum.module.css';
import { Button, Input } from '@chakra-ui/react';

export default function AddMuseum() {
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    location: '',
    city: '',
    workedTime: '',
    holidays: '',
    theme: '',
    coordinates: '',
  });

  // Ручка изменения инпутов
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Функция отправки фотки на сервер
  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);

      const response = await fetch('http://localhost:3000/api/getnewsphoto', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        setAvatar(responseData.path);
      } else {
        console.log('Ошибка при отправке файла:', response.statusText);
      }
    } catch (error) {
      console.log('Ошибка при отправке файла:', error);
    }
  }, [img]);

  // Отправляем фото на сервер только если фото добавили
  useEffect(() => {
    if (img) {
      sendFile(); // Вызываем функцию sendFile при изменении img
    }
  }, [img, sendFile]);

  // Ручка добавления фотки из инпута
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files[0]);
  };

  // Ручка отправки данных для добавления нового музея
  const submitHandler = async (): Promise<void> => {
    const museum = {
      name: inputs.name,
      description: inputs.description,
      location: inputs.location,
      city: inputs.city,
      photo: `http://localhost:3000/${avatar}`,
      workedTime: inputs.workedTime,
      holidays: inputs.holidays,
      theme: inputs.theme,
      coordinates: inputs.coordinates,
    };
    try {
      const response = await fetch('http://localhost:3000/api/museums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(museum),
      });
      if (response.ok) {
        setInputs({
          name: '',
          description: '',
          location: '',
          city: '',
          workedTime: '',
          holidays: '',
          theme: '',
          coordinates: '',
        });
        setAvatar(null);
        setImg(null);
      } else {
        console.error('ОТ РУЧКИ ДОБАВЛЕНИЯ МУЗЕЯ ПРИШЕЛ ОТКАЗ', error);
      }
    } catch (error) {
      console.error('Ошибка отправки запроса на ручку добавления музея', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Добавить новый музей:</h2>
      <div className={styles.inputs}>
        <input
          onChange={changeHandler}
          name="name"
          value={inputs.name}
          placeholder="Название музея"
        />
        <textarea
          onChange={changeHandler}
          name="description"
          value={inputs.description}
          placeholder="Описание музея"
        />
        <input
          onChange={changeHandler}
          name="location"
          value={inputs.location}
          placeholder="Адрес музея"
        />
        <input
          onChange={changeHandler}
          name="city"
          value={inputs.city}
          placeholder="Город"
        />
        <input
          onChange={changeHandler}
          name="workedTime"
          value={inputs.workedTime}
          placeholder="Время работы"
        />
        <input
          onChange={changeHandler}
          name="holidays"
          value={inputs.holidays}
          placeholder="Нерабочие дни"
        />
        <input
          onChange={changeHandler}
          name="theme"
          value={inputs.theme}
          placeholder="Тематика"
        />
        <input
          onChange={changeHandler}
          name="coordinates"
          value={inputs.coordinates}
          placeholder="Координаты"
        />
      </div>

      <div>
        {avatar && (
          <img
            className={styles.avatar}
            src={`http://localhost:3000/${avatar}`}
            alt=""
          />
        )}
      </div>

      <div>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input">
          <Button as="span" variant="solid" colorScheme="teal" cursor="pointer">
            Выбрать файл
          </Button>
        </label>
      </div>

      <Button
        variant="solid"
        colorScheme="blue"
        cursor="pointer"
        onClick={submitHandler}
      >
        Добавить музей
      </Button>
    </div>
  );
}
