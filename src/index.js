const t = (/**/ isPlaying, timer, head, tail) => {
  function enqueue(cb, /**/ task) {
    task = { cb };

    if (!head) head = task;
    if (tail) tail.next = task;
    tail = task;

    if (!timer && isPlaying) {
      play();
    }
  }

  function dequeue() {
    if (head) {
      head.cb();
      head = head.next;
    } else {
      clearInterval(timer);
    }
  }

  function flush() {
    while (head) { dequeue(); }
  }

  function play(interval) {
    isPlaying = true
    timer = setInterval(dequeue, interval);
  }

  function pause() {
    isPlaying = false;
    clearInterval(timer);
  }

  function forLoop(cb, start, end, delta = 1) {
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

  function eachLoop(items, cb) {
    forLoop((i) => {
      cb(items[i], i);
    }, 0, items.length - 1);
  }

  function whileLoop(condition, cb) {
    if (condition()) {
      enqueue(() => {
        cb();
        whileLoop(condition, cb);
      });
    }
  }

  return {
    add: enqueue,
    for: forLoop,
    each: eachLoop,
    while: whileLoop,
    flush,
    play,
    pause,
  };
}

export default function tatting() {
  return t.t || (t.t = t());
}
