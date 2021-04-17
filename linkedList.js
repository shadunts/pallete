class LinkedList {
    static sketch;

    constructor() {
        // at first there is only the tail node
        this.head = new LinkedListNode(null);
    }

    add(val) {
        // create the node
        const newHead = new LinkedListNode(val, this.head, this.sketch);
        // move the pointer of head
        this.head = newHead;
        // recalculate coordinates
        this.head._calculateCoordinates(LinkedListNode.width * 2, LinkedList.sketch.height * 0.15);
    }

    // remove a given value from linked list
    remove(val) {
        let curr = this.head;
        // should remove the head
        if (curr.val == val) {
            this._shift(this.head); // shift all nodes in linked list starting from head
            this.head = curr.next; // remove head
        } else {
            // move the current until the given value is found
            while (curr.next && curr.next.val !== val) {
                curr = curr.next;
            }
            if (curr.val === null) return; // not found 
            this._shift(curr.next); // shift all nodes starting from the one that should be deleted
            curr.next = curr.next.next; // remove curr.next from linked list
        }
    }

    // function to shift the coordinates of nodes when removing some node from linked list
    _shift(node) {
        // a map to store the coordinates of next nodes
        let coords = new WeakMap();
        coords.set(node, [node.x, node.y])
        while (node.val) {
            // store the x and y coordinates of next node
            coords.set(node.next, [node.next.x, node.next.y]);
            // set the coordinates of next node to the coordinates of previous one
            [node.next.x, node.next.y] = coords.get(node)
                // go to the next one
            node = node.next;
        }
    }

    reverse() {
        // pointers needed to reverse the linked list
        let curr = this.head;
        let prev = new LinkedListNode(null);
        let tmp;
        // keep reference to the tail to update coordinates
        let tail = prev;
        // values needed to recalculate coordinates of each node
        const w = LinkedListNode.width;
        let x = w * 2;
        let y = LinkedList.sketch.height * 0.15;

        // loop until curr reaches tail
        while (curr.val !== null) {
            tmp = curr.next; // store the next node
            curr.next = prev; // change pointer to previous node
            prev = curr; // move the previous node to the right
            curr = tmp; // move the current node to the next node in original list
        }

        // curr reached tail of original linked list -> prev is our new head 
        this.head = prev;

        // loop through reversed list to recalculate coordinates
        while (prev.next) {
            prev.x = x;
            prev.y = y;
            x += w * 2 + 50;
            // need to move to the next row
            if (x > LinkedList.sketch.width) {
                x = w * 2;
                y += 50;
            }
            prev = prev.next;
        }
        // update the coordintes of tail by x and y of last node in original linked list
        [tail.x, tail.y] = [tmp.x, tmp.y];
    }

    // show linked list on canvas
    show() {
        let curr = this.head;
        while (curr) {
            curr.show();
            curr = curr.next;
        }
    }
}