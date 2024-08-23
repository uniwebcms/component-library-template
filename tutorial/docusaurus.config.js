const dotenv = require('dotenv');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const getConfig = require('@uniwebcms/tutorial-builder/config');

dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const themeConfig = {
    prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
    }
};

module.exports = getConfig(process.env, themeConfig);
