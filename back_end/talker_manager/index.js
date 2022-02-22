const express = require('express');
const bodyParser = require('body-parser');
const { validateEmail,
  validatePassword,
  generateToken } = require('./middlewares/login');
const talkerRouter = require('./router/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.post('/login', validateEmail, validatePassword, generateToken);

app.use('/talker', talkerRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
