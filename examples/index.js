const tatting = require('..');

const s = tatting();
const s2 = tatting();

// a shared instance
console.log(s === s2);
console.log(s);

s.for((i) => console.log('loop 1', i), 0, 2);
s.for((i) => console.log('loop 2', i), 0, 2);
s.each(['a', 'b', 'c'], (v, i) => console.log('each 1', v, i));

let i = 10
s.while(() => i--, () => console.log('doing it!'));

s.play();

setTimeout(() => {
  s.pause();

  setTimeout(() => {
    s.play();
  }, 2000);
}, 10000);
