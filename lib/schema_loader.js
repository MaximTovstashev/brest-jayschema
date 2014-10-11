var fs = require('fs')
    , path = require('path');

var s;

module.exports.init = function(settings){
    s = settings;
};

module.exports.handler = function(ref,callback){
    ref = ref.substring(s.url.length);
    fs.readFile(path.join(s.path, ref+".json"),{encoding: "utf8"},function(err,data){
        if (err) {
            console.log("ERROR: ",err);
            callback(err);
            return;
        }
        try {
            var schema = JSON.parse(data);
            callback(null,schema);
        } catch(e){
            console.log("Error in schemaLoader: ",e);
            callback(e);
        }
    });
};