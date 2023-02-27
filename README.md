# MMM-React-Canvas-ts
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)
![Build status](https://github.com/djey47/MMM-React-Canvas-ts/actions/workflows/ci.yml/badge.svg?branch=master&event=push)

MichMich's MagicMirror2 module template for convenient development with Typescript language and React library.

# Presentation and features

![ReactDevTools-Sample Component](https://github.com/djey47/MMM-React-Canvas-ts/raw/master/doc/ReactDevTools-Sample%20Component.png)

## Highlights

### Technical

- **Node-js based**: requires node v18 or higher; heavily relies on NPM

- **Typescript support**: for modern, safer language features with type checking (4.9.4). Required MM2 typings included

- **Full React support with SASS preprocessor support**: to make UI creation lots easier and fun (18.2.0).

### MagicMirror features integration and enhancements

- **Configuration**: module configuration is accessible to any component via React Context provider

- **Notifications**: makes it possible to get your client components subscribed to particular MM2 notifications and thus receive their data via props. It uses a React hook - see `Subscribed` component to know how

- **Logging**: provides method to log only in debug mode for development-related messages (client side only for now)

- **Helper lifecycle hooks**: allows to interact with some MM2 module helper lifecycle methods, as `socketNotificationReceived`, `start`, `stop`. 

## Useful toolings

### Module / helper builds, in development and production (optimized)
Handled by Webpack:
- `npm run build` for a development bundle
- `npm run build-prod` for a production-optimized bundle

### Code linting
Provides ESLint, Stylelint checks: `npm run lint`

### Code formatter
*for ts/tsx files only*

- `npm run prettier:check` (preview)
- `npm run prettier:write` (to process reformatting)

### Unit tests
- `npm test`
- `npm run test:watch` (for interactive mode)

### Development with auto-rebuild
*for client side*

`npm run dev` will watch for changes and automatically issue a module bundle rebuild

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

# Developing your own module

First of all, start MagicMirror; you might want to update default MM2 configuration to allow connecting to mirror front-end from your development PC. This will provide you better tooling compared to electron, with the ability to install popular extensions as *React Developer Tools*.

- **Manual way (client, helper)**: when changes have been made on module code, run `npm run build:module` to generate bundles for both client and helper sides.

- **Watch mode (client only)**: by using `npm run dev`, any change on client side files will issue a bundle rebuild; it's particularly useful when developing React components.

And finally reload MM2 front-end in your browser or electron (F5, CTRL+R...).

## Note about Node helper reloading
MM2 does not handle reloading of the `node_helper.js` file alone, so no change on it will be taken into account unless MM2 is restarted. A solution would be to use PM2 (or similar) to trigger a restart. See [one of related issues](https://github.com/MichMich/MagicMirror/issues/549).
