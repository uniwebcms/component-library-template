const { versionModules } = require('@uniwebcms/module-builder');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

// Increase version number for selected modules
versionModules(srcDir);
