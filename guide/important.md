# Understanding Library Updates: Power and Responsibility

## The Power of Live Updates

Uniweb's component library system offers remarkable deployment capabilities. Each library is distributed as a webpack federated module, enabling a powerful update mechanism:

1. You commit changes to your library's main branch
2. GitHub Actions builds your updated library
3. Uniweb detects the new version
4. Files are automatically copied to a global CDN
5. Websites using your library receive updates on their next load

This system makes updates seamless and efficient. But with great power comes great responsibility. Let's explore how to manage this capability effectively.

## Understanding the Risks

Consider what happens when you push to main:

```
Your Commit → Immediate Build → Global Distribution → All Sites Update
```

This means one commit could potentially affect hundreds of live websites. While this power is valuable for:

- Fixing bugs
- Improving performance
- Enhancing accessibility
- Updating dependencies
- Making compatible improvements

It can also accidentally:

- Break existing layouts
- Change component behavior
- Modify parameter effects
- Disrupt user experiences

## Best Practices for Safe Development

### 1. Use Development Branches

Never work directly on the main branch. Instead:

- Create a development branch for your work
- Make and test all changes there
- Only merge to main when your changes are thoroughly tested
- Remember: commits to main trigger immediate updates to live websites

### 2. Understand Library Scope

Your repository can contain:

- Multiple libraries
- Shared components
- Internal utilities

Example structure:

```
src/
├── marketing-library/
│   └── components/
├── documentation-library/
│   └── components/
├── _shared/
│   └── components/
└── _utils/
    └── helpers/
```

### 3. Version Libraries, Not Just Components

When making substantial changes:

```
marketing-library/               # Original library
marketing-library-v2/           # New version
├── components/
│   ├── HeroSection/           # Copied from v1
│   │   └── index.jsx         # Modified for v2
│   └── FeatureGrid/          # New component
└── index.js
```

## Managing Major Changes

### The Right Way: Create New Libraries

Instead of modifying an existing library:

1. Create a new library with a version suffix

```bash
yarn new:module --name MarketingLibraryV2
```

2. Copy relevant components from the original

```bash
cp -r src/marketing-library/components/HeroSection \
      src/marketing-library-v2/components/
```

3. Make your changes in the new version

Benefits:

- Existing sites remain stable
- Users can choose when to upgrade
- Both versions can coexist
- Safe testing environment

### The Wrong Way: Direct Modifications

❌ Don't:

- Change component behavior without versioning
- Modify parameter effects in place
- Remove or rename parameters
- Change default values significantly

## Understanding Backward Compatibility

### Compatible Changes

✅ Safe to add to existing libraries:

- New optional parameters
- Additional layout options
- Enhanced features with fallbacks
- Performance improvements
- Bug fixes
- Visual refinements that respect existing parameters

### Breaking Changes

❌ Require new library versions:

- Changed parameter behavior
- Removed options
- Modified default values
- Restructured content handling
- Updated minimum requirements

## Making Major Updates: A Practical Example

When you need to make substantial changes to your marketing library, follow these steps:

1. Create a new library version:

```bash
yarn new:module --name MarketingLibraryV2
```

2. Copy and enhance components:

- Copy relevant components from your original library
- Make your enhancements in the new version
- Add new components as needed:

```bash
yarn new:component --name NewFeature --module MarketingLibraryV2
```

3. Develop and test thoroughly:

- Use development branches for your work
- Test extensively with Uniweb's DevMode
- Verify all features and parameters work as expected

4. Release when ready:

- Review all changes carefully
- Merge to main only when fully tested
- Monitor the initial deployments

## Supporting Multiple Versions

### Documentation

Maintain clear documentation for each version:

- What's new
- What's changed
- Migration guides
- When to upgrade

### Migration Support

Help users transition:

- Provide upgrade paths
- Document parameter mappings
- Offer migration scripts when possible
- Support gradual transitions

## When to Create New Versions

Create a new library version when:

- Making breaking changes
- Significantly altering behavior
- Adding major new features
- Changing parameter effects
- Updating minimum requirements

Continue with existing library for:

- Bug fixes
- Performance improvements
- Minor enhancements
- Compatible additions
- Visual refinements

## Conclusion

Uniweb's live update system is powerful, offering seamless deployment and updates. Use this power wisely:

1. Work on development branches
2. Create new libraries for major changes
3. Respect existing implementations
4. Support gradual transitions
5. Document everything clearly

Remember: Your components are part of living websites. Manage updates thoughtfully to maintain trust and reliability.

