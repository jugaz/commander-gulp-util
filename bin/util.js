#!/usr/bin/env node

var
    debug = require('gulp-debug'),
    fs = require('fs'),
    del = require('del'),
    path = require('path'),
    program  = require('commander'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
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
        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var stat = fs.statSync(element);
                if (stat.isDirectory() && element !== ouput) {
                    files.push(element)
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
        input = input.forEach(element => {
            if (fs.existsSync(element)) {
                var stat = fs.statSync(element);
                if (stat.isDirectory()) {
                    return files.push(element)
                }
                else if(stat.isDirectory()=="undefine" || stat.isDirectory()=="") {
                    return files.push("docs/")
                }
              }
        });
        return src(files, { allowEmpty: true })
            .pipe(debug({
                title: 'commader-gulp-clean:'
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
            .pipe(dest(del(files)))
            .on('end', function () {
                util.log('Done!');
            });
    })
        
        

program.parse(process.argv);
