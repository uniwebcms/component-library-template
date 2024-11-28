# Uniweb Component Libraries

Welcome to the world of Uniweb component libraries! If you're looking to create dynamic, reusable web components for your Uniweb websites, you've come to the right place. 

This starter template offers two ways to build your components: use the included GitHub action for a no-setup approach, or set up a local development environment for faster iteration. With the GitHub action approach, simply commit to the main branch and your components are automatically built and hosted. All you need is the base URL to start using your library on any website, with new versions fetched automatically. For those who prefer rapid development, the local setup provides hot reload functionality to see your changes in real-time.

[Uniweb](https://uniwebcms.com) is a powerful web CMS that helps you create dynamic websites with ease. Each website is linked to a component library, which is a webpack federated module. Don't worry if that sounds a bit technical – in simple terms, it means your components can be shared instantly across multiple websites, making your development process more efficient and consistent.

By using component libraries with Uniweb, you'll enjoy benefits like:

-   👥 **Teamwork:** Make components that can readily be used and customized by content creators.
-   🔁 **Reusability:** Share components across multiple websites to save time and effort.
-   🔧 **Maintainability:** Easily update your component library and watch the changes propagate to all connected websites.

In this guide, we'll walk you through the process of creating your own Uniweb component libraries. We'll assume you have some knowledge of modern JavaScript, React, and Tailwind CSS, but don't worry if you're not an expert – we'll provide plenty of examples and explanations along the way.

## 🚀 Setup: Start from a Template Repository

To get started, we've created this handy template repository for you. All you need to do is create a new repository based on this template.

1. Click the "Use this template" button at the top right of the repository page.
2. Select "Create a new repository" and fill in the details (name, description, etc.).
3. Click "Create repository from template" to generate your new project.

And just like that, you'll have your very own component library repository! 🎉

## ⚡ Quick start: Build and host using GitHub actions

Want to see your component library in action without any local setup? No problem! This repository includes a GitHub workflow that builds and hosts your component libraries automatically. Here's how to enable it:

1. Go to the `⚙ Settings` tab of your GitHub repository, and then go to the `Pages` tab on it.

2. Under the section **Build and deployment**, in the **Source** menu, select `GitHub Actions`. The page auto saves, so you're all set!

The build process should start right away, but it may take a minute or two to complete. You can monitor its progress from the `⏵ Actions` tab in your GitHub repository. When it's ready, you should see a successful `✅ Deploy` stage with the URL to your GitHub pages, like `https://USER-NAME.github.io/REPO-NAME/`.

To find the URL for your new component library, visit the GitHub pages URL. You should see a page titled **Available Modules**. At this point, the first and only module listed would be **StarterLibrary**. Use the copy button next to it to grab its URL. It should look something like `https://USER-NAME.github.io/REPO-NAME/StarterLibrary/`.

Now you're ready to use your shiny new library in a Uniweb website! Head over to your Uniweb instance, which might be [uniweb.app](https://uniweb.app) or another instance.

Create a new website and **skip the template selection** – we want to keep things simple and start from scratch.

Since your website doesn't have a component library or content yet, it will be a blank page. But don't worry, that's about to change! Open the action menu `(⋅⋅⋅)▾` in the website studio and select "Manage components...". Then, paste the URL of your GitHub-hosted library under the "Custom URL" tab and into the "Library URL" field and apply your changes.

Ta-da! 🎩✨ You should now see some content on your website, generated by the `Section` component in the `StarterLibrary` of your repository. Feel free to add content to your website and explore other components from your library by clicking the Edit button at the top right corner of the Website Studio.

## 🚚 Deploying New Versions

The easiest way to deploy your component library is to use the included [GitHub workflow](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), which builds your files and hosts them on GitHub Pages. In production mode, Uniweb monitors these files and copies them into an efficient CDN for optimal delivery.

Assuming you have [GitHub Actions enabled](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), every time you commit changes to the `main` branch of your repository, a new build will be generated and hosted within about a minute and a half.

**⚠ A quick note on best practices:** To avoid affecting existing websites that use your libraries, it's a good idea to create a separate development branch (like `develop`) for your regular commits. When you're ready to release a new version, simply merge your development branch into `main`.

## 💻 Local development

While committing to the main branch is great for deploying new versions, it's not the most practical approach during development and testing. Luckily, there's a much better way to develop locally and see your changes instantly!

The included server project offers a simple yet powerful solution for serving local files over the internet using a web server and a temporary Cloudflare Quick Tunnel.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) is a nifty service that securely exposes your local development server to the internet, without the need for port forwarding or firewall configuration. This makes it super easy to test and share your component library with others during development.

