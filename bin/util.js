#!/usr/bin/env node

var
    debug = require('gulp-debug'),
    program = require('commander'),
    path = require('path'),
    entorno,
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    { src, dest, series, parallel } = require("gulp");
const  fs = require('fs');



/* ######################## OPTIONS ######################## */
var options = {};


/* ######################## VERSION ######################## */
program
    .version(
        'commander-gulp-util version: ' + require('../package.json').version + '\n'
    )

/* ######################## GULP TEMPLATES ######################## */
// example node index.js templates 'templates/**/*.pug'  --t 'build/'

program
    .command('util <dir>')
    .option("--ut [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.ut;
        console.log("input",input)
 
        input=input.map(function(index,value){
            console.log(index)
            console.log(value)
            fs.stat(index,function(err, stats) { 
                try {
                    if(stats.isDirectory() == true ){
                        console.log( stats.isDirectory())
                            return index;
                      
                    }
                } catch (error) {
                    
                }
                
               
            });  
        });
           
            
        console.log("input",input)
        console.log("ouput",ouput)
        
        return src(input, { allowEmpty: true })
            .pipe(debug({
                title: 'commader-gulp-util:'
            }))
            .on('error', function (error) {
                // tenemos un error 
                util.log("Error Name:", error.name);
                util.log("Error Code:", error.code);
                util.log("Error Filename:", error.filename);
                util.log("Error Line:", error.line);
                util.log("Error Column:", error.column);
                util.log("Error Msg", error.Msg);

            })
            .pipe( entorno ? uglify({compress:{drop_console: true}}) : util.noop() )
            .pipe(dest(ouput))
            .on('end', function () {
                util.log('Done!');
            });
        
       
    })
program.parse(process.argv);