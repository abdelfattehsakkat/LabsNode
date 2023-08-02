## Lab 4: Authentication and Authorization with Express

Objective: In this lab, you will learn how to implement user authentication and authorization in an Express application using Passport.js and JSON Web Tokens (JWT).

## Prerequisites:

- Completion of previous labs (especially Lab 3)
- Basic understanding of user authentication and authorization concepts

Step 1: Install Dependencies
Run the following command to install the necessary packages:


```bash
npm install express mongoose passport passport-local passport-jwt jsonwebtoken bcrypt
```

Step 2: Set Up User Model
Create a User.js file in the models directory and define your user model using Mongoose:

```js
// src/models/User.js

const url = 'mongodb://localhost:27017/mydb'; // Replace "mydb" with your desired database name

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;


```

Step 3: Create the db.js File
Create a file named db.js in the config directory to set up the database connection using Mongoose:

```js
// src/config/db.js

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mydb'; // Replace "mydb" with your desired database name

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
```

Step 4: Set Up Passport Configuration

Inside the config directory, create a file named passport.js to configure Passport.js:


```js
// src/config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key',
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

```

Step 5: Implement Authentication and Authorization Middleware
Create an authMiddleware.js file in the middleware directory and implement authentication and authorization middleware:

```js
// src/middleware/authMiddleware.js

const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = passportJWT;

const User = require('../models/User');

// Set up local strategy for username/password authentication
passport.use(User.createStrategy());

// Set up JWT strategy for token-based authentication
passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

```
Step 6: Create Authentication Routes
Update your mainRoutes.js file to add routes for user registration, login, and logout:

```js
// src/routes/mainRoutes.js

// src/routes/mainRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Define your routes here

module.exports = router;


```

*Testing User Registration:*

Open Postman.
Create a new POST request and enter the URL for user registration: http://localhost:3000/register (or replace with your actual URL).
Set the request body to JSON format, providing a username and password.
Send the request.
You should receive a 201 Created response if the user registration was successful.


Testing User Login:

Create a new POST request and enter the URL for user login: http://localhost:3000/login (or replace with your actual URL).
Set the request body to JSON format, providing the same username and password used for registration.
Send the request. Check the case when you provide wrong password.

You should receive a response containing a JSON Web Token (JWT) if the login was successful.


Testing Protected Route:

Create a new GET request and enter the URL for the protected route: http://localhost:3000/protected (or replace with your actual URL).
In the request headers, add a new header with key Authorization and value Bearer YOUR_JWT_TOKEN, where YOUR_JWT_TOKEN is the JWT token obtained after successful login. (see capture1.png)
Send the request.
If the JWT token is valid and corresponds to an authenticated user, you should receive a response indicating successful access to the protected route.
Testing Unauthenticated Access to Protected Route:

Create a new GET request for the protected route without providing a valid JWT token in the headers.
Send the request.
You should receive a 401 Unauthorized response, indicating that you don't have access without a valid token.
These steps outline the basic process of testing user registration, login, and protected route access using Postman. Remember that you need to replace placeholders like http://localhost:3000 with the actual URL of your running Express application. Additionally, ensure that you handle errors and edge cases properly in your application.

In this outline, you'll need to replace 'your_secret_key' with your actual secret key for JWT token encoding. Additionally, you might need to adjust these code snippets to match your application's structure and requirements.

This outline should give you a starting point for implementing authentication and authorization in your Express application.

By completing Lab 4, you'll have a better understanding of how to implement user authentication and authorization using Passport.js and JWT in an Express application. This knowledge will enable you to create secure applications that restrict access to certain routes based on user roles and ensure that only authenticated users can access protected resources.