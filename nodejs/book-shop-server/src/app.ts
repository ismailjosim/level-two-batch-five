import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './app/modules/books/book.route';

const app: Application = express();
// middleware function
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', BookRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Books Server Default Route');
});

export default app;
