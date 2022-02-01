const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middleware/auth');
const requestStamp = require('./middleware/requestStamp');
const { reqLogger: log } = require('./scripts/logging');
const { login, createUser } = require('./controllers/users');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./scripts/errorHandler');
const errors = require('./constants/errors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  })
);
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(log);

mongoose.connect('mongodb://localhost:27017/mydb');

app.use('/cards', requestStamp, auth, cards);
app.use('/users', requestStamp, auth, users);
app.post('/signin', requestStamp, login);
app.post('/signup', requestStamp, createUser);

app.get('*', requestStamp, (req, res) => {
  errorHandler(req, res, errors.pageNotFound);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
