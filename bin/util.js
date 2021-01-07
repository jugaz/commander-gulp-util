#!/usr/bin/env node

var
    $directory = require('directory-exists'),
    clean = require('del'),
    debug = require('gulp-debug'),
    extfs = require('extfs'),
    named = require('vinyl-named'),
    program = require('commander'),
    util = require('gulp-util'),
    webpack = require('webpack-stream'),
    { src, dest, series, parallel } = require("gulp");


/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program
    .version(
        'commander-gulp-util version: ' + require('../package.json').version + '\n'
    )

/* ######################## GULP CLEAN ###################### */
// example node ./bin/util.js clean 'dist/' 
program
    .command('clean <dir>')
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var directory = [];
        input = input.forEach(element => {
            var $dir = $directory.sync(element);
            var emapty = extfs.isEmptySync(element);
            if ($dir === true && $dir  !=='/home/jugaz/.nvm/versions/node/v15.4.0/bin/node' && $dir !== '/home/jugaz/Escritorio/Developer/.Github/commander-gulp-util/bin/util.js'&& emapty !==true) {
                return directory.push(element)
            }
        });
 

        if(directory.length === 0 || directory === "undefine" ) {
            return util.log("ERROR: No existe la carpeta o carpetas")
        }
        else {
            return src(directory, { allowEmpty: true })
                .pipe(debug({
                    title: 'commader-gulp-util:'
                }))
                .pipe(named())
                .pipe(webpack({
                    watch: false
                }))

                .pipe(dest(clean(directory,{force:true})))

                .on('error', function (error) {

                    util.log("Error Name:", error.name);
                    util.log("Error Code:", error.code);
                    util.log("Error Filename:", error.filename);
                    util.log("Error Line:", error.line);
                    util.log("Error Column:", error.column);
                    util.log("Error Msg", error.Msg);
                    
                })
                .on('end', function () {
                    util.log('Done!');
                });
        }
       
})
        
        
        

program.parse(process.argv);