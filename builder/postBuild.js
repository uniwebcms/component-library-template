const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const dotenv = require('dotenv');
const sizeOf = require('image-size');
const { autoCompleteComponents } = require('@uniwebcms/tutorial-builder/helper');

// Load environment variables from .env files
dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

// Function to determine the correct output directory based on environment
function getOutputDirectory() {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? path.join(__dirname, '../dist') : path.join(__dirname, '../build_dev');
}

// Function to read the latest version UUID from the latest_version.txt file
function getLatestVersion(moduleDir) {
    const latestVersionFile = path.join(moduleDir, 'latest_version.txt');
    try {
        const data = fs.readFileSync(latestVersionFile, 'utf8');
        return data.split('\n')[0].trim();
    } catch (err) {
        console.error(`Error reading latest version file in ${moduleDir}:`, err);
        return null;
    }
}

// Function to process a module for either manifest or doc generation
function processModule(moduleName, taskFunction) {
    const outputDir = getOutputDirectory();
    const moduleDir = path.join(outputDir, moduleName);
    const latestVersion = getLatestVersion(moduleDir);

    if (!latestVersion) {
        console.error(`Skipping module ${moduleName} due to missing latest version.`);
        return;
    }

    taskFunction(moduleName, moduleDir, latestVersion);
}

// Function to handle multiple modules
function handleModules(taskFunction) {
    const TARGET_MODULE = process.env.TARGET_MODULE || '*';
    const outputDir = getOutputDirectory();

    if (TARGET_MODULE === '*') {
        try {
            const modules = fs.readdirSync(outputDir).filter((file) => {
                const modulePath = path.join(outputDir, file);
                return fs.statSync(modulePath).isDirectory();
            });

            modules.forEach((moduleName) => {
                console.log(`Processing module: ${moduleName}`);
                processModule(moduleName, taskFunction);
            });
        } catch (err) {
            console.error('Error reading module directories:', err);
            process.exit(1);
        }
    } else {
        processModule(TARGET_MODULE, taskFunction);
    }
}

// Function to create file mappings for a given build directory (used in manifest generation)
function createFileMappings(buildDir, moduleName, latestVersion, publicUrl) {
    const fileMappings = {};
    try {
        const files = fs.readdirSync(buildDir);
        files.forEach((file) => {
            const filePath = path.join(buildDir, file);
            if (fs.statSync(filePath).isFile()) {
                fileMappings[file] = `${publicUrl.toLowerCase()}/${moduleName}/${latestVersion}/${file}`;
            }
        });
    } catch (err) {
        console.error(`Error reading files in build directory ${buildDir}:`, err);
    }
    return fileMappings;
}

// Function to write file mappings to manifest.json
function writeManifest(buildDir, fileMappings) {
    const manifestPath = path.join(buildDir, 'manifest.json');
    try {
        fs.writeFileSync(manifestPath, JSON.stringify(fileMappings, null, 2), 'utf8');
        console.log(`Manifest written to ${manifestPath}`);
    } catch (err) {
        console.error('Error writing manifest file:', err);
    }
}

// The generateManifest function to be exported
function generateManifest(moduleName, moduleDir, latestVersion) {
    const publicUrl = process.env.PUBLIC_URL;
    if (!publicUrl) {
        console.error('PUBLIC_URL must be set in the environment variables.');
        process.exit(1);
    }

    const buildDir = path.join(moduleDir, latestVersion);
    const fileMappings = createFileMappings(buildDir, moduleName, latestVersion, publicUrl);
    writeManifest(buildDir, fileMappings);
}

// Recursively scans a directory for files with specific extensions.
function scanDirectory(dir, extensions) {
    let results = [];

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results = results.concat(scanDirectory(fullPath, extensions));
        } else if (extensions.includes(path.extname(file))) {
            results.push(fullPath);
        }
    }

    return results;
}

// Clear directory contents
function clearDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    } else {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);

            if (fs.lstatSync(filePath).isDirectory()) {
                clearDirectory(filePath);
                fs.rmdirSync(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }
}

// split the given path string into an arrays of path segments
function getPathSegments(fullPath) {
    return path
        .normalize(fullPath)
        .replace(/^\/|\/$/g, '')
        .split(path.sep);
}

// Load a YAML file and return the parsed content
function loadYamlContent(fullPath) {
    // Read YAML file and convert YAML content to JS object
    return yaml.load(fs.readFileSync(fullPath, 'utf8'));
}

// Load schema from the given directory
function loadSchema(entryDir) {
    const files = scanDirectory(entryDir, ['.yml']);

    const schema = {};

    for (const fullPath of files) {
        const yamlContent = loadYamlContent(fullPath);
        const assets = yamlContent.assets ?? {};

        const images = [];

        for (const key in assets) {
            const image = path.join(path.dirname(fullPath), key);

            if (fs.existsSync(image)) {
                const dimensions = sizeOf(image);
                images.push({ key, ...dimensions, path: path.relative(entryDir, image) });
            }
        }

        const [component] = getPathSegments(path.relative(entryDir, fullPath));

        schema[component] = { ...yamlContent, images, name: component };
    }

    return schema;
}

// Function to generate doc.json from schema.yml (used in doc generation)
function generateDoc(moduleName) {
    const srcDir = path.join(__dirname, `../src/${moduleName}/docs`);
    const outputDir = path.join(getOutputDirectory(), moduleName, '_site');

    let schema = {};

    if (!fs.existsSync(srcDir)) {
        console.log(`Doc for module ${moduleName} does not exist.`);
    } else {
        loadSchema(srcDir);
    }

    clearDirectory(outputDir);

    autoCompleteComponents(schema);

    // Copy images to the public directory
    Object.keys(schema).forEach((component) => {
        const images = schema[component].images;

        for (const image of images) {
            const imgSrcPath = path.resolve(srcDir, image.path);
            const imgTgtPath = path.join(outputDir, 'assets', image.path);
            image.path = path.relative(outputDir, imgTgtPath);

            // Ensure that the path exists (including sub directories)
            fs.mkdirSync(path.dirname(imgTgtPath), { recursive: true });

            fs.copyFileSync(imgSrcPath, imgTgtPath);
        }
    });

    // Write schema to the public directory
    fs.writeFileSync(path.join(outputDir, 'schema.json'), JSON.stringify(schema), 'utf-8');
}

// Export the functions for use in the script
module.exports = {
    generateManifest: () => handleModules(generateManifest),
    generateDoc: () => handleModules(generateDoc)
};
