# Uniweb Component Library Starter

This starter template helps you create component libraries for Uniweb websites. A Uniweb component library is different from traditional npm packages - rather than being bundled into your site at build time, it exists as a federated runtime module: a standalone bundle of React components that websites load and execute at runtime.

When a Uniweb website needs to render content, it connects to exactly one component library that defines how content should be presented. The library exists as a separate module that can be updated independently of the websites using it. Your components work with Uniweb's core engine, which automatically handles infrastructure concerns like multilingual content, search, page hierarchy, and dynamic data management.

## A Different Approach to Web Development

Traditional web development often forces a choice between website builders that limit developer freedom and custom solutions that require building everything from scratch. Uniweb takes a fundamentally different approach through its runtime architecture: each website loads a complete component library as a federated module, letting you update components instantly across all sites using that library. This architecture means websites start with professional quality and can grow without limits, while developers maintain complete creative freedom.

When organizations use website builders, they hit a ceiling as their needs grow. When they build custom solutions, they spend more time on infrastructure than innovation. Uniweb solves this by providing the infrastructure as a core engine, letting developers focus on creating components that make websites unique. Your components automatically work with advanced features like multilingual content, search, and dynamic data - features that would typically take months to build from scratch.

## Getting Started: Development Options

### Instant Setup with GitHub Actions

Create and host your component library without any local setup using our GitHub workflows:

```bash
# 1. Use this template to create your repository
# 2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
# 3. Push changes to main branch
```

Your library will be available at `https://[username].github.io/[repo-name]/[library-name]/`. When you update your library, all websites using it will automatically receive the changes the next time they load.

### Local Development with UniStudio

UniStudio provides a lightweight environment for rapid component development with React and Tailwind CSS:

```bash
git clone https://github.com/uniwebcms/unistudio
cd unistudio
yarn install
yarn dev
```

UniStudio includes the core Uniweb JS functionality and mock data capabilities, making it ideal for initial component development and testing. Components update instantly with hot reload, letting you see changes immediately without refreshing your browser.

### Full Feature Testing

Test against a live Uniweb instance using a tunnel to your localhost:

```bash
# Install Cloudflared CLI first, then:
yarn serve -tunnel
yarn watch
```

The development server runs on port 3005, and the tunnel creates a secure URL for your library. Copy this URL into your Uniweb site's Dev Mode settings to test your components with real content and all Uniweb features enabled.

## Development Workflow

We recommend using a development branch (e.g., `develop`) for your regular work. When you're ready to update the live library, merge your changes into `main`. This ensures that websites using your library don't receive incomplete updates.

Important notes:
- Restart the watch script when adding or removing components
- The tunnel URL changes each time you restart the server
- Components update automatically in development mode

## Creating Components

Create a new component with all necessary files:

```bash
yarn new:component --name FeatureList --export --parameters "align:enum"
```

This generates a component structure that integrates with Uniweb's core engine. Each component is built with React and can use Tailwind CSS for styling. See the [First Component Guide](docs/first-component.md) for a complete walkthrough.

## Project Structure

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

## Documentation

1. [Understanding Content](docs/1-understanding-content.md) - Content architecture and recommendations
1. [Component Development Guide](2-component-development.md) - Learn how to build effective components
1. [Configuration Guide](3-component-configuration.md) - Understand how to make components configurable
1. [Advanced Features](4-advanced-features.md) - Discover more sophisticated capabilities

## Support

- Documentation: [docs.uniweb.io](https://docs.uniweb.io)
- Issues: [GitHub Issues](../../issues)
- Community: [Discord](https://discord.gg/uniweb)

---

Ready to build professional component libraries? [Get started with Uniweb](https://uniwebcms.com) →