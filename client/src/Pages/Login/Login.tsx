import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLogin } from '../../redux/thunkActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import styles from './Login.module.css';

const ERROR_MASSEGE_COLOR = '#ff6d6d';

const initialValue = {
  email: '',
  password: '',
};

function Login() {
  const { t } = useTranslation();

  const [inputs, setInputs] = useState(initialValue);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();

  const changeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchLogin(inputs));
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
              <Stack spacing={6} width={350}>
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
                <Button
                  variant="outline"
                  border="solid 2px white"
                  color="rgba(255, 255, 255, 0.828)"
                  type="submit"
                  _hover={{ color: 'black', backgroundColor: 'white' }}
                  transition="all 0.5s ease"
                >
                  {t('login')}
                </Button>
                <p className={styles.error}>
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

export default Login;
