class Sudoku {
    // initial state of sudoku puzzle
    static puzzle = '..53....88......2..7..1.5..4....53...1..7...6..32.6.8..6.5....9..4....3......97..';
    static sketch;
    constructor() {
        const split = Sudoku.puzzle.split('');
        // array of SudokuCell objects forming a grid
        let state = [];
        for (let [i, v] of split.entries()) {
            // create a cell with value v, calculate x and y coordinates on canvas
            let cell = new SudokuCell(v !== '.' ? +v : 0, i % 9, Math.floor(i / 9), this);
            state.push(cell)
        }
        this.state = state;
    }

    // get cell by x and y coordinates
    getCell = (x, y) => this.state.find(t => t.x === x && t.y === y);

    // show the grid on canvas
    show = _ => this.state.forEach(c => c.show());

    // check if a number is valid for the given cell 
    valid(num, cell) {
        const { x, y } = cell;
        // check row
        for (let i = 0; i < 9; i++) {
            const v = this.state[index(i, y, 9, 9)].val;
            if (v === num && i !== x) return false;
        }

        // check column
        for (let i = 0; i < 9; i++) {
            const v = this.state[index(x, i, 9, 9)].val;
            if (v === num && i !== y) return false;
        }

        // check 3x3 by grid
        let x1 = Math.floor(x / 3);
        let y1 = Math.floor(y / 3);

        for (let i = y1 * 3; i < y1 * 3 + 3; i++) {
            for (let j = x1 * 3; j < x1 * 3 + 3; j++) {
                const v = this.state[index(j, i, 9, 9)].val;
                if (v === num && (i !== y || j !== x)) return false;
            }
        }
        return true;
    }

    // solved if all cells have non-zero values
    isSolved = _ => this.state.every(c => c.val !== 0);

    async solve() {
        await timer(0);
        for (let i of range(0, 9)) {
            for (let j of range(0, 9)) {
                let cell = this.state[index(j, i, 9, 9)];
                // find the first empty cell
                if (cell.val === 0) {
                    for (let n of range(1, 10)) {
                        // find a valid number for the empty cell
                        if (this.valid(n, cell)) {
                            // set the value to n
                            cell.val = n;
                            // highlight the current cell
                            SudokuCell.highlightCell = cell;
                            cell.show();
                            // recursively solve the resulting state
                            await this.solve();
                            // reset the value of cell if there is no solution
                            if (!this.isSolved()) {
                                cell.val = 0;
                            }
                        }
                    }
                    SudokuCell.highlightCell = null;
                    return;
                }
            }
        }
    }
}