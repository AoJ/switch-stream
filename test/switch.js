var test = require('tape');
var switcher = require('../');
var split = require('split');
var through = require('through');

test('upper case to size', function (t) {
    t.plan(1);
    
    var count = 0;
    var prelude = through(function (line) {
        this.queue(line.toString('utf8').toUpperCase())
        if (++count === 3) sw.set(size);
    });

    var size = through(function (line) {
        this.queue((line.length - 1) + '\n');
    });

    var lines = [];
    var sw = switcher(prelude);
    sw.pipe(through(write, end));
    'one two three four five six seven'.split(' ').forEach(function (s) {
        sw.write(s + '\n');
    });
    sw.end();
    
    function write (line) { lines.push(line) }
    function end () {
        t.deepEqual(lines, [
            'ONE\n',
            'TWO\n',
            'THREE\n',
            '4\n',
            '4\n',
            '3\n',
            '5\n'
        ]);
    }
});
