# Understanding Components

## Technical Foundation

Uniweb component libraries are built with React, giving you a powerful and familiar foundation for web development. While our examples use Tailwind CSS for styling, you have complete freedom to use standard CSS files and classes. Your components are standard React components that gain significant additional capabilities through Uniweb's core engine.

## A Different Approach

When you start creating **user-facing components**, you'll need to shift your thinking about what a component is and how it should work. If you've worked with other frameworks or systems, you might be used to creating many specific components, each with a fixed layout. That is okay for **internal components**, those that are not exported and used by end users. Uniweb takes a fundamentally different approach for **exported components**: user-facing components are expected to be powerful, content-focused solutions that can adapt to different presentation needs.

You may create several **internal components** named: TeamGrid, TeamList, and TeamCards. But they may be linked to the layout options of a single **Team Members** exported component. This isn't just about reducing the number of user-facing components - it's about creating more powerful, content-focused solutions that give users flexibility without complexity.

An **exported component** should be:
- Focused on a purpose (like team members, feature showcase, or testimonials)
- Capable of multiple presentation styles through parameters
- Smart about handling different content patterns
- Independent of specific layout decisions

### Building Components

Components are written in React, giving you access to all standard React features including hooks, context, and component composition. For styling, you can choose what works best for your team - whether that's Tailwind's utility classes, traditional CSS, or a combination of both. Here's a simple example:

```jsx
import React from 'react';
import './styles.css'; // Standard CSS import

export default function FeatureCard({ block }) {
    const { title, description } = block.main;
    
    return (
        // Using a mix of standard CSS classes and Tailwind
        <div className="feature-card p-6 rounded-lg">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
}
```

### Enhanced by the Core Engine

When your components run in Uniweb, they automatically gain sophisticated capabilities through the core engine. Your components adapt to different themes without additional code. They handle backgrounds - whether they're solid colors, gradients, images, or videos. They work seamlessly with multiple languages and integrate naturally with site search. The core engine manages all these features, letting you focus on creating distinctive components.

The data management system is equally sophisticated. Your components receive properly structured content without having to manage API calls or state management. Dynamic content updates automatically, and multilingual support works out of the box. These aren't features you need to implement - they're inherent capabilities your components gain from running in the Uniweb environment.

## Development Environments

### Component-First Development with Uniweb RE (Realtime Environment)

Uniweb RE provides a streamlined test environment for component development that emulates Uniweb's core engine. You can focus on creating and refining components without needing a full Uniweb instance. Uniweb RE uses mock data that matches expected component props, providing instant updates with hot reload as you work. This makes it perfect for the initial phase of component development when you're focused on functionality and design.

### Testing with Real Data

Once your components are working well in Uniweb RE, you can test them with real data by creating a public tunnel to your localhost, and using it as the library URL for a Uniweb site. This connects your development environment to an actual Uniweb site, where your components receive real content and interact with all core engine features. You can verify how your components handle multilingual content, interact with site navigation, and work with dynamic data. This progression from Uniweb RE to real data testing provides a natural path from initial development to full feature verification.

## Deployment and Distribution

The deployment process for component libraries is designed to be both simple and reliable. When you push changes to your repository's main branch, GitHub Actions automatically builds your library and publishes it to GitHub Pages. Uniweb monitors these published libraries and, when it detects updates, copies the files to its content delivery network (CDN). This ensures your components are distributed efficiently to all websites using your library.

For a smooth development workflow, we recommend maintaining separate branches for development and production code. Working in a development branch gives you the freedom to experiment and refine your components without affecting live websites. When your changes are ready, merging to the main branch triggers the deployment process, updating all websites that use your library.

## Component Architecture

Understanding how components interact with Uniweb's core engine helps you create more effective solutions. Each component receives a `block` prop that provides access to content, configuration, and site-wide settings. Here's how the data structure works:

```javascript
{
    main: {}, // Primary content
    items: [], // Related content
    getBlockProperties(), // Component parameters
    getSiteProperties(), // Site settings
    getTheme() // Current theme
}
```

Your components can handle both static and dynamic content through this unified interface. For static content, you simply access the data provided in the block prop. For dynamic content, the core engine provides methods to load and manage data from various sources. Here's an example:

```javascript
// Static content is directly available
const { title, description } = block.main;

// Dynamic content can be loaded as needed
const posts = await block.loadProfiles('blog-posts');
```

### Theme Integration

Theme support in Uniweb components happens automatically through the core engine. Your components can access the current theme settings to ensure visual consistency across the site. The theme system provides colors, typography settings, and other design tokens that you can use in your components:

```javascript
const theme = block.getTheme();
const styles = {
    color: theme.colors.primary,
    fontFamily: theme.fonts.heading
};
```

### Content and Language Support

Multilingual support is built into the core of Uniweb. When your components receive content, it's already in the correct language based on the user's selection. You don't need to handle language switching or content translation - the core engine manages all of this for you. Similarly, search integration happens automatically. The core engine indexes your component's content and makes it available through the site's search functionality without requiring any additional code.

## Development Best Practices

Creating effective components requires attention to both code quality and user experience. Your components should be focused and maintainable, following standard React best practices while taking advantage of Uniweb's capabilities. Consider accesibility and responsiveness in your design. Let Uniweb take care of render cycles, image optimization, and dynamic data fetching.

Accessibility should be a core consideration in your component development. Maintain semantic HTML structure and ensure your components work well with keyboard navigation. Support screen readers through appropriate ARIA attributes and follow WCAG guidelines to ensure your components are usable by everyone.

Testing should cover various scenarios your components might encounter. Verify that your components work well with different types of content, and display correctly across device sizes. Test search integration to ensure your content is properly indexed and discoverable.

## Next Steps

As you continue developing with the Uniweb Framework, you might want to explore advanced component patterns, learn more about dynamic data loading, or understand the component lifecycle in depth. Our documentation provides detailed guides on these topics, and our Discord community is always available to help you succeed with component development.

Need help? Join our [Discord community](https://discord.gg/uniweb) or check the [documentation](https://docs.uniweb.dev).