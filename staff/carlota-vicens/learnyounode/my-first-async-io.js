var fs = require('fs');

var filename = process.argv[2];

var lines;

fs.readFile(filename, function callback(err, data) {
    data = data.toString();
    lines = data.split('\n').length - 1;
    console.log(lines)
})



