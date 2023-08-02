// src/app.js

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User');
const mainRoutes = require('./routes/mainRoutes');
const connectDB = require('./config/db');

// Connect to the MongoDB database
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to your MongoDB database here

// Set up Passport configuration
require('./config/passport');

app.use('/', mainRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
