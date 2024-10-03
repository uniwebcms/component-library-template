const path = require('path');

function makeEntryPath(libraryName, subpath = '**/*.{js,jsx,ts,tsx}') {
    return path.join(path.dirname(require.resolve(libraryName)), subpath);
}

module.exports = {
    content: ['../src/**/*.{js,jsx}', makeEntryPath('@uniwebcms/module-sdk')],
    plugins: [
        require('@uniwebcms/uniweb-tailwind-plugin'),
        makeEntryPath('@uniwebcms/module-sdk', 'plugin'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
    theme: {
        extend: {
            // You can add theme extensions here
            colors: {},
            spacing: {
                '8xl': '96rem',
                '9xl': '108rem',
            },
        },
    },
};
