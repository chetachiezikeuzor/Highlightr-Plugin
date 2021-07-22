/*
  @license
	Rollup.js v2.53.2
	Thu, 15 Jul 2021 04:13:48 GMT - commit ea96ab0b57f52aaacc55baa84bd640b67029dcca


	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

require('fs');
require('path');
require('url');
var loadConfigFile_js = require('./shared/loadConfigFile.js');
require('./shared/rollup.js');
require('./shared/mergeOptions.js');
require('crypto');
require('events');



module.exports = loadConfigFile_js.loadAndParseConfigFile;
//# sourceMappingURL=loadConfigFile.js.map
