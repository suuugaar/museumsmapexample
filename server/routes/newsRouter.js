const express = require('express');
const { News, Museum } = require('../db/models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API для управления новостями
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Получить все новости
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, de, ru]
 *         description: Язык ответа (en, de, ru)
 *     responses:
 *       200:
 *         description: Список всех новостей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   text:
 *                     type: string
 *                   museumId:
 *                     type: integer
 *                   museumName:
 *                     type: string
 *                   museumLocation:
 *                     type: string
 *                   museumCity:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;

    // Получение всех новостей с соответствующими данными музеев
    const news = await News.findAll({
      include: {
        model: Museum,
        attributes: [
          lang === 'en' ? 'name_en' : lang === 'de' ? 'name_de' : 'name',
          lang === 'en'
            ? 'location_en'
            : lang === 'de'
              ? 'location_de'
              : 'location',
          lang === 'en' ? 'city_en' : lang === 'de' ? 'city_de' : 'city',
        ],
      },
    });

    // Формирование ответа для каждой новости
    const response = news.map((newsItem) => {
      const museum = newsItem.Museum;
      const museumName =
        lang === 'en'
          ? museum.name_en
          : lang === 'de'
            ? museum.name_de
            : museum.name;
      const museumLocation =
        lang === 'en'
          ? museum.location_en
          : lang === 'de'
            ? museum.location_de
            : museum.location;
      const museumCity =
        lang === 'en'
          ? museum.city_en
          : lang === 'de'
            ? museum.city_de
            : museum.city;

      return {
        id: newsItem.id,
        title:
          lang === 'en'
            ? newsItem.title_en
            : lang === 'de'
              ? newsItem.title_de
              : newsItem.title,
        text:
          lang === 'en'
            ? newsItem.text_en
            : lang === 'de'
              ? newsItem.text_de
              : newsItem.text,
        museumId: newsItem.museumId,
        museumName,
        museumLocation,
        museumCity,
        photo: newsItem.photo,
        date: newsItem.date,
      };
    });

    // Отправка ответа
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while fetching news.',
    });
  }
});

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API для управления новостями
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Получить новость по ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID новости
 *     responses:
 *       200:
 *         description: Новость найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 text:
 *                   type: string
 *                 museumId:
 *                   type: integer
 *                 photo:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Новость не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', async (req, res) => {
  const news = await News.findByPk(req.params.id);
  res.json(news);
});

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Создать новую новость
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *               - museumId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок новости
 *               text:
 *                 type: string
 *                 description: Текст новости
 *               museumId:
 *                 type: integer
 *                 description: ID музея
 *               photo:
 *                 type: string
 *                 description: URL фотографии
 *               date:
 *                 type: string
 *                 format: date-time
 *               title_en:
 *                 type: string
 *                 description: Заголовок новости (англ)
 *               text_en:
 *                 type: string
 *                 description: Текст новости (англ)
 *               title_de:
 *                 type: string
 *                 description: Заголовок новости (нем)
 *               text_de:
 *                 type: string
 *                 description: Текст новости (нем)
 *     responses:
 *       200:
 *         description: Новость успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', async (req, res) => {
  const news = await News.create(req.body);
  res.json(news);
});

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: Обновить новость по ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID новости
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *               museumId:
 *                 type: integer
 *               photo:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Новость успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: Новость не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.patch('/:id', async (req, res) => {
  const news = await News.findByPk(req.params.id);
  await news.update(req.body);
  res.json(news);
});

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Удалить новость по ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID новости
 *     responses:
 *       200:
 *         description: Новость успешно удалена
 *       404:
 *         description: Новость не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', async (req, res) => {
  await News.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
  res.end();
});

module.exports = router;
