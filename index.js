var through = require('through');

module.exports = function (current) {
    var stream = through(write, end);
    var streams = [];
    
    stream.set = function (s) {
        stream.current = s;
        if (streams.indexOf(s) >= 0) return;
        
        streams.push(s);
        s.pipe(through(write, end));
         
        function write (buf) {
            if (stream.current === s) stream.queue(buf);
        }
        
        function end () {
            if (stream.current === s) stream.queue(null);
        }
    };
    
    if (current) stream.set(current);
    
    return stream;
    
    function write (buf) {
        if (stream.current) stream.current.write(buf);
    }
    
    function end () {
        if (stream.current) stream.current.end();
    }
}
