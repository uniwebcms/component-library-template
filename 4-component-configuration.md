# Configuring Uniweb Components 

Every Uniweb component can be configured in two ways: through runtime configuration for browser behavior and meta configuration for Website Studio integration. This separation keeps component logic clean while providing powerful customization options for content creators.

## Component Structure

A configurable component has this basic structure:

```
MyComponent/
  ├── index.jsx          # Component code
  ├── config.js          # Optional runtime configuration
  └── meta/              # Component metadata
      ├── parameters.js  # Parameter definitions
      ├── presets.js    # Preset configurations
      └── notes.md      # Documentation
```

## Meta Configuration for Website Studio

The meta configuration in your component's `meta` folder defines how content creators can customize your component in the Website Studio. This is where you specify available parameters and preset configurations.

### Defining Parameters

Create a `parameters.js` file to define the options available to content creators:

```javascript
export default {
    parameters: [
        {
            name: "layout",
            type: "enum",
            values: [
                { label: "Standard", value: "standard" },
                { label: "Compact", value: "compact" },
                { label: "Full Width", value: "full" }
            ],
            default: "standard",
            description: "Layout style for the component"
        },
        {
            name: "spacing",
            type: "number",
            min: 0,
            max: 12,
            default: 4,
            description: "Space between elements"
        }
    ]
};
```

These parameters will appear in the Website Studio's component settings panel. Content creators can adjust them to customize how your component displays content.

### Creating Presets

Presets provide pre-configured combinations of parameters. Define them in `presets.js`:

```javascript
export default {
    presets: [
        {
            name: "default",
            label: "Standard View",
            properties: {
                layout: "standard",
                spacing: 4
            }
        },
        {
            name: "compact",
            label: "Compact View",
            properties: {
                layout: "compact",
                spacing: 2
            }
        }
    ]
};
```

Presets help content creators quickly switch between common configurations of your component.

## Runtime Configuration

Runtime configuration is optional and should only be added when your component needs specific browser behavior. Create a `config.js` file in your component's root directory:

```javascript
export default {
    // Initial state for stateful components
    initialState: {
        isExpanded: false,
        activeTab: "details"
    },
    
    // Component-specific settings
    settings: {
        validateProps: true,
        transitionDuration: 300
    }
};
```

Then import and attach it to your component:

```javascript
import React from "react";
import config from "./config.js";

function MyComponent({ block }) {
    const { layout = "standard" } = block.getBlockProperties();
    
    return (
        <div className={`layout-${layout}`}>
            {/* Component content */}
        </div>
    );
}

MyComponent.config = config;
export default MyComponent;
```

## Using Configuration in Components

Your component receives configured parameters through the block prop:

```javascript
function FeatureList({ block }) {
    // Get configured parameters with defaults
    const { 
        layout = "standard",
        spacing = 4 
    } = block.getBlockProperties();
    
    // Use parameters in your component
    return (
        <div className={`layout-${layout} spacing-${spacing}`}>
            {/* Component content */}
        </div>
    );
}
```

## Configuration Best Practices

1. Keep parameters simple and intuitive:
```javascript
// Good - clear and simple
{
    name: "size",
    type: "enum",
    values: ["small", "medium", "large"]
}

// Avoid - too complex
{
    name: "configuration",
    type: "object",
    properties: { /* complex nested structure */ }
}
```

2. Provide helpful descriptions:
```javascript
{
    name: "columns",
    type: "number",
    min: 1,
    max: 4,
    default: 2,
    description: "Number of columns in the grid layout"
}
```

3. Set sensible defaults:
```javascript
{
    name: "theme",
    type: "enum",
    values: ["light", "dark"],
    default: "light",  // Always provide a default
    description: "Visual theme for the component"
}
```

4. Use runtime configuration sparingly. Most components can work effectively with just meta configuration.

5. Keep presets focused on common use cases. Each preset should serve a clear purpose.

## Component Documentation

Use `notes.md` to document your component's features and usage:

```markdown
# Feature List Component

Displays a list of features with configurable layout and spacing.

## Parameters
- layout: Controls the overall layout style
- spacing: Adjusts space between features

## Usage Examples
- Standard layout for product features
- Compact layout for sidebar displays
- Full-width layout for landing pages
```

Good documentation helps other developers and content creators understand how to use your component effectively.

## Next Steps

- Learn about [Component Development](component-development.md)
- Explore [Advanced Features](advanced-features.md)
- See [Content Handling](understanding-content.md)

Remember that configuration is about making your components flexible without adding unnecessary complexity. Focus on parameters that provide real value to content creators and keep runtime configuration minimal.