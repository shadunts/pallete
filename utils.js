// draw line between to points
// boolean is for cases when the line is not needed but there is need to move the point to next point
CanvasRenderingContext2D.prototype.drawLine = function(fromX, fromY, toX, toY, draw = true) {
    this.moveTo(fromX, fromY);
    if (draw) this.lineTo(toX, toY);
    this.moveTo(toX, toY);
}

// get random element from the array
Array.prototype.pickRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
}

// find index of object with minimum property in the array of objects
Array.prototype.hasMin = function(prop) {
    return this.reduce((prevIndex, curr, i, arr) => {
        let prev = arr[prevIndex];
        return prev[prop] < curr[prop] ? prevIndex : i;
    }, 0)
}

// compare this to other by prop
Array.prototype.equalsByProp = function(other, prop) {
    return this.every((e, i) => e[prop] === other[i][prop]);
};

// Durstenfeld shuffle algorithm
Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

Array.prototype.toMatrix = function(width) {
    return this.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) :
        rows[rows.length - 1].push(key)) && rows, []);
};

// generates numbers [from, to)
let range = (from, to) => ({
    [Symbol.iterator]() {
        return {
            next() {
                return { value: from++, done: from > to }
            }
        }
    }
})

// index of the element in 2D array converted into 1D array index
let index = (i, j, cols, rows) => {
    // i and j should be valid
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

// get 4 neigbours of element in 2D array represented in 1D
function getNeighbours(arr, cols, i, j) {
    const rows = arr.length / cols;
    const top = arr[index(i, j - 1, cols, rows)];
    const right = arr[index(i + 1, j, cols, rows)];
    const bottom = arr[index(i, j + 1, cols, rows)];
    const left = arr[index(i - 1, j, cols, rows)];

    return [top, right, bottom, left];
}

// Generate a random character
String.randomChar = _ => String.fromCharCode(Math.random() * 128);

String.prototype.capitalizeFirst = function() {
    return this[0].toUpperCase() + this.substring(1);
};

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms));