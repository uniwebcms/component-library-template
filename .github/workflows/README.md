# Version-Based Module Deployment

This workflow automates deployment of federated modules based on version numbers in package.json files.

## How It Works

1. Each module in `src/` has its own package.json with a version number
2. When code is pushed to main:
   - Workflow checks each module's version against previously deployed versions
   - Only modules with increased versions are built
   - Built modules are deployed to gh-pages branch, preserving previous builds

## For Module Developers

To deploy a new version:
1. Update your module's version in package.json
2. Push to main branch

Requirements:
- Modules must be in src/ directory
- Each module needs package.json with valid version number
- Private modules (prefixed with '_') are ignored
- Version must increase for new build (follows semver)
- Modules with version 0.0.0 won't be built (use this to prevent building modules that aren't ready)

Version history is maintained in `.github/module-versions.json`

## Technical Details

- TARGET_MODULE env var passes modules to build script
- Webpack builds only specified modules
- All builds preserved in gh-pages branch
- Version checks use semver comparison