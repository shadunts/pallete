class SudokuCell {
    static DEFAULT_COLOR = '#000';
    static SOLVE_COLOR = '#009e12';
    static CLICK_COLOR = '#62de5b';
    static HOVER_COLOR = '#158e43';
    static highlightCell = null;
    static sketch; // p5js sketch instance
    static width; // cell width

    constructor(val, x, y, puzzle) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.puzzle = puzzle; // reference to Sudoku object
        this.digitColor = '#0f0';
    }

    show() {
        const { sketch: s, width: w } = SudokuCell;
        let p = {
            x: this.x * w, // the x coordinate on canvas
            y: this.y * w // the y coordinate on canvas
        }

        s.stroke('#0f0');
        s.strokeWeight(1);
        s.textSize(13);
        s.textAlign(s.CENTER, s.CENTER);
        s.fill(this.color());
        s.square(p.x, p.y, w);

        // highlight every third column
        if (this.x % 3 === 0) {
            s.stroke('#0f0');
            s.strokeWeight(5);
            s.line(p.x, p.y, p.x, p.y + w);
        }

        // highlight every third row
        if (this.y % 3 === 0) {
            s.stroke('#0f0');
            s.strokeWeight(5);
            s.line(p.x, p.y, p.x + w, p.y);
        }

        if (this.val) {
            s.stroke(1);
            s.fill(this.digitColor);
            s.textSize(20)
            s.text(this.val, p.x + w / 2, p.y + w / 2);
        }
    }

    // determine which color given cel should be filled with
    color() {
        const { sketch: s, width: w } = SudokuCell;
        const { x, y } = this;
        const h = SudokuCell.highlightCell;
        // check if this cell is hovered
        const hover = Math.floor(s.mouseX / w) === x && Math.floor(s.mouseY / w) === y;

        // check if the cell is clicked
        const clicked = this.puzzle.clicked;
        const isClicked = clicked === this;

        // check if current cell is in solving state
        const solving = h && h.x == x && h.y == y;

        if (isClicked) return SudokuCell.CLICK_COLOR;
        if (hover && !clicked) return SudokuCell.HOVER_COLOR;
        if (solving) return SudokuCell.SOLVE_COLOR;
        return SudokuCell.DEFAULT_COLOR;
    }
}