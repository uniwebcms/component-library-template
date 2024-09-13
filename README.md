# Uniweb Component Libraries

👋 Welcome to the world of Uniweb component libraries! If you're looking to create dynamic, reusable web components for your Uniweb websites, you've come to the right place.

[Uniweb](https://uniwebcms.com) is a fantastic web CMS app that helps you create dynamic websites with ease. Each website is linked to a component library, which is essentially a [webpack federated module](https://webpack.js.org/concepts/module-federation/). Don't worry if that sounds a bit technical – in simple terms, it means your components can be shared across multiple websites, making your development process more efficient and consistent.

By using component libraries with Uniweb, you'll enjoy benefits like:
- 🔁 Reusability: Share components across multiple websites to save time and effort.
- 🔧 Maintainability: Easily update your component library and watch the changes propagate to all connected websites.
- 👥 Consistency: Ensure a cohesive look and feel across your websites with shared components.

In this guide, we'll walk you through the process of creating your own Uniweb component libraries. We'll assume you have some knowledge of modern JavaScript, [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/), but don't worry if you're not an expert – we'll provide plenty of examples and explanations along the way.

## 🚀 Setup: Start from a Template Repository

To get started, we've created this handy template repository for you. All you need to do is create a new repository based on this template.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="300">

1. Click the "Use this template" button at the top right of the repository page.
2. Select "Create a new repository" and fill in the details (name, description, etc.).
3. Click "Create repository from template" to generate your new project.

And just like that, you'll have your very own component library repository! 🎉

## ⚡ Quick start: Build and host using GitHub actions

Want to see your component library in action without any local setup? No problem! This repository includes a GitHub workflow that builds and hosts your component libraries automatically. Here's how to enable it:

1. Go to the `Pages` tab under the `⚙ Settings` of your GitHub repository ([/settings/pages](/settings/pages))

2. Under the section **Build and deployment**, in the **Source** menu, select `GitHub Actions`. The page auto saves, so you're all set!

The build process should start right away, but it may take a minute or two to complete. You can monitor its progress from the `⏵ Actions` ([/actions](/actions)) tab in your GitHub repository. When it's ready, you should see a successful `✅ Deploy` stage with the URL to your GitHub pages, like `https://USER-NAME.github.io/REPO-NAME/`.

To find the URL for your new component library, visit the GitHub pages URL. You should see a page titled **Available Modules**. At this point, the first and only module listed would be **StarterLibrary**. Use the copy button next to it to grab its URL. It should look something like `https://USER-NAME.github.io/REPO-NAME/StarterLibrary/`.

Now you're ready to use your shiny new library in a Uniweb website! Head over to your Uniweb instance, which might be [uniweb.app](https://uniweb.app) or another instance.

Create a new website and skip the template selection for now – we want to keep things simple and start from scratch.

Since your website doesn't have a component library or content yet, it will be a blank page. But don't worry, that's about to change! Open the action menu `(…)▾` in the website studio and select "Enable dev mode...". Then, paste the URL of your GitHub-hosted library into the "Component Library URL" field and apply your changes.

Ta-da! 🎩✨ You should now see some content on your website, generated by the `Section` component in the `StarterLibrary` of your repository. Feel free to add content to your website and explore other components from your library by clicking the Edit button at the top right corner of the Website Studio.

## 🚚 Deploying New Versions

The easiest way to deploy your component library is to use the included [GitHub workflow](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), which builds your files and hosts them on GitHub Pages. In production mode, Uniweb monitors these files and copies them into an efficient CDN for optimal delivery.

Assuming you have [GitHub Actions enabled](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), every time you commit changes to the `main` branch of your repository, a new build will be generated and hosted within about a minute and a half.

**⚠ A quick note on best practices:** To avoid affecting existing websites that use your libraries, it's a good idea to create a separate development branch (like `develop`) for your regular commits. When you're ready to release a new version, simply merge your development branch into `main`.

Here's an example of how you can create and merge a development branch using Git:

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

## 💻 Local development

While committing to the main branch is great for deploying new versions, it's not the most practical approach during development and testing. Luckily, there's a much better way to develop locally and see your changes instantly!

The included server project offers a simple yet powerful solution for serving local files over the internet using a web server and a temporary Cloudflare Quick Tunnel. 

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) is a nifty service that securely exposes your local development server to the internet, without the need for port forwarding or firewall configuration. This makes it super easy to test and share your component library with others during development.

