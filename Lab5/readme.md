# Lab 5: Initialize a TypeScript Project Based on Express

## Prerequisites:

**Step 1: Set up the project directory:**

   Create a new directory for your project and navigate into it.
   ```sh
   mkdir express-typescript-project
   cd express-typescript-project
   ```

**Step 2: Initialize a new Node.js project:**

This creates a package.json file.

 ```sh
npm init -y
 ```
**Step 3: Install dependencies:**

Install Express and TypeScript, along with types for Node.js and Express.
 
 ```sh
npm install express
npm install --save-dev typescript @types/node @types/express
 ```
**Step 4: Set up TypeScript configuration:**

Create a tsconfig.json file to configure TypeScript. You can use the following basic configuration:

 ```js
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
 ```
**Step 5: Create the project structure:**

Set up a basic project structure. Typically, you would have a src directory for your TypeScript files.

 ```sh
mkdir src
touch src/index.ts
 ```
**Step 6: Write a basic Express server:**

Add the following code to src/index.ts to create a simple Express server:

 ```js
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 ```

**Step 7: Add build and start scripts:**

Update the package.json file to add scripts for building and starting the project:

 ```js
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node-dev src/index.ts"
}
 ```
**Step 8: Install development dependencies for hot-reloading (optional):**

You can use ts-node-dev for automatic restarting of the server on code changes.

 ```sh
npm install --save-dev ts-node-dev
 ```
**Step 9: Run the project:**

Use the dev script to start the development server with hot-reloading:

 ```sh
npm run dev
 ```
**Step 10: Build and run the project:**

Use the build script to compile the TypeScript files and the start script to run the compiled JavaScript code:
 ```sh
 npm run build;
 npm run start;
  ```

Your TypeScript project based on Express is now set up and running.
