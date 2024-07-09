const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'kjgkjdkjgdkdgjoapojncbhguiokfkqsbh454(§jnvdl,';

app.use(bodyParser.json());

// Mock user
const user = {
  id: 1,
  username: 'testuser',
  password: 'testpassword'
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match the mock user
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
