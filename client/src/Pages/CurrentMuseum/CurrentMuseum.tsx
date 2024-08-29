import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  fetchFavorites,
  fetchVisited,
} from '../../redux/thunkActionsCurrentMuseum';
import FavIcon from '../../components/FavIcon/FavIcon';
import Checkbox from '../../components/Checkbox/Checkbox';
import styles from './CurrentMuseum.module.css';

import type { RecallType, RouteParams, MuseumType } from './currMusTypes';
import {
  Button,
  ButtonGroup,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import DelBtn from './DelBtn/DelBtn';
import { updateMuseums } from '../../redux/allMuseumsSlice';

export interface MuseumsType {
  id: number;
  name: string;
  description: string;
  location: string;
  city: string;
  photo: string;
  workedTime: string;
  holidays: string;
  theme: string;
  coordinates: string;
  createdAt: Date;
  updatedAt: Date;
  recalledByUsers: RecalledByUser[];
}

export interface RecalledByUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  city: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  Recall: Recall;
}

export interface Recall {
  text: string;
  userId: number;
  museumId: number;
  createdAt: Date;
  updatedAt: Date;
}

const initialState = {
  name: '',
  city: '',
  description: '',
  location: '',
  workedTime: '',
  holidays: '',
};

export default function CurrentMuseum(): JSX.Element {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const allMuseums = useAppSelector((store) => store.allMuseumsSlice.museums);

  const { id } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const [museum, setMuseum] = useState<MuseumsType>([]);
  const [editMuseum, setEditMuseum] = useState(false);
  const [inputs, setInputs] = useState(initialState);
  const [updateRecalls, setUpdateRecalls] = useState<boolean>(true);
  const navigate = useNavigate();
  const toast = useToast();

  const user = useAppSelector((store) => store.userSlice.user);

  useEffect(() => {
    axios
      .get<MuseumsType>(
        `http://localhost:3000/api/museums/${id}?lang=${i18n.language}`,
      )
      .then((res) => {
        setMuseum(res.data);
      });
  }, [id, i18n.language, updateRecalls]);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchFavorites(user.id));
      dispatch(fetchVisited(user.id));
    }
  }, [dispatch, user.id]);

  const handelEdit = () => {
    setEditMuseum((pre) => !pre);
    if (!editMuseum) {
      setInputs({
        name: museum.name,
        city: museum.city,
        description: museum.description,
        location: museum.location,
        workedTime: museum.workedTime,
        holidays: museum.holidays,
      });
    } else {
      setInputs(initialState);
    }
  };

  const handleConfirmEdit = () => {
    axios
      .patch(`http://localhost:3000/api/museums/${id}`, inputs)
      .then((res) => {
        res.status < 300 &&
          setMuseum((pre) => ({
            ...pre,
            name: inputs.name,
            city: inputs.city,
            description: inputs.description,
            location: inputs.location,
            workedTime: inputs.workedTime,
            holidays: inputs.holidays,
          }));
        setEditMuseum((pre) => !pre);
        toast({
          title: `успешно изменено`,
          status: 'info',
          isClosable: true,
          duration: 1000,
          position: 'bottom-right',
        });
      });
  };

  const changeInputs = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handlerConfirm = () => {
    axios.delete(`http://localhost:3000/api/museums/${museum.id}`).then(() => {
      dispatch(updateMuseums(allMuseums.filter((mus) => mus.id !== museum.id)));
      navigate('/allmuseums/list', { state: true });
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.secondWrapper}>
            {user.email === 'admin_museums@mail.ru' && (
              <div className={styles.adminSkills}>
                <ButtonGroup spacing="3" m={2}>
                  <DelBtn handle={handlerConfirm} btnText="Удалить музей" />
                  <Button colorScheme="teal" onClick={handelEdit}>
                    Редактировать
                  </Button>
                </ButtonGroup>
              </div>
            )}{' '}
            {editMuseum ? (
              <>
                <Stack
                  color="rgba(255, 255, 255, 0.857);"
                  width={700}
                  height={700}
                  bg="#040914"
                  p={30}
                  borderRadius={25}
                  spacing={5}
                >
                  <Input
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    name="name"
                    type="text"
                    placeholder="Название музея"
                    value={inputs.name}
                    onChange={changeInputs}
                  ></Input>
                  <Input
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    name="city"
                    type="text"
                    placeholder="Город"
                    value={inputs.city}
                    onChange={changeInputs}
                  ></Input>
                  <Textarea
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    height={300}
                    name="description"
                    placeholder="Описание музея"
                    value={inputs.description}
                    onChange={changeInputs}
                  ></Textarea>
                  <Input
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    name="location"
                    type="text"
                    placeholder="Адрес"
                    value={inputs.location}
                    onChange={changeInputs}
                  ></Input>
                  <Input
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    name="workedTime"
                    type="text"
                    placeholder="Время работы"
                    value={inputs.workedTime}
                    onChange={changeInputs}
                  ></Input>
                  <Input
                    variant="Unstyled"
                    bg="transparent"
                    border="2px solid rgba(255, 255, 255, 0.66)"
                    _focus={{
                      border: '2px solid rgba(255, 255, 255, 0.66)',
                    }}
                    name="holidays"
                    type="text"
                    placeholder="Выходные дни"
                    value={inputs.holidays}
                    onChange={changeInputs}
                  ></Input>
                  <ButtonGroup spacing="3" m={2}>
                    <Button colorScheme="blue" onClick={handleConfirmEdit}>
                      Подтвердить
                    </Button>
                    <Button colorScheme="red" onClick={handelEdit}>
                      Отмена
                    </Button>
                  </ButtonGroup>
                </Stack>
              </>
            ) : (
              <>
                <div className={styles.museumWrapper}>
                  {museum?.photo && (
                    <img src={museum.photo} alt={museum.name} />
                  )}
                  <h2 className={styles.title}>{museum.name}</h2>
                  <p className={styles.description}>{museum.description}</p>
                  <p>
                    {t('address')} {museum.city}, {museum.location}
                  </p>
                  <p>
                    {t('workingHours')} {museum.workedTime}
                  </p>
                  <p>
                    {t('dayOff')} {museum.holidays}
                  </p>
                  {user.email && user.email !== 'admin_museums@mail.ru' && (
                    <>
                      <div className={styles.userSkills}>
                        <FavIcon />
                        <Checkbox />
                      </div>
                    </>
                  )}
                  <Button
                    className={styles.backBtn}
                    color="black"
                    bg="#d3f85acf"
                    fontWeight="600"
                    marginLeft={250}
                    _hover={{
                      backgroundColor: 'transparent',
                      border: '2px solid #d3f85acf',
                      color: '#d3f85acf',
                    }}
                    as={Link}
                    to="/allmuseums/list#top"
                  >
                    {t('backToList')}
                  </Button>
                </div>
                {/* Отзывы */}
                <div className={styles.recalls}>
                  <h3 className={styles.recallTitle}>{t('reviews')}</h3>
                  {museum?.recalledByUsers?.length > 0 ? (
                    museum?.recalledByUsers.map((recall) => (
                      <div
                        className={styles.oneRecallWrapper}
                        key={recall.Recall.museumId}
                      >
                        <p className={styles.authorName}>
                          {t('author')} {recall.firstName} {recall.lastName}
                        </p>
                        <p className={styles.recallText}>
                          "{recall.Recall.text}"
                        </p>

                        <p className={styles.recallDate}>
                          {t('date')}{' '}
                          {new Date(
                            recall.Recall.createdAt,
                          ).toLocaleDateString()}
                        </p>
                        {user.email === 'admin_museums@mail.ru' && (
                          <DelBtn
                            toast={toast}
                            trigger={setUpdateRecalls}
                            id={recall}
                            btnText="Удалить отзыв"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>{t('noReviews')}</p>
                  )}
                </div>
                {/* Отзывы end */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
