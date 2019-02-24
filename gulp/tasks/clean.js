'use strict';

// NPM PLUGINS
// -----------
let gulp = require('gulp');                         // Task runner
let del = require('del');                           // Deletes files

// Gulp paths
// ----------
const PATHS = require('../paths.js');

// Cleanup
gulp.task('clean', function () {
  return del(PATHS.clean);
});
