var
    debug = require('gulp-debug'),
    program = require('commander'),
    entorno,
    util = require('gulp-util');
const { src, dest, series, parallel } = require("gulp");


async function prodEnv() {
    return entorno= process.env.NODE_ENV = 'production';
}

exports.prodEnv = prodEnv;