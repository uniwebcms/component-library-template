# tutorial-starter

tutorial-starter is an npm library that helps you quickly create a tutorial website using Docusaurus.

## Getting Started

### Prerequisites

- Node.js (version 16.14 or higher)
- npm (Node Package Manager) or Yarn

### Quick Start

To create a new tutorial website, use the following command:

```bash
npx @uniwebcms/tutorial-starter@latest init [project-name]
```

This will initialize a new tutorial website project in the `project-name` directory under your project root. The <b>\`project-name\`</b> argument is optional. If you don't provide a project name, the default name "tutorial" will be used.

### Project Structure

Once initialized, the project structure will look like this:

```lua
my-tutorial-website/
    ├── README.md
    ├── babel.config.js
    ├── docs
    │   └── block.mdx
    ├── docusaurus.config.js
    ├── package.json
    ├── scripts
    │   ├── checkUpdate.js
    │   └── prebuild.js
    ├── sidebars.js
    ├── src
    │   ├── components
    │   │   └── index.js
    │   ├── css
    │   │   └── custom.css
    │   └── pages
    │       └── index.mdx
    └── static
        ├── img
        │   ├── favicon.png
        │   ├── block1.png
        │   ├── logo.svg
        │   └── logo_light.svg
        └── schemas
            └── block.json
```
- The `docs` directory contains the documentation files for your tutorial website.
- The `src` directory contains the component, css file and pages.
- The `static` directory contains the static assets files such as image and json files.
- The `docusaurus.config.js` file is the configuration file for Docusaurus.
- The `sidebar.js` file is the configuration file for website sidebar.

### Local Development

To start a local development server and preview your tutorial website, run the following commands:

```bash
cd my-tutorial-website
npm install
npm start
# OR
yarn install
yarn start
```

#### Build and serve locally for testing
```bash
cd my-tutorial-website
npm run build:dev
npm run serve:dev
# OR
yarn build:dev
yarn serve:dev
```
The built website will be available in the `build` under `my-tutorial-website` directory.

This will start the development server, and you can view the website at `http://localhost:3000`.

### Building for Production
To build the website for production, you have the following two options:

#### Build and locally and commit manually
```bash
cd my-tutorial-website
npm run build:prod
# OR
yarn build:prod
```
The built website will be available in the `dist` under the project root directory, you can them manually commit it.

#### Build using GitHub Actions workflow
```bash
cd my-tutorial-website
npm run build:gh
# OR
yarn build:gh
```
This script should be used in a workflow executed by GitHub Actions to provide the necessary environment variables. The built website will be available in the `dist` directory under the project's root. Once the build artifact is uploaded to GitHub Pages, the website can be visited via the GitHub Pages URL.

### Contributing
We welcome contributions to website-starter. Feel free to submit bug reports, feature requests, or pull requests on our [GitHub repository](https://github.com/uniwebcms).

### License
This project is licensed under the MIT License.
