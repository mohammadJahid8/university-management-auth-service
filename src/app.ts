import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

// all routes
app.use('/api/v1', routes);

// default route
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to the university server!');
});

// global error handler
app.use(globalErrorHandler);

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Can't find ${req.originalUrl} on University server!`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});

export default app;
