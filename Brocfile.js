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

app.import("bower_components/jquery-cookie/jquery.cookie.js");

// bootstrap
app.import("bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js");

// // high charts
// app.import("bower_components/highcharts-release/highcharts.src.js");
// app.import("bower_components/highcharts-release/highcharts-more.src.js");
// app.import("bower_components/highcharts-release/modules/solid-gauge.src.js");

// // numeral.js, a number formatting library
// app.import("bower_components/numeral/numeral.js");
// app.import("bower_components/numeral/languages.js");

// moment.js, a time formatting library
app.import("bower_components/moment/moment.js");

var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/bootstrap'
});

var fontawesomeFonts = pickFiles('bower_components/fontawesome/fonts', {
  srcDir: '/',
  destDir: '/assets/fontawesome'
});

// var fontcustomFonts = pickFiles('vendor/fontcustom/fonts', {
//   srcDir: '/',
//   destDir: '/assets/fontcustom'
// });

var allTrees = mergeTrees([app.toTree(), bootstrapFonts, fontawesomeFonts, fontcustomFonts]);
var finalTree = allTrees;

if (app.env === 'production') {
  var gzipTree = gzipFiles(allTrees, {
    extensions: ['html', 'js', 'css', 'xml', 'txt', 'json', 'svg'],
    keepUncompressed: true
  });

  finalTree = gzipTree;
}

module.exports = finalTree;

