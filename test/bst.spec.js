
var expect = require('chai').expect;
var BST = require('../');

describe('Binary Search Tree', function () {

    it('has a working test framework', function () {
        expect(true).to.be.true;
    });

    describe('with the default (simple) comparator', function () {
        var bst;

        beforeEach(function () {
            bst = new BST();
        });

        afterEach(function () {
            bst = null;
        });

        describe('basic setup', function () {

            it('correctly instantiates an instance', function () {
                expect(bst).to.exist;
            });

            it('sets a root node when the first item is added', function () {
                expect(bst.root).to.not.exist;
                bst.add(50);
                expect(bst.root).to.exist;
            });
        });

        describe('basic functionality', function () {

            beforeEach(function () {
                bst.add(50);
                bst.add(75);
                bst.add(25);
                bst.add(90);
                bst.add(30);
                bst.add(80);
                bst.add(15);
                bst.add(10);
                bst.add(85);
            });

            /*  bst should look like this after all the adds have been made:
             *
             *                       50 <-- root node
             *                      /  \
             *                    25    75
             *                   /  \     \
             *                 15    30    90
             *                /           /
             *              10          80
             *                            \
             *                             85
             */

            it('contains a key after it is added to the tree', function () {
                expect(bst.contains(75)).to.be.true;
                expect(bst.contains(87)).to.be.false;
            });

            it('returns the min value in the tree', function () {
                expect(bst.min()).to.equal(10);
            });

            it('returns the max value in the tree', function () {
                expect(bst.max()).to.equal(90);
            });

            it('returns false if it attempts to remove a value not in the tree', function () {
                expect(bst.contains(32)).to.be.false;
                expect(bst.remove(32)).to.be.false;
            });

            it('removes a leaf node', function () {
                expect(bst.remove(85)).to.be.true;
                expect(bst.contains(85)).to.be.false;
            });

            it('removes a node with one child', function () {
                expect(bst.remove(15)).to.be.true;
                expect(bst.contains(15)).to.be.false;
                expect(bst.root.left.left.key).to.equal(10);
            });

            it('removes a node with two children', function () {
                expect(bst.remove(25)).to.be.true;
                expect(bst.contains(25)).to.be.false;
                expect(bst.root.left.key).to.equal(30);
                expect(bst.root.left.left.key).to.equal(15);
            });

            it('removes the root node and assigns the correct replacement', function () {
                expect(bst.remove(50)).to.be.true;
                expect(bst.contains(50)).to.be.false;
                expect(bst.root.key).to.equal(75);
            });
        });

        describe('tree traversal', function () {

            var bstArray;

            beforeEach(function () {
                bst.add(50);
                bst.add(75);
                bst.add(25);
                bst.add(90);
                bst.add(80);
                bst.add(15);
                bst.add(10);
                bst.add(85);
                bst.add(30);
                bst.add(100);

                bstArray = [];
            });

            /*  bst should look like this after all the adds have been made:
             *
             *                       50 <-- root node
             *                      /  \
             *                    25    75
             *                   /  \    \
             *                 15    30   90
             *                 /         /  \
             *               10        80    100
             *                           \
             *                            85
             */

            it('correctly traverses the tree in order', function () {
                expect(bstArray).to.be.empty;

                bst.inOrderTraversal(function (key) {
                    bstArray.push(key);
                });

                //  bstArray should be [ 10, 15, 25, 30, 50, 75, 80, 85, 90, 100 ]

                expect(bstArray).to.have.length(10);
                expect(bstArray[0]).to.equal(10);
                expect(bstArray[5]).to.equal(75);
                expect(bstArray[bstArray.length - 1]).to.equal(100);
            });

            it('correctly traverses the tree pre order', function () {
                expect(bstArray).to.be.empty;

                bst.preOrderTraversal(function (key) {
                    bstArray.push(key);
                });

                // bstArray should be [ 50, 25, 15, 10, 30, 75, 90, 80, 85, 100 ]

                expect(bstArray).to.have.length(10);
                expect(bstArray[0]).to.equal(50);
                expect(bstArray[5]).to.equal(75);
                expect(bstArray[bstArray.length - 1]).to.equal(100);
            });

            it('correctly traverses the tree post order', function () {
                expect(bstArray).to.be.empty;

                bst.postOrderTraversal(function (key) {
                    bstArray.push(key);
                });

                // bstArray should be [ 10. 15, 30, 25, 85, 80, 100, 90, 75, 50 ]

                expect(bstArray).to.have.length(10);
                expect(bstArray[0]).to.equal(10);
                expect(bstArray[5]).to.equal(80);
                expect(bstArray[bstArray.length - 1]).to.equal(50);
            });
        });
    });

    describe('with a user-defined comparator for complex objects', function () {
        var bst;

        beforeEach(function () {
            bst = new BST(function (a, b) {
                return a.age - b.age;
            });
        });

        afterEach(function () {
            bst = null;
        });

        describe('basic setup', function () {
            it('correctly instantiates an instance', function () {
                expect(bst).to.exist;
            });

            it('sets a root node when the first item is added', function () {
                expect(bst.root).to.not.exist;
                bst.add({
                    name: 'Dad',
                    age: 42
                });
                expect(bst.root).to.exist;
            });
        });

        describe('basic functionality', function () {

            beforeEach(function () {
                bst.add({
                    name: 'Dad',
                    age: 42
                });
                bst.add({
                    name: 'kid',
                    age: 6
                });
                bst.add({
                    name: 'toddler',
                    age: 3
                });
                bst.add({
                    name: 'Grandpa',
                    age: 70
                });
                bst.add({
                    name: 'hipster',
                    age: 25
                });
                bst.add({
                    name: 'brother',
                    age: 35
                });
                bst.add({
                    name: 'old dude',
                    age: 85
                });
            });

            it('contains a key after it is added to the tree', function () {
                var personHere = {
                    name: 'Dad',
                    age: 42
                };

                expect(bst.contains(personHere)).to.be.true;
            });

            it('does not contain a key if it wasn\'t added to the tree', function () {
                var personNotHere = {
                    name: 'Mom',
                    age: 41
                };
                expect(bst.contains(personNotHere)).to.be.false;
            });

            it('returns the min value in the tree', function () {
                expect(bst.min()).to.have.property('age', 3);
            });

            it('returns the max value in the tree', function () {
                expect(bst.max()).to.have.property('age', 85);
            });

            it('returns false if it attempts to remove a value not in the tree', function () {
                var personNotHere = {
                    name: 'Mom',
                    age: 41
                };
                expect(bst.contains(personNotHere)).to.be.false;
                expect(bst.remove(personNotHere)).to.be.false;
            });

            it('removes a leaf node', function () {
                var leaf = {
                    name: 'old dude',
                    age: 85
                };
                expect(bst.remove(leaf)).to.be.true;
                expect(bst.contains(leaf)).to.be.false;
            });

            it('removes a node with one child', function () {
                var oneChild = {
                    name: 'Grandpa',
                    age: 70
                };
                expect(bst.remove(oneChild)).to.be.true;
                expect(bst.contains(oneChild)).to.be.false;
                expect(bst.root.right.key).to.have.property('age', 85);
            });

            it('removes a node with two children', function () {
                var twoChildren = {
                    name: 'kid',
                    age: 6
                };
                expect(bst.remove(twoChildren)).to.be.true;
                expect(bst.contains(twoChildren)).to.be.false;
                expect(bst.root.left.key).to.have.property('age', 25);
            });

            it('removes the root node and assigns the correct replacement', function () {
                var root = {
                    name: 'Dad',
                    age: 42
                };
                expect(bst.remove(root)).to.be.true;
                expect(bst.contains(root)).to.be.false;
                expect(bst.root.key).to.have.property('age', 70);
            });
        });
    });
});
