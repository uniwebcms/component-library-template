# Creating Uniweb Components with AI

This guide shows you how to use AI assistants like ChatGPT or Claude to create components for your Uniweb website. Simply describe what you want your component to do, and the AI will create all the necessary code.

## How to Ask for a Component

Copy this prompt, replace the parts in brackets, and send it to the AI:

```
I want a Uniweb component that [describe what you want the component to do].
For example: "displays team members in a grid with their photos and bios"

Here's how Uniweb components are structured - please follow this pattern:

1. First, the React component (index.jsx):

import React from 'react';
import { SafeHtml, twMerge, Image } from '@uniwebcms/module-sdk';

export default function ComponentName(props) {
    const { block } = props;
    
    // Get customization properties defined in config.yml
    const properties = block.getBlockProperties();
    const {
        layout = 'default'
    } = properties;
    
    // Access content provided by the user through the CMS
    const content = block.main;
    const items = block.items;

    return (
        <div className="w-full">
            {/* Component UI here */}
        </div>
    );
}

2. Then a configuration file (meta/config.yml) that explains the component:

title:
  en: Component Name
  fr: Nom du composant
description:
  en: What this component does and what content it expects
  fr: Ce que fait ce composant et quel contenu il attend

category: content
export: true

properties:
  layout:
    label:
      en: Layout Style
      fr: Style de mise en page
    type: string
    default: default
    enum:
      - label:
          en: Default Layout
          fr: Disposition par défaut
        value: default

Please create both files following Uniweb's conventions:
- Use SDK utilities (SafeHtml, Image, Link, etc.) appropriately
- Use Tailwind's responsive classes (sm:, md:, lg:, xl:)
- Use Uniweb theme colors:
  * Base colors (primary/secondary/accent/neutral-50 to 950)
  * Element colors (text-color, heading-color, etc.)
- Make the configuration file clear and helpful for content editors
- Include multilingual support in the configuration file for: [list languages]
```

## Example Requests

Here are some example ways to request components:

1. Simple Testimonial Slider:
```
I want a Uniweb component that shows customer testimonials in a sliding carousel. Each testimonial should have the customer's photo, quote, name, and role. It should auto-advance and have navigation controls.

[Rest of the prompt template...]
```

2. Feature Comparison Table:
```
I want a Uniweb component that displays a feature comparison table for different service tiers. Each tier should have a price, feature list, and call-to-action button. The table should be responsive on mobile.

[Rest of the prompt template...]
```

3. Interactive Timeline:
```
I want a Uniweb component that creates a visual timeline of events. Each event should show its date, title, description, and optional image. The timeline should be vertically scrollable and highlight events as they come into view.

[Rest of the prompt template...]
```

## Tips for Good Results

1. Be specific about what you want:
   - What is the main purpose of the component?
   - What content should it display?
   - How should it look on different screen sizes?

2. Mention any special features:
   - Animations or transitions
   - Interactive elements
   - Specific layouts or styles

3. Think about what options users might want to customize:
   - Layout variations
   - Style choices
   - Behavior settings

4. Don't forget to list the languages you need support for

Remember: The component will be able to access whatever content the user provides through the CMS. The configuration file you get back will explain what content the component expects.
