function switchStream (streams) {
    var stream = through(write, end);
    var index = 0;
    
    streams.forEach(function (s, ix) {
        s.pipe(through(write, end));
        
        function write (buf) {
            if (index === ix) stream.queue(buf);
        }
        
        function end () {
            if (index === ix) stream.queue(null);
        }
    });
    
    stream.change = function (ix) { index = ix };
    
    return stream;
    
    function write (buf) {
        streams[index].write(buf);
    }
    
    function end () {
        streams[index].end();
    }
}
