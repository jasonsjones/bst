(function () {
    'use strict';

    var BSTNode = function (value) {
        this.key = value;
        this.right = null;
        this.left = null;
    };

    var BST = function () {
        this.root = null;
    };

    BST.prototype.add = function (value) {
        var newNode = new BSTNode(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            addNode(this.root, newNode);
        }
    };

    BST.prototype.contains = function (value) {
        return containsNode(this.root, value);
    };

    BST.prototype.inOrderTraversal = function (cb) {
        inOrderTraverseNode(this.root, cb);
    };

    BST.prototype.preOrderTraverseNode = function (cb) {
        preOrderTraverseNode(this.root, cb);
    };

    BST.prototype.postOrderTraverseNode = function (cb) {
        postOrderTraverseNode(this.root, cb);
    };

    BST.prototype.min = function () {
        return minNode(this.root);
    };

    BST.prototype.max = function () {
        return maxNode(this.root);
    };

    BST.prototype.remove = function (key) {
        var removeNode = this.root;
        var parent = this.root;
        var isLeftChild = true;

        while (removeNode.key != key) {
            parent = removeNode;

            if (key < removeNode.key) {
                isLeftChild = true;
                removeNode = removeNode.left;
            } else {
                isLeftChild = false;
                removeNode = removeNode.right;
            }

            if (removeNode === null) {
                return false;
            }
        }

        console.log('parent: ');
        console.log(parent);
        console.log('node of interest');
        console.log(removeNode);

        // case 1: leaf node
        if (removeNode.left === null && removeNode.right === null) {
            console.log('we have a leaf node');
            if (removeNode === this.root) {
                console.log('removing root node with no children');
                this.root = null;
            }

            if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }

        // case 2: one leaf node
        // case 2a: right child but no left child
        } else if (removeNode.left === null && removeNode.right != null) {
            if (removeNode === this.root) {
                console.log('removing root node with a right child');
                this.root = removeNode.right;
            } else {
                parent.right = removeNode.right;
            }

        // case 2b: left child but no right child
        } else if (removeNode.left != null && removeNode.right === null) {
            if (removeNode === this.root) {
                console.log('removing root node with a left child and no right');
                this.root = removeNode.left;
            } else {
                parent.left = removeNode.left;
            }

        // case 3: both left and right nodes
        } else {

        }

        console.log(this.root);
        return true;
    };

    module.exports = BST;

    if (module.parent === null) {
        main();
    }

    function main() {
        var bst = new BST();
        bst.add(18);
        bst.add(32);
        bst.add(40);

        console.log('remove: ' + bst.remove(32));
    }

    /********** helper functions **********/
    function addNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                addNode(node.left, newNode);
            }

        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                addNode(node.right, newNode);
            }

        }
    }

    function containsNode(node, value) {
        if (node === null) {
            return false;
        }

        if (value < node.key) {
            return containsNode(node.left, value);
        } else if (value > node.key) {
            return containsNode(node.right, value);
        } else {
            return true;
        }
    }

    function inOrderTraverseNode(node, cb) {
        if (node !== null) {
            inOrderTraverseNode(node.left, cb);
            cb(node.key);
            inOrderTraverseNode(node.right, cb);
        }
    }

    function preOrderTraverseNode(node, cb) {
        if (node !== null) {
            cb(node.key);
            preOrderTraverseNode(node.left, cb);
            preOrderTraverseNode(node.right, cb);
        }
    }

    function postOrderTraverseNode(node, cb) {
        if (node !== null) {
            postOrderTraverseNode(node.left, cb);
            postOrderTraverseNode(node.right, cb);
            cb(node.key);
        }
    }

    function minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    function maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

}());
