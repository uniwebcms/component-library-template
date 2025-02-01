# Uniweb Component Library Starter

This starter template helps you create professional component libraries for Uniweb websites. A component library in Uniweb is a federated runtime module - a standalone bundle of React components that websites load and execute at runtime. This is different from traditional npm packages that are bundled at build time.

When a Uniweb website needs to render content, it connects to exactly one component library that defines how content should be presented. The library exists as a separate module that can be updated independently of the websites using it. Your components work with Uniweb's core engine, which automatically handles infrastructure concerns like multilingual content, search, page hierarchy, and dynamic data management.

## Getting Started

### Create Your Library

1. Click the "Use this template" button above to create your own repository
2. Clone your new repository locally
3. Install dependencies: `yarn install`
4. Start the watch process: `yarn watch`
5. Create your first component: `yarn new:component --name MyComponent --export`

The watch process will build your components and make them available for testing. You can now use any of the testing methods described below to see your components in action.

### Testing Components

You have three ways to test your components during development:

#### 1. Uniweb RE (Runtime Environment)
Test your components with structured mock data before connecting to a real site:

```bash
git clone https://github.com/uniwebcms/mocksite
cd mocksite
yarn install
yarn dev
```

Uniweb RE is a local site generator that mimics how a Uniweb site loads and renders components. It provides:
- A testing ground with structured mock data
- A runtime host for federated component modules
- A way to verify component behavior before connecting to a live site

#### 2. Local Development with Tunnel
Test against a live Uniweb instance using a public tunnel to your localhost:

```bash
# Install Cloudflared CLI first, then:
yarn serve -tunnel
yarn watch
```

The tunnel creates a secure URL for your development server (running on port 3005). Copy this URL into your Uniweb site's Dev Mode settings to test your components with real content and all Uniweb features enabled.

> [!NOTE]
> Localhost tunnel is also known as **Local Port Forwarding** in tools like VS Code.

#### 3. Deploy and Release with GitHub Actions
Make your library publicly available through GitHub Pages:

1. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
2. Push changes to main branch

Your library will be available at `https://[username].github.io/[repo-name]/[library-name]/`. When you update your library, all websites using it will automatically receive the changes the next time they load.

## A Different Approach to Web Development

Traditional web development often forces a choice between website builders that limit developer freedom and custom solutions that require building everything from scratch. Uniweb takes a fundamentally different approach through its runtime architecture: each website loads a complete component library as a federated module, letting you update components instantly across all sites using that library.

When organizations use website builders, they hit a ceiling as their needs grow. When they build custom solutions, they spend more time on infrastructure than innovation. Uniweb solves this by providing the infrastructure as a core engine, letting developers focus on creating components that make websites unique. Your components automatically work with advanced features like multilingual content, search, and dynamic data - features that would typically take months to build from scratch.

## Development Workflow

We recommend using a development branch (e.g., `develop`) for your regular work. When you're ready to update the live library, merge your changes into `main`. This ensures that websites using your library don't receive incomplete updates.

Important notes:
- Restart the watch script when adding or removing components
- The tunnel URL changes each time you restart the server
- Components update automatically in development mode
- You can use standard CSS files and classes or Tailwind CSS for styling

## Creating Components

Create a new component with all necessary files:

```bash
yarn new:component --name FeatureList --export --parameters "align:enum"
```

This generates a component structure that integrates with Uniweb's core engine. See the [First Component Guide](docs/first-component.md) for a complete walkthrough.

## Project Structure

Your component library lives in a clearly organized structure:

```
src/
├── my-library/          # Your component library
│   ├── components/      # Individual components
│   │   ├── ComponentA/
│   │   │   ├── index.jsx
│   │   │   └── meta/   # Component metadata
│   │   │       ├── config.yml
│   │   │       └── ... (other metadata)
│   ├── config.yml      # Library configuration
│   └── ... (other library files)
├── _shared/            # Shared components
│   └── ... (shared component files)
```

## Understanding Component Development

We've created comprehensive guides to help you build effective components:

1. [Understanding Components](docs/1-understanding-components.md) - How components work with the core engine
2. [Understanding Content](docs/2-understanding-content.md) - How content works in Uniweb components
3. [Component Development](docs/3-component-development.md) - Practical guide to building components
4. [Configuration Guide](docs/4-component-configuration.md) - Making components configurable
5. [Documenting for End Users](docs/5-documenting-for-endusers.md) - How to document user-facing components
6. [Advanced Features](docs/advanced-features.md) - Complex capabilities and patterns

These guides will help you understand Uniweb's component architecture and make the most of its capabilities.

## Support

- Documentation: [docs.uniweb.dev](https://docs.uniweb.dev)
- Issues: [GitHub Issues](../../issues)
- Community: [Discord](https://discord.gg/uniweb)

---

Ready to build professional component libraries? [Get started with Uniweb](https://uniwebcms.com) →