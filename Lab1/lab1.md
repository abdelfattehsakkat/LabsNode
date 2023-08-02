# Lab 1: Routing and Middleware in Express

Objective: In this lab, you will learn how to define routes and use middleware in an Express application.

## Prerequisites:

Basic understanding of JavaScript and Node.js
Node.js and npm installed on your computer
Familiarity with the Express framework
Steps:

**Step 1: Set Up Your Project**

Create a new directory for your project.
Open your terminal and navigate to the project directory.
Run npm init -y to initialize a new Node.js project.

**Step 2: Install Express**

Install Express as a dependency by running npm install express.

**Step 3: Create the Express Application**

Create a file named app.js in your project directory.
Open app.js and require the necessary modules:

```js
const express = require('express');
const app = express();

// Your code will go here

```

Step 4: Define Basic Routes

Add the following code to define a simple route for the homepage:
```js
app.get('/', (req, res) => {
res.send('Welcome to the homepage!');
});
```

Add another route to handle a "about" page:
```js
app.get('/about', (req, res) => {
res.send('This is the about page.');
});
```

Step 5: Implement Middleware

Define a middleware function that logs the incoming request method and URL. Place this middleware before your route definitions:
```js
app.use((req, res, next) => {
console.log(`Incoming request: ${req.method} ${req.url}`);
next();
});
```
Step 6: Start the Server

Add the following code to start the Express server on port 3000:
```js
const PORT = 3000;

app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});

```

Step 7: Test Your Application

Open your terminal and navigate to your project directory.
Run node app.js to start the server.
Open your web browser and visit http://localhost:3000 to see the homepage.
Try visiting http://localhost:3000/about to see the about page.
Observe the terminal to see the middleware log for each incoming request.
Congratulations! You've completed Lab 1 on routing and middleware in Express. You've learned how to define basic routes and implement middleware in an Express application. This knowledge will serve as a strong foundation as you dive deeper into more complex functionalities of Express and MongoDB in the upcoming labs.
