# component-library-template
Library of components for the Uniweb CMS platform.

This repository serves as a template for creating four types of remote components for Uniweb Engine, which can render elements or pages for either direct use (app type and report type) or indirect use (website and documentation). The template includes four distinct collections, each containing a basic/full example of how to create the components for different use case.

In addition to the source code for the components, this template also includes utilities for building and serving, which assist in building components and serving the distribution files for local development. Moreover, it comes with a complete setup for a GitHub Pages Action workflow for CI/CD, along with two approaches for generating component tutorials for use in Docufolio.

This template is designed to be compact by removing unnecessary or rarely used features, yet it remains comprehensive by integrating all the functionalities needed for remote components across websites, reports, documentation, and apps.

## Technologies Used

This template leverages the following technologies:

- **Package Manager**: Yarn 4.1.0
- **Framework**: React
- **Styling**: TailwindCSS and Twind
- **CI/CD**: GitHub Pages Action workflow
- **Tutorial**: Docusara-powered tutorial site
- **Utility Libraries**:
  - `@uniwebcms/module-builder` v1.5.2
  - `@uniwebcms/tutorial-builder` v1.3.15
  - `@uniwebcms/report-sdk` v1.3.0
  - `@uniwebcms/module-sdk` v1.22.1

## Quick Start

To quickly get started with this project template, follow these steps:

### 1. Create a New Repository from the Template

1. **On GitHub**: 
   - Navigate to this template repository on GitHub.
   - Click the "Use this template" button at the top right of the repository page.
   - Select "Create a new repository" and fill in the repository details (name, description, etc.).
   - Click "Create repository from template" to generate your new project.

### 2. Clone the Repository

You can clone your new repository to your local machine using one of the following methods:

- **Using Git (Command Line)**:
    ```bash
    git clone https://github.com/uniwebcms/component-library-template.git
    ```

- **Using GitHub Desktop:**:
    - Open GitHub Desktop.
    - Click on "File" > "Clone Repository".
    - In the "URL" tab, paste the URL of your newly created repository.
    - Choose the local path where you want to - store the project and click "Clone".

### 3. Install Dependencies

Navigate to the project directory to install the required dependencies. This template uses `yarn` as the package manager, and it conveniently includes the `yarn` binary executable within the project. This means that users who clone the repository do not need to have `yarn` installed globally on their system; they can use the bundled version directly.

```bash
yarn install
```

### 4. Run the Project

The "Run the Project" section is designed to help you develop and test your components during the development stage. This process is divided into two parts: building the JavaScript files and working with the tutorial.

#### Building the Target Module

To build the target module (as defined in the `.env` file) during development, two scripts are primarily used: `yarn watch` and `yarn serve -tunnel`.

1. **`yarn watch`**:
   - This script initiates the Webpack build process in development mode and monitors file changes, automatically rebuilding when changes are detected.
   - The output files are generated in the `build_dev` directory.
   - **Important Note**: The `yarn watch` script requires a `TUNNEL_URL` to be defined in the `.env` file. If this value is missing, the build will fail with an error. This value can be manually set if you’re using a different tunneling technology, but the recommended approach is to let the `yarn serve -tunnel` command create it automatically (more details below).

2. **`yarn serve -tunnel`**:
   - This script serves the files generated in the `build_dev` directory on a local development server, typically on port `3005` (as defined in the `.env` file).
   - The `-tunnel` flag creates a local tunnel using the Cloudflared library, providing a publicly accessible URL.
   - Upon successful execution, the command prints out the tunnel URL, which is crucial for development. This URL can be used in Uniweb website studio (previewer)'s dev mode to override the production remote component URL, enabling you to develop, test, and debug your components in real-time.
   - **Tip**: If you encounter a build error in `yarn watch` due to a missing `TUNNEL_URL`, run `yarn serve -tunnel` first. This command will generate a `quick-tunnel.txt` file in the `build_dev` directory, containing a dynamically generated remote URL that can be recognized by the build utilities.

By following these steps, you can efficiently develop and test your components with real-time feedback and integration into the Uniweb website studio.

#### Building the Documentation

Documentation is used in the Uniweb's docufolio system to show the list of available components the module exposes and guides of how to setup, fill data in docufolio to make the selected component perform as expect. To create the documentation for your components, the process involves generating a schema that contains detailed information for each component in the target module (as defined in the `.env` file). This information is collected from the `doc` folder under each module.

##### Using the Post-Build Script

  - The `yarn watch:doc` post-build script is the recommended method for generating the schema.
  - This script will build the schema file and place it under the following path:
    ```
    build_dev/[TARGET_MODULE]/_site/
    ```
  - Since the schema file is generated alongside the JavaScript files, no additional hosting or tunneling is required to access the schema. This means you don’t need to worry about how Uniweb accesses the schema—the process is seamless.
  - **Important**: The generated schema file will be placed under `build_dev/[TARGET_MODULE]/`. Ensure that you run the `yarn watch` script first to prepare the build environment.

#### Building the Tutorial Website (Optional)

If you want to create a comprehensive tutorial website for your components, you can generate a website that contains detailed information for each component across all modules. This step is optional but can be useful for more in-depth documentation.

**Using the `tutorial` Sub-Project**

  - The `tutorial` sub-project uses Docusara as the engine to generate the tutorial website.
  - To execute this process, run the following command:
    ```bash
    yarn watch:tutorial
    ```
  - This command will generate the tutorial website, which is hosted locally on port 3000 by default. The website offers a visually rich and interactive platform to view and explore component documentation.


