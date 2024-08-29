// Подключение библиотеки multer
const multer = require('multer');

// Создание пространства где хранятся изображения
const storage = multer.diskStorage({
  // Где хранятся изображения
  destination(req, file, cb) {
    cb(null, 'public/adminNewsImages');
  },
  // Генерируем название изображений
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

// Валидация чтобы можно было загрузить только изображения
const types = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
