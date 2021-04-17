class TreeNode {
    static sketch; // instance of p5 sketch
    constructor(v) {
        this.val = v;
        // properties with default values
        this.left = null;
        this.right = null;
        this.x = this.y = this.level = 0;
    }

    addNode(node, inverted) {
        node.level = this.level + 1; // move to the next level

        // if the tree is inverted
        let less = inverted ? 'right' : 'left'; // small values should go right
        let greater = inverted ? 'left' : 'right'; // bigger ones -> left

        // should add to the left
        if (node.val < this.val) {
            // no left child -> create one
            if (!this[less]) {
                this[less] = node;
                // compute the coordinates to draw the node
                this.computeCoordinates(this, less);
            } else { // has left child -> recursively go to the next level
                this[less].addNode(node, inverted);
            }
        }
        // should add to the right 
        if (node.val > this.val) {
            // no right child -> create one
            if (!this[greater]) {
                this[greater] = node;
                // compute the coordinates to draw the node
                this.computeCoordinates(this, greater);
            } else { // has right child -> recursively go to the next level
                this[greater].addNode(node, inverted);
            }
        }
    }

    // compute the x and y coordinates of node to be displayed on canvas
    // parent: the refetence to parent node
    // child: 'left' or 'right' depending on the position
    computeCoordinates(parent, child) {
        const s = TreeNode.sketch;
        if (!parent[child]) return;

        // upper level nodes should be far from each other
        // to avoid collisions in lower levels
        let dx = s.width / (Math.pow(2, parent[child].level + 1));
        if (child === 'left') {
            parent.left.x = parent.x - dx;
            parent.left.y = parent.y + 55;
        } else if (child === 'right') {
            parent.right.x = this.x + dx;
            parent.right.y = this.y + 55;
        }
    }

    // traversal of a tree from the given node
    visit(parent) {
        if (this.left !== null) {
            this.left.visit(this);
        }
        if (this.right !== null) {
            this.right.visit(this);
        }
        this.draw(parent);
    }

    // draw the node on canvas
    draw(parent) {
        const s = TreeNode.sketch;
        if (parent) {
            s.stroke(200);
            s.line(this.x, this.y, parent.x, parent.y);
        }
        s.stroke(0);
        s.fill(255);
        s.ellipse(this.x, this.y, 25, 25);
        s.noStroke();
        s.textAlign(s.CENTER);
        s.fill(0);
        s.text(this.val, this.x, this.y + 5);
    }

    // visit the node in inorder traversal
    // return array of values ordered in inorder traversal
    inorder(arr) {
        if (this.left) this.left.inorder(arr);
        arr.push(this.val);
        if (this.right) this.right.inorder(arr);
        return arr;
    }

    // invert a binary tree
    invert() {
        // swap children
        [this.left, this.right] = [this.right, this.left];

        // if has children -> compute the new coordinates and recurse
        if (this.left) {
            this.computeCoordinates(this, 'left');
            this.left.invert();
        }

        if (this.right) {
            this.computeCoordinates(this, 'right');
            this.right.invert();
        }
    }
}