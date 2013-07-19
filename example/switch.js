var switcher = require('../');
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
