const { Order } = require('../db/models');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API для управления заказами
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Получить все заказы
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Список всех заказов
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
 *                   userName:
 *                     type: string
 *                   address:
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
router.get('/', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создать новый заказ
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - userName
 *               - address
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя
 *               userName:
 *                 type: string
 *                 description: Имя пользователя
 *               address:
 *                 type: string
 *                 description: Адрес пользователя
 *     responses:
 *       200:
 *         description: Заказ успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Удалить заказ по параметрам userId и museumId
 *     tags: [Order]
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
 *         description: Заказ успешно удален
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/', async (req, res) => {
  const { userId, museumId } = req.body;
  await Order.destroy({ where: { userId, museumId } });
  res.sendStatus(200).end();
});

module.exports = router;