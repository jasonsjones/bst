[![Codeship Status for jasonsjones/bst]
(https://codeship.com/projects/41888b60-506f-0133-6e67-0a1605d1a993/status?branch=master)]
(https://codeship.com/projects/107665)
# Binary Search Tree

## Description
Javascript implementation of a
[binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree)
data structure.

A binary search tree is a rooted binary tree and by definition each node can have at most
two child nodes.  A node consists of a key, or value, and a pointer to a left child node
and a pointer a right child node. A node containing no children is called a _leaf_ node.

The main distinction between a binary search tree and a binary tree is that a binary
search tree is sorted.  This implies the characteristic that the left child of each node
will be less than its parent, while each right child will be greater than or equal to its
parent.

The major advantage of binary search trees over other data structures is that the related
sorting algorithms and search algorithms such as in order traversal can be very efficient.

This implementation of the binary search tree uses a custom comparator function to
determine the relative ordering of nodes.  This function can be provided to the
constructor when instantiating a binary search tree object.  A custom function comparator
function is necessary when storing more complex objects.  If no comparator function is
provided, the binary search tree  will utilize the default comparator function which will
only work on primitive types.  See the basic usage section for a specific example.

#### Environment:

Although this implementation is designed to be used with [Node.js](http://www.nodejs.org),
it could be used in other contexts with minor modifications.  This implementation does not
have any external dependencies that would preclude it from being used in the browser--just
include it with a `<script>` tag and it should be good to go.  _Disclaimer: I have not
tested this implementation in any other context/environment; only tested with node.js_

----

## Basic Usage

Install with npm :

```bash
# not yet published to npm...
# but when it is, run:
npm install bst--save
```

```javascript
var BST = require('bst');
var bst = new BST();
```

Work in progress; check back later...

## API
**Available methods for a binary search tree instance:**

### add(value)
  Adds a node to the binary search tree containing 'value'

### contains(value)
  Determines if the binary search tree contains 'value'

### inOrderTraversal(callback)
  Traverses the binary search tree in order, meaning it will visit
  each node in the tree in the order defined by the comparator function.
  Typically this is done from smallest to largest value.

### preOrderTraversal(callback)
  Traverses the binary search tree pre-order, meaning a particular node is
  visited before any of its children.

### postOrderTraversal(callback)
  Traverses the binary search tree post-order, meaning a particlar node is
  visited after all of its children have been visited.

### min()
  Returns the minimum value contained in the binary search tree

### max()
  Returns the maximum value contained in the binary search tree

### remove(key)
  Removes the node with key from the binary search tree

Work in progress; check back later...
