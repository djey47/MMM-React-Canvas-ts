# MMM-React-Canvas-ts
[ ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)
[![Codeship Status for djey47/MMM-React-Canvas-ts](https://app.codeship.com/projects/0a18b0a8-549a-4dc0-90ba-8c4a4da16876/status?branch=master)](https://app.codeship.com/projects/462045)

MichMich's MagicMirror2 module template for convenient development with Typescript language and React library.

# Presentation and features

![ReactDevTools-Sample Component](https://github.com/djey47/MMM-React-Canvas-ts/raw/master/docs/ReactDevTools-Sample%20Component.png)

## Highlights

Requires node v18 or higher.

### Typescript support
For modern, safer language features with type checking (4.9.4)

### Full React support
To make UI creation lots easier and fun (18.2.0)

### SASS preprocessor support
(.scss files)

## Useful toolings

### Module / helper builds, in development and production
Handled by Webpack: `npm run build` or `npm run build-prod`

### Code linting
Provides ESLint, Stylelint checks: `npm run lint`

### Code formatter
*for ts/tsx files only*

`npm run prettier:check` (preview) and `npm run prettier:write` (to process reformatting)

### Unit tests
`npm test` or `npm run test:watch` (for interactive mode)

# Install in 10 steps

0. Make sure node v18.12.1 or newer is installed
1. Clone repository
2. Copy directory and all contents *except .git directory* into location of your choice BUT NOT under MagicMirror install!
3. If not done at previous step, rename `MMM-REACT-CANVAS-TS` parent directory to match module name e.g  `MMM-YOUR-MODULE`
4. Run `npm install` inside `MMM-YOUR-MODULE` folder
5. Run `npm run init:mmm MMM-YOUR-MODULE`, it will automatically set up package.json for you
6. Update `MODULE_NAME` value in `src/client/module.ts` file to use `MMM-YOUR-MODULE`
7. Run `npm run build:module` (development) or `npm run build:module-prod` (optimized)
8. Check that `MMM-YOUR-MODULE.js`, `styles.css` and `node_helper.js` files have been created into current folder
9. Create symbolic link from `/modules/` inside your MagicMirror folder, to module repository directory: e.g `ln -s ~/dev/MMM-YOUR-MODULE/`
10. Add the module to MagicMirror config.
