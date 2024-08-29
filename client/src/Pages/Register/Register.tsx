import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchReg } from '../../redux/thunkActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
} from '@chakra-ui/react';
import styles from './Register.module.css';
import { PhoneIcon } from '@chakra-ui/icons';
import { color } from 'framer-motion';

const ERROR_MASSEGE_COLOR = '#ff6d6d';

const initialValue = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  city: 'moscow',
  phone: '',
};

function Register() {
  const { t } = useTranslation();

  const [inputs, setInputs] = useState(initialValue);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();

  const changeInputs = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchReg(inputs));
  };

  useEffect(() => {
    if (user.email) {
      navigate('/', { replace: true });
    }
  }, [user]);

  // Для показа и скрытия пароля
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.content}>
            <form
              onSubmit={submitForm}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Stack spacing={4} width={380}>
                <Input
                  fontSize={20}
                  type="email"
                  name="email"
                  variant="flushed"
                  placeholder="E-mail *"
                  required
                  borderBottomWidth="2px"
                  _focus={{
                    borderBottomWidth: '4px',
                    borderBottomColor: 'white',
                  }}
                  onChange={changeInputs}
                />

                <InputGroup size="md">
                  <Input
                    fontSize={20}
                    name="password"
                    pr="4.5rem"
                    variant="flushed"
                    type={show ? 'text' : 'password'}
                    placeholder="password"
                    required
                    borderBottomWidth="2px"
                    _focus={{
                      borderBottomWidth: '4px',
                      borderBottomColor: 'white',
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Input
                  fontSize={20}
                  type="text"
                  name="firstName"
                  variant="flushed"
                  placeholder="First name *"
                  required
                  borderBottomWidth="2px"
                  _focus={{
                    borderBottomWidth: '4px',
                    borderBottomColor: 'white',
                  }}
                  onChange={changeInputs}
                />
                <Input
                  fontSize={20}
                  type="text"
                  name="lastName"
                  variant="flushed"
                  placeholder="Last name *"
                  required
                  borderBottomWidth="2px"
                  _focus={{
                    borderBottomWidth: '4px',
                    borderBottomColor: 'white',
                  }}
                  onChange={changeInputs}
                />
                <Select
                  name="city"
                  variant="flushed"
                  id="city"
                  borderBottomWidth="2px"
                  _focus={{
                    borderBottomColor: 'white',
                  }}
                  onChange={changeInputs}
                >
                  <option value="moscow" selected>
                    {t('moscow')}
                  </option>
                  <option value="petersburg">{t('spb')}</option>
                </Select>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    fontSize={18}
                    variant="flushed"
                    type="tel"
                    placeholder="Phone number"
                    borderBottomWidth="2px"
                    _focus={{
                      borderBottomWidth: '4px',
                      borderBottomColor: 'white',
                    }}
                  />
                </InputGroup>
                <Button
                  variant="outline"
                  border="solid 2px white"
                  color="rgba(255, 255, 255, 0.828)"
                  type="submit"
                  _hover={{ color: 'black', backgroundColor: 'white' }}
                  transition="all 0.5s ease"
                >
                  {t('register')}
                </Button>
                <p>
                  <b style={{ color: ERROR_MASSEGE_COLOR }}>{user.err}</b>
                </p>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
