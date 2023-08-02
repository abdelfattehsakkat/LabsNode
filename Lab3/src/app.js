// src/app.js

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Connect to MongoDB when the application starts
db.connect().then(() => {
  const mainRoutes = require('./routes/mainRoutes');
  app.use('/', mainRoutes);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
