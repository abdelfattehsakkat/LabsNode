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
