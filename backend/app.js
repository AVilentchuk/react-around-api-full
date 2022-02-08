const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(helmet());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
// app.on('uncaughtException', (err) => {
//   console.error('There was an uncaught error', err);
//   process.exit(1); //mandatory (as per the Node.js docs)
// });
mongoose.connect('mongodb://localhost:27017/mydb');
app.use(requestStamp);
app.use(log);
app.use('/cards', auth, cards);
app.use('/users', auth, users);
app.post('/signin', sign, login);
app.post('/signup', sign, createUser);
app.get('*', (req, res, next) => {
  next(pageNotFound);
});

// app.use(methodOverride());
// app.use(clientErrorHandler);
// app.use((req,res,next)=>{
//   const error = new
// })
// app.use(function (err, req, res, next) {
//   // logic
// })
// app.use(log);
// app.use(errorLogger);
// app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
