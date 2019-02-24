'use strict';

// NPM PLUGINS
// -----------
let gulp = require('gulp');                             // Task runner
let sass = require('gulp-sass');                        // Converts SASS to CSS
let rename = require('gulp-rename');                    // Renames output file
let prefix = require('gulp-autoprefixer');              // Autoprefixes CSS
let gcmq = require('gulp-group-css-media-queries');     // Groups styles under fewer media queries
let cleancss = require('gulp-clean-css');               // Minifies CSS
let plumberNotifier = require('gulp-plumber-notifier'); // Reports compile errors through OS messages
let header = require('gulp-header');                    // Adds a header to file(s) in the pipeline
let timestamp = require('time-stamp');                  // Get a formatted time stamp
let chalk = require('chalk');                           // Add colors to console logs
let fixPath = require('../plugins/fixPath')             // Fix path string
let filesize = require('filesize')                      // Display file size


// Gulp paths
// ----------
const PATHS = require('../paths.js');

// Info banner
const BANNER = `/*! Styles compiled on ${timestamp('YYYY-MM-DD at HH:mm')}h */

`;

// Autoprefix browser compatibility
const COMPATIBILITY = [
	'>1%',
	'last 2 versions'
];

// Clean CSS settings
const CLEANCSS = {
	keepBreaks: true,
	keepSpecialComments: 1,
	debug: true,
	semanticMerging: true
};


// SCSS conversion
// ---------------------------------------------------------------------------
//  - Converts SCSS to CSS
//  - Adds browser prefixes to CSS
//  - Groups CSS in same media queries
//  - Optimizes and minifies CSS


// SCSS
gulp.task('scss', function () {
	return gulp.src(PATHS.scssIn)
	.pipe(plumberNotifier())
	.pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compact'
	}))
	.pipe(prefix({
		browsers: COMPATIBILITY,
		remove: false,
		grid: true
	}))
	.pipe(gcmq())
	.pipe(cleancss(CLEANCSS, function (details) {
		console.log(`
${chalk.yellow('Minified CSS')}: ${chalk.blue(fixPath(PATHS.scssIn))} -> ${chalk.blue(fixPath(PATHS.scssOut))}
Original ${chalk.red(filesize(details.stats.originalSize))} | Minified ${chalk.yellow(filesize(details.stats.minifiedSize))} | Saved ${chalk.green(filesize(details.stats.originalSize - details.stats.minifiedSize))}
`)
	}))
	.pipe(header(BANNER))
	.pipe(rename(function (path) {
		path.extname = '.min.css';
	}))
	.pipe(gulp.dest(PATHS.scssOut))
});
