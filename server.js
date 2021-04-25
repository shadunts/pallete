const express = require('express');
const app = express();

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));


['home',
    'linkedList',
    'binaryTree',
    'spiralArray',
    'maze',
    'sudoku',
    'cardioid'
].forEach(s => app.get(`/${s}`, (req, res) => res.sendFile(`${__dirname}/public/${s}/${s}.html`)));

app.listen(3250, () => {
    console.log('The server is up and running!');
});