### 5. Build the Project

The "Build the Project" section is focused on the actions that occur in the production environment. The recommended approach is to utilize the automated solution provided by GitHub Pages Actions. This template includes a complete workflow located under `.github/workflows` that is executed by GitHub upon detecting changes.

#### Activating the GitHub Pages Action

To activate the GitHub Pages Action, simply commit your code changes once you are confident they are ready for production. GitHub will automatically run the workflow whenever it detects changes in the repository.

The workflow consists of four main steps:

1. **Prepare**:
   - This step reads the environment variables defined in your `.env` file to set up the build environment.

2. **Build**:
   - This step compiles the JavaScript files and builds the tutorial.
   - **Tutorial Build Options**: 
     - You can choose between the Docusara approach or the post-build script approach to generate the tutorial schema. 
     - Enable your preferred approach in the workflow file and comment out the other.

3. **Deploy**:
   - This job hosts the build results (artifact files) under the main branch (often `master`).

4. **Release**:
   - This job also hosts the build results, but in the `gh-pages` branch.
   - To enable the release job and disable the deploy job, set the `RELEASE_BRANCH` value in the `.env` file.

#### Choosing Between Deploy and Release

- **Deploy Job**:
  - The deploy job hosts only the latest build under the main branch. This is typically sufficient, as Uniweb handles backup builds in the cloud and manages fallback jobs in case of errors.

- **Release Job**:
  - The release job hosts the build files in a dedicated `gh-pages` branch, which can keep older builds. This can be useful for tracking changes over time or rolling back to a previous version if necessary.

Both approaches work effectively, so the choice depends on your specific needs. If you require version tracking and potential rollbacks, the release branch may be more suitable. Otherwise, the deploy job is simpler and leverages Uniweb’s built-in backup and fallback capabilities.

### Extra Reading

This section introduces some advanced scripts available for more specific use cases, particularly for those who prefer to customize their development environment further.

#### Advanced Scripts in the `/builder/` Folder

1. **`yarn watch:local`**:
   - This script functions similarly to `yarn watch` but is specifically designed not to work with the automatic tunneling provided by `yarn serve -tunnel`.
   - The key difference is in the Webpack configuration: the public path is set to `localhost` along with the development port, rather than the tunnel URL.
   - When using `yarn watch:local`, you will need to manually run the `yarn serve` script to serve the JavaScript files. The order of execution for these two scripts does not matter.
   - These scripts are typically used in conjunction with a local Uniweb instance for faster development cycles. However, they can also be paired with alternative tunneling technologies to expose your `localhost` to a public URL, which can then be used as the dev_mode URL in a live Uniweb’s Website Studio (previewer).
   - This setup is ideal for developers who prefer using tunneling methods other than Cloudflare for their local development environment.

2. **`yarn build:manifest`**:
   - This script is used to create the manifest file for the latest build of the Target Module, as specified in the `.env` file.
   - The manifest file is crucial in production environments, as Uniweb requires this file to back up the remote JavaScript files and the schema file. For this reason, `yarn build:manifest` is included as one of the steps in the GitHub Actions workflow.
   - While it is primarily used in production, this script can also be valuable in a local development environment. Running it locally allows you to debug or inspect the content of the manifest file, helping you ensure everything is configured correctly before pushing to production.
   - **Important**: Make sure to execute this script after running a build script like `yarn watch` to ensure that the manifest reflects the most recent build.

3. **`yarn build:dev`**:
   - This script explicitly defines the build mode as development.
   - When you run this script, the build files are generated and placed under the `build_dev` directory.
   - It is particularly useful for previewing the build results in a development environment, allowing you to see how your components behave before pushing any changes to production.

4. **`yarn build:prod`**:
   - This script explicitly defines the build mode as production.
   - The build files generated by this script are placed in the `dist` directory.
   - Running `yarn build:prod` is essential when you want to preview the final production build. This allows you to verify that everything is working as expected in a production-like environment before deploying.
   - **Note**: These scripts are ideal for scenarios where you need to inspect the differences between development and production builds, helping ensure consistency and functionality across environments.

#### Advanced Scripts in the `tutorial` Subproject

1. **`yarn clear`**:
   - This script is used to clear the tutorial site's generated assets, caches, and build artifacts.
   - It’s a useful utility for cleaning up the environment, especially before a fresh build or when troubleshooting issues related to stale files.

2. **`yarn build:prod`**:
   - This script is used to build the tutorial site in production mode manually during the local development stage.
   - **Important**: Before running this script, ensure that two environment variables are pre-filled:
     - `TUTORIAL_SITE_URL`: This value is directly passed to the `url` property in the `docusaurus.config` file. [Learn more about the `url` property](https://docusaurus.io/docs/docusaurus.config.js#url).
     - `TUTORIAL_SITE_BASE_URL`: This value is directly passed to the `baseUrl` property in the `docusaurus.config` file. [Learn more about the `baseUrl` property](https://docusaurus.io/docs/docusaurus.config.js#baseUrl).
   - A common use case for this script is when hosting the tutorial site on a public website. In such cases, set these variables to reflect the public site URL.

3. **`yarn build:gh`**:
   - This script also builds the tutorial site in production mode but is specifically designed to work with the GitHub Actions workflow.
   - It knows which `url` and `baseUrl` to use based on the environment provided by GitHub Actions, making it the preferred choice for CI/CD pipelines.

