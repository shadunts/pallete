// Wrapper class for TreeNode
class BinaryTree {
    constructor(root, inverted) {
        this.root = root;
        this.inverted = !!inverted;
    }

    addValue(v) {
        this.root.addNode(new TreeNode(v), this.inverted);
    }

    traverse() {
        if (this.root) this.root.visit();
    }

    // inorder traversal of bst
    inorder() {
        let values = [];
        if (this.root) this.root.inorder(values);
        return values;
    }

    // balance the binary search tree
    balance() {
        // inorder traversal on bst returns a sorted sequence
        const values = this.inorder();
        // make the middle element the new root
        const root = new TreeNode(values[Math.floor(values.length / 2)]);
        // contruct the tree from root and return
        return this.balancedBST(values, 0, values.length - 1, root, this.inverted);
    }

    // recursive function to construct a balanced binary search tree
    // given the array of values in sorted order
    balancedBST(arr, start, end, root, inverted) {
        if (start >= end) return; // base case
        let leftMid, rightMid; // indices of left and right children in arr

        const mid = Math.floor((start + end) / 2);
        // left child is the middle element of first half of the sorted array
        leftMid = end - start === 1 ? start : Math.floor((start + mid - 1) / 2);
        // right child is the middle element of second half of the sorted array
        rightMid = end - start === 1 ? end : Math.floor((mid + 1 + end) / 2);

        // create nodes
        const left = new TreeNode(arr[leftMid]);
        const right = new TreeNode(arr[rightMid]);

        // add to the tree
        root.addNode(left, inverted);
        root.addNode(right, inverted);

        // recursively set the left and right children for next level
        this.balancedBST(arr, start, mid - 1, left, inverted);
        this.balancedBST(arr, mid + 1, end, right, inverted);

        return root;
    }

    // invert the binary tree
    invert() {
        this.root.invert();
        this.inverted = !this.inverted;
    }
}