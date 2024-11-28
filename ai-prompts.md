# Using AI to Create Uniweb Components

This guide provides a ready-to-use prompt for creating Uniweb components using AI assistants like ChatGPT or Claude. Simply copy and paste the prompt below, fill in your component requirements, and the AI will help you create the component.

## The Prompt

```
Create a complete Uniweb component package for a [YourComponentName] that:

1. React Component (index.jsx):
   - Must be written in React using JSX
   - Must import required utilities from @uniwebcms/module-sdk
   - Must use Tailwind's responsive variants for layout (sm:, md:, lg:, xl:)
     e.g., 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
   - Content structure:
     * header: title, pretitle (optional), subtitle (optional)
     * body: paragraphs[], links[]
     * banner: optional background image/media
   - Uses Tailwind CSS for layout/spacing/etc
   - Uses Uniweb theme variables for colors:
     * Base colors: primary/secondary/accent/neutral (50-950 shades)
       e.g., bg-primary-200, text-secondary-900
     * Element colors: text-color, heading-color, btn-color, link-color
       e.g., text-text-color-90, bg-btn-color

2. Configuration (meta/config.yml):
   - Must include bilingual labels and descriptions (en/fr)
   - Category and export settings
   - Elements section defining content structure
   - Properties section with customization parameters
   - Optional presets section with predefined configurations
   - [List your specific parameters here]

3. Sample content in markdown format to test the component

Please follow Uniweb conventions:
- Access content via props.block
- Use block.getBlockProperties() for parameters
- Use SDK utilities like SafeHtml, Image, Link where appropriate
- Export as default React component
- Use only core Tailwind classes
- Use Uniweb theme variables for colors instead of hardcoding them
```

## Example Usage

Here's an example of using the prompt to create a team grid component:

```
Create a complete Uniweb component package for a TeamGrid that:

1. React Component (index.jsx):
   - Must be written in React using JSX
   - Must import required utilities from @uniwebcms/module-sdk
   - Must use Tailwind's responsive variants for layout (sm:, md:, lg:, xl:)
     e.g., 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
   - Content structure:
     * header: section title, optional subtitle
     * body: team description paragraphs
     * items: team members, each with:
       - profile image
       - name
       - role
       - bio
       - social links
   - Uses Tailwind CSS for layout/spacing/etc
   - Uses Uniweb theme variables for colors:
     * Base colors: primary/secondary/accent/neutral (50-950 shades)
       e.g., bg-primary-200, text-secondary-900
     * Element colors: text-color, heading-color, btn-color, link-color
       e.g., text-text-color-90, bg-btn-color

2. Configuration (meta/config.yml):
   - Bilingual labels and descriptions (en/fr):
     * en: "Team Grid"
     * fr: "Grille d'équipe"
   - Category: "team"
   - Export: true
   - Properties:
     * layout: enum (grid, list)
     * columns: enum (2,3,4)
     * showSocial: boolean
     * cardStyle: enum (minimal, detailed)
   - Optional presets for different layouts

3. Sample content in markdown format to test the component

Please follow Uniweb conventions:
- Access content via props.block
- Use block.getBlockProperties() for parameters
- Use SDK utilities like SafeHtml, Image, Link where appropriate
- Export as default React component
- Use only core Tailwind classes
- Use Uniweb theme variables for colors instead of hardcoding them
```

## Tips for Best Results

1. Be specific about the content structure:
   - What goes in the header section
   - What content belongs in the body
   - What data is needed for each item
   - Any optional media elements

2. List all customization parameters:
   - Consider layout options
   - Spacing and alignment settings
   - Display toggles for optional elements
   - Style variants

3. Include multilingual support:
   - Provide labels and descriptions in both English and French
   - Consider any language-specific formatting needs

4. Request proper handling of:
   - Responsive layouts using Tailwind breakpoints
   - Theme colors using Uniweb variables
   - SDK utilities for common functions
   - Optional content and fallbacks

The AI will generate the component code, configuration file, and sample content based on your specifications. You can then copy these files into your component library.