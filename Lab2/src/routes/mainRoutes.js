const express = require('express');
const router = express.Router();

// Middleware for this router
router.use((req, res, next) => {
  console.log('Middleware for mainRoutes');
  next();
});

router.use((req, res, next) => {
    res.setHeader('X-Custom-Header', 'Hello from middleware!');
    next();
  });

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to the main page!');
});

router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

module.exports = router;
