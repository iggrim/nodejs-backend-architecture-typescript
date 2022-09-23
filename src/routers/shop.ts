import express from 'express';

const shopRouter = express.Router();

shopRouter.get('/', (req, res) => {
  res.render('index', {
    title_1: 'Главная страница',
    isHome: true
  })  
})

shopRouter.get('/add-product', (req, res) => {
  res.render('add-product', {
    title_1: 'Добавить товар',
    isAdd: true
  })
})

shopRouter.post('/add-product', (req, res) => {
  console.log('req.body ', req.body)

  res.redirect('/products')
})

shopRouter.get('/products', (req, res) => {
  res.render('products', {
    title_1: 'Товары',
    isProducts: true
  })
})

export { shopRouter };