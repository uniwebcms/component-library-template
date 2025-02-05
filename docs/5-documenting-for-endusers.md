# Documenting Components for End Users

When building components for Uniweb, you're not just writing code - you're creating tools that content creators will use every day. While Uniweb maintains a clean separation between content and presentation, exported components are where developers and content creators meet. The documentation, parameter names, and presets you create become the interface through which non-technical users interact with your components.

This guide will help you create component documentation that bridges the technical and content worlds effectively.

## Understanding Your Audience

When documenting exported components, you're writing for content creators who:

-   Think in terms of content and presentation, not technical implementation
-   Want to understand what a component can do for them
-   Need to know what content to prepare
-   Look for visual examples and clear use cases
-   May be exploring your component library for the first time

This is very different from documenting code for other developers. Internal components and technical documentation can use developer terminology, but exported components need clear, user-friendly language that focuses on content and outcomes.

# User-Facing Components

If you've worked with other frameworks or systems, you might be used to creating many specific components, each with a fixed layout. That is okay for **internal components**, those that are not exported and used by end users. When you create **user-facing components** , you need to shift your thinking about what a component is and how it should work.

In traditional systems, you might create separate components like:

-   TeamGrid
-   TeamList
-   TeamCards
-   TeamFeatured

In Uniweb, you create a single **Team Members** component that can handle all these presentations through its configuration. This isn't just about reducing the number of user-facing components - it's about creating more powerful, content-focused solutions that give users flexibility without complexity.

A Uniweb component is:

-   Focused on a purpose (like team members, feature showcase, or testimonials)
-   Capable of multiple presentation styles through parameters
-   Smart about handling different content patterns
-   Independent of specific layout decisions

This approach brings several benefits:

-   Users think in terms of content, not technical implementation
-   Content can be restyled without being restructured
-   Components are more reusable and maintainable
-   Users have more flexibility without added complexity

## Naming Components

Component names are crucial - they help users find the right tool for their content. In Uniweb, names should focus on content type, not presentation style:

```yaml
# Good component names:
"Team Members"       # Handles any team presentation
"Features"          # Presents features in various ways
"Testimonials"      # Shows customer testimonials
"Success Stories"   # Presents case studies

# Names to avoid:
"Team Grid"         # Layout-specific (should be a parameter)
"Feature Cards"     # Layout-specific (should be a parameter)
"Service List"      # Layout-specific (should be a parameter)
```

**⚠ Important**: The name of your component in your code does not need to match the user-facing name that you give to it. For example, the internal name "FeatureSection" may be named "Features" in the component's metadata.

### Standard Components

Some components have standardized names in Uniweb:

-   **Page Header** - Not just "Header". Used for the site's main navigation area
-   **Page Footer** - Not just "Footer". Used for the site's footer content
-   **Hero Section** - The prominent section at the top of a page. This is one of the few cases where using "Section" is appropriate, as "Hero" is an abstract concept familiar to web designers

### Common Component Types

Here are examples of well-named components for common content types:

#### Content-Focused Components

-   Features
-   Services
-   Products
-   Team Members
-   Testimonials
-   Success Stories

#### Page Components

-   Page Header
-   Page Footer
-   Hero Section
-   Contact Information
-   Location

#### Content Publishing

-   Article
-   News Item
-   Event Details

Each of these components can offer multiple layout options through parameters, rather than creating separate components for each layout.

## Creating Flexible Components

Instead of building fixed layouts, create components that can adapt to different presentation needs through parameters:

```javascript
export default function TeamMembers({ block }) {
    const { title, subtitle } = block.main;
    const members = block.items;
    // Layout is controlled by parameters
    const { layout = 'grid', showBio = false } = block.getBlockProperties();

    return (
        <section>
            <header>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </header>

            <div className={`layout-${layout}`}>
                {members.map((member, index) => (
                    <div key={index} className="member">
                        <h3>{member.title}</h3>
                        {showBio && <p>{member.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}
```

## Parameters and Presets

Parameters control how your component presents content. They should offer meaningful choices without overwhelming users:

```javascript
export default {
    parameters: [
        {
            name: "layout",
            label: "Layout Style",
            type: "enum",
            values: [
                {
                    label: "Grid",
                    value: "grid",
                    description: "Arrange members in a uniform grid. Best for
                                teams where all members have equal emphasis."
                },
                {
                    label: "Featured",
                    value: "featured",
                    description: "Prominent layout highlighting key team members.
                                Perfect for leadership teams."
                }
            ],
            default: "grid"
        }
    ]
};
```

Presets combine parameter settings to create ready-to-use configurations:

```javascript
export default {
    presets: [
        {
            name: 'standard',
            label: 'Standard Team Grid',
            description: 'A balanced layout showing photos and basic information',
            properties: {
                layout: 'grid',
                showPhotos: true,
                showBio: false,
            },
        },
        {
            name: 'leadership',
            label: 'Leadership Team',
            description: 'Prominent layout with detailed information',
            properties: {
                layout: 'featured',
                showPhotos: true,
                showBio: true,
            },
        },
    ],
};
```

## Documentation for Users

Your component's documentation bridges the technical and content worlds. Focus on what users want to achieve:

```yaml
# Good description:
"Present your team members with their photos and roles. Perfect for about pages
and team introductions. Offers layouts for both full teams and leadership groups."

# Avoid:
"A responsive grid component for displaying team member cards with customizable
layout options."
```

### Preview Images

Include preview images that show different ways your component can present content:

```
TeamMembers/
  └── meta/
      ├── standard.png    # Grid layout preset
      ├── leadership.png  # Featured layout preset
      └── compact.png     # Compact layout preset
```

Use realistic content in your previews to help users understand what's possible.

## Best Practices

1. Focus on Content Types

    - Components should represent content types, not layouts
    - Let parameters handle presentation variations
    - Keep names focused on content purpose

2. Make Parameters Meaningful

    - Parameters should offer clear choices
    - Use descriptive labels and helpful descriptions
    - Create presets for common use cases

3. Write Clear Documentation

    - Explain what content the component handles
    - Show different ways it can present content
    - Use non-technical language

4. Think About Users
    - Users think in terms of content
    - They want flexibility without complexity
    - They need to understand what's possible

Remember: You're creating tools that help users present their content effectively. The more your components focus on content rather than implementation, the more useful they'll be.

## Next Steps

-   Review existing components in your library
-   Consider combining layout-specific components
-   Make sure names focus on content types
-   Create meaningful presets for common uses

Need help? Check our [example library](examples-link) or join our [Discord community](https://discord.gg/uniweb).
