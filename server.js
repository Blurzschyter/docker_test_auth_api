// import cors from 'cors';
// const express = require('express');
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import 'express-async-errors'; //no need to setup try catch block again in the controller

//securities
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

//db and authenticateUser
import connectDB from './db/connect.js'; //above middleware

//routers
import authRouter from './routes/authRoutes.js';

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'PRODUCTION') {
  app.use(morgan('dev'));
}

// app.use(cors());
app.use(express.json());

//securities
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//dummy route
// app.get('/', (req, res) => {
//   // throw new Error('error');
//   res.send('Welcome');
// });
//real route
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
