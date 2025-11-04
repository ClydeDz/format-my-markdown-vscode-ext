# Contributing / Development Guide

## Requirements

- VSCode version 1.74.0 or higher

## Development

1. Make required changes to your code base.
2. Open this folder in VSCode
3. Press `F5` to start debugging
4. In the Extension Development Host window, open a markdown file
5. Select some text and right-click to see the context menu options

## Testing it locally

1. Package the extension:

   ```bash
   npm run package
   ```

1. Install the generated `.vsix` file:
   - Open VSCode
   - Go to Extensions view (`Cmd+Shift+X` or `Ctrl+Shift+X`)
   - Click the `...` menu at the top
   - Select "Install from VSIX..."
   - Choose the generated `.vsix` file

## Publishing

1. Login to VS Marketplace using the publisher ID:

   ```bash
   npx vsce login clydedsouza
   ```

   This will ask for the PAT to login. PAT is generated from [here](https://clydedsouza.visualstudio.com/_usersSettings/tokens). PAT has custom defined permission of "Marketplace" &rarr; "Manage".

1. Update the version in package.json file since we cannot publish with the same version.

1. Build and package the extension:

   ```bash
   npm run build
   ```

   If there are any linting or prettier errors, fix that and try rebuilding.

1. Publish the extension:

   ```bash
   npm run publish

   ```

1. Extension should live after a few minutes on [this page](https://marketplace.visualstudio.com/items?itemName=clydedsouza.format-my-markdown).

## License

MIT
