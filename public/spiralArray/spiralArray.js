let spiralSketch = s => {
    const wait = 20;
    let font;
    const dim = $('#dimension');
    let matrix;

    // create nxn matrix filled with 0s
    function createMatrix(n) {
        let arr = [];
        for (let i of range(0, n)) {
            let row = [];
            for (let j of range(0, n)) {
                row.push(new SpiralArrayCell(0, j, i));
            }
            arr.push(row);
        }
        return arr;
    }

    s.preload = _ => {
        font = s.loadFont('/public/assets/PressStart2P.ttf');
    }

    s.setup = _ => {
        let renderer = s.createCanvas(400, 400);
        renderer.parent('spiralArrayCtx');
        s.textFont(font)
        s.rectMode(s.CORNER);
        s.textAlign(s.CENTER, s.CENTER);
        SpiralArrayCell.sketch = s;
        matrix = createMatrix(+dim.val());
    }

    s.draw = _ => {
        s.background(0);
        let n = +dim.val();
        SpiralArrayCell.width = s.width / n;
        spiral(n);
        s.noLoop();
    }

    async function spiral(n) {
        // debugger;
        // init indices
        let startCol = startRow = 0;
        let endCol = endRow = n - 1;
        let k = 1; // current value

        while (startRow <= endRow && startCol <= endCol) {
            // fill upper row from left to right
            for (let i = startCol; i <= endCol; i++) {
                let c = matrix[startRow][i];
                c.val = k;
                c.show();
                await timer(wait);
                k++;
            }
            startRow++; // move the upper row down

            // fill end column from up to down
            for (let i = startRow; i <= endRow; i++) {
                let c = matrix[i][endCol];
                c.val = k;
                c.show();
                await timer(wait);
                k++;
            }
            endCol--; // move the column left

            // fill bottom row from right to left
            for (let i = endCol; i >= startCol; i--) {
                let c = matrix[endRow][i]
                c.val = k;
                c.show();
                await timer(wait);
                k++;
            }
            endRow--; // move the bottom row up

            // fill start column from down to up
            for (let i = startRow; i <= endRow; i++) {
                let c = matrix[n - i - 1][startCol];
                c.val = k;
                c.show();
                await timer(wait);
                k++;
            }
            startCol++; // move the column to right
        }

        // enable dimension change
        dim.prop('disabled', false);
        dim.focus();

        return matrix;
    }

    dim.on('keydown', function(e) {
        // allow only arrow input
        if (e.keyCode !== 38 && e.keyCode !== 40) {
            e.preventDefault();
            return false;
        }
    });

    dim.on('change', async function() {
        //clear matrix
        matrix = createMatrix(dim.val());
        // disable while generating matrix
        dim.prop('disabled', true);
        // draw the new matrix
        s.redraw();
    });
}

let spiralInstance = new p5(spiralSketch);