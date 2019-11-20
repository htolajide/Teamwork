import '@babel/polyfill';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import jsend from 'jsend';
import morgan from 'morgan';
import debug from 'debug';
import table from './models/tables';

import v1Router from './routes';

dotenv.config();

const app = express();

// to resolve cross origin resource shearing (CORS) error add folowing to te response header 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(jsend.middleware);
table.createEmployeeTable();
table.createGifTable();
table.createArticlesTable();
table.createGifCommentTable();
table.createArticleCommentTable();

table.disconnect();

app.use('/api/v1', v1Router);

app.get('*', (req, res) => res.jsend.success('Teamwork!!!'));

const port = parseInt(process.env.PORT, 10) || 4000;

app.listen(port, () => debug('app:*')(`Live at ${port}`));

module.exports = app;