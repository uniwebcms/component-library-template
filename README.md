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
- **Documentation**: Docusara-powered documentation site or script-generated documentation files
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

#### Building the Tutorial

To create a comprehensive tutorial for your components, the process involves generating a schema that contains detailed information for each component in the selected or all modules. This information is collected from the `doc` folder under each module. There are two approaches to achieve this: using the standalone sub-project `tutorial` or a post-build script.

1. **Approach 1: Using the `tutorial` Sub-Project**

   - The `tutorial` sub-project internally utilizes Docusara as the engine to generate the schema and also create the tutorial website.
   - To execute this process, run the command:
     ```bash
     yarn watch:tutorial
     ```
   - This command builds the schema and generates the tutorial website, which is hosted locally on port `3000` by default. 
   - The schema file is also hosted under port `3000` and can be accessed at the following format:
     ```
     http://localhost:3000/modules/[TARGET_MODULE]/schema.json
     ```
   - This URL is crucial as it is entered into Uniweb’s WebStyler's "Schema URL" field, allowing you to select components and view their tutorials in Docufolio.
   - **Advantages**: This approach provides a well-designed tutorial website that is visually rich and interactive, making it ideal for in-depth component documentation and tutorials.

2. **Approach 2: Using the Post-Build Script**

   - Alternatively, you can use the `yarn watch:doc` post-build script to generate the schema.
   - This script will build the schema file and place it under the following path:
     ```
     build_dev/[TARGET_MODULE]/_site/
     ```
   - Since the schema file is generated alongside the JavaScript files, no additional hosting or tunneling is required to access the schema. As a result, you don’t need to enter the Schema URL in Uniweb’s WebStyler.
   - **Advantages**: This approach is more compact and lightweight, eliminating the need for the `tutorial` sub-project entirely. It’s suitable for users who prefer a simpler setup without the overhead of a full tutorial website.

Each approach has its own benefits, allowing you to choose based on your project needs. The first approach provides a comprehensive, visually rich tutorial site, while the second is more streamlined and straightforward, ideal for quick setups and testing.

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
