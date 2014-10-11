#Brest-Jayschema

##About

Brest-Jayschema is Brest extension for posted json data validation, using JaySchema

##How do I use it?

###1. Install from package manager

If your project uses [package.json](https://npmjs.org/doc/json.html), simply include

    "dependencies": {
        ...
        "brest-jayschema": "*",
        ...
    }

and then in the shell, in project root folder execute:

    $ npm install

Otherwise, you can install brest globally with npm and have it available from anywhere on your machine:

    $ npm install -g brest-jayschema
    
###2 Setup
####2.1 Application file

In your application file:

```javascript

    var Brest = require('brest'),
    var BrestJaySchema = require('./brest-jayschema/');

    brest.use(BrestJaySchema);    
```

####2.2 Settings

You can setup custom folder for the schema files in brest settings file:

```javascript
{
    jayschema: {
        url: "%schema_url%"; //Schema url (see jsonSchema manuals)
        path: "%path_to_schema_files%; //Path to schema files. Default is "schema"
        schemaLoader: "%loader%"; //Custom schema loader. NOT TESTED
    }
}   
```

####2.3 API description
```javascript
{
    schema: "%schema_name%" 
}   
```

Example:

```javascript
    {
        method: "POST",
        noAuth: true,
        schema: "person",
        handler: function(req,callback){
            person.create(req.body, callback);
        }
    }
```        