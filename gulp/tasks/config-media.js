'use strict';

// NPM PLUGINS
// -----------
let gulp            = require('gulp');                          // Task runner
let replace         = require('gulp-replace');                  // Replaces strings in files
let rename          = require('gulp-rename');                   // Renames output file
let insert          = require('gulp-insert');                   // Inserts text in files
let plumberNotifier = require('gulp-plumber-notifier');         // Reports compile errors through OS messages

// Gulp paths
// ----------
const PATHS = require('../paths.js');

/*
	MEDIA CONFIGURATION FILE
	This task will convert JSON to SASS map file
	so that we can share variables between SCSS/CSS and JS
*/
gulp.task('createMap', function () {
	return gulp.src(PATHS.sassMapIn)
	.pipe(plumberNotifier())
	.pipe(replace(/\{/g, '('))
	.pipe(replace(/\}/g, ')'))
	.pipe(replace(/\[/g, '('))
	.pipe(replace(/\]/g, ')'))
	.pipe(replace(/"/g, ''))
	.pipe(insert.prepend(`// This is auto-generated file from 'responsive-config.json' Do not change it directly!
$config : `))
	.pipe(insert.append(`;
$resolutions: map-get($config, resolutions) !global;`))
	.pipe(rename({
		prefix: '_',
		basename: 'responsive-config',
		extname: '.scss'
	}))
	.pipe(gulp.dest(PATHS.sassMapOut))
});
