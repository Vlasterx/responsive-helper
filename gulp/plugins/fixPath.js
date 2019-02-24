'use strict';

/*
	This plugin is used to fix path separators for dynamically created links used
	for `gulp watch` command. 
	
	It converts links like 
	`../../some//link\with/wrong//\separators/`
	to
	`../../some/link/with/wrong/separators/`
*/


// NPM PLUGINS
// -----------
const path = require('path');

module.exports = (oldPath) => {
	const pathString = oldPath;
  const fix = /\\{1,}|\/{1,}/;

	return pathString.replace(new RegExp(fix, 'gm'), '/').replace(new RegExp(fix, 'gm'), '/')
}
