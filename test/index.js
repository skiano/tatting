const assert = require('assert');
const tatting = require('../dist/tatting.cjs.js');
const s = tatting();

let log = [];
let a = 5;
let b = 3;
s.while(() => a--, () => log.push('a' + a));
s.while(() => b--, () => log.push('b' + b));
s.add(() => log.push('insert'));
s.flush();

assert.deepEqual(log, [
  'a4',
       'b2',
            'insert',
  'a3',
       'b1',
  'a2',
       'b0',
  'a1',
  'a0',
]);