**⚠ Important**: Make sure to install the `Cloudflared` CLI and add it to your PATH. You can find the latest installation instructions here: [Cloudflare Tunnel Downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

- **macOS**: `brew install cloudflared`
- **Windows**: `winget install --id Cloudflare.cloudflared`
- **Linux**: [Cloudflare Package Repository ↗](https://pkg.cloudflare.com/)

> 🗒 Psst... you can also use a permanent tunnel URL if you prefer. For instance, you can set up a [Cloudflare named tunnel](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/) or a [Pagekite tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/pagekite.md). If you go this route, just remember to set the `TUNNEL_URL` property in your `.env.dev` file to the tunnel's URL.

## 🛠️ Technologies Used

This template uses the following awesome technologies:

- **Package Manager**: [Yarn](https://yarnpkg.com/) 4.1.0
- **Framework**: [React](https://react.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) and [Twind](https://twind.style/)
- **CI/CD**: [GitHub Pages Action workflow](https://github.com/marketplace/actions/github-pages-action)
- **Utility Libraries**:
  - [`@uniwebcms/module-builder`](https://www.npmjs.com/package/@uniwebcms/module-builder) v1.5.2
  - [`@uniwebcms/module-sdk`](https://www.npmjs.com/package/@uniwebcms/module-sdk) v1.22.1

If you already have Node.js, Yarn, and a code editor like VS Code installed, you're good to go! If not, don't sweat it – just [configure the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md) first.

## 🔨 Build Locally

VS Code users, you're in luck! There's a handy "Start Dev Environment" task configured under `.vscode/tasks.json`. You can run it using the Command Palette or the keyboard shortcut (`Ctrl+Shift+B` or `Cmd+Shift+B` on macOS). 

If you prefer to start the scripts manually, no worries! Just open up 4 different terminals and run:

- **Install Packages and Start Web Server**: `yarn && yarn serve -tunnel`
- **Watch Tasks**: 
    - **Watch Exports**: `yarn watch:exports`
    - **Watch Docs**: `yarn watch:doc`
    - **Watch Code**: `yarn watch`

**Note:** The web server will serve files from the `build_dev` folder. Initially, this folder will have a single file named `quick-tunnel.txt` containing the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005. The quick tunnel URL changes every time the server starts and looks like `https://[tunnel-sub-domain].trycloudflare.com`. 

The watch script will build a bundle of JavaScript files in dev mode and save them to the `build_dev/[module-name]` subfolder. The default module name is `StarterLibrary`. All source files under the `src` folder are watched for changes, and the target bundles are rebuilt as needed.

The watch script output will give you the URL to connect your test website with your dev environment.

```diff
+ Dev URL: https://[tunnel-sub-domain].trycloudflare.com/StarterLibrary
```

> 🗒 Remember, when connecting a website with a module, the URL must include the module name in its path because there might be several modules hosted under the same domain.
>
> ## 🔗 Connecting the module to a website

Create a test website, turn on its **Dev Mode**, and set the **Component Library URL** to the URL produced in the last step. Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

## 🐛 Troubleshooting

If you run into any issues during the build process, try these steps:

- Make sure you have the latest versions of Node.js and Yarn installed.
- Remove the shared cache files created by Yarn: `yarn cache clean`.
- Check the console output for error messages and search for solutions online.
- If the issue persists, please [open an issue](https://github.com/uniwebcms/uniweb-module-builder/issues/new) on the GitHub repository, providing as much detail as possible about the problem.

## 🚀 Deploying to production

Create a development branch, like `develop`, for your regular commits. When you're ready for a new production release, merge your changes into the `main` branch. The merge will trigger the GitHub action workflow and host the result on GitHub Pages. 

Uniweb will take the files from GitHub Pages and move them to a CDN. To make this happen, create a **Web Styler** in your Uniweb so the system knows about your component library. Simply create a new **Web Styler** and set the URL of your library to `https://USER-NAME.github.io/REPO-NAME/LIBRARY-NAME/`.

You can find the URL of your available libraries by visiting the GitHub pages of your repository.

**Note:** It may take a few minutes for Uniweb to detect the changes in your GitHub Pages and move the files to the CDN. Be patient and check back later if your updates are not immediately visible on your website.

## 🎯 Next steps

- [Content and template editing with Docufolio](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/docufolio.md)
  - Learn how to use Docufolio, a powerful content management tool integrated with Uniweb, to create and edit website content and templates.
- [Web theme for websites and templates](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/webthemes.md)
  - Discover how to create and apply custom themes to your Uniweb websites and templates, ensuring a consistent and professional look and feel.
- [Examples of web components](https://github.com/uniwebcms/express/tree/main/src/blocks)
  - Explore a collection of example web components that you can use as a starting point for your own component libraries or as inspiration for new components.

Feel free to explore, experiment, and have fun creating amazing component libraries with Uniweb! If you have any questions or need help along the way, don't hesitate to reach out to the Uniweb community. Happy coding! 🚀
