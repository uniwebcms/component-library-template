const path = require('path');

module.exports = {
    content: [
        '../*.{js,jsx}',
        '../**/*.js',
        path.join(path.dirname(require.resolve('@uniwebcms/module-sdk')), '**/*.js')
    ],
    theme: {},
    plugins: [require('@tailwindcss/line-clamp')],
    theme: {}
};
