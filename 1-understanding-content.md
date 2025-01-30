# Understanding Content in Uniweb

Content is at the heart of every Uniweb component. The system uses a consistent, structured approach to content that makes it easy for components to present information effectively. This guide explains how content works in Uniweb and how your components can take advantage of its powerful content model.

## The Building Block: Understanding the block prop

Every Uniweb component receives content through a `block` prop. This prop contains not just the content to be displayed, but also configuration options and access to site-wide features. Here's a simple example:

```jsx
export default function WelcomeSection({ block }) {
    const { title, description } = block.main;
    
    return (
        <section>
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    );
}
```

The block structure is automatically created by Uniweb's core engine, which parses content and organizes it in a consistent way. This means your components can focus on presentation without worrying about content management.

## Content Organization: main and items

Content in a block is organized into two main areas: `main` and `items`. The main section contains the primary content for your component, while items contain additional content entries. This organization emerges naturally from how content is written in Uniweb's editor - content before the first separator becomes main content, and each subsequent section separated by dividers becomes an item.

Here's how you might use both in a component:

```jsx
export default function FeatureSection({ block }) {
    const { title, subtitle } = block.main;
    const features = block.items;
    
    return (
        <section>
            <header>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </header>
            {features.map((feature, index) => (
                <div key={index} className="feature">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </section>
    );
}
```

## Types of Content

Within both main content and items, Uniweb automatically organizes different types of content into appropriate collections:

```jsx
const {
    title,          // Main title
    subtitle,       // Subtitle
    description,    // Main text content
    images,         // Array of image objects
    icons,          // Array of icon objects
    links,         // Array of link objects
    lists,         // Array of list objects
    videos         // Array of video objects
} = block.main;
```

These collections make it easy to work with different types of content. For example, handling images with Uniweb's Image component:

```jsx
import { Image } from '@uniwebcms/module-sdk';

export default function ArticleSection({ block }) {
    const { title, description, images } = block.main;
    const mainImage = images?.[0];
    
    return (
        <article>
            {mainImage && (
                <Image 
                    src={mainImage.src}
                    alt={mainImage.alt || title}
                    className="article-image"
                />
            )}
            <h2>{title}</h2>
            <p>{description}</p>
        </article>
    );
}
```

## Content Flexibility: A Powerful Feature

One of Uniweb's most important principles is that components can selectively use content. Your component doesn't need to display every piece of available content - it can use what makes sense for its particular presentation. This flexibility is powerful because it allows the same content to work with different layouts and presentations.

Consider this component that offers different layout options:

```jsx
export default function TeamSection({ block }) {
    const { title, description, images } = block.main;
    const { layout = 'full' } = block.getBlockProperties();
    
    if (layout === 'text-only') {
        // This variation only uses text content
        return (
            <div className="text-focused">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        );
    }
    
    // The full layout uses both text and images
    return (
        <div className="full-layout">
            <div className="text-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {images?.length > 0 && (
                <div className="team-photos">
                    {images.map((image, index) => (
                        <Image key={index} {...image} />
                    ))}
                </div>
            )}
        </div>
    );
}
```

This component can display the same content in different ways without requiring content changes. Users can experiment with different layouts while maintaining their content structure.

## Child Blocks: Creating Complex Layouts

Beyond main content and items, Uniweb supports child blocks - complete content sections that can be rendered by different components. This creates a powerful composition system:

```jsx
export default function PageSection({ block }) {
    const { title } = block.main;
    const childBlocks = block.getChildBlocks();
    
    return (
        <section>
            <h2>{title}</h2>
            <div className="content-blocks">
                {childBlocks.map((childBlock, index) => (
                    <div key={index} className="content-block">
                        {childBlock.content}
                    </div>
                ))}
            </div>
        </section>
    );
}
```

Child blocks can use different components from your library, allowing for sophisticated page compositions while maintaining clear content organization.

## Best Practices for Content Handling

When working with content in your components:

1. Use optional chaining when accessing content properties, as not all fields will always be present:
```jsx
const title = block.main?.title;
const firstImage = block.main?.images?.[0];
```

2. Provide fallbacks for missing content:
```jsx
const { title = 'Untitled', description = '' } = block.main;
```

3. Consider what content is essential for your component and what's optional. Make your component resilient to missing optional content.

4. Remember that content flexibility is a feature - don't feel obligated to use every piece of available content if it doesn't suit your component's purpose.

## Next Steps

Now that you understand how content works in Uniweb components, you might want to explore:

- [Component Development Guide](component-development.md) - Learn how to build effective components
- [Configuration Guide](component-configuration.md) - Understand how to make components configurable
- [Advanced Features](advanced-features.md) - Discover more sophisticated capabilities

Remember that the Uniweb core engine handles all the complexity of content management, updates, and delivery. This lets you focus on creating components that present content effectively while maintaining clean, maintainable code.