let tree;

// running multiple p5 instances on same page
// need to use intance mode instead of global
window.binaryTreeSketch = s => {
    s.setup = () => {
        let renderer = s.createCanvas(400, 400);
        renderer.parent('binaryTreeCtx');

        // pass the reference to draw
        TreeNode.sketch = s;

        // create the tree
        tree = new BinaryTree(new TreeNode(20));

        // add random values to the tree
        for (let i = 0; i < 17; i++) {
            tree.addValue(Math.floor(Math.random() * 30));
        }

        // create buttons for balance and invert functionality
        setupButton('Balance', 'nes-btn balanceBtn', _ => {
            tree = new BinaryTree(tree.balance(), tree.inverted);
            s.redraw();
        });

        setupButton('Invert', 'nes-btn invertBtn', _ => {
            tree.invert();
            s.redraw();
        });
    }

    // create a button in canvas
    function setupButton(label, cls, callback) {
        let button = s.createButton(label);
        button.addClass(cls);
        button.parent('binaryTreeCtx');
        button.mousePressed(callback);
    }

    s.draw = () => {
        s.background(51);
        s.translate(s.width / 2, 32); // move to the center
        tree.traverse(); // draw the tree
        s.noLoop();
    }

    $('#addNode').on('keydown', function(e) {
        const $this = $(this);
        // add node on hiting enter
        if (e.keyCode === 13) {
            const v = +$this.val();
            tree.addValue(v);
            $this.val('');
            s.redraw();
        }
    });

    // for visualisation purposes limit the input to 3 digit numbers
    $('#addNode').on('input', function(e) {
        const $this = $(this);
        const v = $this.val();
        const maxLength = $this.attr('max').length;
        if (v.length > maxLength) {
            $this.val(v.slice(0, maxLength));
        }
    });
}