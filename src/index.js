const t = (isPlaying, timer, head, tail) => {
  function Task(cb) {
    this.do = cb;
  }

  var enqueue = (cb) => {
    const task = new Task(cb);

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
      head.do();
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
    isPlaying = true
    setInterval(dequeue, interval);
    // timer = interval > 0
    //   ? setInterval(dequeue, interval)
    //   : setImmediate(() => {
    //     dequeue();
    //     if (head) play(0);
    //   });
  }
  ,
  pause = () => {
    isPlaying = false;
    clearInterval(timer);
  }
  ,
  forLoop = (cb, start, end, delta = 1) => {
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
}

export default function tatting() {
  return t.t || (t.t = t());
}
