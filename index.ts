import express, { Request, Response} from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})