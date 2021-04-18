// running multiple p5 instances on same page
// need to use intance mode instead of global
let fractalSketch = s => {
    let slider, finished;
    let branchLen = 65;

    s.setup = () => {
        let renderer = s.createCanvas(300, 300);
        renderer.parent('fractalTree');
        setupSlider();
    }

    s.draw = () => {
        s.background(COLORS['section']);

        s.stroke(COLORS['stroke']);
        // move to the bottom and centralize the start
        s.translate(s.width / 2, s.height);
        branch(branchLen);
        if (finished) {
            s.noLoop();
        }
    }

    function setupSlider() {

        label = s.createDiv('Angle: ');
        label.addClass('treeSlider');
        label.parent('fractalTree');

        slider = s.createSlider(3.87, 6.13, 5.94, 0.01);
        slider.input(_ => {
            finished = false;
            s.redraw();
        });

        slider.style('transform', 'translateY(3px)');
        slider.parent(label);
    }

    function branch(h) {
        let thickness = s.map(h, 4, branchLen, 1, 5); // longer branches are thicker
        s.strokeWeight(thickness);
        s.line(0, 0, 0, -h);
        s.translate(0, -h);
        h *= 0.75 // update length of next branches

        // draw symmetric binary tree
        if (h > 4) {
            fractalBranch(h, slider.value());
            fractalBranch(h, -slider.value());
        } else {
            finished = true;
        }
    }

    function fractalBranch(h, theta) {
        s.push(); // save the end of current branch to draw in other dirtection
        s.rotate(theta);
        branch(h);
        s.pop(); // go back
    }
}

let fractalInstance = new p5(fractalSketch);