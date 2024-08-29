const apiRouter = require('express').Router();

const userRouter = require('./userRouter');
const cardsRouter = require('./cardsRouter');
const museumsRouter = require('./museumsRouter');
const newsRouter = require('./newsRouter');
const favoritesMuseumsRouter = require('./favoritesMuseumsRouter');
const visitedMuseumsRouter = require('./visitedMuseumsRouter');
const recallRouter = require('./recallRouter');
const favoriteNewsRouter = require('./favoriteNewsRouter');
const getNewsPhoto = require('./getNewsPhoto');
const orderRouter = require('./orderRouter');
const scansRouter = require('./scansRouter')

apiRouter.use('/user', userRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/museums', museumsRouter);
apiRouter.use('/news', newsRouter);
apiRouter.use('/favorites', favoritesMuseumsRouter);
apiRouter.use('/favnews', favoriteNewsRouter);
apiRouter.use('/visited', visitedMuseumsRouter);
apiRouter.use('/recall', recallRouter);
apiRouter.use('/getnewsphoto', getNewsPhoto);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/scans', scansRouter);

module.exports = apiRouter;
