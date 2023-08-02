# Lab 2: Structuring Express Project with Modular Routes (Including Testing with Postman)

Objective: In this lab, you will learn how to structure an Express project with modular routes and how to test the application's routes using Postman.

## Prerequisites:

- Completion of Lab 1 or basic understanding of routing and middleware in Express.
- Postman installed on your computer (download: https://www.postman.com/downloads/).

**Steps:**

**Step 1: Set Up Your Project**

Create a new directory for your project (if not done already).
Navigate to the project directory in your terminal.

**Step 2: Install Dependencies**

Run npm install express to install Express.
Run npm install morgan to install the Morgan middleware for logging.

**Step 3: Create Project Structure**

Create the following directories in your project root:
src: This will hold your application code.
src/routes: This will contain your modular route files.

**Step 4: Set Up Express App**

Create a file named app.js in the src directory.
Open app.js and set up the Express app:

```js
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

```

**Step 5: Define Modular Routes**

Inside the src/routes directory, create a file named mainRoutes.js.
Open mainRoutes.js and define your modular routes:

```js
const express = require('express');
const router = express.Router();

// Middleware for this router
router.use((req, res, next) => {
console.log('Middleware for mainRoutes');
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
```

**Step 6: Test Your Application**

Open your terminal and navigate to your project directory.
Run node src/app.js to start the server.
Open your web browser and visit http://localhost:3000 to see the homepage.
Try visiting http://localhost:3000/about to see the about page.
Observe the terminal and notice the middleware log for each incoming request.

**Step 7: Test the Application with Postman**

Open Postman on your computer.
Create a new request collection for your Express project.
Create a request for the main route:
Set the request method to GET.
Enter the URL http://localhost:3000/.
Send the request and observe the response.
Verify that you receive the "Welcome to the main page!" response.
Create a request for the about route:
Set the request method to GET.
Enter the URL http://localhost:3000/about.
Send the request and observe the response.
Verify that you receive the "This is the about page." response.

**Step 8: Test Middleware with Postman**



In your mainRoutes.js file, add a middleware that adds a custom header to the response:

```js
router.use((req, res, next) => {
  res.setHeader('X-Custom-Header', 'Hello from middleware!');
  next();
});

```

Save the file and restart your server if necessary.
Create a new request to the main route in Postman:
Set the request method to GET.
Enter the URL http://localhost:3000/.
Send the request and observe the response headers.
Verify that the X-Custom-Header is present with the value you added.
Congratulations! You've completed Lab 2, including testing your Express application with Postman. You've learned how to structure your project with modular routes and how to verify the functionality of your routes and middleware using a popular testing tool like Postman. This will ensure that your application behaves as expected when handling different requests.
