const { server } = require('@uniwebcms/module-builder');
const dotenv = require('dotenv');

// Load env variables to the global variable process.env
dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const port = process.env.DEV_SERVER_PORT;

server(__dirname, port);
