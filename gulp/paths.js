'use strict';

// Application paths
// -----------------
// Note: All paths must be relative
const PATHS = {
	// Clean output folder and generated files
	clean: [
		'./src/**/generated',
		'./dist/'
	],

	// SCSS Map
	sassMapIn:          'src/styles/responsive-config.json',
	sassMapOut:         'src/styles/generated/',

	// SCSS
	scssIn:             'src/styles/style.scss',
	scssOut:            'dist/styles/'
};

module.exports = PATHS;
