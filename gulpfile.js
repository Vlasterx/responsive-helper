'use strict';

// NPM PLUGINS
// -----------
let gulp        = require('gulp');        // Task runner
let requireDir  = require('require-dir'); // Node helper to require() directories.


// REQUIRE ALL TASKS
// -----------------
requireDir('./gulp/tasks', { recurse: true });


// Production Build
// ----------------
gulp.task('default', gulp.series(
	'clean',                          // Initial cleanup
	'createMap',                      // Convert `resolutions-*.json` to usable SCSS variables
	'scss',                           // Convert SCSS to CSS
	'done'
));
