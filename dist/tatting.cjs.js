'use strict';

const t = (/**/ isPlaying, timer, head, tail) => {
  var enqueue = (cb, /**/ task) => {
    task = { cb };

    if (!head) head = task;
    if (tail) tail.next = task;
    tail = task;

    if (!timer && isPlaying) {
      play();
    }
  }
  ,
  dequeue = () => {
    if (head) {
      head.cb();
      head = head.next;
    } else {
      clearInterval(timer);
    }
  }
  ,
  flush = () => {
    while (head) { dequeue(); }
  }
  ,
  play = (interval = 1000) => {
    isPlaying = true;
    timer = setInterval(dequeue, interval);
  }
  ,
  pause = () => {
    isPlaying = false;
    clearInterval(timer);
  }
  ,
  forLoop = (cb, start, end, delta = 1) => {
    if (
      delta > 0
        ? (start <= end)
        : (start >= end)
    ) {
      enqueue(() => {
        cb(start);
        forLoop(cb, start + delta, end);
      });
    }
  }
  ,
  eachLoop = (items, cb) => {
    forLoop((i) => {
      cb(items[i], i);
    }, 0, items.length - 1);
  }
  ,
  whileLoop = (condition, cb) => {
    if (condition()) {
      enqueue(() => {
        cb();
        whileLoop(condition, cb);
      });
    }
  }
  ;
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
