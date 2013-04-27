/* global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                jshintrc: "build/strict.jshintrc"
            },
            js: {
                src: ["js/**/*.js"]
            },
            misc: {
                src: ["Gruntfile.js"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
};
