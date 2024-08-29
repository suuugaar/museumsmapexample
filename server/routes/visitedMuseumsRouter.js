const express = require('express');
const { VisitedMuseum } = require('../db/models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: VisitedMuseums
 *   description: API для управления посещенными музеями
 */

/**
 * @swagger
 * /visited:
 *   get:
 *     summary: Получить все посещенные музеи пользователя
 *     tags: [VisitedMuseums]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список посещенных музеев
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
 *                   museumId:
 *                     type: integer
 *                   rating:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const visitedMuseums = await VisitedMuseum.findAll({ where: { userId } });
  res.json(visitedMuseums);
});

/**
 * @swagger
 * /visited/{id}:
 *   get:
 *     summary: Получить посещенный музей по ID
 *     tags: [VisitedMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID посещенного музея
 *     responses:
 *       200:
 *         description: Информация о посещенном музее
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 museumId:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Посещенный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', async (req, res) => {
  const visitedMuseum = await VisitedMuseum.findByPk(req.params.id);
  res.json(visitedMuseum);
});

/**
 * @swagger
 * /visited:
 *   post:
 *     summary: Добавить посещенный музей
 *     tags: [VisitedMuseums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - museumId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               museumId:
 *                 type: integer
 *                 description: ID музея
 *     responses:
 *       200:
 *         description: Посещенный музей успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitedMuseum'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const { userId, museumId } = req.body;
  const visitedMuseum = await VisitedMuseum.create({ userId, museumId });
  res.json(visitedMuseum);
});

/**
 * @swagger
 * /visited/{id}:
 *   patch:
 *     summary: Обновить информацию о посещенном музее по ID
 *     tags: [VisitedMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID посещенного музея
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               museumId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Информация о посещенном музее успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 museumId:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Посещенный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch('/:id', async (req, res) => {
  const visitedMuseum = await VisitedMuseum.findByPk(req.params.id);
  await visitedMuseum.update(req.body);
  res.json(visitedMuseum);
});

/**
 * @swagger
 * /visited/{id}:
 *   delete:
 *     summary: Удалить посещенный музей по ID
 *     tags: [VisitedMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID посещенного музея
 *     responses:
 *       200:
 *         description: Посещенный музей успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: ID удаленного музея
 *       404:
 *         description: Посещенный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', async (req, res) => {
  const visitedMuseum = await VisitedMuseum.findByPk(req.params.id);
  const musId = visitedMuseum.museumId;
  await VisitedMuseum.destroy({ where: { id: req.params.id } });
  res.json(musId);
});

module.exports = router;
