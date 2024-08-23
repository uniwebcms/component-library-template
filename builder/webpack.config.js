const { getConfigData } = require('@uniwebcms/module-builder');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

module.exports = (_, argv) => {
    const { config } = getConfigData(argv, __dirname);

    return config;
};
