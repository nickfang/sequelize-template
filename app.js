const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');

const publicRouter = require('./routes/public');
const usersRouter = require('./routes/users');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.options('/', cors(corsOptions));
app.use('/users', usersRouter);
app.use('/', publicRouter);

app.use(errorHandler);

module.exports = app;
