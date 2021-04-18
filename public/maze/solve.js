function setupSolve(cells, ctx, width, height) {
    let src = cells[0]; // solve from top left
    let goal = cells[cells.length - 1]; // to bottom right
    // cells that need to be explored
    // initially only start in the open set
    let open = [src];
    // cells that are already explored
    let closed = [];

    // informed search
    AStarButton.onclick = _ => {
        // take as heuristic the number of steps to get to the goal if there are no obstacles
        const heuristic = (c1, c2) => Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
        search(heuristic);
    }
    AStarButton.removeAttribute('disabled');

    // uninformed search
    DFSButton.onclick = _ => search();
    DFSButton.removeAttribute('disabled');

    // Searches maze for a solution
    // returns function which recursively performs search
    // heuristic: function to use while choosing the next node
    function search(heuristic) {
        const isDFS = !heuristic; // if no function is provided => perform DFS

        let frame = requestAnimationFrame(() => search(heuristic));
        // while there are cells to explore
        if (open.length !== 0) {
            // pick cell with minimum f
            let currentIndex = open.hasMin('f');
            let current = open[currentIndex];

            // draw the current state
            drawPath(cells, current, ctx, width, height, isDFS ? '#f91f02' : '#158e43');

            // reached the goal -> stop
            if (current === goal) {
                cancelAnimationFrame(frame);
                open = [src];
                closed = [];
                return;
            }

            // add to closed set and remove from open
            open.splice(currentIndex, 1)
            closed.push(current);

            let neighbours = current.getMovableNeighbours();
            for (let neighbour of neighbours) {
                // if has not been explored yet
                if (!closed.includes(neighbour)) {
                    let newG = current.g + 1;
                    // discovered new cell
                    if (!open.includes(neighbour)) {
                        open.push(neighbour);
                    } else if (newG >= neighbour.g) { // do not need to update g if its greater than current g
                        continue;
                    }

                    neighbour.h = isDFS ? 0 : heuristic(neighbour, goal);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = current;
                }
            }
        } else {
            // open set is empty -> no solution
            cancelAnimationFrame(frame);
        }

    }
}

// draw the path from current to start
function drawPath(cells, current, ctx, width, height, color) {
    ctx.clearRect(0, 0, width, height);
    // draw all cells
    cells.forEach(c => c.show(COLORS['default']));

    // find the path
    let tmp = current;
    let path = [];
    while (tmp) {
        path.push(tmp);
        tmp = tmp.parent;
    }
    for (let cell of path) {
        cell.show(color);
    }
}