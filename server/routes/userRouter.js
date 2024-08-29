const express = require('express');
const bcrypt = require('bcrypt');
const { User, Museum } = require('../db/models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /user/allusers:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Список всех пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   city:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Ошибка сервера
 */
router.get('/allusers', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Войти в систему
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно вошел в систему
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 city:
 *                   type: string
 *                 phone:
 *                   type: string
 *       400:
 *         description: Неверный логин или пароль
 *       500:
 *         description: Ошибка сервера
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.json({ err: 'Такого пользователя нет, зарегистрируйтесь' });
  }
  const checkPass = await bcrypt.compare(password, user.password);
  if (checkPass) {
    req.session.userId = user.id;
    req.session.login = user.email;
    res.json(user);
  } else {
    res.json({ err: 'Пароль неверный' });
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - city
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               city:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Такой пользователь уже существует
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const { email, password, firstName, lastName, city, phone } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.json({ err: 'Такой пользователь уже есть' });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hash,
    firstName,
    lastName,
    city,
    phone,
  });

  req.session.userId = newUser.id;
  req.session.login = newUser.email;
  req.session.save(() => {
    res.json(newUser);
  });
});

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Выйти из системы
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел из системы
 *       500:
 *         description: Ошибка сервера
 */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.end();
  });
});

/**
 * @swagger
 * /user/auth:
 *   get:
 *     summary: Проверить аутентификацию пользователя
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Аутентифицированный пользователь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Пользователь не аутентифицирован
 *       500:
 *         description: Ошибка сервера
 */
router.get('/auth', async (req, res) => {
  if (req.session?.login) {
    const user = await User.findOne({ where: { email: req.session.login } });
    return res.json(user);
  } else {
    res.json({ anon: true });
  }
});

/**
 * @swagger
 * /user/visit/{id}:
 *   get:
 *     summary: Получить посещенные музеи пользователя по ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, de]
 *         description: Язык ответа
 *     responses:
 *       200:
 *         description: Посещенные музеи пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/visit/:id', async (req, res) => {
  const { lang } = req.query;

  const users = await User.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Museum,
        as: 'visitedMuseums',
        attributes: [
          'id',
          lang === 'en' ? 'name_en' : lang === 'de' ? 'name_de' : 'name',
        ],
      },
      'recalledMuseums',
    ],
  });
  res.json(users);
});

//not in use
router.get('/test', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id'],
    include: {
      model: Museum,
    },
  });
  res.json(users);
});

/**
 * @swagger
 * /user/favorites/{id}:
 *   get:
 *     summary: Получить избранные музеи пользователя по ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, de, ru]
 *         description: Язык ответа
 *     responses:
 *       200:
 *         description: Избранные музеи пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   photo:
 *                     type: string
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/favorites/:id', async (req, res) => {
  const { lang } = req.query;

  const favorites = await User.findAll({
    where: { id: req.params.id },
    attributes: ['id'],
    include: [
      {
        model: Museum,
        as: 'favoriteMuseums',
        attributes: [
          'id',
          'photo',
          // ДОБАВИТЬ ПЕРЕВОД ТУТ
          'workedTime',
          lang === 'en' ? 'name_en' : lang === 'de' ? 'name_de' : 'name',
        ],
      },
      'recalledMuseums',
    ],
  });
  res.json(favorites);
});

module.exports = router;
