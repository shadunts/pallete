class LinkedListNode {
    static sketch; // p5 sketch instance
    static width = 25; // width of the node to draw on canvas

    constructor(val, next) {
        this.val = val;
        this.next = next;
    }

    show() {
        const { sketch: s } = LinkedListNode;
        this.showNode(s);
        this.showArrow(s);
    }

    // draw the node rectangle on canvas
    showNode(s) {
        // drawing the empty set symbol
        if (this.val === null) {
            this.showEmpty(s);
            return;
        }
        const w = LinkedListNode.width;
        s.fill(255);
        s.strokeWeight(1);
        s.textSize(13);

        s.textAlign(s.CENTER);

        // draw two squares: one for value and one for pointer
        s.square(this.x - w / 2, this.y, w);
        s.square(this.x + w / 2, this.y, w);

        s.fill(0);
        // write the value in the corresponding square
        s.text(this.val, this.x - w / 2, this.y);
    }

    // the empty set symbol at the end of linked list
    showEmpty(s) {
        if (this.val) return;

        s.strokeWeight(2);
        s.noFill();
        s.circle(this.x - 10, this.y, 20)
        s.line(this.x - 20, this.y + 25 / 2, this.x, this.y - 25 / 2);
    }

    // draw the pointer from this node to the next one
    showArrow(s) {
        if (!this.next) return;
        const { x, y, next } = this;
        const w = LinkedListNode.width;

        s.strokeWeight(5);
        s.point(x + w / 2, y);
        s.strokeWeight(1);

        // moving to the next line
        if (next.y > y) {
            // go down from this node
            s.line(x + w / 2, y, x + w / 2, y + w);
            // go left
            s.line(x + w / 2, y + 2 * w / 2, next.x - w / 2, next.y - w);
            // go down to next node
            s.line(next.x - w / 2, next.y - w / 2 - 7.5, next.x - w / 2, next.y - w);
            // draw two lines to form an arrow pointing down
            s.line(next.x - w / 2 - 5, next.y - w / 2 - 7.5, next.x - w / 2, next.y - w / 2 - 2.5);
            s.line(next.x - w / 2, next.y - w / 2 - 2.5, next.x - w / 2 + 5, next.y - w / 2 - 7.5);
        } else {
            // go to the next node
            s.line(x + w / 2, y, next.x - w - 10, next.y);
            // draw two lines to form an arrow pointing right
            s.line(next.x - w - 3, next.y, next.x - w - 10, y - 5);
            s.line(next.x - w - 3, next.y, next.x - w - 10, y + 5);
        }
    }

    // set the x and y coordinates of node on canvas and update next ones if needed
    _calculateCoordinates(x, y) {
        const w = LinkedListNode.width;
        this.x = x;
        this.y = y;

        // if there is next node -> shift right
        if (this.next) {
            // moving to the next line
            if (this.next.x >= LinkedList.sketch.width - 2 * 50) {
                // reset x to start and increment y to go down
                this.next._calculateCoordinates(w * 2, y + 50);
            } else {
                // increment x to move right, y stays the same
                this.next._calculateCoordinates(x + (w * 2 + 50), y);
            }
        }
    }

}