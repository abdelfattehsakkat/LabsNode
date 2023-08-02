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
