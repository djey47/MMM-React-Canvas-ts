# MMM-React-Canvas-ts
[ ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)
[![Codeship Status for djey47/MMM-React-Canvas-ts](https://app.codeship.com/projects/0a18b0a8-549a-4dc0-90ba-8c4a4da16876/status?branch=master)](https://app.codeship.com/projects/462045)

MichMich's MagicMirror2 module template for convenient development with Typescript language and React library.

# Presentation and features

![ReactDevTools-Sample Component](https://github.com/djey47/MMM-React-Canvas-ts/raw/master/docs/ReactDevTools-Sample%20Component.png)

## Highlights

Requires node v18.12.1 or higher.

### Typescript support
for modern, safer language features wuth type checking (4.9.4)

### Full React support
to make UI creation lots easier and fun (18.2.0)

### SASS preprocessor support
(.scss files)

## Useful toolings

### Module / helper builds, in development and production
handled by Webpack: `npm run build` or `npm run build-prod`

### Interactive dependency upgrades
thanks to *npm-check* module: `npm run upgrade-interactive`

### Code linting
provides ESLint, Stylelint checks: `npm run lint`

#### Stylelint checks for BEM syntax

### Unit tests
with jest runtime: `npm test`, track source changes `npm run jest:watch`

### Secure Git Hooks
at pre-commit and pre-push stages (can be ignored with `--no-verify` switch, but will threaten dozens of kittens...)

# Install

0. Make sure node v18.12.1 or newer is installed
1. Clone repository into `/modules/` inside your MagicMirror folder, with proper module name as directory (git clone to directory MMM-YOUR-MODULE)
2. Run `npm install` inside `/modules/MMM-YOUR-MODULE/` folder
3. Run `npm run init:mmm MMM-YOUR-MODULE`, it will automatically set up package.json for you
4. Update `MODULE_NAME` value in `src/client/module.js` file to use MMM-YOUR-MODULE
5. Run `npm run build`
6. Check that `MMM-YOUR-MODULE.js`, `styles.css` and `node_helper.js` files have been created into current folder
7. Add the module to the MagicMirror config.
