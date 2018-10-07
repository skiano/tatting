const tatting = require('..');

const s = tatting();
const s2 = tatting();

// a shared instance
console.log(s === s2);

s.for((i) => console.log('loop 1', i), 0, 2);
s.for((i) => console.log('loop 2', i), 0, 2);
s.each(['a', 'b', 'c'], (v, i) => console.log('each 1', v, i));

let i = 10
s.while(() => i--, () => console.log(`while i ${i}!`));

let a = 7
s.while(() => a--, () => console.log(`while a ${i}!`));

s.play(1000);

setTimeout(() => {
  s.add(() => {
    console.log('after pause!');
  });

  s.pause();

  setTimeout(() => {
    s.play(1000);
  }, 2000);
}, 10000);
