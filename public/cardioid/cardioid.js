// running multiple p5 instances on same page
// need to use intance mode instead of global
let cardioidSketch = s => {
    const pointsCount = 250;
    let factor = 2;
    let w, h, r, checkbox;

    s.setup = () => {
        let renderer = s.createCanvas(400, 400);
        renderer.parent('cardioidCtx');
        setupCheckbox();

        w = s.width;
        h = s.height;
        r = w / 2 - 10;
    }

    function setupCheckbox() {
        checkbox = s.createCheckbox('Increase factor', false);
        checkbox.parent('cardioidDescription');
    }

    function getVector(index, pointsCount) {
        // transform the index point to radians
        const angle = s.map(index % pointsCount, 0, pointsCount, 0, 2 * Math.PI);
        // create a unit vector
        const v = p5.Vector.fromAngle(angle + Math.PI);
        // turn into radius
        v.mult(r);
        return v;
    }

    s.draw = () => {
        factor += 0.015 * checkbox.checked(); // increase factor if checkbox is checked

        s.background(51);

        s.translate(w / 2, h / 2); // move to the center
        s.strokeWeight(2);
        s.stroke(255, 150);
        s.noFill();
        s.circle(0, 0, r * 2);

        for (let i = 0; i < pointsCount; i++) {
            const a = getVector(i, pointsCount);
            const b = getVector(i * factor, pointsCount);
            // draw a line connecting every point x to (x * factor)
            s.line(a.x, a.y, b.x, b.y);
        }
    }
}

let cardioidInstance = new p5(cardioidSketch);