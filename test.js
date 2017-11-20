const assert = require('assert');
const {evaluate} = require('./dist/index');

describe('evaluate()', function() {
  describe('plain string', function() {
    it('converts string', function() {
      const result = evaluate('alert');

      assert.deepStrictEqual(result, ['alert']);
    });

    it('converts string with spaces', function () {
      const result = evaluate('alert warn');

      assert.deepStrictEqual(result, ['alert', 'warn']);
    });

    it('converts undefined', function () {
      const result = evaluate(undefined);

      assert.deepStrictEqual(result, []);
    });
  });

  describe('object value', function() {
    it('converts object', function () {
      const result = evaluate({
        alert: false,
        warn: true
      });

      assert.deepStrictEqual(result, ['warn']);
    });

    it('converts null', function () {
      const result = evaluate(null);

      assert.deepStrictEqual(result, []);
    });

    it('converts object with spaces in property name', function() {
      const result = evaluate({
        'alert success': true,
        warn: false
      });

      assert.deepStrictEqual(result, ['alert', 'success']);
    });
  });

  describe('array value', function() {
    it('converts array containing strings', function() {
      const result = evaluate(['alert', 'warn']);

      assert.deepStrictEqual(result, ['alert', 'warn']);
    });

    it('converts array containing strings with spaces', function () {
      const result = evaluate(['alert', 'warn success']);

      assert.deepStrictEqual(result, ['alert', 'warn', 'success']);
    });

    it('converts array containing empty strings', function () {
      const result = evaluate(['', 'alert', '']);

      assert.deepStrictEqual(result, ['alert']);
    });
  });

  describe('mixed array', function() {
    it('converts array of string and object', function () {
      const result = evaluate(['x', {y: true, z: false}]);

      assert.deepStrictEqual(result, ['x', 'y']);
    });

    it('converts array of string and all true object', function() {
      const result = evaluate(['x', {y: true, z: true}]);

      assert.deepStrictEqual(result, ['x', 'y', 'z']);
    });

    it('converts array of string and single property object', function () {
      const result = evaluate(['x', {y: true}]);

      assert.deepStrictEqual(result, ['x', 'y']);
    });

    it('converts array of multiple strings and all true object', function () {
      const result = evaluate(['x', 'y', { z: true, a: true }]);

      assert.deepStrictEqual(result, ['x', 'y', 'z', 'a']);
    });

    it('converts array of string and empty object', function () {
      const result = evaluate(['x', {}]);

      assert.deepStrictEqual(result, ['x']);
    });
  });

  it('converts a mixed array of strings and objects', function() {
    const object = {
      alert: true,
      warn: false
    };
    const result = evaluate(['success', object]);

    assert.deepStrictEqual(result, ['success', 'alert']);
  });
});