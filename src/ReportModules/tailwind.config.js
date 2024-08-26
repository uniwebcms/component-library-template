const path = require('path');

function makeEntryPath(libraryName, extension = '**/*.{js,jsx,ts,tsx}') {
    return path.join(path.dirname(require.resolve(libraryName)), extension);
}

module.exports = {
    content: ['../*.{js,jsx}', '../**/*.js'],
    content: ['../src/**/*.{js,jsx}', makeEntryPath('@uniwebcms/report-sdk')],
    theme: {},
    plugins: []
};
