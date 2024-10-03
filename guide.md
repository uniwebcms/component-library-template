# Uniweb Component Library Development Guide

## Introduction

Uniweb is a web CMS app that helps create dynamic websites. Each website is linked to a component library, which is a webpack federated module that exports components. These components render web page sections based on data entered in the CMS app. The handling of components and dynamic data is done by the Uniweb Engine, which is the initial JavaScript code loaded by every Uniweb-made website.

This guide will walk you through the process of creating one or more modules (component libraries) for the Uniweb platform, assuming knowledge of modern JavaScript, React, and Tailwind CSS.

## Project Structure

A typical repository of modules for Uniweb looks like this:

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

## Component Development

### Basic Component Structure

Each component in a module should be in its own directory under `src/my-module/components/`. 

Here's an example of a basic component structure:

```jsx
// File: src/my-module/components/ComponentName/index.js
import React from 'react';
import { SafeHtml, Image, Link, twMerge, twJoin } from '@uniwebcms/module-sdk';

export default function ComponentName(props) {
    const { block, page, website, input } = props;

    // Component logic here

    return (
        // JSX here
    );
}
```

### Component Metadata

Each component exported by a library (ie, module) should have a `meta/` directory containing:

1. `config.yml`: Defines the component's parameters and presets.
2. Screenshot images (e.g., `default.png`, `preset1.png`) showing previews for different component presets.
3. `notes.md`: Optional file for additional component documentation.

Example `config.yml`:

```yaml
name: ComponentName
description: A reusable component for...
export: true
parameters:
  - name: title
    type: string
    description: The main title of the component
    default: Default Title
  # ... other parameters
presets:
  preset1:
    label: Expanded View
    description: Shows the component in its expanded state
    properties:
      title: Expanded Component
      expanded: true
  # ... other presets
```

## Using the Uniweb SDK

The Uniweb SDK provides helper components and utility functions to streamline development. Import and use these in your components:

```jsx
import { SafeHtml, Image, Link, twMerge, twJoin } from '@uniwebcms/module-sdk';
```

Key SDK features:
- `SafeHtml`: Renders HTML content safely.
- `Image`: Handles image rendering and optimization.
- `Link`: Manages internal and external links.
- `twMerge` and `twJoin`: Utility functions for Tailwind class manipulation.

## Component Props

Uniweb components receive four main props:

1. `block`: Contains settings and static data for the component.
2. `page`: Provides information about the current webpage.
3. `website`: Offers information about the entire website.
4. `input`: Contains optional dynamic data for the component.

Example usage:

```jsx
export default function Hero(props) {
    const { block, website } = props;
    const { title, subtitle } = block.main?.header || {};

    // Use props in your component logic
}
```

## Understanding Block Content Structure

A crucial concept in Uniweb component development is how block content is parsed and organized. This structure allows for flexible and powerful content rendering within components.

### Content Parsing

When a block's content is processed by Uniweb, it is parsed and organized into two main properties:

1. `block.main`: Contains the primary content of the block.
2. `block.items`: An array containing additional content items, if any.

The original, unparsed content is available in `block.content`.

### Main Content (`block.main`)

The `block.main` object typically contains the following properties:

- `pretitle`: Content before the main title
- `title`: The main heading
- `subtitle`: A subheading or secondary title
- `description`: Main descriptive text
- `images`: An array of image objects
- `icons`: An array of icon objects
- `paragraphs`: An array of paragraph texts
- `videos`: An array of video objects
- `lists`: An array of list objects
- `banner`: A banner image object

Example usage:

```jsx
export default function Hero(props) {
    const { block } = props;
    const { title, subtitle, paragraphs } = block.main;

    return (
        <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
}
```

### Item Content (`block.items`)

The `block.items` array contains objects with a structure similar to `block.main`. Each item in this array represents a distinct piece of content within the block, such as individual features in a feature list.

Uniweb identifies items by looking for separator elements (divider lines) in the section's content. The content before the first separator becomes `block.main`, and each subsequent section between separators becomes an item in `block.items`.

Example usage:

