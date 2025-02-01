# Uniweb Component Library Starter

This starter template helps you create professional component libraries for [Uniweb](https://uniwebcms.com) websites. Uniweb is a full content management system, with its main instance at [uniweb.app](https://uniweb.app) and enterprise instances available for organizations. A component library in Uniweb is a federated runtime module - a standalone bundle of React components that websites load and execute at runtime. This is different from traditional npm packages that are bundled at build time.

When a Uniweb website needs to render content, it connects to exactly one component library that defines how content should be presented. Each website uses a single library to ensure design consistency and dependency compatibility across all components, from navigation and headers to content sections. The library exists as a separate module that can be updated independently of the websites using it. Your components work with Uniweb's core engine, which automatically handles infrastructure concerns like multilingual content, search, page hierarchy, and dynamic data management.

## Key Concepts

Uniweb separates content from rendering. Each page section contains content (headings, text, images, icons, etc.) that is managed in the CMS. Your components are responsible for rendering this content, which is provided in an easy-to-use format, including dynamic content fetched by the engine. The same component can be used across multiple sections with different content and parameters, making it highly reusable.

If you've worked with other frameworks or systems, you might be used to creating many specific components, each with a fixed layout. That is okay for **internal components**, those that are not exported and used by end users. Uniweb takes a fundamentally different approach for **exported components**: user-facing components are expected to be powerful, content-focused solutions that can adapt to different presentation needs. Exported components are often higher-order components (HoC) that achieve their results by using lower-order internal components.

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

1. Click the "Use this template" button above to create your own repository
2. Clone your new repository locally
3. Install dependencies: `yarn install`

This project has a `StarterLibrary` that you can instantly build and test. You can modify it by, for example, adding new components. You can also create a new library, since the project supports having multiple libraries. To do that, simply copy the complete `src/StarterLibrary` contents and paste them as a new folder, like `src/MyLib`.

The project also includes a GitHub workflow that builds and hosts your component libraries automatically. When enabled, new builds are created automatically in response to commits that include libraries with higher version numbers than those of the last build.

## Creating Components

Create a new component with all necessary files:

```bash
yarn new:component FeatureList --export --parameters "align:enum"
```

This generates all the needed files for an exported component, including the metadata files used for documenting it. By default, it adds the component to the newest library subfolder under the `src` folder. If that is not what you want, you can use the optional `--module TargetModule` parameter to specify the desired library folder. See the [First Component Guide](docs/first-component.md) for a complete walkthrough.

## Testing Components

You have three ways to test your components during development:

1. **Production deployment:** impractical for fluid testing but needs no local setup
2. **Local Development:** use a local mock site powered by the Uniweb Runtime Environment
3. **Local Development with Tunnel:** a hybrid of the previous two in which you create a public tunnel to your localhost and connect a real website to your locally hosted library

Each of these approaches is explained below.

### 1. Deploy and Release with GitHub Actions

This is the method to deploy your library in production, but can also be used for testing. While it is the least practical testing method, it requires no local setup since it builds your modules using an included GitHub Workflow, and hosts them with GitHub Pages.

#### Getting Started

Build your library with GitHub Actions, and make the build publicly available through GitHub Pages:

1. Go to the `⚙ Settings` tab of your GitHub repository, and then go to the `Pages` tab
2. Under the section **Build and deployment**, in the **Source** menu, select `GitHub Actions`. The page auto-saves, so you're all set!

The build process should start right away, but it may take a minute or two to complete. You can monitor its progress from the `⏵ Actions` tab in your GitHub repository. When it's ready, you should see a successful `✅ Deploy` stage with the URL to your GitHub pages, like `https://USER-NAME.github.io/REPO-NAME/`.

To find the URL for your new component library, visit the GitHub pages URL. You should see a page titled **Available Modules**. At this point, the first and only module listed would be **StarterLibrary**. Use the copy button next to it to grab its URL. It should look something like `https://USER-NAME.github.io/REPO-NAME/StarterLibrary/`.

Now you're ready to use your library in a Uniweb website! Head over to your Uniweb instance.

Create a new website via the **Skip template** option – we want to keep things simple and start from scratch.

Since your website doesn't have a component library or content yet, it will be a blank page. Open the action menu `(⋅⋅⋅)▾` in the website studio and select "Manage components...". Then, paste the URL of your GitHub-hosted library under the "Custom URL" tab and into the "Library URL" field and apply your changes.

Ta-da! 🎩✨ You should now see some content on your website, generated by the `Section` component in the `StarterLibrary` of your repository. You can select a different component by clicking the Edit button at the top right corner of the Website Studio. This opens the Content Editor, where you can select which component renders each website page section.

#### Version Management

New builds are created automatically in response to commits that include libraries with higher version numbers than those of the last build. This means that you can trigger a new build by increasing the version number of your library in its `package.json` file, and then committing your changes.

We use semantic versioning to manage module updates. The version number (like 1.2.3) tells us about the type of changes:

-   The first number (1.x.x) indicates major versions with breaking changes
-   The middle number (x.2.x) represents new features that won't break existing code
-   The last number (x.x.3) represents bug fixes and minor patches

When a new version is published, websites using your library will detect it. Updates containing bug fixes (x.x.3) and new features (x.2.x) are automatically approved, while breaking changes (1.x.x) require manual review to ensure website compatibility.

### 2. Uniweb RE (Runtime Environment)

A simple and effective testing technique for new components is to work with them locally using mock data.

[Uniweb RE](https://github.com/uniwebcms/uniweb-re) is a runtime environment that mimics how Uniweb powers a website and connects it with a component library. It uses mock data that represents typical website content (headings, text, images, etc.) to help you test how your components handle different content scenarios. It provides:

-   A testing ground with structured mock data
-   A runtime host for federated component modules
-   A way to verify component behavior before connecting to a live site

You can learn how to add pages and components to your test site from the [Uniweb RE Guide](https://github.com/uniwebcms/uniweb-re/docs/guide.md).

#### Getting Started

You will need three terminals: one to run your library's hosting server, one to watch the library for changes, and one to host your test website's server.

Build your library locally and watch for changes with:

1. **Terminal 1: Install packages and start web server with a tunnel**  
   `yarn && yarn serve`
2. **Terminal 2: Watch for code changes**  
   `yarn watch`

By default, `yarn serve` will host your library on port 5001.

Assuming you already have two terminals, one hosting your library and one watching it, in a new terminal, if you don't yet have a test website, create one:

```bash
yarn new:site TestSite
```

The `new:site` command creates a basic site with mock data under the `test` folder. Once you have a website, you can host it locally:

```bash
yarn watch:site
```

By default, `watch:site` will host the last created website on port 5002, and it will set up the website to use the first library it finds in your project.

Since you can have multiple libraries and multiple test websites in the same repository, you may want to [learn about the commands and options](docs/cli-scripts.md) to control the pairing of sites and libraries.

**⚠ Important**: If you add (or remove) **exported components** manually, you need to stop the `yarn watch` (CTRL-C) and start it again so that it loads the latest list of available components. This isn't needed if using the `yarn new:component` command.

### 3. Local Development with Tunnel

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

#### 👷 Enabling Dev Mode on a Website

Now that you have a temporary URL pointing to the current dev build of your library, you can use it on a website in Dev Mode.

1. Create a website, or open an existing one, and turn on its **Dev Mode** via the action menu `(⋅⋅⋅)▾` of the **Website** studio
2. Set the **Component Library URL** to the URL produced in the last step. Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

## A Different Approach to Web Development

Traditional web development often forces a choice between website builders that limit developer freedom and custom solutions that require building everything from scratch. Uniweb takes a fundamentally different approach through its runtime architecture: each website loads a complete component library as a federated module, letting you update components instantly across all sites using that library.

When organizations use website builders, they hit a ceiling as their needs grow. When they build custom solutions, they spend more time on infrastructure than innovation. Uniweb solves this by providing the infrastructure as a core engine, letting developers focus on creating components that make websites unique. Your components automatically work with advanced features like multilingual content, search, and dynamic data - features that would typically take months to build from scratch.

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
-   Community: [Discord](https://discord.gg/uniweb)

---

Ready to build professional component libraries? [Get started with Uniweb](https://uniwebcms.com) →
