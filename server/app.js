/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import mongojs from 'mongojs';
import * as routes from './routes';

const app = express();
// database setup
const dbUri = process.env.MONGODB_URI || 'mydb';
const collections = ['mycollection'];

// eslint-disable-next-line
const db = mongojs(dbUri, collections);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/api', routes.hello);
app.use('/api/users', routes.users);

module.exports = app;
