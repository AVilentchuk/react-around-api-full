const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middleware/auth');
const { sign } = require('./middleware/validator');
const requestStamp = require('./middleware/requestStamp');
const { reqLogger: log } = require('./scripts/logging');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./scripts/errorHandler');
const { pageNotFound } = require('./constants/errors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['PUT', 'POST', 'GET', 'DELETE'],
  })
);
app.options('*', cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(log);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

mongoose.connect('mongodb://localhost:27017/mydb');

app.use(errors());
app.use('/cards', requestStamp, auth, cards);
app.use('/users', requestStamp, auth, users);
app.post('/signin', sign, requestStamp, login);
app.post('/signup', sign, requestStamp, createUser);

app.get('*', requestStamp, (req, res) => {
  errorHandler(req, res, pageNotFound);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
