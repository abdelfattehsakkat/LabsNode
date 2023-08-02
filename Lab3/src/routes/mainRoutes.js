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