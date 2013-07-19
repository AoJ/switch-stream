# switch-stream

swap out a stream in-place

# example

For the first three lines, this stream uppercases its input with the `prelude`
transform, then it switches to the `size` transform, which prints the length of
each line.

``` js
var switcher = require('switch-stream');
var split = require('split');
var through = require('through');

var lines = 0;
var prelude = through(function (line) {
    this.queue(line.toString('utf8').toUpperCase() + '\n')
    if (++lines === 3) sw.set(size);
});

var size = through(function (line) {
    this.queue(line.length + '\n');
});

var sw = switcher(prelude);
process.stdin.pipe(split()).pipe(sw).pipe(process.stdout);
```

output:

```
$ echo -e 'one\ntwo\nthree\nfour\nfive\nsix\nseven' | node example/switch.js 
ONE
TWO
THREE
4
4
3
5
0
```

# methods

``` js
var switcher = require('switch-stream')
```

## var sw = switcher(initial)

Create a new switch stream `sw` with an optional `initial` stream to start with.
Input written to `sw` will be passed to the currently active stream and output
from `initial` will be output on `sw`.

## sw.set(stream)

Set a new stream for `sw` to pass data to and from.

# install

With [npm](https://npmjs.org) do:

```
npm install switch-stream
```

# license

MIT
