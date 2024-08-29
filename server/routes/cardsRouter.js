const express = require('express');
const { Card } = require('../db/models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: API для управления музейными картами
 */

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Получить все карточки пользователя
 *     tags: [Cards]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список карточек пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   validity:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */

router.get('/', async (req, res) => {
  const { userId } = req.query;
  const cards = await Card.findAll({ where: { userId } });
  res.json(cards);
});

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Создать новую карточку
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - validity
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               validity:
 *                 type: string
 *                 description: Срок действия карточки
 *     responses:
 *       200:
 *         description: Карточка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Ошибка сервера
 */

router.post('/', async (req, res) => {
  const card = await Card.create(req.body);
  res.json(card);
});

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     summary: Обновить карточку полностью по ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID карточки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - validity
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               validity:
 *                 type: string
 *                 description: Срок действия карточки
 *     responses:
 *       200:
 *         description: Карточка успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Карточка не найдена
 *       500:
 *         description: Ошибка сервера
 */

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, validity } = req.body;
  await Card.update({ userId, validity }, { where: { id } });
  const updatedCard = await Card.findByPk(id);
  res.json(updatedCard);
});

/**
 * @swagger
 * /cards/{id}:
 *   patch:
 *     summary: Обновить информацию о карте по ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID карты
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               validity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Информация о карте успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Карта не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.patch('/:id', async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  await card.update(req.body);
  res.json(card);
});

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Удалить карту по ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID карты
 *     responses:
 *       200:
 *         description: Карта успешно удалена
 *       404:
 *         description: Карта не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', async (req, res) => {
  await Card.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
