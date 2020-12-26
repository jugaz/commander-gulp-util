#!/usr/bin/env node

var
    debug = require('gulp-debug'),
    fs = require('fs'),
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
// example node util.js util 'svg/' --ut 'build/'

program
    .command('util <dir>')
    .option("--ut [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.ut;
        var files = []
        function error(){
            util.log("No existe la carpeta o carpetas")
        }
        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var stat = fs.statSync(element);
                if (stat.isDirectory() && element !== ouput) {
                    files.push(element)
                }
                else if(stat.isDirectory()=="undefine" || stat.isDirectory()=="" || stat.isDirectory() !=element ) {
                    return error()
                }
              }
        });
        
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
    })

/* ######################## GULP CLEAN ###################### */
// example node util.js clean 'svg/'  
program
    .command('clean <dir>')
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var files = []
        function error(){
            util.log("No existe la carpeta o carpetas")
        }

        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var stat = fs.statSync(element);
                
                if (stat.isDirectory()) {
                    return files.push(element)
                }
        
                else if(stat.isDirectory()=="undefine" || stat.isDirectory()=="" || stat.isDirectory() !=element ) {
                    return error()
                }
                
              }
        });
        return src(files, { allowEmpty: true })
            .pipe(debug({
                title: 'commader-gulp-util:'
            }))
            .pipe(named())
            .pipe(webpack({
                watch: false
            }))
  
            .pipe(dest(clean(files,{force:true})))

            .on('error', function (error) {
                // tenemos un error 
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
        })
        
        
        

program.parse(process.argv);
