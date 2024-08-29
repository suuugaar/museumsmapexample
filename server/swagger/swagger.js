const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Museum API',
      version: '1.0.0',
      description: 'API документация для приложения музея',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './routes/museumsRouter.js',
    './routes/cardsRouter.js',
    './routes/favoriteNewsRouter.js',
    './routes/favoritesMuseumsRouter.js',
    './routes/getNewsPhoto.js',
    './routes/newsRouter.js',
    './routes/orderRouter.js',
    './routes/recallRouter.js',
    './routes/scansRouter.js',
    './routes/userRouter.js',
    './routes/visitedMuseumsRouter.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
