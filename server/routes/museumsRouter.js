const express = require('express');
const { Museum } = require('../db/models');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Museums
 *   description: API для управления музеями
 */

/**
 * @swagger
 * /museums:
 *   get:
 *     summary: Получить список музеев
 *     tags: [Museums]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Язык ответа (ru, en, de)
 *     responses:
 *       200:
 *         description: Список музеев
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
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   city:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   workedTime:
 *                     type: string
 *                   holidays:
 *                     type: string
 *                   theme:
 *                     type: string
 *                   coordinates:
 *                     type: string
 *       500:
 *         description: Ошибка сервера
 */

router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;

    const museums = await Museum.findAll();

    const response = museums.map((museum) => {
      return {
        id: museum.id,
        name:
          lang === 'en'
            ? museum.name_en
            : lang === 'de'
              ? museum.name_de
              : museum.name,
        description:
          lang === 'en'
            ? museum.description_en
            : lang === 'de'
              ? museum.description_de
              : museum.description,
        location:
          lang === 'en'
            ? museum.location_en
            : lang === 'de'
              ? museum.location_de
              : museum.location,
        city:
          lang === 'en'
            ? museum.city_en
            : lang === 'de'
              ? museum.city_de
              : museum.city,
        photo: museum.photo,
        workedTime:
          lang === 'en'
            ? museum.workedTime_en
            : lang === 'de'
              ? museum.workedTime_de
              : museum.workedTime,
        holidays:
          lang === 'en'
            ? museum.holidays_en
            : lang === 'de'
              ? museum.holidays_de
              : museum.holidays,
        theme:
          lang === 'en'
            ? museum.theme_en
            : lang === 'de'
              ? museum.theme_de
              : museum.theme,
        coordinates: museum.coordinates,
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching museums.' });
  }
});

/**
 * @swagger
 * /museums/{id}:
 *   get:
 *     summary: Получить информацию о музее по ID
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID музея
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, de, ru]
 *         description: Язык ответа (en, de, ru)
 *     responses:
 *       200:
 *         description: Информация о музее
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 city:
 *                   type: string
 *                 workedTime:
 *                   type: string
 *                 holidays:
 *                   type: string
 *                 theme:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 coordinates:
 *                   type: string
 *                 recalledByUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Музей не найден
 *       500:
 *         description: Ошибка сервера
 */

router.get('/:id', async (req, res) => {
  const { lang } = req.query;
  const museum = await Museum.findByPk(req.params.id, {
    include: 'recalledByUsers',
  });

  const response =
    lang === 'en'
      ? {
          id: museum.id,
          name: museum.name_en,
          description: museum.description_en,
          location: museum.location_en,
          city: museum.city_en,
          workedTime: museum.workedTime_en,
          holidays: museum.holidays_en,
          theme: museum.theme_en,
          photo: museum.photo,
          coordinates: museum.coordinates,
          recalledByUsers: museum.recalledByUsers,
        }
      : lang === 'de'
        ? {
            id: museum.id,
            name: museum.name_de,
            description: museum.description_de,
            location: museum.location_de,
            city: museum.city_de,
            workedTime: museum.workedTime_de,
            holidays: museum.holidays_de,
            theme: museum.theme_de,
            photo: museum.photo,
            coordinates: museum.coordinates,
            recalledByUsers: museum.recalledByUsers,
          }
        : {
            id: museum.id,
            name: museum.name,
            description: museum.description,
            location: museum.location,
            city: museum.city,
            workedTime: museum.workedTime,
            holidays: museum.holidays,
            theme: museum.theme,
            photo: museum.photo,
            coordinates: museum.coordinates,
            recalledByUsers: museum.recalledByUsers,
          };
  res.json(response);
});

/**
 * @swagger
 * /museums:
 *   post:
 *     summary: Создать новый музей
 *     tags: [Museums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - location
 *               - city
 *               - workedTime
 *               - holidays
 *               - theme
 *               - coordinates
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название музея
 *               description:
 *                 type: string
 *                 description: Описание музея
 *               location:
 *                 type: string
 *                 description: Местоположение музея
 *               city:
 *                 type: string
 *                 description: Город музея
 *               photo:
 *                 type: string
 *                 description: URL фотографии музея
 *               workedTime:
 *                 type: string
 *                 description: Время работы музея
 *               holidays:
 *                 type: string
 *                 description: Выходные дни музея
 *               theme:
 *                 type: string
 *                 description: Тема музея
 *               coordinates:
 *                 type: string
 *                 description: Координаты музея
 *     responses:
 *       200:
 *         description: Музей успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Museum'
 *       500:
 *         description: Ошибка сервера
 */

router.post('/', async (req, res) => {
  const museum = await Museum.create(req.body);
  res.json(museum);
});

/**
 * @swagger
 * /museums/{id}:
 *   patch:
 *     summary: Обновить музей по ID
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID музея
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               city:
 *                 type: string
 *               photo:
 *                 type: string
 *               workedTime:
 *                 type: string
 *               holidays:
 *                 type: string
 *               theme:
 *                 type: string
 *               coordinates:
 *                 type: string
 *     responses:
 *       200:
 *         description: Музей успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Museum'
 *       404:
 *         description: Музей не найден
 *       500:
 *         description: Ошибка сервера
 */

router.patch('/:id', async (req, res) => {
  const museum = await Museum.findByPk(req.params.id);
  await museum.update(req.body);
  res.json(museum);
});

/**
 * @swagger
 * /museums/{id}:
 *   delete:
 *     summary: Удалить музей по ID
 *     tags: [Museums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID музея
 *     responses:
 *       200:
 *         description: Музей успешно удален
 *       404:
 *         description: Музей не найден
 *       500:
 *         description: Ошибка сервера
 */


router.delete('/:id', async (req, res) => {
  await Museum.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
