class Cell {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.color = '#000';
        this.ctx = ctx; // 2d context to draw
        // in initial state all walls are present
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        }
        this.isVisited = false;

        // A* heuristic 
        this.f = 0;
        this.h = 0;
        this.g = 0;
    }

    show(color) {
        let { ctx, walls } = this;
        ctx.strokeStyle = this.isVisited ? '#0f0' : color;
        if (color) {
            ctx.fillStyle = color;
            this.color = color;
        }
        let p = {
            x: this.x * Cell.width, // the x coordinate on canvas
            y: this.y * Cell.width // the y coordinate on canvas
        };

        // draw each of the walls if they are true in this.walls
        ctx.beginPath();
        // declared in utils
        ctx.drawLine(p.x, p.y, p.x + Cell.width, p.y, walls.top);
        ctx.drawLine(p.x + Cell.width, p.y, p.x + Cell.width, p.y + Cell.width, walls.right);
        ctx.drawLine(p.x + Cell.width, p.y + Cell.width, p.x, p.y + Cell.width, walls.bottom);
        ctx.drawLine(p.x, p.y + Cell.width, p.x, p.y, walls.left);
        ctx.stroke();
        // mark cell as visited
        if (this.isVisited) {
            ctx.fillRect(p.x, p.y, Cell.width, Cell.width);
        }

    }

    // get 4 neigbours of cell in 2D array, represented as 1D array
    getAllNeighbours() {
        // declared in utils
        return getNeighbours(Cell.cells, Cell.cols, this.x, this.y);
    }

    // neighbours which are accessible from current cell
    getMovableNeighbours() {
        let moves = {
            0: 'top',
            1: 'right',
            2: 'bottom',
            3: 'left'
        }
        return this.getAllNeighbours().filter((n, i) => this.can(moves[i]));
    }

    // get random unvisited neighbour
    getUnvisitedNeighbor() {
        let neighbours = getNeighbours(Cell.cells, Cell.cols, this.x, this.y);
        neighbours = neighbours.filter(n => n && !n.isVisited);
        return neighbours.pickRandom();
    }

    removeWallBetween(neighbour) {
        // determine which of the neighbours is passed by difference in x and y coordinates
        let deltaX = this.x - neighbour.x;
        let deltaY = this.y - neighbour.y;
        // left neighbour of this
        if (deltaX === 1) {
            this.walls.left = false;
            neighbour.walls.right = false;
        } else if (deltaX === -1) { // right neighbour of this
            this.walls.right = false;
            neighbour.walls.left = false;
        }
        // top neighbour of this
        if (deltaY === 1) {
            this.walls.top = false;
            neighbour.walls.bottom = false;
        } else if (deltaY === -1) { // bottom neighbour of this
            this.walls.bottom = false;
            neighbour.walls.top = false;
        }
    }

    // determine whether player can move to specified neighbour
    can(direction) {
        return !this.walls[direction];
    }

    highlight(color) {
        this.ctx.fillStyle = color;
        let p = {
            x: this.x * Cell.width,
            y: this.y * Cell.width
        }
        this.ctx.fillRect(p.x + 5, p.y + 5, Cell.width - 10, Cell.width - 10);
    }
}