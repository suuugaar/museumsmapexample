const { Recall } = require('../db/models');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recall
 *   description: API для управления отзывами
 */

/**
 * @swagger
 * /recall:
 *   get:
 *     summary: Получить все отзывы
 *     tags: [Recall]
 *     responses:
 *       200:
 *         description: Список всех отзывов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   text:
 *                     type: string
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
  const recalls = await Recall.findAll();
  res.json(recalls);
});

/**
 * @swagger
 * /recall/{id}:
 *   get:
 *     summary: Получить отзыв по ID
 *     tags: [Recall]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отзыва
 *     responses:
 *       200:
 *         description: Отзыв найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
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
 *         description: Отзыв не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', async (req, res) => {
  const recall = await Recall.findByPk(req.params.id);
  res.json(recall);
});

/**
 * @swagger
 * /recall:
 *   post:
 *     summary: Создать новый отзыв
 *     tags: [Recall]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - userId
 *               - museumId
 *             properties:
 *               text:
 *                 type: string
 *                 description: Текст отзыва
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               museumId:
 *                 type: integer
 *                 description: ID музея
 *     responses:
 *       200:
 *         description: Отзыв успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recall'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const recall = await Recall.create(req.body);
  res.json(recall);
});

/**
 * @swagger
 * /recall:
 *   patch:
 *     summary: Обновить отзыв по параметрам userId и museumId
 *     tags: [Recall]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - museumId
 *               - text
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               museumId:
 *                 type: integer
 *                 description: ID музея
 *               text:
 *                 type: string
 *                 description: Обновленный текст отзыва
 *     responses:
 *       200:
 *         description: Отзыв успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recall'
 *       404:
 *         description: Отзыв не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch('/', async (req, res) => {
  const { userId, museumId, text } = req.body;
  const recall = await Recall.findOne({ where: { userId, museumId } });
  await recall.update({ text });
  res.json(recall);
});

/**
 * @swagger
 * /recall:
 *   delete:
 *     summary: Удалить отзыв по параметрам userId и museumId
 *     tags: [Recall]
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
 *         description: Отзыв успешно удален
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/', async (req, res) => {
  const { userId, museumId } = req.body;
  await Recall.destroy({ where: { userId, museumId } });
  res.sendStatus(200).end();
});

module.exports = router;