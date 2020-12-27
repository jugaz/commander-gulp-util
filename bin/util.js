#!/usr/bin/env node

var
    debug = require('gulp-debug'),
    fs = require('fs'),
    path = require('path'),
    named = require('vinyl-named'),
    clean = require('del'),
    program  = require('commander'),
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

/* ######################## GULP UTIL ###################### */
// example node .bin/util.js util \"dist/\"",

program
    .command('util <dir>')
    .option("--ut [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.ut;
  
        var directory = [];
        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var dir = fs.statSync(element);
                var $true = dir.isDirectory();
                var $true2 = dir.isDirectory() === true;
                if ($true2  && $true !=='/home/jugaz/.nvm/versions/node/v15.4.0/bin/node' && $true !== '/home/jugaz/Escritorio/Developer/.Github/commander-gulp-util/bin/util.js') {
                    return directory.push(element)
                }
            }
        });
        if(directory.length === 0 || directory === "undefine") {
            return util.log("No existe la carpeta o carpetas")
        }
        else {
            return src(files, { allowEmpty: true })
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
                .pipe(dest(ouput))
                .on('end', function () {
                    util.log('Done!');
                });
        }
       
    })

/* ######################## GULP CLEAN ###################### */
// example node util.js clean 'svg/'  
program
    .command('clean <dir>')
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var directory = [];
        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var dir = fs.statSync(element);
                var $true = dir.isDirectory();
                var $true2 = dir.isDirectory() === true;
                if ($true2  && $true !=='/home/jugaz/.nvm/versions/node/v15.4.0/bin/node' && $true !== '/home/jugaz/Escritorio/Developer/.Github/commander-gulp-util/bin/util.js') {
                    return directory.push(element)
                }
            }
        });
 
     
    
     
        if(directory.length === 0 || directory === "undefine") {
            return util.log("No existe la carpeta o carpetas")
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
                    // tenemos un error 
                    if(directory ==="" ) {
                    
                    }
                    else {
                        util.log("Error Name:", error.name);
                        util.log("Error Code:", error.code);
                        util.log("Error Filename:", error.filename);
                        util.log("Error Line:", error.line);
                        util.log("Error Column:", error.column);
                        util.log("Error Msg", error.Msg);
                    }
                })
                .on('end', function () {
                    util.log('Done!');
                });
        }
       
})
        
        
        

program.parse(process.argv);