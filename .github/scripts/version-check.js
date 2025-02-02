// Reads package.json files and compares with history
// Returns list of modules needing updates
const fs = require('fs');
const path = require('path');

/**
 * Compares two version strings (assumed to be in 'major.minor.patch' format)
 * Returns true if versionA is greater than versionB, otherwise false.
 *
 * @param {string} versionA - The first version string.
 * @param {string} versionB - The second version string.
 * @returns {boolean} - True if versionA > versionB, else false.
 */
function isVersionGreater(versionA, versionB) {
    // Split the version strings into their components and convert to numbers
    const aParts = versionA.split('.').map(Number);
    const bParts = versionB.split('.').map(Number);

    // Compare each part in order: major, minor, patch
    for (let i = 0; i < 3; i++) {
        if (aParts[i] > bParts[i]) return true;
        if (aParts[i] < bParts[i]) return false;
    }
    // They are equal
    return false;
}

function getModulesToBuild() {
    // Read version history, default to empty if file doesn't exist
    const historyPath = path.join(process.cwd(), '.github/module-versions.json');

    // Check if this is the first deployment.
    const firstDeployment = process.env.FIRST_DEPLOYMENT === 'true';

    // If it's the first deployment, override history to be empty.
    const history =
        firstDeployment || !fs.existsSync(historyPath)
            ? {}
            : JSON.parse(fs.readFileSync(historyPath, 'utf8'));

    // Get modules from src directory
    const srcDir = path.join(process.cwd(), 'src');
    const modules = fs
        .readdirSync(srcDir)
        .filter((dir) => !dir.startsWith('_')) // Skip private modules
        .filter((dir) => {
            const pkgPath = path.join(srcDir, dir, 'package.json');
            if (!fs.existsSync(pkgPath)) return false;

            const pkg = JSON.parse(fs.readFileSync(pkgPath));
            const oldVersion = history[dir] || '0.0.0';

            return isVersionGreater(pkg.version, oldVersion);
        });

    // Output for GitHub Actions
    console.log(`modules=${modules.join(',')}`);
}

getModulesToBuild();
