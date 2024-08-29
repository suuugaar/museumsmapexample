import react, { useEffect, useState } from 'react';
import Minimuseum from '../../components/Minimuseum/Minimuseum';
import { Select, Button, FormControl, Input, useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchMuseums } from '../../redux/thunkActionsAllMuseums';
import {
  updateMuseums,
  filterMuseumsByCity,
  filterMuseumsByDirection,
  selectCity,
  selectDirection,
  filterByInput,
  searchByContent,
} from '../../redux/allMuseumsSlice';
import { useTranslation } from 'react-i18next';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import styles from './ListMuseums.module.css';

export type MuseumType = {
  id: number;
  name: string;
  description: string;
  location: string;
  city: string;
  photo: string;
  workedTime: string;
  holiday: string;
  theme: string;
  coordinates: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Museums = Array<MuseumType>;

export default function ListMuseums() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const toast = useToast();

  if (location.state) {
    toast({
      title: `музей удален`,
      status: 'success',
      isClosable: true,
      duration: 1000,
      position: 'bottom-right',
    });
    location.state = null;
  }

  const dispatch = useAppDispatch();
  const { allMuseums, museums, selectedCity, selectedDirection, input } =
    useAppSelector((store) => store.allMuseumsSlice);

  useEffect(() => {
    window.scrollTo(0, 0);
    void dispatch(fetchMuseums());
  }, [i18n.language, dispatch]);

  const handleSelectCityChange = (e: {
    target: { value: react.SetStateAction<string> };
  }) => {
    dispatch(selectCity(e.target.value));
  };

  const handleSelectDirectionChange = (e: {
    target: { value: react.SetStateAction<string> };
  }) => {
    dispatch(selectDirection(e.target.value));
  };

  const handleInputChange = (e: {
    target: { value: react.SetStateAction<string> };
  }) => {
    dispatch(searchByContent(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(updateMuseums(allMuseums));
    if (selectedCity) {
      dispatch(filterMuseumsByCity(selectedCity));
    }
    if (selectedDirection) {
      dispatch(filterMuseumsByDirection(selectedDirection));
    }
    if (input) {
      dispatch(filterByInput(input));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <h1 id="top"></h1>
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <FormControl>
              <Select
                cursor="pointer"
                marginBottom={5}
                color={'black'}
                variant={'filled'}
                placeholder={t('allCities')}
                onChange={handleSelectCityChange}
              >
                <option value="Москва">{t('moscow')}</option>
                <option value="Санкт-Петербург">{t('spb')}</option>
              </Select>
              <Select
                cursor="pointer"
                marginBottom={5}
                color={'black'}
                variant={'filled'}
                placeholder={t('allDirections')}
                onChange={handleSelectDirectionChange}
              >
                <option value="Искусство">{t('art')}</option>
                <option value="Наука и техника">{t('science')}</option>
                <option value="Этнография">{t('ethnography')}</option>
                <option value="Природа и животные">{t('nature')}</option>
                <option value="Архитектура">{t('architecture')}</option>
                <option value="История">{t('history')}</option>
              </Select>
              <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
              <Input
                marginBottom={5}
                color={'white'}
                variant={'flushed'}
                placeholder={t('wordSearch')}
                borderBottomWidth="3px"
                _focus={{
                  borderBottomColor: 'white',
                }}
                onChange={handleInputChange}
              />
              <Button
                variant="primary"
                className={styles.button}
                onClick={handleSubmit}
              >
                {t('select')}
              </Button>
              </form>
            </FormControl>
          </div>
        </div>

        <div className={styles.museumsWrapper}>
          {museums.length ? (
            museums.map((museum) => (
              <Minimuseum key={museum.id} museum={museum} />
            ))
          ) : (
            <h3>{t('noMuseums')}</h3>
          )}
        </div>
        <Button
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right="20px"
          colorScheme="blue"
          size="lg"
          zIndex="1000"
          borderRadius="full"
        >
          <ArrowUpIcon w={6} h={6} />
        </Button>
      </div>
    </>
  );
}
