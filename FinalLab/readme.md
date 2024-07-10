
# Task Manager Application

This project is a mini Node.js application designed to recap the concepts covered in a Node.js training course. The application includes the following features and technologies:

-   **TypeScript**: The entire project is written in TypeScript.
-   **Asynchronous Node.js**: The project utilizes asynchronous programming patterns in Node.js.
-   **MongoDB**: MongoDB is used as the database, interfaced with the MongoDB native driver.
-   **Express**: Express is used to create the REST API.
-   **Middleware**: Custom middleware is used for error handling, validation, and authentication.
-   **Authentication**: JWT-based authentication is implemented.

  
### Project Features

1.  **User Signup and Login**: Users can sign up and log in to the application. Passwords are hashed using bcrypt.
    
2.  **JWT Authentication**: Upon successful login, a JWT token is generated and returned to the user. This token is used to authenticate subsequent requests.
    
3.  **Task Management**: Users can create, read, update, and delete tasks. Each task is associated with a user.
    
4.  **Middleware**: Custom middleware for authentication (`authMiddleware`), error handling (`errorMiddleware`), and request validation (`validateMiddleware`) is implemented.
    
5.  **Database Connection**: The application connects to a MongoDB database using the native MongoDB driver.

   
## Project Structure

```bash

`/src
  /controllers
    authController.ts
    taskController.ts
  /middlewares
    authMiddleware.ts
    errorMiddleware.ts
    validateMiddleware.ts
  /models
    userModel.ts
    taskModel.ts
  /routes
    authRoutes.ts
    taskRoutes.ts
  /schemas
    authSchemas.ts
    taskSchemas.ts
  /utils
    jwtUtils.ts
  app.ts
  database.ts
  server.ts
tsconfig.json
package.json` 

```

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   MongoDB

### API Endpoints

#### User Authentication

-   **Signup**: `POST /auth/signup`
    
```json 
    {
      "username": "testuser",
      "password": "password"
    } 
  ```  
-   **Login**: `POST /auth/login`
    
```json 
    {
      "username": "testuser",
      "password": "password"
    }
   ```

#### Task Management

-   **Create Task**: `POST /tasks`
    
```json 
    {
      "title": "New Task",
      "description": "Task description"
    }
```
    
-   **Get Tasks**: `GET /tasks`
    
-   **Update Task**: `PUT /tasks/:id`
    
```json 
{
      "title": "Updated Task",
      "description": "Updated description",
      "completed": true
    }`
```
    
-   **Delete Task**: `DELETE /tasks/:id`
    


### Code Snippets

#### **src/controllers/authController.ts**
```ts
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';
import bcrypt from 'bcrypt';

const userModel = new UserModel();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.createUser(username, password);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

```


#### **src/utils/jwtUtils.ts**

```ts
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const generateToken = (user: User): string => {
  const payload = { id: user._id.toString() };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

```

#### **src/controllers/taskController.ts**

```ts
import { Request, Response, NextFunction } from 'express';
import { TaskModel } from '../models/taskModel';
import { ObjectId } from 'mongodb';

const taskModel = new TaskModel();

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.user._id);
    const { title, description } = req.body;
    const task = await taskModel.createTask(userId, title, description);
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.user._id);
    const tasks = await taskModel.getTasksByUserId(userId);
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

```

#### **src/middlewares/authMiddleware.ts**

```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import { ObjectId } from 'mongodb';

const userModel = new UserModel();
const JWT_SECRET = process.env.JWT_SECRET as string;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findUserById(new ObjectId(decoded.id));
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

export default authMiddleware;

```


#### **src/models/userModel.ts**

```ts
import { Collection, Db, ObjectId, InsertOneResult } from 'mongodb';
import bcrypt from 'bcrypt';

interface User {
  _id?: ObjectId;
  username: string;
  password: string;
}

class UserModel {
  private collection: Collection<User>;

  constructor(db: Db) {
    this.collection = db.collection('users');
  }

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    const result: InsertOneResult<User> = await this.collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.collection.findOne({ username });
  }

  async findUserById(id: ObjectId): Promise<User | null> {
    return await this.collection.findOne({ _id: id });
  }
}

export { User, UserModel };

```
