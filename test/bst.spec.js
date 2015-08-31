
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
    });

    describe('traversal', function () {
        it('correctly traverses the tree in order');
        it('correctly traverses the tree pre order');
        it('correctly traverses the tree post order');
    });
});
