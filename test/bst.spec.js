
var expect = require('chai').expect;
var BST = require('../');

describe('A Binary Search Tree', function () {

    var bst;

    beforeEach(function () {
        bst = new BST();
    });

    afterEach(function () {
        bst = null;
    });

    describe('basic setup', function () {

        it('has a working test framework', function () {
            expect(true).to.be.true;
        });

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
            bst.add(80);
            bst.add(15);
            bst.add(10);
            bst.add(85);
        });

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

        it('returns true if it removes a value from the tree', function () {
            expect(bst.contains(90)).to.be.true;
            expect(bst.remove(90)).to.be.true;
            expect(bst.contains(90)).to.be.false;

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
