'use strict';

// NPM PLUGINS
// -----------
let gulp        = require('gulp');        // Task runner
let chalk       = require('chalk');       // Add colors to console logs

// Done message
// ------------
gulp.task('done', function (callback) {
	let msg = (message) => {
		return `
${chalk.green('------------------------------------------------------------------------------')}

	${chalk.yellow(message)}

${chalk.green('------------------------------------------------------------------------------')}
`;
	}

	console.log(msg('Responsive styles are built!'));
	callback();
});
