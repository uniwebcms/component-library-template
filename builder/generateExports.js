const { generateExports } = require('@uniwebcms/module-builder');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

// Generate dynamic exports for ALL modules
generateExports(srcDir);
