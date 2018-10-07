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

  function whileLoop(condition, cb) {
    if (condition()) {
      enqueue(() => {
        cb();
        whileLoop(condition, cb);
      });
    }
  }

  function forLoop(start, end, delta, cb) {
    if (
      delta > 0
        ? (start <= end)
        : (start >= end)
    ) {
      enqueue(() => {
        cb(start);
        forLoop(start + delta, end, delta, cb);
      });
    }
  }

  function eachLoop(items, cb) {
    forLoop((i) => {
      cb(items[i], i);
    }, 0, items.length - 1);
  }

  return {
    add: enqueue,
    while: whileLoop,
    for: forLoop,
    each: eachLoop,
    flush,
    play,
    pause,
  };
}

export default function tatting() {
  return t.t || (t.t = t());
}
