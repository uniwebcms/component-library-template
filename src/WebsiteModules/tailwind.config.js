const path = require('path');

const generateThemeConfig = (config) => {
    const themeConfig = {};

    config.colors.forEach((color) => {
        themeConfig[color] = `rgb(var(--${color}) / <alpha-value>)`;
    });

    config.colors.forEach((color) => {
        config.shades.forEach((shade) => {
            themeConfig[`${color}-${shade}`] = `rgb(var(--${color}-${shade}) / <alpha-value>)`;
        });
    });

    return themeConfig;
};

const generateElementConfig = (elementVars) => {
    const elementConfig = {};

    elementVars.forEach((element) => {
        elementConfig[element] = `var(--${element})`;

        for (let i = 0; i <= 100; i += 10) {
            elementConfig[
                `${element}-${i}`
            ] = `color-mix(in lch, var(--${element}) ${i}%, var(--light-mix));`;
            elementConfig[
                `${element}/${i}`
            ] = `color-mix(in lch, var(--${element}) ${i}%, transparent);`;
        }
    });

    return elementConfig;
};

function makeEntryPath(libraryName, extension = '**/*.{js,jsx,ts,tsx}') {
    return path.join(path.dirname(require.resolve(libraryName)), extension);
}

module.exports = {
    content: ['../src/**/*.{js,jsx}', makeEntryPath('@uniwebcms/module-sdk')],
    plugins: [require('@tailwindcss/line-clamp'), makeEntryPath('@uniwebcms/module-sdk', 'plugin')],
    theme: {
        extend: {
            colors: {
                ...generateThemeConfig({
                    colors: ['primary', 'secondary', 'accent', 'neutral'],
                    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
                }),
                ...generateElementConfig([
                    'bg-color',
                    'text-color',
                    'heading-color',
                    'link-color',
                    'link-hover-color',
                    'icon-color',
                    'btn-color',
                    'btn-text-color',
                    'btn-hover-color',
                    'btn-hover-text-color',
                ]),
            },
            spacing: {
                '8xl': '96rem',
                '9xl': '108rem',
            },
        },
    },
};
