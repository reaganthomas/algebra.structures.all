(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    All

    All is a Monoid, making it also a Semigroup.
    All implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    All only works for booleans or arrays of booleans. Should
    all other values be used the behavior is unspecified.
  **/
  var All = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return (acc && val);
      }, true);
    } else {
      this.value = value && true;
    }
  });

  /**
    All.empty

    Returns an "empty all", otherwise known as true.
  **/
  All.prototype.empty = function() { return All(true); };

  /**
    All.concat

    Returns the result of anding the two all values.
  **/
  All.prototype.concat = function(all2) {
    return All(this.value && all2.value);
  };

  /**
    All.inspect

    Returns the string representation of an All.
  **/
  All.prototype.inspect = function() { return 'All(' + inspect(this.value) + ')'; };

  /**
    All.isEqual

    Compares two Alls for equality.
  **/
  All.prototype.isEqual = function(all2) { return deepEqual(this.value, all2.value); };

  module.exports = All;
})();
