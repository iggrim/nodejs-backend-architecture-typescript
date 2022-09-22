import express from 'express';

const shopRouter = express.Router();

shopRouter.use((req, res, next) => {
	console.log('Обработчик router shop');
	next();
});

shopRouter.get('/', (req, res) => {
  res.render('index');
});

shopRouter.get('/about', (req, res) => {
  res.render('about');
});

export { shopRouter };