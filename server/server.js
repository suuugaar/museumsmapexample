// Подключение библиотек и модулей
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const swaggerSetup = require('./swagger/swagger');

// Подключение роутера
const apiRouter = require('./routes/apiRouter');

// Создание сервера
const app = express();

swaggerSetup(app);

// Подключение порта
const PORT = process.env.PORT || 3001;

// Конфиг сессий
const sessionConfig = {
  name: 'cookieName',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 1000 * 60 * 60,
    httpOnly: true,
  },
};

// Подключение мидлварок
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(__dirname));

// Работа роутера
app.use('/api', apiRouter);

// Запуск сервера
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));