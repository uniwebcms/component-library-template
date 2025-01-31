// Updates module-versions.json with current versions
const fs = require('fs');
const path = require('path');

function updateVersionHistory() {
 const historyPath = path.join(process.cwd(), '.github/module-versions.json');
 const history = fs.existsSync(historyPath) 
   ? JSON.parse(fs.readFileSync(historyPath, 'utf8')) 
   : {};

 // Get list of modules that were built from env var
 const builtModules = process.env.TARGET_MODULE.split(',');

 // Update versions for built modules
 builtModules.forEach(moduleName => {
   const pkgPath = path.join(process.cwd(), 'src', moduleName, 'package.json');
   if (fs.existsSync(pkgPath)) {
     const pkg = JSON.parse(fs.readFileSync(pkgPath));
     history[moduleName] = pkg.version;
   }
 });

 fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

updateVersionHistory();