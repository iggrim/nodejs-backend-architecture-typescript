import express, { Request, Response} from 'express';
import path from 'path';
import { create } from 'express-handlebars';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const hbs = create({ 
  defaultLayout: 'main',
  extname: 'hbs' 
});

const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', "./views");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})