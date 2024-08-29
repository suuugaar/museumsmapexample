const express = require('express');
const router = express.Router();
const { Scan, User, Museum } = require('../db/models');
const { Op } = require('sequelize');

/**
 * @swagger
 * tags:
 *   name: Scans
 *   description: API для управления сканами
 */

/**
 * @swagger
 * /scans:
 *   post:
 *     summary: Добавить новый скан
 *     tags: [Scans]
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
 *       201:
 *         description: Скан успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scan'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const { userId, museumId } = req.body;
  const newScan = await Scan.create({ userId, museumId });
  res.status(201).json(newScan);
});

/**
 * @swagger
 * /scans:
 *   get:
 *     summary: Получить все сканы за сегодняшний день
 *     tags: [Scans]
 *     responses:
 *       200:
 *         description: Список сканов за сегодняшний день
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
 *                   User:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                   Museum:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const scans = await Scan.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        { model: User, attributes: ['email'] },
        { model: Museum, attributes: ['name'] },
      ],
    });
    res.json(scans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
