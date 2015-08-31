var assert = require('assert');
var laws = require('algebra.laws');
var All = require('../lib');

function makeAll(a)     { return new All(a); }
function makeListAll(a) { return new All([a]); }

describe('All', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListAll).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeAll).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeAll).asTest()(); });
  });

  describe('empty', function() {
    it('should create a All(true)', function() {
      var all = makeAll(false);
      var all2 = all.empty();
      assert.equal(all2.inspect(), 'All(true)');
    });
  });

  describe('concat', function() {
    it('should concat alls containing arrays', function() {
      var all = makeAll([true,true,true]);
      var all2 = makeAll([true,true,false]);
      assert.equal(all.concat(all2).inspect(), 'All(false)');
    });

    it('should find all of alls containing single values', function() {
      var all = makeAll(false);
      var all2 = makeAll(true);
      assert.equal(all.concat(all2).inspect(), 'All(false)');
    });

    it('should find all of alls that are both true', function() {
      var all = makeAll(true);
      var all2 = makeAll(true);
      assert.equal(all.concat(all2).inspect(), 'All(true)');
    });
  });

  describe('inspect', function() {
    it('should show value of false', function() {
      var all = makeAll(false);
      assert.equal(all.inspect(), 'All(false)');
    });

    it('should show value of true', function() {
      var all = makeAll(true);
      assert.equal(all.inspect(), 'All(true)');
    });

    it('should show value of allized array', function() {
      var all = makeAll([true,true,false]);
      assert.equal(all.inspect(), 'All(false)');
    });
  });

  describe('isEqual', function() {
    it('should be true when alls are equal', function() {
      var all = makeAll(false);
      var all2 = makeAll(false);
      assert.equal(all.isEqual(all2), true);
    });

    it('should be false when alls are different', function() {
      var all = makeAll(true);
      var all2 = makeAll(false);
      assert.equal(all.isEqual(all2), false);
    });

    it('should be true for equal arrays', function() {
      var all = makeAll([true,true,false]);
      var all2 = makeAll([false,false,false]);
      assert.equal(all.isEqual(all2), true);
    });

    it('should be true for equal array and value', function() {
      var all = makeAll([true,false,false]);
      var all2 = makeAll(false);
      assert.equal(all.isEqual(all2), true);
    });
  });
});
