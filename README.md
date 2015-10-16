[![Codeship Status][codeship-image]][codeship-url] [![npm version][npm-image]][npm-url] [![dependency status][dm-image]][dm-url]

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

## Basic Usage (for primitive objects)

Install with npm :

```bash
# not yet published to npm...
# but when it is, run:
npm install bst--save
```

```javascript
var BST = require('bst');

// binary search tree of ints using default comparator
var bst = new BST();
bst.add(7);
bst.add(4);
bst.add(10);
bst.add(3);
bst.add(5);
bst.add(11);
bst.add(9);

console.log(bst.contains(10));
// --> true

bst.inOrderTraversal(function (key) {
    console.log(key);
});
// --> 3, 4, 5, 7, 9, 10, 11

bst.min();
// --> 3

bst.max();
// --> 11

bst.remove(9);
// --> true

bst.inOrderTraversal(function (key) {
    console.log(key);
});
// --> 3, 4, 5, 7, 10, 11

bst.preOrderTraversal(function (key) {
    console.log(key);
});
// --> 7, 4, 3, 5, 10, 11
```

## Usage for more complex objects

When using this implementation to store more complex objects, a comparator
function needs to be provided to the constructor when initializing the
binary search tree.

Let's look at an example.  Assume there is a 'person' object defined as:

```javascript
function Person(opts) {
    this.name = opts.name || "no name";
    this.age = opts.age || null;
}
```

Assuming we would like to compare the person objects by age, we would define
the comparator function as:

```javascript
// comparator function for the person object
function cmp(a, b) {
    return a.age - b.age;
}
```

Given the above functions, usage of this binary search tree is very similar to
the basic usage with the exception of providing the comparator function to
the person constructor.

```javascript
var BST = require('bst');
var bst = new BST(cmp);

bst.add( new Person({name: "Alice", age: 40}) );
bst.add( new Person({name: "Bob", age: 32}) );
bst.add( new Person({name: "Charlie", age: 50}) );
bst.add( new Person({name: "Dave", age: 25}) );
bst.add( new Person({name: "Eric", age: 45}) );

bst.inOrderTraversal(function (key) {
    console.log(key);
});
// --> { name: 'Dave', age: 25 }
// --> { name: 'Bob', age: 32 }
// --> { name: 'Alice', age: 40 }
// --> { name: 'Eric', age: 45 }
// --> { name: 'Charlie', age: 50 }

console.log(bst.min());
// --> { name: 'Dave', age: 25 }

console.log(bst.max());
// --> { name: 'Charlie', age: 50 }
```

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

----
## License
MIT &copy; Jason Jones

[npm-image]:https://badge.fury.io/js/bst.svg
[npm-url]:http://npmjs.org/package/bst
[codeship-image]:https://codeship.com/projects/41888b60-506f-0133-6e67-0a1605d1a993/status?branch=master
[codeship-url]:https://codeship.com/projects/107665
[dm-image]:https://david-dm.org/jasonsjones/bst.svg
[dm-url]:https://david-dm.org/jasonsjones/bst