**⚠ Important**: Make sure to install the `Cloudflared` CLI and check that it's in your PATH. You can find the latest installation instructions here: [Cloudflare Tunnel Downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

-   **macOS**: `brew install cloudflared`
-   **Windows**: `winget install --id Cloudflare.cloudflared`
-   **Linux**: [Cloudflare Package Repository ↗](https://pkg.cloudflare.com/)

> 🗒 Psst... you can also use a permanent tunnel URL if you prefer. For instance, you can set up a [Cloudflare named tunnel](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/) or a [Pagekite tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/pagekite.md). If you go this route, just remember to set the `TUNNEL_URL` property in your `.env.dev` file to the tunnel's URL.

## 🛠️ Build Locally

This project uses [Node.js 18](https://nodejs.org/en/download/package-manager) with [Yarn 4.1](https://yarnpkg.com/) as package manager. If you already have Node.js, Yarn, and a code editor like VS Code installed, you're good to go! If not, don't sweat it – just [configure the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md) first.

If you are a VS Code user, you're in luck! There's a handy "Start Dev Environment" task configured under `.vscode/tasks.json`. You can run it using the Command Palette or the keyboard shortcut (`Ctrl+Shift+B` or `Cmd+Shift+B` on macOS).

If you need, or prefer, to start the scripts manually, no worries! Just open up 2 different terminals and run:

1. **Install packages and start web server with a tunnel**<br> `yarn && yarn serve -tunnel`
2. **Watch for code changes**<br> `yarn watch`

**Note:** The web server will serve files from the `build_dev` folder. Initially, this folder will have a single file named `quick-tunnel.txt` containing the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005. The quick tunnel URL changes every time the server starts and looks like `https://[tunnel-sub-domain].trycloudflare.com`.

The watch script will build a bundle of JavaScript files in dev mode and save them to the `build_dev/[module-name]` subfolder. The default module name is `StarterLibrary`. All source files under the `src` folder are watched for changes, and the target bundles are rebuilt as needed.

**⚠ Important**: If you add (or remove) components to your libraries, you need to stop the `yarn watch` (CTRL-C) and start it again so that it loads the latest list of available components.

The watch script output will give you the URL to connect your test website with your dev environment.

```bash
PUBLIC URL: https://[tunnel-sub-domain].com/StarterLibrary
```

> 🗒 Remember, when connecting a website with a module, the URL must include the module name in its path because there might be several modules hosted under the same domain.

## 👷 Enabling Dev Mode on a Website

Now that you have a temporary URL pointing to the current dev build of your library, you can use it on a website in Dev Mode.

1. Create a website, or open an existing one, and turn on its **Dev Mode** via the action menu `(⋅⋅⋅)▾` of the **Website** studio
2. Set the **Component Library URL** to the URL produced in the last step. Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

## 🔧 Troubleshooting Dev Mode

If you run into any issues during the build process, try these steps:

-   Make sure you installed the `Cloudflared` CLI to create Quick Tunnels.
-   Make sure you have saved your **current tunnel URL** into the Dev Mode settings of your test website.
-   Make sure that you have the correct version for Node JS and Yarn, as defined in the `.node-version` and `.yarnrc.yml` files.
-   Remove the shared cache files created by Yarn: `yarn cache clean`.
-   Check the console output for error messages and search for solutions online.
-   If the issue persists, please [open an issue](https://github.com/uniwebcms/uniweb-module-builder/issues/new) on the GitHub repository, providing as much detail as possible about the problem.

## 🚀 Deploying to production

The included GitHub workflow automates the process of building your files and hosting them on GitHub Pages, simplifying the deployment of a production build. However, if you haven't already done so, it's recommended to create a separate development branch, such as `develop`, for your regular commits. This allows you to keep your `main` branch clean and stable.

When you're ready to release a new version to production, simply merge your changes from the development branch into the `main` branch. This merge operation will automatically trigger the GitHub Actions workflow, which will build your project and host the resulting files on GitHub Pages.

By following this branching strategy, you can maintain a clear separation between your development and production environments, ensuring that only tested and approved changes are deployed to your live site.

<details>
  <summary><strong>Learn how to create and merge branches in Git</strong></summary>

```bash
# Create a new branch named "develop"
git checkout -b develop

# Make changes and commit them
git add .
git commit -m "Add new components and fix bugs"

# Push the changes to the remote "develop" branch
git push -u origin develop

# Switch back to the "main" branch
git checkout main

# Merge the changes from "develop" into "main"
git merge develop

# Push the updated "main" branch
git push
```

  </details>

## 🔗 Using your components in a website

<!-- Now that you have a production build hosted at GitHub Pages, you are ready to use your components. To do that, open a website and click the **Edit** button to open the **Content** editor. Then click the action menu `(⋅⋅⋅)▾` and select "Configure web components...". Copy the URL of your library and paste it into the "Custom Library URL" field. If you are using GitHub Pages for hosting it, its the URL would look like `https://USER-NAME.github.io/REPO-NAME/LIBRARY-NAME/`. -->

Now that you have a production build hosted at GitHub Pages, you are ready to use your components. To do that, open a website, click the action menu `(⋅⋅⋅)▾` and select "Configure web components...". Copy the URL of your library and paste it into the "Custom Library URL" field. A GitHub Pages URL normally has the form `https://USER-NAME.github.io/REPO-NAME/LIBRARY-NAME/`.

<!-- Now that you have a production build hosted at GitHub Pages, you are ready to use and share your components. To make this happen, create a **Web Styler** in your Uniweb so the system knows about your component library. Simply create a new **Web Styler** and set the URL of your library to `https://USER-NAME.github.io/REPO-NAME/LIBRARY-NAME/`.

The last step is to connect your new **Web Styler** to a website. To do that, open a website and click the **Edit** button to open the **Webpages** editor. Then click the action menu `(⋅⋅⋅)▾` and select "Main settings...". Select your **Web Styler** under the "Web Styler" input field. -->

**Note:** Uniweb will take the files from GitHub Pages and move them to a CDN. It may take a few minutes for Uniweb to detect the changes in your GitHub Pages and move the files to the CDN. Be patient and check back later if your updates are not immediately visible on your website.

## ✨ Creating a new component

You are ready to create your first web component. Before we proceed, let's review the file structure of the `src` folder.

```
src/
├── my-module/
│   ├── components/
│   │   ├── ComponentA/
│   │   │   ├── index.jsx
│   │   │   └── meta/
│   │   │       ├── config.yml
│   │   │       ├── default.png
│   │   │       ├── preset1.jpg
│   │   │       └── notes.md
│   │   ├── ComponentB/
│   │   │   └── ... (similar structure)
│   │   └── ...
│   ├── config.yml
│   ├── index.css
│   ├── index.js
│   ├── package.json
│   └── tailwind.config.js
├── _shared/
│   └── ComponentX/
│   │   └── ... (similar structure)
│   └── ...
├── package.json
└── README.md
```

This file structure shows that components are grouped into modules. Each module is an independent library of components. The libraries can share components across libraries via the folders with names that start with an underscore, such as `_shared` or `_utils`.

<!-- > 🗒 Components that are meant to be exported by a library must have their own folder with a `meta` subfolder in it. Components that are only used internally can be just a single file since they don't require any metadata. -->

### Using CLI Commands

This project includes two CLI commands to streamline your development process:

#### 1. Create a New Module

```bash
yarn new:module [options]
```

This command creates a new module with the necessary boilerplate files.

Options:

-   `--name`: Name of the new module
-   `--description`: Brief description of the module

Example:

```bash
yarn new:module --name MyAwesomeModule --description "A module for awesome components"
```

This will create a new module named "MyAwesomeModule" with the provided description.

If options are not provided, the CLI will prompt you for the necessary information.

#### 2. Create a New Component

```bash
yarn new:component [options]
```

This command creates a new component within a specified module. Also, just as with the previous command, if options are not provided, the CLI will prompt you for the necessary information.

Options:

-   `--name`: Name of the new component
-   `--module`: Name of the module to add the component to (defaults to the newest subfolder name under the `src` folder)
-   `--type`: Type of component (section, block, or element)
-   `--export`: Create an exportable component
-   `--config`: Create a component with config files and export set to false
-   `--shared`: Create a component to be shared across modules (in the `_shared` folder)
-   `--description`: Brief description of the component
-   `--parameters`: Initial parameters for the component (e.g., "align:string,items:number")

Example:

```bash
yarn new:component --name FeatureCard --module MyAwesomeModule --type block --export --description "A card component for displaying features" --parameters "title:string,description:string,iconName:string"
```

This will create a new exportable block component named "FeatureCard" in the "MyAwesomeModule" with the specified description and parameters.

### 🥇 First component: FeatureList Section

Let's implement a component that renders a feature list section. Here we will assume that the section has a title and a subtile, and a variable number of features, each with their own title and description.

1. Create a new component using the provided CLI command:

    ```bash
    yarn new:component --name FeatureList --export --parameters "align:enum"
    ```

2. Edit the code of the `index.js` file under the `src/StarterLibrary/components/FeatureList` folder:

    ```jsx
    import React from 'react';

    export default function FeatureList(props) {
        const { block } = props;
        const { title, subtitle } = block.main;
        const features = block.items;
        const { align = 'center' } = block.getBlockProperties();
        const headerClass = align === 'left' ? 'text-left' : 'text-center';

        return (
            <section>
                <header className={headerClass}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </header>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
    ```

3. Add proper enum options to the `align` parameter we defined in our CLI command. To do that, edit the configuration file `config.yml` under `src/StarterLibrary/components/FeatureList/meta` folder:
    ```yaml
    label: Feature List
    description: Showcase lists of features.
    parameters:
        - name: align
          label: Alignment
          description: The content alignment
          type: string
          enum:
              - { label: Center, value: center }
              - { label: Left, value: left }
          default: center
    ```

<!-- This command will create the component `FeatureList` under the newest module, which in this case is `StarterLibrary`. It will also add a parameter named `align` to the component, and define it as an enumeration of possible values.

> Note: if you choose to create the files manually while you are in "watch", make sure to run `yarn refresh` when ready so that the list of exported components is updated. That `yarn new:component` does that for you by default. -->

<!-- 1. Create a folder named `FeatureList` under `src/StarterLibrary/`
2. Crate a file named `index.js` within the new folder
3. Add the following code to the `index.js` file: -->

<!-- ```jsx
import React from 'react';

export default function FeatureList(props) {
    const { block } = props;
    const { title, subtitle } = block.main;
    const features = block.items;
    const { align = 'center' } = block.getBlockProperties();
    const headerClass = align === 'left' ? 'text-left' : 'text-center';

    return (
        <section>
            <header className={headerClass}>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </header>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
``` -->

<!-- 4. Create a subfolder named `meta` under `FeatureList`
5. Crate a file named `config.yml` within the `meta` subfolder
6. Add the following properties to the `config.yml` file:

```yaml
label: Feature List
description: A page section with a header and feature descriptions.
parameters:
    - name: align
      label: Alignment
      description: The content alignment
      type: string
      enum:
          - { label: Center, value: center }
          - { label: Left, value: left }
      default: center
``` -->

Hooray! You've made your first component. You can now see it in action. If you are developing locally and have the watch script running, your component should already be exported and usable from a website whose Dev Mode is set to your current tunnel. If you are coding in production mode, you need to commit your changes to the `main` branch for them to go live.

> **⚠ Important** If you choose to manually create the files of an exported component while you are in "watch" mode, make sure to run `yarn refresh` when ready so that the list of exported components is updated. The `new:component` command does that already.

#### Sample Content

Here is some sample text for you to add to a webpage and test your component. Make sure to select your component as the rendered of the page section where you add this text.

```markdown
# Product Features

Discover all the amazing features offered by our product.

---

## Fast

The fastest in the market

---

## Intuitive

Everyone can use it
```

That is all. Of course, there is a lot more to learn, such as adding customization properties to your component, and creating proper metadata so that non-technical users understand what to expect from it. If you are ready for that, simply head over to the [Component Library Development Guide](/guide.md).

### 🦾 Component's capabilities

Our example component may look simple, but since it's working together with the underlying Uniweb JS Engine, it already supports some advanced functionalities. Specifically, our new component can:

1. Show internationalized content based the active language.
2. Apply font and color themes, including light, dim, and dark variants.
3. Fetch dynamic data from different data sources, and cache it.
4. Display a custom background with a plain color, a two-color gradient, an image, or a video.

## 🎯 Next steps

-   [Component Library Development Guide](/guide.md)
    -   Learn how to develop your own React components to render the contents of a website.
-   [Content and template editing with Docufolio](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/docufolio.md)
    -   Learn how to use Docufolio, a powerful content management tool integrated with Uniweb, to create and edit website content and templates.
-   [Web theme for websites and templates](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/webthemes.md)
    -   Discover how to create and apply custom themes to your Uniweb websites and templates, ensuring a consistent and professional look and feel.
-   [Examples of web components](https://github.com/uniwebcms/express/tree/main/src/blocks)
    -   Explore a collection of example web components that you can use as a starting point for your own component libraries or as inspiration for new components.

Feel free to explore, experiment, and have fun creating amazing component libraries with Uniweb! If you have any questions or need help along the way, don't hesitate to reach out to the Uniweb community.
