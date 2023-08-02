# Lab 3: CRUD Operations with MongoDB using the MongoDB Node.js Driver

Objective: In this lab, you will learn how to perform CRUD operations (Create, Read, Update, Delete) with MongoDB using the MongoDB Node.js driver, while also organizing your project files for better maintainability.

## Prerequisites:

- Basic understanding of JavaScript and Node.js

- Node.js and npm installed on your computer

- Familiarity with MongoDB basics

Steps:

Step 1: Set Up Your Project

Create a new directory for your project and navigate to it in your terminal.
Step 2: Install Dependencies
Run the following commands to install the required packages:

```shell
npm init -y
npm install express mongodb morgan
```

Step 3: Create Project Structure
Create the necessary directories using the terminal:

```shell
mkdir src src/db src/routes src/controllers
```

Step 4: Connect to MongoDB
Inside the src/db directory, create a file named db.js. Open db.js and add the following code:

```js
// src/db/db.js

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

let dbInstance;

async function connect() {
  if (!dbInstance) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      console.log('Connected to MongoDB');
      dbInstance = client.db(dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}

function getDB() {
  if (!dbInstance) {
    throw new Error('Database connection has not been established. Call connect() before getDB().');
  }
  return dbInstance;
}

module.exports = {
  connect,
  getDB,
};


```

Step 5: Implement CRUD Operations
Inside the src/controllers directory, create a file named crudController.js. Open crudController.js and add the following code:

```js
// src/controllers/crudController.js
// src/controllers/crudController.js

const db = require('../db/db');

const collectionName = 'todos';

async function createTodo(todo) {
  const database = db.getDB();
  const result = await database.collection(collectionName).insertOne(todo);
  return result;
}

async function getTodos() {
  const database = db.getDB();
  const todos = await database.collection(collectionName).find({}).toArray();
  return todos;
}

async function updateTodo(id, updates) {
  const database = db.getDB();
  const result = await database.collection(collectionName).updateOne({ _id: id }, { $set: updates });
  return result;
}

async function deleteTodo(id) {
  const database = db.getDB();
  const result = await database.collection(collectionName).deleteOne({ _id: id });
  return result;
}

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};

```

Step 6: Implement Express Routes for CRUD Operations
Inside the src/routes directory, create a file named mainRoutes.js. Open mainRoutes.js and add the following code:

```js
// src/routes/mainRoutes.js
// src/routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const crud = require('../controllers/crudController');

router.post('/todos', async (req, res) => {
  const todo = req.body;
  const result = await crud.createTodo(todo);
  res.status(201).json(result);
});

router.get('/todos', async (req, res) => {
    // const todos = { 'name': 1};
  const todos = await crud.getTodos();
  console.log(todos);
  res.json(todos);
});

router.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const result = await crud.updateTodo(id, updates);
  res.json(result);
});

router.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const result = await crud.deleteTodo(id);
  res.json(result);
});

module.exports = router;
```

Step 7: Set Up Express App
Inside the src directory, create a file named app.js. Open app.js and add the following code:

```js
// src/app.js
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

```

Step 8: Test CRUD Operations

Run your Express app by executing node src/app.js.
Use Postman to test the CRUD operations, sending requests to the appropriate routes, as demonstrated in the previous lab.
Congratulations! You've successfully reproduced Lab 3, including restructuring your project files for better organization. This approach will help you keep your codebase clean, modular, and easier to maintain as your project grows.
