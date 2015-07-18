
var expect = require('chai').expect;
var BST = require('../');

describe('A Binary Search Tree', function () {

    var bst;

    beforeEach(function () {
        bst = new BST();
    });

    describe('basic setup', function () {

        it('has a working test framework', function () {
            expect(true).to.be.true;
        });

        it('correctly instantiates an instance', function () {
            expect(bst).to.exist;
        });
    });
});
