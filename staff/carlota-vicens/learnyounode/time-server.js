var strftime = require('strftime')

var port = process.argv[2];


var net = require('net')
var server = net.createServer(function (socket) {
    var date = (strftime('%F %H:%M', new Date())) 
    socket.end(date + '\n');

})
server.listen(port);

/* 
 var net = require('net')

    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }

    function now () {
      var d = new Date()
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }

    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })

    server.listen(Number(process.argv[2]))
    */