const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const yaml = require('js-yaml');

// Load environment variables from .env files
dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const srcPath = path.join(__dirname, '..', 'src');

// Load a YAML file and return the parsed content
function loadYamlContent(fullPath) {
    return yaml.load(fs.readFileSync(fullPath, 'utf8'));
}

// Function to handle multiple modules
function handleModules(taskFunction) {
    const TARGET_MODULE = process.env.TARGET_MODULE || '*';

    if (TARGET_MODULE === '*') {
        try {
            const modules = fs.readdirSync(srcPath).filter((file) => {
                const modulePath = path.join(srcPath, file);
                return fs.statSync(modulePath).isDirectory();
            });

            modules.forEach((moduleName) => {
                console.log(`Processing module: ${moduleName}`);
                taskFunction(moduleName, taskFunction);
            });
        } catch (err) {
            console.error('Error reading module directories:', err);
            process.exit(1);
        }
    } else {
        taskFunction(TARGET_MODULE, taskFunction);
    }
}

// Function to determine the correct output directory based on environment
function generateExports(moduleName) {
    const modulePath = path.join(srcPath, moduleName);
    const componentsPath = path.join(modulePath, 'src', 'components');

    const components = fs.readdirSync(componentsPath).filter((file) => {
        const componentPath = path.join(componentsPath, file);
        const configPath = path.join(componentPath, 'meta', 'config.yml');

        if (fs.existsSync(configPath)) {
            const schema = loadYamlContent(configPath);
            return schema.export !== false;
        }

        return false;
    });

    const exportStatements = components
        .map((component) => `export { default as ${component} } from './components/${component}';`)
        .join('\n');
    fs.writeFileSync(path.join(modulePath, 'src', 'dynamicExports.js'), exportStatements);
    console.log('Dynamic exports generated successfully.');
}

module.exports = {
    generateExports: () => handleModules(generateExports),
};
