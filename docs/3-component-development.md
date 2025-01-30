# Developing Uniweb Components

This guide explains how to develop effective components for Uniweb. You'll learn common patterns, best practices, and how to make the most of Uniweb's core engine capabilities.

## Creating Your First Component

Let's start with a basic component that displays a title, description, and optional image:

```jsx
import React from 'react';
import { Image } from '@uniwebcms/module-sdk';

export default function SimpleSection({ block }) {
    const { title, description, images } = block.main;
    const mainImage = images?.[0];
    
    return (
        <section className="py-12 px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                {mainImage && (
                    <Image 
                        src={mainImage.src}
                        alt={mainImage.alt || title}
                        className="rounded-lg shadow-md"
                    />
                )}
            </div>
        </section>
    );
}
```

This component showcases several important principles:
- It receives content through the block prop
- It uses destructuring to access content easily
- It handles optional content (images) gracefully
- It uses Uniweb's Image component for optimal image handling

## Working with the SDK

Uniweb provides several helper components through its SDK that make common tasks easier and more reliable:

```jsx
import { SafeHtml, Image, Link } from '@uniwebcms/module-sdk';

export default function ArticleSection({ block }) {
    const { title, content, images, links } = block.main;
    
    return (
        <article>
            <h2>{title}</h2>
            
            {/* Safely render HTML content */}
            <SafeHtml content={content} />
            
            {/* Optimized image handling */}
            {images?.[0] && (
                <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    className="article-image"
                />
            )}
            
            {/* Smart link handling */}
            {links?.[0] && (
                <Link href={links[0].url} className="article-link">
                    {links[0].text}
                </Link>
            )}
        </article>
    );
}
```

## Component Patterns

### Layout Variations

Components can offer different layouts while maintaining content flexibility. Rather than creating separate components for each layout, use parameters to switch between them:

```jsx
export default function TeamSection({ block }) {
    const { title, subtitle } = block.main;
    const members = block.items;
    const { layout = 'grid' } = block.getBlockProperties();
    
    return (
        <section>
            <header>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </header>
            
            <div className={layout === 'grid' ? 'grid-layout' : 'list-layout'}>
                {members.map((member, index) => (
                    <div key={index} className="member">
                        <h3>{member.title}</h3>
                        <p>{member.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
```

### Content Flexibility

Your components should be flexible about what content they use. Not every instance of your component will have all possible content types. Handle missing content gracefully:

```jsx
export default function FeatureSection({ block }) {
    const { 
        title, 
        subtitle = '',  // Provide defaults for optional content
        icons = [],     // Default to empty array for collections
        images = [] 
    } = block.main;
    
    return (
        <section>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
            
            {icons.length > 0 && (
                <div className="icons">
                    {/* Render icons */}
                </div>
            )}
            
            {images.length > 0 && (
                <div className="images">
                    {/* Render images */}
                </div>
            )}
        </section>
    );
}
```

### Internal Components

While exported components should be flexible, internal components can be more specialized. This helps keep your code organized and maintainable:

```jsx
// Internal component for a specific layout
function GridLayout({ members }) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {members.map((member, index) => (
                <MemberCard key={index} member={member} />
            ))}
        </div>
    );
}

// Another internal component for a specific purpose
function MemberCard({ member }) {
    return (
        <div className="card">
            <h3>{member.title}</h3>
            <p>{member.description}</p>
        </div>
    );
}

// Exported component that uses internal components
export default function TeamSection({ block }) {
    const { layout = 'grid' } = block.getBlockProperties();
    const members = block.items;
    
    return layout === 'grid' ? (
        <GridLayout members={members} />
    ) : (
        <ListLayout members={members} />
    );
}
```

## Styling Components

You can use Tailwind CSS utility classes or standard CSS for styling. Choose what works best for your team:

```jsx
// Using Tailwind
export default function Card({ block }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {/* Content */}
        </div>
    );
}

// Using standard CSS
import './styles.css';

export default function Card({ block }) {
    return (
        <div className="card hover-effect">
            {/* Content */}
        </div>
    );
}
```

## Working with Dynamic Data

Components can receive dynamic data through the input prop. This is useful for components that display content from multiple sources:

```jsx
export default function BlogSection({ block, input }) {
    const { title } = block.main;
    const posts = input?.profiles || [];
    
    return (
        <section>
            <h2>{title}</h2>
            <div className="posts">
                {posts.map((post, index) => (
                    <article key={index}>
                        <h3>{post.getTitle()}</h3>
                        <p>{post.getExcerpt()}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
```

## Common Patterns and Tips

1. Always handle optional content gracefully
2. Use parameters for layout variations rather than creating multiple components
3. Keep exported components flexible
4. Create specialized internal components when needed
5. Follow React best practices for performance
6. Use the SDK's helper components for common tasks

## Next Steps

- Learn about [Component Configuration](component-configuration.md)
- Explore [Advanced Features](advanced-features.md)
- Review the [Content Structure Guide](understanding-content.md)

Remember that components should be easy to use, flexible with content, and maintainable. The Uniweb core engine handles many complex tasks automatically, letting you focus on creating effective presentations of content.