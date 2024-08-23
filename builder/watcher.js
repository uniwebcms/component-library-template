const chokidar = require('chokidar');
const { exec } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables from .env files
dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const TARGET_MODULE = process.env.TARGET_MODULE || '*';

// Get the target script from the command line argument
const targetScript = process.argv[2];

if (!targetScript) {
    console.error('Please provide a target script to run.');
    process.exit(1);
}

// Construct the path pattern to watch
const pathPattern = `../src/${TARGET_MODULE}/docs/**/*`;

// Initialize the watcher with the constructed path pattern
const watcher = chokidar.watch(pathPattern, {
    persistent: true
});

// Function to run the target script
function runScript() {
    exec(targetScript, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }
    });
}

// Event listener for when a file is added, changed, or removed
watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    runScript();
});

watcher.on('add', (path) => {
    console.log(`File ${path} has been added`);
    runScript();
});

watcher.on('unlink', (path) => {
    console.log(`File ${path} has been removed`);
    runScript();
});

console.log(`Watching for file changes and will run: ${targetScript}`);
