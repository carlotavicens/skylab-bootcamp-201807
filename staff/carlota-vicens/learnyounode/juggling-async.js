var http = require('http');
var bl = require('bl');

var [, , ...urls] = process.argv;

var results = urls.map(url => ({ url, string: '' }));
var cnt = 0;

urls.forEach(url => {
    http.get(url, response => {
        response.pipe(bl(function (err, data) {
            cnt++;
            for (var i = 0; i < results.length; i++) {
                if (results[i].url === url) {
                    results[i].string = data.toString();
                }
            }
            if (cnt === results.length) {
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].string);
                }
            }
    
        }))
        
    })


})

/* 
var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0

    function printResults () {
      for (var i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }

          results[index] = data.toString()
          count++

          if (count === 3) {
            printResults()
          }
        }))
      })
    }

    for (var i = 0; i < 3; i++) {
      httpGet(i)
    }
*/