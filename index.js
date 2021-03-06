var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var JaySchema = require('jayschema');
/**
 * JaySchema validator instance
 * @type {JaySchema}
 */
var js;
var settings;
var VALIDATION_FAILED = 422;

var BrestJaySchema = {
    init: function(brest, callback){

        fs.realpath(path.resolve(require('path').dirname(require.main.filename),"schema"), function(err, path){
            if (err) callback(err);
            else {
                settings = _.defaults(brest.getSetting('jayschema', {}),{
                    url: "local://ref/",
                    path: path
                });
                if (settings && settings.schemaLoader) {
                    // If loader with given name already defined within JaySchema, we load it
                    if (JaySchema.loaders[settings.schemaLoader]) js = new JaySchema(JaySchema.loaders[settings.schemaLoader]);
                    // Otherwise we treat it as a require path
                    else js = new JaySchema(require(settings.schemaLoader));
                } //Finally, if nothing is set, we use our own loader
                else {
                    var loader = require('./lib/schema_loader.js');
                    loader.init(settings);
                    js = new JaySchema(loader.handler);
                }
                callback();
            }
        });

    },

    method: {
        beforeHandler: function (method, req, callback){
            var schema_name;
            if (schema_name = method.getField('schema')) {
                js.validate(req.body, settings.url + schema_name, function(error){
                    if (error) {
                        error.code = VALIDATION_FAILED;
                        callback(error);
                    }
                    else callback();
                });
            } else callback();
        }
    }
};

module.exports = BrestJaySchema;