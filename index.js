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

    module.exports = BST;

    if (module.parent === null) {
        main();
    }

    function main() {
        var bst = new BST();
        bst.add(18);
        bst.add(4);
        bst.add(32);
        bst.add(5);
        bst.add(1);

        bst.inOrderTraversal(function (value) {
            console.log(value);
        })

        console.log('min value: ' + bst.min());
        console.log('max value: ' + bst.max());
        console.log('contains 5: ' + bst.contains(5));
        console.log('contains 7: ' + bst.contains(7));
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
