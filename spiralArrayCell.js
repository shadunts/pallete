class SpiralArrayCell {
    static sketch; // p5js sketch instance
    static width;

    constructor(val, x, y) {
        this.val = val;
        this.x = x;
        this.y = y;
    }

    show() {
        if (this.val === 0) return;
        const { sketch: s, width: w } = SpiralArrayCell;
        let p = {
            x: this.x * w, // the x coordinate on canvas
            y: this.y * w // the y coordinate on canvas
        }

        s.stroke(1);
        s.strokeWeight(4);
        s.fill('#0f0');
        s.textSize(Math.min(w / 3, 12));
        s.text(this.val, p.x + w / 2, p.y + w / 2);
    }
}