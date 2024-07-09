# Lab 6: Basic JWT

Here’s a basic example of using JWT (JSON Web Tokens) in a Node.js application without involving a database. This example will demonstrate how to create a token upon user login and how to protect routes using JWT.

**1. Setup**

First, create a new Node.js project and install the necessary dependencies.

```shell
mkdir jwt-example
cd jwt-example
npm init -y
npm install express jsonwebtoken body-parser
```

**2. Create the main application file**

Create a file named app.js and add the following code:

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

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

```

**3. Running the application**

Start the server by running the following command:

```shell
node app.js
```

**4. Testing the application**

You can use a tool like Postman to test the application.

Login:

URL: http://localhost:3000/login
Method: POST
Body (JSON):

```js
{
  "username": "testuser",
  "password": "testpassword"
}

```

This will return a JSON response containing a JWT token.

Access Protected Route:

URL: http://localhost:3000/protected
Method: GET
Headers:
- Authorization: <token> (replace <token> with the JWT token you received from the login response)
This should return a JSON response indicating that you have accessed the protected route.


This example demonstrates the basic use of JWT for authentication in a Node.js application. For a real-world application, consider using a more secure way to manage users and passwords, such as integrating a database and hashing passwords.