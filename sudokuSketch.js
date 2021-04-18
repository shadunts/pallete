// running multiple p5 instances on same page
// need to use intance mode instead of global
let sudokuSketch = s => {
    let puzzle;
    s.setup = () => {
        let renderer = s.createCanvas(400, 400);
        renderer.parent('sudokuCtx');
        s.rectMode(s.CORNER);
        s.textAlign(s.CENTER, s.CENTER);
        SudokuCell.sketch = s;
        SudokuCell.width = s.width / 9;
        Sudoku.sketch = s;
        puzzle = new Sudoku();

        $('#sudokuSolve').on('click', function() {
            const $this = $(this);
            $this.prop('disabled', true);
            puzzle.solve();
            $this.prop('disabled', false);
        });
    }

    s.draw = _ => {
        s.frameRate(30);
        puzzle.show();
    }

    s.mouseClicked = _ => {
        const x = Math.floor(s.mouseX / SudokuCell.width);
        const y = Math.floor(s.mouseY / SudokuCell.width);
        const cell = puzzle.getCell(x, y);
        // unclicking the cell
        if (puzzle.clicked === cell) {
            puzzle.clicked = null;
            return;
        }
        puzzle.clicked = puzzle.getCell(x, y);
    }

    s.keyPressed = _ => {
        if (!puzzle.clicked) return;
        const c = puzzle.clicked;
        const digit = parseInt(s.key);

        if (['Backspace', 'Delete', '0'].includes(s.key)) {
            c.val = 0;
            c.digitColor = '#04AE00';
            puzzle.clicked = null;
        } else if (!isNaN(digit)) {
            c.val = digit;
            c.digitColor = puzzle.valid(digit, c) ? '#04AE00' : '#f00';
            puzzle.clicked = null;
        }
    }
}

let sudokuInstance = new p5(sudokuSketch);