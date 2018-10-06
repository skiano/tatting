function createScheduler() {
  let isPlaying
  let timer
  let head
  let tail

  function Task(cb) {
    this.do = cb;
  }

  function enqueue(cb) {
    const task = new Task(cb);

    if (!head) head = task;
    if (tail) tail.next = task;
    tail = task;

    if (!timer && isPlaying) {
      play();
    }
  }

  function dequeue() {
    if (head) {
      head.do();
      head = head.next;
    } else {
      clearInterval(timer);
    }
  };

  function flush() {
    while (head) { dequeue(); }
  }

  function play(interval = 1000) {
    isPlaying = true
    timer = interval > 0
      ? setInterval(dequeue, interval)
      : setImmediate(() => {
        dequeue();
        if (head) play(0);
      });
  }

  function pause() {
    isPlaying = false;
    clearInterval(timer);
  }

  function forLoop(cb, start, end, delta = 1) {
    const continues = delta > 0
      ? (start <= end)
      : (start >= end)

    if (continues) {
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
  }
}

export default function tatting() {
  return createScheduler.t || (createScheduler.t = createScheduler());
}
