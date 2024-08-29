const express = require('express');
const { FavoriteMuseum } = require('../db/models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FavoriteMuseums
 *   description: API для управления избранными музеями
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Получить все избранные музеи пользователя
 *     tags: [FavoriteMuseums]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список избранных музеев пользователя
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
  const favoritesMuseums = await FavoriteMuseum.findAll({ where: { userId } });
  res.json(favoritesMuseums);
});

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     summary: Получить избранный музей по ID
 *     tags: [FavoriteMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID избранного музея
 *     responses:
 *       200:
 *         description: Информация об избранном музее
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
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Избранный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', async (req, res) => {
  const favoriteMuseum = await FavoriteMuseum.findByPk(req.params.id);
  res.json(favoriteMuseum);
});

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Добавить музей в избранное
 *     tags: [FavoriteMuseums]
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
 *         description: Музей успешно добавлен в избранное
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteMuseum'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const { userId, museumId } = req.body;
  const favoriteMuseum = await FavoriteMuseum.create({ userId, museumId });
  res.json(favoriteMuseum);
});

/**
 * @swagger
 * /favorites/{id}:
 *   patch:
 *     summary: Обновить информацию об избранном музее по ID
 *     tags: [FavoriteMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID избранного музея
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
 *     responses:
 *       200:
 *         description: Информация об избранном музее успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteMuseum'
 *       404:
 *         description: Избранный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch('/:id', async (req, res) => {
  const favoriteMuseum = await FavoriteMuseum.findByPk(req.params.id);
  await favoriteMuseum.update(req.body);
  res.json(favoriteMuseum);
});

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Удалить музей из избранного по ID
 *     tags: [FavoriteMuseums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID избранного музея
 *     responses:
 *       200:
 *         description: Музей успешно удален из избранного
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: ID удаленного музея
 *       404:
 *         description: Избранный музей не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', async (req, res) => {
  const favoriteMuseum = await FavoriteMuseum.findByPk(req.params.id);
  const favMusId = favoriteMuseum.museumId;
  await FavoriteMuseum.destroy({ where: { id: req.params.id } });
  res.json(favMusId);
});

module.exports = router;
