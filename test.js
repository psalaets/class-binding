const assert = require('assert');
const {evaluate} = require('./dist/index');

describe('evaluate()', function() {
  it('converts a string', function() {
    const result = evaluate('alert');

    assert.deepStrictEqual(result, ['alert']);
  });

  it('converts an object', function() {
    const result = evaluate({
      alert: false,
      warn: true
    });

    assert.deepStrictEqual(result, ['warn']);
  });

  it('converts an array of strings', function() {
    const result = evaluate(['alert', 'warn']);

    assert.deepStrictEqual(result, ['alert', 'warn']);
  });

  it('converts an array containing empty strings', function() {
    const result = evaluate(['alert', '', 'warn']);

    assert.deepStrictEqual(result, ['alert', 'warn']);
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