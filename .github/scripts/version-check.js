// Reads package.json files and compares with history
// Returns list of modules needing updates
const fs = require('fs');
const path = require('path');
const semver = require('semver');

function getModulesToBuild() {
  // Read version history, default to empty if file doesn't exist
  const historyPath = path.join(process.cwd(), '.github/module-versions.json');
  const history = fs.existsSync(historyPath) 
    ? JSON.parse(fs.readFileSync(historyPath, 'utf8')) 
    : {};

  // Get modules from src directory
  const srcDir = path.join(process.cwd(), 'src');
  const modules = fs.readdirSync(srcDir)
    .filter(dir => !dir.startsWith('_')) // Skip private modules
    .filter(dir => {
      const pkgPath = path.join(srcDir, dir, 'package.json');
      if (!fs.existsSync(pkgPath)) return false;

      const pkg = JSON.parse(fs.readFileSync(pkgPath));
      const oldVersion = history[dir] || '0.0.0';

      return semver.gt(pkg.version, oldVersion);
    });

  // Output for GitHub Actions
  console.log(`modules=${modules.join(',')}`);
}

getModulesToBuild();