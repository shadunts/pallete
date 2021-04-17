function startMaze() {
    // basic config for generating the maze
    let canvas = document.querySelector('#mazeCtx canvas');
    let ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;

    // number of cells depends on this number
    Cell.width = 20;

    let cells = Cell.cells = []; // all cells in canvas
    let rows = Cell.rows = ~~(h / Cell.width); // number of rows in canvas
    let cols = Cell.cols = ~~(w / Cell.width); // number of columns in canvas
    let visited = []; // keeping track of visited cells to do recursive backtracking

    for (let j of range(0, rows)) {
        for (let i of range(0, cols)) {
            cells.push(new Cell(i, j, ctx));
        }
    }
    // start maze generation from first cell
    let current = cells[0];
    current.isVisited = true;
    mazify();

    function mazify() {
        let frame = requestAnimationFrame(mazify);
        // if there is still cell to expand
        if (current) {
            ctx.clearRect(0, 0, w, h);
            cells.forEach(c => c.show('#000'));
            current.show('#00b300');
            let next = current.getUnvisitedNeighbor();
            // if has unvisited neighbour -> visit it
            if (next) {
                next.isVisited = true;
                visited.push(current);
                current.removeWallBetween(next);
                current = next;
            } else {
                // get from stack
                current = visited.pop();
            }
        } else {
            // maze is generated -> can play
            cells[0].show('#000')
            setupPlay(cells);
            setupSolve(cells, ctx, w, h);
            cancelAnimationFrame(frame);
        }
    }
}

startMaze();