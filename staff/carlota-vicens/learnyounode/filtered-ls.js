var fs = require('fs');
var path = require('path');

var file = require ('./make-it-modular.js')
var fs = require('fs');
var dir = process.argv[2];
var pathfile = process.argv[3];
file (dir, pathfile, function(err,  val){
    if (err){
        return console.log(err);
    }
    for (var i=0; i<val.length; i++){
        console.log(val[i]);
    }
    

})   


/*
var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var type = '.' + process.argv[3];
fs.readdir(dir, function callback(err, list) {

    for (var i = 0; i < list.length; i++) {
        if (type === path.extname(list[i])) {
            console.log(list[i]);
        }
    }
})
*/


/*
 var fs = require('fs')
    var path = require('path')

    module.exports = function (dir, filterStr, callback) {
      fs.readdir(dir, function (err, list) {
        if (err) {
          return callback(err)
        }

        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })

        callback(null, list)
      })
    } */