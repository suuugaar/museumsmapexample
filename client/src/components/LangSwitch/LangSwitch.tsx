import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { setLanguage } from '../../redux/languageSlice';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  const getFlagSrc = (language) => {
    switch (language) {
      case 'ru':
        return '../Rus_flag.png';
      case 'en':
        return '../GB_flag.png';
      case 'de':
        return '../De_flag.png';
      default:
        return '../Rus_flag.png';
    }
  };

  return (
    <Menu>
      <MenuButton
        bg="rgb(164, 162, 162)"
        _hover={{ bg: 'rgb(189, 188, 188)' }}
        as={Button}
        rightIcon={<span>▼</span>}
      >
        <Image
          src={getFlagSrc(i18n.language)}
          alt={i18n.language}
          boxSize="25px"
        />
      </MenuButton>
      <MenuList borderColor="rgb(42, 42, 42)" bg="rgb(57, 57, 57)">
        <MenuItem
          _hover={{ bg: 'rgb(82, 81, 81)' }}
          bg="rgb(57, 57, 57)"
          onClick={() => changeLanguage('ru')}
        >
          <Flex color="white" align="center">
            <Image
              src="../Rus_flag.png"
              alt="Русский"
              boxSize="20px"
              mr="12px"
            />
            Русский
          </Flex>
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'rgb(82, 81, 81)' }}
          bg="rgb(57, 57, 57)"
          onClick={() => changeLanguage('en')}
        >
          <Flex color="white" align="center">
            <Image
              src="../GB_flag.png"
              alt="English"
              boxSize="20px"
              mr="12px"
            />
            English
          </Flex>
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'rgb(82, 81, 81)' }}
          bg="rgb(57, 57, 57)"
          onClick={() => changeLanguage('de')}
        >
          <Flex color="white" align="center">
            <Image
              src="../De_flag.png"
              alt="Deutsch"
              boxSize="20px"
              mr="12px"
            />
            Deutsch
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
