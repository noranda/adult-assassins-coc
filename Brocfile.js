/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var gzipFiles = require('broccoli-gzip');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// bootstrap
app.import("bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js");

// numeral.js, a number formatting library
app.import("bower_components/numeral/numeral.js");
app.import("bower_components/numeral/languages.js");

// Marked, library for Markdown
app.import("bower_components/marked/lib/marked.js");

// moment.js, a time formatting library
app.import("bower_components/moment/moment.js");

// spin.js
app.import("bower_components/spin.js/spin.js");
app.import("bower_components/spin.js/jquery.spin.js");

// noty, a notification widget
app.import("bower_components/noty/js/noty/packaged/jquery.noty.packaged.js");
app.import("vendor/noty_defaults.js");

var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/bootstrap'
});

var fontAwesomeFonts = pickFiles('bower_components/fontawesome/fonts', {
  srcDir: '/',
  destDir: '/assets/fontawesome'
});

var finalTree = mergeTrees([app.toTree(), bootstrapFonts, fontAwesomeFonts]);

if (app.env === 'production') {
  finalTree = gzipFiles(finalTree, {
    extensions: ['html', 'js', 'css', 'json', 'svg', 'txt', 'map'],
    keepUncompressed: true
  });
}

module.exports = finalTree;
