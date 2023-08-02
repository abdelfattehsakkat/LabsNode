const express = require('express');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});