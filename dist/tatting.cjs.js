'use strict';

const t = () => {
  let isPlaying;
  let timer;
  let head;
  let tail;

  function Task(cb) {
    this.do = cb;
  }

  const enqueue = (cb) => {
    const task = new Task(cb);

    if (!head) head = task;
    if (tail) tail.next = task;
    tail = task;

    if (!timer && isPlaying) {
      play();
    }
  };

  const dequeue = () => {
    if (head) {
      head.do();
      head = head.next;
    } else {
      clearInterval(timer);
    }
  };

  const flush = () => {
    while (head) { dequeue(); }
  };

  const play = (interval = 1000) => {
    isPlaying = true;
    timer = interval > 0
      ? setInterval(dequeue, interval)
      : setImmediate(() => {
        dequeue();
        if (head) play(0);
      });
  };

  const pause = () => {
    isPlaying = false;
    clearInterval(timer);
  };

  const forLoop = (cb, start, end, delta = 1) => {
    const continues = delta > 0
      ? (start <= end)
      : (start >= end);

    if (continues) {
      enqueue(() => {
        cb(start);
        forLoop(cb, start + delta, end);
      });
    }
  };

  const eachLoop = (items, cb) => {
    forLoop((i) => {
      cb(items[i], i);
    }, 0, items.length - 1);
  };

  const whileLoop = (condition, cb) => {
    if (condition()) {
      enqueue(() => {
        cb();
        whileLoop(condition, cb);
      });
    }
  };

  return {
    add: enqueue,
    for: forLoop,
    each: eachLoop,
    while: whileLoop,
    flush,
    play,
    pause,
  }
};

function tatting() {
  return t.t || (t.t = t());
}

module.exports = tatting;
