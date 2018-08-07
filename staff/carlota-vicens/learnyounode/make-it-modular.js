
/*function:
dir
path file--> '.'+
node(err,data){}

*/
var fs = require('fs');
var path = require('path');


module.exports = function (dir, pathfile, callback) {
    fs.readdir(dir, (err, list) => {
        var array= [];

        if (err){
            return callback(err);
        }
        for (var i = 0; i < list.length; i++) {
            if (('.'+pathfile) === path.extname(list[i])) {
                var f = list[i];
               array.push(f);
            }
            
        }
        callback(null, array);
    })
    
}