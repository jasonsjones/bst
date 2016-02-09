/**
 * @fileOverview Implementation of a binary search tree data structure
 * @author Jason S. Jones
 * @license MIT
 */
(function () {
    'use strict';

    /**
     * Representation of a binary search tree node.  A binary search tree
     * is composed of one or more nodes.  When instantiated, the key of the
     * new node is set to value while the left and right children are set to
     * null.
     *
     * @constructor
     * @param {object|string|number} value the value to set as the key of the
     *        node
     */
    function BSTNode(value) {
        this.key = value;
        this.right = null;
        this.left = null;
    }

    /**
     * Default comparator function.  This function is used if no function
     * is provided as the one parameter to the BST constructor.
     *
     * @param {number|string} a the first item to compare
     * @param {number|string} b the second item to compare
     *
     * @returns the difference between the first item and the second. If the
     *          returned value is positive, a is greater than b; otherwise,
     *          a is less than or equal to b.
     */
    function basicCompare(a, b) {
        return a - b;
    }

    /**
     * Creates a new Binary Search Tree instance
     *
     * @constructor
     * @param {function} compareFn the function to use as the comparator to determine
     *        the relative ordering for the nodes of the binary search tree
     */
    function BST(compareFn) {
        this.root = null;
        this.cmp = compareFn || basicCompare;
    }

    /*
     * All member functions attached to the binary search tree prototype.  All
     * binary search tree instances will share these methods, meaning there will
     * NOT be copies made for each instance.  This can be a potential memory
     * savings since there can be several different binary search tree instances
     * instantiated.
     */

    /**
     * Adds a node to the binary search tree containing 'value'
     *
     * @param {object|string|number} value the value to add to the binary search tree
     */
    BST.prototype.add = function (value) {
        var newNode = new BSTNode(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            addNode(this.root, newNode, this.cmp);
        }
    };

    /**
     * Determines if the binary search tree contains value
     *
     * @param {object|string|number} value the value to determine if it is
     *        contained in the binary search tree
     * @returns {boolean} true if the value is contained in the binary search
     *          tree, false otherwise
     */
    BST.prototype.contains = function (value) {
        return containsNode(this.root, value, this.cmp);
    };

    /**
     * Determines the depth of the binary search tree from a given root.  The depth
     * is defined as the number of levels with at least one node.
     *
     * @param {object} root the root node of the tree to determine the depth
     * @returns {number} the depth of the binary search tree
     */
    BST.prototype.depth = function (root) {
        if (root === null) {
            return 0;
        }
        var leftDepth = this.depth(root.left);
        var rightDepth = this.depth(root.right);

        return (leftDepth > rightDepth) ? 1 + leftDepth : 1 + rightDepth;
    };

    /**
     * Traverses the binary search tree in order, meaning it will visit
     * each node in the tree in the order defined by the comparator fn.
     * Typically this is done from smallest to largest value.
     *
     * @param {function} cb callback function to execute on each node visited
     */
    BST.prototype.inOrderTraversal = function (cb) {
        inOrderTraverseNode(this.root, cb);
    };

    /**
     * Traverses the binary search tree pre-order, meaning a particular node is
     * visited before any of its children.
     *
     * @param {function} cb callback function to execute on each node visited
     */
    BST.prototype.preOrderTraversal = function (cb) {
        preOrderTraverseNode(this.root, cb);
    };

    /**
     * Traverses the binary search tree post-order, meaning a particlar node is
     * visited after all of its children have been visited.
     *
     * @param {function} cb callback function to execute on each node visited
     */
    BST.prototype.postOrderTraversal = function (cb) {
        postOrderTraverseNode(this.root, cb);
    };

    /**
     * Returns the minimum value contained in the binary search tree
     *
     * @returns {object|string|number} the mininmum value contained in the
     *          binary search tree
     */
    BST.prototype.min = function () {
        return minNode(this.root);
    };

    /**
     * Returns the maximum value contained in the binary search tree
     *
     * @returns {object|string|number} the maximum value contained in the
     *          binary search tree
     */
    BST.prototype.max = function () {
        return maxNode(this.root);
    };

    /**
     * Removes the node with key from the binary search tree
     *
     * @param {object|string|number} key the key of the node to remove from the
     *        binary search tree.
     *
     * @returns {boolean} true if the node was removed; false otherwise
     */
    BST.prototype.remove = function (key) {
        var removeNode = this.root;
        var parent = this.root;
        var isLeftChild = true;

        // find the node to remove
        while (this.cmp(removeNode.key, key) !== 0) {
            parent = removeNode;

            if (this.cmp(removeNode.key, key) > 0) {
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

        // case 1: leaf node
        if (removeNode.left === null && removeNode.right === null) {

            if (removeNode === this.root) {
                this.root = null;
            }

            if (isLeftChild) {
                parent.left = null;

            } else {
                parent.right = null;
            }

        // case 2: one child node
        // case 2a: left child but no right child
        } else if (removeNode.right === null) {

            if (removeNode === this.root) {
                this.root = removeNode.left;

            } else if (isLeftChild) {
                parent.left = removeNode.left;

            } else {
                parent.right = removeNode.left;
            }

        // case 2b: right child but no left child
        } else if (removeNode.left === null) {

            if (removeNode === this.root) {
                this.root = removeNode.right;

            } else if (isLeftChild) {
                parent.left = removeNode.right;

            } else {
                parent.right = removeNode.right;
            }

        // case 3: both left and right nodes
        // this is where it gets a bit harder...need to determine the replacement
        // node.
        } else {

            var replacement = getReplacementNode(removeNode);

            if (removeNode === this.root) {
                this.root = replacement;

            } else if (isLeftChild) {
                parent.left = replacement;

            } else {
                parent.right = replacement;
            }

            replacement.left = removeNode.left;
        }

        return true;
    };

    // expose the binary search tree
    module.exports = BST;

    if (module.parent === null) {
        main();
    }

    function main() {
    }

    /********** helper functions **********/

    /**
     * Recursive helper function to add a node to the binary search tree
     *
     * @param {object} node the root node to start the path to determine where
     *        add the new node
     * @param {object} newNode the new node to add
     * @param {function} cmp the comparator function to determine relative ordering
     */
    function addNode(node, newNode, cmp) {
        if (cmp(node.key, newNode.key) > 0) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                addNode(node.left, newNode, cmp);
            }

        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                addNode(node.right, newNode, cmp);
            }

        }
    }

    /**
     * Recursive helper function to determine if the binary search tree contains
     * a node with 'value' as its key
     *
     * @param {object} node the root node to start the path to determine if
     *        the binary search tree contains the value
     * @param {object|string|number} value the value to find in the binary search tree
     * @param {function} cmp the comparator function to determine relative ordering
     */
    function containsNode(node, value, cmp) {
        if (node === null) {
            return false;
        }

        if (cmp(node.key, value) > 0) {
            return containsNode(node.left, value, cmp);
        } else if (cmp(value, node.key) > 0) {
            return containsNode(node.right, value, cmp);
        } else {
            return true;
        }
    }

    /**
     * Recursive helper function to traverse the binary search tree in order.
     *
     * @param {object} node the root node to start the path to determine where
     *        to start the in order traversal
     * @param {function} cb the callback function to call passing in the key for
     *        each node in the binary search tree
     */
    function inOrderTraverseNode(node, cb) {
        if (node !== null) {
            inOrderTraverseNode(node.left, cb);
            cb(node.key);
            inOrderTraverseNode(node.right, cb);
        }
    }

    /**
     * Recursive helper function to traverse the binary search tree pre order.
     *
     * @param {object} node the root node to start the path to determine where
     *        to start the pre order traversal
     * @param {function} cb the callback function to call passing in the key for
     *        each node in the binary search tree
     */
    function preOrderTraverseNode(node, cb) {
        if (node !== null) {
            cb(node.key);
            preOrderTraverseNode(node.left, cb);
            preOrderTraverseNode(node.right, cb);
        }
    }

    /**
     * Recursive helper function to traverse the binary search tree post order.
     *
     * @param {object} node the root node to start the path to determine where
     *        to start the post order traversal
     * @param {function} cb the callback function to call passing in the key for
     *        each node in the binary search tree
     */
    function postOrderTraverseNode(node, cb) {
        if (node !== null) {
            postOrderTraverseNode(node.left, cb);
            postOrderTraverseNode(node.right, cb);
            cb(node.key);
        }
    }

    /**
     * Helper function to find the minimum value of the binary search tree
     *
     * @param {object} node the root node to start the path to determine the
     *        node with the minimum value
     * @returns {object|string|number} the minimum value contained in the tree
     */
    function minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    /**
     * Helper function to find the maximum value of the binary search tree
     *
     * @param {object} node the root node to start the path to determine the
     *        node with the maximum value
     * @returns {object|string|number} the maximum value contained in the tree
     */
    function maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    /**
     * Helper function to get the replacement node when removing a node that has
     * two children.  The replacement node is the the left most node of the right
     * child of the node to be removed
     *
     * @param {object} nodeToRemove the node that is to be removed
     * @returns {object} the node to be used to replace the node that is to be removed
     */
    function getReplacementNode(nodeToRemove) {
        var replacementParent = nodeToRemove;
        var replacementNode = nodeToRemove;

        var focusNode = nodeToRemove.right;

        while (focusNode !== null) {
            replacementParent = replacementNode;
            replacementNode = focusNode;

            focusNode = focusNode.left;
        }

        if (replacementNode !== nodeToRemove.right) {
            replacementParent.left = replacementNode.right;
            replacementNode.right = nodeToRemove.right;
        }

        return replacementNode;
    }

}());
