const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(morgan('dev'));

// Routes
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
