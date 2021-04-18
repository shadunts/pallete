function startRain() {
    const COLUMN_WIDTH = 12;

    // Get the canvas node and the drawing context
    const canvas = document.getElementById('digitRainCtx');
    const ctx = canvas.getContext('2d');

    const { width: w, height: h } = canvas;

    // digits falling in columns of 20px 
    const cols = Math.floor(w / COLUMN_WIDTH) + 1;
    // y coordinates of each column
    const verticals = Array(cols).fill(0);

    ctx.fillStyle = COLORS['section'];
    ctx.fillRect(0, 0, w, h);
    ctx.font = '15pt monospace';

    function rain() {
        // every other iteration will make previous ones fade away
        ctx.fillStyle = 'rgba(25,25,25,0.1)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#0f0';

        for (const [i, y] of verticals.entries()) {
            ctx.fillText(String.randomChar(), i * COLUMN_WIDTH, y);

            // randomly move the column up if it travelled at least 150px
            if (y > 250 && Math.random() < 0.2) verticals[i] = 0;
            else verticals[i] = y + COLUMN_WIDTH; // just move down by 20px 
        }
    }

    // start rain
    setInterval(rain, 50);
}

startRain();