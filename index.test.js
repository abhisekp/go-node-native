import {describe, it} from 'node:test';
import assert from 'node:assert';
import {myHandler} from '@abhisekp/go-native';

describe('Test Output', () => {
  it('should give an output', () => {
    const actual = myHandler()
    const expected = 'MyHandler';
    assert.strictEqual(actual, expected, 'Output should be "MyHandler"');
  })
});