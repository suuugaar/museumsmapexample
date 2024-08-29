const express = require('express');
const router = express.Router();

// Импортируем миддлварку
const addNewsMiddleware = require('../middleware/addNews');

/**
 * @swagger
 * tags:
 *   name: getNewsPhoto
 *   description: API для управления загрузкой файлов
 */

/**
 * @swagger
 * /getnewsphoto:
 *   post:
 *     summary: Добавить фотографию к новой новости или музею
 *     tags: [getNewsPhoto]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Фотография новости
 *     responses:
 *       200:
 *         description: Фотография новости успешно загружена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fieldname:
 *                   type: string
 *                 originalname:
 *                   type: string
 *                 encoding:
 *                   type: string
 *                 mimetype:
 *                   type: string
 *                 destination:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 path:
 *                   type: string
 *                 size:
 *                   type: integer
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', addNewsMiddleware.single('avatar'), (req, res) => {
  console.log(req);
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    console.log('Ошибка добавления фотографии новости в папку!', error);
  }
});

module.exports = router;
