#!/usr/bin/env node

var
    $directory = require('directory-exists'),
    fileExists = require('file-exists'),
    clean = require('del'),
    debug = require('gulp-debug'),
    dirTree = require("directory-tree"),
    extfs = require('extfs'),
    fs = require('fs'),
    named = require('vinyl-named'),
    path = require('path'),
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

/* ######################## GULP UTIL ###################### */
// example "copy": "node ./bin/util copy \"frontend/src/static/fonts\" \"frontend/src/static/svg\" --co \"docs/\""


program
    .command('copy <dir>')
    .option("--co [options]")
    .action((input, options) => {
        var input = options.input || options.parent.rawArgs;
        var ouput = options.ouput || options.co;
        var directory = [];
  
        input.forEach(element => {
            var $dir = $directory.sync(element);
            var emapty = extfs.isEmptySync(element);
            if($dir === true && element!==ouput && emapty !==true) {
                var tree = dirTree(element);
                var children = tree.children;
                children.forEach(index =>{
                    var result = index.path;
                    return directory.push(result)
                })
            }
            
        });
        input.filter(function(index,value){
            var $fil = fileExists.sync(index);

            if($fil ===true && index !=="/home/jugaz/.nvm/versions/node/v15.4.0/bin/node" && index!=="/home/jugaz/Escritorio/Developer/.Github/commander-gulp-util/bin/util"){
                return directory.push(index)
            }
        })

        if(directory.length === 0 || directory === "undefine" ) {
            return util.log("Error: No existe el directory o los archivos")
        }
   
        else {
            return src(directory, { allowEmpty: false })
                .pipe(debug({
                    title: 'commader-gulp-util:'
                }))

                .on('error', function (error) {

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
            return util.log("Error: No existe la carpeta o carpetas")
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