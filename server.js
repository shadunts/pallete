const express = require('express');
const app = express();

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get('/home', (req, res) => res.sendFile(`${__dirname}/public/home/home.html`));

app.get('/linkedList', (req, res) => res.sendFile(`${__dirname}/public/linkedList/linkedList.html`));

app.get('/binaryTree', (req, res) => res.sendFile(`${__dirname}/public/binaryTree/binaryTree.html`));

app.get('/spiralArray', (req, res) => res.sendFile(`${__dirname}/public/spiralArray/spiralArray.html`));

app.get('/maze', (req, res) => res.sendFile(`${__dirname}/public/maze/maze.html`));

app.get('/cardioid', (req, res) => res.sendFile(`${__dirname}/public/cardioid/cardioid.html`));

app.get('/sudoku', (req, res) => res.sendFile(`${__dirname}/public/sudoku/sudoku.html`));

app.listen(3250, () => {
    console.log('The server is up and running!');
});