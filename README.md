# Uniweb Component Library Starter

Welcome to the world of [Uniweb](https://uniwebcms.com) component libraries! If you're looking to create dynamic, reusable web components for your Uniweb websites, you've come to the right place. This starter template provides everything you need to create, build, deploy, and test your libraries.

Uniweb is a full content management system (CMS), with its main instance at [uniweb.app](https://uniweb.app) and enterprise instances available for organizations. Each component library is packaged as a runtime module - a standalone bundle of React components that websites load and execute at runtime. Unlike traditional npm packages that are bundled at build time, this approach allows you to update components across all your websites instantly, without rebuilding or redeploying each site.

A Uniweb website loads exactly one runtime module as its component library, which defines how all content should be presented. Using a single library ensures design consistency and dependency compatibility across all components, from navigation and headers to content sections. Each website also includes Uniweb's core engine, which automatically handles infrastructure concerns like multilingual content, search, page hierarchy, and dynamic data management.

This template comes with everything needed for professional library development: an automated GitHub Workflow for building and deployment, a runtime environment for local development, and flexible testing options that work with both mock data and live websites.

## Key Concepts

Uniweb separates content from rendering. Each page section contains content (headings, text, images, icons, etc.) that is managed in the CMS. Your components are responsible for rendering this content, which is provided in an easy-to-use format, including dynamic content fetched by the engine. The same component can be used across multiple sections with different content and parameters, making it highly reusable.

To effectively build these components, it's important to understand the two main types you'll work with:

1. **Exported Components**: These are the components that appear in the CMS interface for content writers to use. They:

    - Show up in the CMS component selector
    - Include metadata to help non-technical users understand their purpose and capabilities
    - Offer configurable parameters and preset templates
    - Need to be flexible enough to handle various content scenarios
    - Often compose multiple internal components to achieve their goals

2. **Internal Components**: These are traditional React components that:
    - Are used as building blocks within your codebase
    - Never appear directly in the CMS interface
    - Can be more specialized and single-purpose
    - Work just like components in any other React project

While you might create multiple internal components for specific layouts, exported components take a goal-oriented approach. For example, instead of having separate "ImageLeft", "ImageRight", and "ImageGrid" components, you might create a single "FeatureSection" component that offers these as layout options. This makes more sense for content creators who think in terms of what they want to achieve rather than specific layouts.

### The Core Engine

At the heart of every Uniweb website is a core engine - a JS library that handles all the complex infrastructure so your components can focus purely on rendering. The engine manages:

-   Routing and component rendering
-   Content localization
-   Data fetching and state management
-   Page hierarchy management
-   Runtime loading and versioning of component libraries
-   Communication with the Uniweb backend

This means you can build components without worrying about these implementation details. Your components receive ready-to-use content and data structures, letting you focus on creating great user experiences.

## CLI Scripts

This project includes several scripts to perform common tasks easily. The same tasks can be performed manually by learning a few more steps. The corresponding set of manual steps for every CLI script are explained in the [technical guide](docs/cli-scripts.md). The guide also documents all the optional parameters of each command.

## Project Structure

This project is organized to support multiple component libraries. Each library is a complete module that can power multiple websites, and libraries can share common components:

```
src/
├── my-library/          # A component library
│   ├── components/      # Individual components
│   │   ├── ComponentA/
│   │   │   ├── index.jsx
│   │   │   └── meta/   # Component metadata
│   │   │       ├── config.yml
│   │   │       └── ... (other metadata)
│   ├── config.yml      # Library configuration
│   └── ... (other library files)
├── _shared/            # Shared components
│   └── ... (shared components across libraries)
```

## Getting Started

1. Click the "Use this template" button above, or [this link](https://github.com/new?template_name=component-library-template&template_owner=uniwebcms), to create your own repository  
   ℹ️ We recommend checking "Include All Branches" to include the `gh-pages` branch where your builds will be distributed from. No worries if you forget - the included GitHub Actions will set it up automatically.

That's all you need to [deploy and release with GitHub Actions](#3-deploy-and-release-with-github-actions)! If you want to develop locally, you should also:

2. Clone your new repository
3. Install dependencies with `yarn install`

This project has a `StarterLibrary` that you can instantly build and test. You can modify it by, for example, adding new components. You can also create a new library, since the project supports having multiple libraries. To do that, simply copy the complete `src/StarterLibrary` contents and paste them as a new folder, like `src/MyLib`.

Once you have your environment set up, you can start exploring the StarterLibrary code and creating your own components. For a comprehensive guide on component development, check out our [Understanding Components](docs/1-understanding-components.md) guide - it's the best place to start learning how to create effective Uniweb components.

The project also includes a GitHub workflow that builds and hosts your component libraries automatically. When enabled, new builds are created automatically in response to commits that include libraries with higher version numbers than those of the last build.

## Creating Components

Create a new component with all necessary files:

```bash
yarn new:component FeatureList --export
```

This generates all the needed files for an exported component, including the metadata files used for documenting it. By default, it adds the component to the newest library subfolder under the `src` folder. If that is not what you want, you can use the optional `--module TargetModule` parameter to specify the desired library folder. See the [First Component Guide](docs/first-component.md) for a complete walkthrough.

## Testing and Deploying Components

You can test your components using three different approaches, each suited to different development needs. All testing methods use Dev Mode, which allows you to connect unregistered libraries to websites for development purposes.

1. **Local Development:** test using a **local mock site** powered by a **simplified runtime environment**
2. **Local Development with Tunnel:** create a **public tunnel** to your localhost and connect a **real website** to your **locally hosted library**
3. **Production deployment:** deploy your library **without a local setup** and connect it to a **real website**

Each of these approaches is explained below.

**⚠ Important**: When you're ready for production, you'll need to register your library as explained in the [Publishing section](#publishing-your-library).

### 1. Uniweb RE (Runtime Environment)

A simple and effective testing technique for new components is to work with them locally using mock data.

[Uniweb RE](https://github.com/uniwebcms/uniweb-re) is a runtime environment that mimics how Uniweb powers a website and connects it with a component library. It uses local website content (headings, text, images, etc.), making it easy to test how your components handle different content scenarios. It provides:

-   A testing ground with structured mock data
-   A runtime host for federated component modules
-   A way to verify component behavior before connecting to a live site

You can learn how to add pages and components to your test site from the [Uniweb RE Guide](https://github.com/uniwebcms/uniweb-re/docs/guide.md).

#### Getting Started

You will need three terminals: one to run your library's hosting server, one to watch the library for changes, and one to host your test website's server.

If you don't yet have a test website, you can create one under the `test` folder with this command:

```bash
yarn new:site TestSite
```

Next, build your library locally and watch for changes with:

1. **Terminal 1: Install packages and start web server with a tunnel**  
   `yarn && yarn serve`
2. **Terminal 2: Watch for code changes**  
   `yarn watch`
3. **Terminal 3: Run website server**  
   `yarn serve:site`

By default, `yarn serve` will host your library on port 5001, and `yarn serve:site` will host your test website on port 5002. You can select different ports with the `--port NNNN` parameter.

By default, `serve:site` will host the last created website and will set up the website to use the first library it finds in your project. Since you can have multiple libraries and multiple test websites in the same repository, you may want to [learn about the commands and options](docs/cli-scripts.md) to control the pairing of sites and libraries.

<!-- **⚠ Important**: If you add (or remove) **exported components** manually, you need to stop the `yarn watch` (CTRL-C) and start it again so that it loads the latest list of available components. This isn't needed if using the `yarn new:component` command. -->

### 2. Local Development with Tunnel

This project includes a simple yet powerful solution for serving local files over the internet using a web server and a temporary Cloudflare Quick Tunnel.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) is a service that securely exposes your local development server to the internet, without the need for port forwarding or firewall configuration. This makes it easy to test and share your component library with others during development.

**⚠ Important**: Make sure to install the `Cloudflared` CLI and check that it's in your PATH. You can find the latest installation instructions here: [Cloudflare Tunnel Downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

-   **macOS**: `brew install cloudflared`
-   **Windows**: `winget install --id Cloudflare.cloudflared`
-   **Linux**: [Cloudflare Package Repository ↗](https://pkg.cloudflare.com/)

> 🗒 You can also use [VS Code Port Forwarding](https://code.visualstudio.com/docs/editor/port-forwarding), or a permanent tunnel URL if you prefer. For instance, you can set up a [Cloudflare named tunnel](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/) or a [Pagekite tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/pagekite.md). If you go this route, just remember to set the `TUNNEL_URL` property in your `.env.dev` file to the tunnel's URL.

#### Getting Started

You will need two terminals: one to run your library's hosting server, and one to watch the library for changes.

1. **Terminal 1: Install packages and start web server with a tunnel**  
   `yarn && yarn serve --tunnel`
2. **Terminal 2: Watch for code changes**  
   `yarn watch`

The web server will serve files from the `build_dev` folder. Initially, this folder will have a single file named `quick-tunnel.txt` containing the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005. The quick tunnel URL changes every time the server starts and looks like `https://[tunnel-sub-domain].trycloudflare.com`.

The watch script will build a bundle of JavaScript files in dev mode and save them to the `build_dev/[module-name]` subfolder. The default module name is `StarterLibrary`. All source files under the `src` folder are watched for changes, and the target bundles are rebuilt as needed.

The watch script output will give you the URL to connect your test website with your dev environment:

```bash
PUBLIC URL: https://[tunnel-sub-domain].com/StarterLibrary
```

> 🗒 Remember, when connecting a website with a module, the URL must include the module name in its path because there might be several modules hosted under the same domain.

### 3. Deploy and Release with GitHub Actions

This is the method to deploy your library in production, but can also be used for testing. While it is the least practical testing method, it requires no local setup since it builds your modules using an included GitHub Workflow, and hosts them with GitHub Pages.

#### Getting Started

Build your library with GitHub Actions, and make the build publicly available through GitHub Pages:

1. Go to the `⚙ Settings` tab of your GitHub repository, and then go to the `Pages` tab
2. Under the section **Build and deployment**, in the **Source** menu, make sure that `Deploy from a branch` is selected. In the **Branch** menu, select `gh-pages`, leave `/ (root)` as the folder, and then click the **Save** button.

The build process should start right away, but it may take a minute or two to complete. You can monitor its progress from the `⏵ Actions` tab in your GitHub repository. When it's ready, you should see a successful `✅ Deploy` stage with the URL to your GitHub pages, like `https://USER-NAME.github.io/REPO-NAME/`.

To find the URL for your new component library, visit the GitHub pages URL. You should see a page titled **Available Modules**. At this point, the first and only module listed would be **StarterLibrary**. Use the copy button next to it to grab its URL. It should look something like `https://USER-NAME.github.io/REPO-NAME/StarterLibrary/`.

Now you're ready to use your library in a Uniweb website! Head over to your Uniweb instance.

Create a new website via the **Skip template** option – we want to keep things simple and start from scratch.

Since your website doesn't have a component library or content yet, it will be a blank page. Open the action menu `(⋅⋅⋅)▾` in the website studio and select "Manage components...". Then, paste the URL of your GitHub-hosted library under the "Custom URL" tab and into the "Library URL" field and apply your changes.

Ta-da! 🎩✨ You should now see some content on your website, generated by the `Section` component in the `StarterLibrary` of your repository. You can select a different component by clicking the Edit button at the top right corner of the Website Studio. This opens the Content Editor, where you can select which component renders each website page section.

#### Version Management

We use semantic versioning to manage module updates. The version number (like 1.2.3) tells us about the type of changes:

-   **Major**: The first number (1.x.x) indicates major versions with breaking changes
-   **Minor**: The middle number (x.2.x) represents new features that won't break existing code
-   **Path**: The last number (x.x.3) represents bug fixes and small non-breaking changes

New builds are created automatically in response to commits that include libraries with higher version numbers than those of the last build. This means that you can trigger a new build by increasing the version number of your library in its `package.json` file, and then committing your changes.

There are [version and push scripts](docs/scripts.md) to increase the version number of a module and commit the changes. For example,

```sh
yarn push:minor
```

will increase the second number of the version, commit the change, and push it. If you have multiple modules, this command will list them and let you select the target one.

When a website loads, it periodically checks if its component library has compatible updates available:

-   Bug fixes (x.x.3) are automatically applied
-   New features (x.2.x) are applied when the site is republished
-   Major updates (1.x.x) require manual review by site administrators

This version management system, combined with Uniweb's runtime architecture, means your updates can be instantly available across all authorized websites using your library - a powerful feature for maintaining and improving websites at scale.

#### 👷 Enabling Dev Mode on a Website

Now that you have a temporary URL pointing to the current dev build of your library, you can use it on a website in Dev Mode.

1. Create a website, or open an existing one, and turn on its **Dev Mode** via the action menu `(⋅⋅⋅)▾` of the **Website** studio
2. Set the **Component Library URL** to the URL produced in the last step. Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

Testing is just the first step in your component library's journey. Once you've verified your components work as intended, you can move on to publishing your library for production use.

## Publishing Your Library

While you can use unregistered libraries for testing and development using the methods described above, libraries must be registered with Uniweb before they can be used in published websites.

Publishing and registration steps:

1. [Deploy and release](#1-deploy-and-release-with-github-actions) a library
2. Register the library's URL and information in a Uniweb instance, such as [uniweb.app](https://uniweb.app)

### Why Registration Matters

Component libraries represent significant intellectual property - they're powerful, reusable assets that encapsulate both design and functionality. The clean separation between content and presentation in Uniweb means libraries are particularly valuable and need protection. Registration helps:

-   Establish ownership and protect intellectual property rights
-   Enable professional developers to monetize their work
-   Maintain quality standards in the Uniweb ecosystem
-   Provide accountability for library maintenance and updates

### Registration and Licensing

To use a library in published websites, it must be registered with the Uniweb instance where the websites are hosted (e.g., uniweb.app). Once registered, you can:

-   Grant usage permissions to specific users or websites
-   Manage your own licensing terms and compensation
-   Control who can publish websites using your library
-   Update your library across all authorized websites

Uniweb enforces these permissions, ensuring your library is only used by those you've authorized. While Uniweb offers standard libraries for quick no-code website creation, it also supports this marketplace of custom libraries for more ambitious projects. Organizations can commission custom libraries from professional developers or license existing ones, with clear protections for intellectual property.

For detailed information about registration, licensing, and intellectual property protection, see our [Library Registration Guide](docs/library-registration.md).

## A Different Approach to Web Development

Traditional web development forces a choice between website builders with limited flexibility and custom solutions that require rebuilding common infrastructure. Uniweb eliminates this trade-off by providing a robust core engine that handles infrastructure while giving developers complete creative freedom.

This architecture prevents the common pitfalls of both approaches. Website builders no longer impose technical limitations as projects grow. Custom solutions don't require months spent rebuilding standard features like multilingual support, search, or dynamic data management. Instead, developers can focus entirely on creating unique, powerful components.

The runtime module system transforms your component libraries into versatile assets. Each library can power multiple websites while remaining independently maintainable and updateable, creating lasting value that extends beyond any single project.

## Understanding Component Development

Detailed examples of how components work with content, including code samples and implementation patterns, can be found in our comprehensive guides:

1. [Understanding Components](docs/1-understanding-components.md) - How components work with the core engine
2. [Understanding Content](docs/2-understanding-content.md) - How content works in Uniweb components
3. [Component Development](docs/3-component-development.md) - Practical guide to building components
4. [Configuration Guide](docs/4-component-configuration.md) - Making components configurable
5. [Documenting for End Users](docs/5-documenting-for-endusers.md) - How to document user-facing components
6. [Advanced Features](docs/advanced-features.md) - Complex capabilities and patterns

These guides provide detailed explanations and examples to help you understand and leverage Uniweb's component architecture. We recommend reading them in order, as each guide builds upon concepts introduced in previous ones.

## Support

-   Documentation: [docs.uniweb.dev](https://docs.uniweb.dev)
-   Issues: [GitHub Issues](../../issues)
-   Community: Join our [Discord](https://discord.gg/uniweb) to connect with other library developers, share ideas, and get help

## License

This starter repository is licensed under GPL-3.0-or-later.

You are free to use and modify this repository, but if you distribute it (as a template or software package), you must also release your modifications under the same license.

Note: Websites created using this starter are NOT considered distributions and do not need to be licensed under GPL.

---

Ready to build professional component libraries? [Get started with Uniweb](https://uniwebcms.com) →