```jsx
export default function FeatureList(props) {
    const { block } = props;
    const { title, subtitle } = block.main;
    const features = block.items;

    return (
        <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### Child Blocks

In addition to `block.items`, Uniweb supports child blocks, which are defined as sub-sections in the CMS app. Child blocks are more powerful as they can be assigned different rendering components than their parent section. Child blocks can be accessed through `block.getChildBlocks()`.

### Best Practices

1. Always check for the existence of properties before using them, as not all content structures will have all possible properties.
2. Use destructuring to easily access the needed properties from `block.main` and `block.items`.
3. When working with `block.items`, consider the possibility of an empty array and handle it gracefully in your component.
4. For complex content structures, consider creating utility functions to process and organize the data from `block.main` and `block.items`.

Understanding this content structure is crucial for creating flexible and powerful components in Uniweb. It allows developers to create components that can handle a wide variety of content arrangements while maintaining a consistent structure.

## Responsive Design

Use Tailwind CSS classes to ensure your components are responsive. The Uniweb engine handles much of the responsive behavior, but component-specific adjustments should be made using Tailwind's responsive prefixes.

## Internationalization (i18n)

Uniweb handles internationalization at the CMS and engine level. Components receive content in the correct language, so no additional i18n work is typically needed within the components themselves.

## Best Practices

1. Use the Uniweb SDK components and utilities whenever possible.
2. Leverage Tailwind CSS for styling and responsiveness.
3. Keep components modular and reusable.
4. Provide clear and comprehensive metadata in the `config.yml` file.
5. Use meaningful names for components and their properties.
6. Avoid handling generic error cases; the Uniweb engine manages most error scenarios.

## Advanced Features

### Dynamic Data Handling

Components can receive dynamic data through the `input` prop. This data is fetched by the Uniweb engine at runtime. Here's a simplified example of how to process and use dynamic location data:

```jsx
import React from 'react';
import { Map } from '@uniwebcms/module-sdk';

// Process input data to extract and group location information
const getLocationsFromInput = (input) => {
    const locations = {};

    // Iterate through profiles in the input, defaulting to an empty array if none exist
    (input?.profiles ?? []).forEach(profile => {
        // Get location sections from the profile using schema information
        const sections = profile.at(profile.getTypeInfo().locationSchema?.section);

        // Process each location section
        sections?.forEach(section => {
            const location = parseLocation(section);
            if (location) {
                // Create a unique key for each location based on its coordinates
                const key = `${location.geo.lat},${location.geo.lng}`;
                // Initialize an array for this location if it doesn't exist
                locations[key] ??= [];
                // Add the location and profile to the array for this coordinate
                locations[key].push({ location, profile });
            }
        });
    });

    return locations;
};

// Helper function to extract location data from a section
const parseLocation = (section) => {
    // Extract relevant fields from the section
    const [title, address, lat, lng] = ['title', 'address', 'latitude', 'longitude']
        .map(key => section.getContent(key));

    // Return a structured location object if all required fields are present
    return (title && address && lat && lng) ? {
        title,
        address,
        geo: { lat: parseFloat(lat), lng: parseFloat(lng) }
    } : null;
};

// Example component using the processed location data
export default function Locations(props) {
    const { input, website } = props;
    // Process the input to get grouped location data
    const locations = getLocationsFromInput(input);

    return (
        <div>
            <h2>Locations</h2>
            {/* Render each location group */}
            {Object.entries(locations).map(([key, locationGroup]) => (
                <div key={key}>
                    <h3>{locationGroup[0].location.title}</h3>
                    <p>{locationGroup[0].location.address}</p>
                    <p>Profiles at this location: {locationGroup.length}</p>
                    {/* Render a map for each location */}
                    <Map
                        apiKey={website.getMapAPIKey()}
                        center={locationGroup[0].location.geo}
                        zoom={15}
                    />
                </div>
            ))}
        </div>
    );
}
```

## Conclusion

Creating component libraries for Uniweb involves leveraging React, Tailwind CSS, and the Uniweb SDK to build flexible, responsive, and internationalized components. By following this guide and the provided best practices, you can create powerful and reusable components for Uniweb-powered websites.

Remember to refer to the Uniweb documentation for the latest updates and advanced features as the platform evolves.
