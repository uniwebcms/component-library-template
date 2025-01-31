# Build and Deploy Workflow

This workflow builds modules and makes them publicly available via GitHub Pages using one of two deployment mechanisms.

## Key Behaviors

- When `RELEASE_BRANCH` is empty:
  - Built artifacts go directly to GitHub Pages
  - Each new build replaces previous builds
  - Triggers on every push to main branch

- When `RELEASE_BRANCH` is set:
  - Artifacts are added to specified branch while preserving previous builds
  - Only triggers when code is merged to release branch
  - Maintains history of all deployments

## GitHub Pages Configuration

The "Settings / Build and deployment / Source" setting determines which deployment mechanism is used:

- "GitHub Actions": For when RELEASE_BRANCH is empty - serves latest build output directly
- "Deploy from a branch": For when RELEASE_BRANCH is set - serves from release branch with accumulated builds

Select the appropriate option based on whether you want to preserve deployment history.