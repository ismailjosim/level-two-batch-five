import express, { Application } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import routeNotFound from './app/middlewares/notFound';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

//* Application routes
app.use('/api/v1', router);

// global middlewares
app.use(routeNotFound);
app.use(globalErrorHandler);

export default app;
