TODO-FIXME
==========

# TODO
- Better MM2 interface doc
  => see https://docs.magicmirror.builders/development/core-module-file.html#module-instance-methods
- React HOC for notifications
  [x] Basic client implementation
  - Helper implementation
  - Debug logs
  - Support for different handlers per subscription?
- Helper logging to electron debug tools via socket notification
- Unit tests

# FIXME
- Fix systematic notif handler switch
- Helper implementation: bundle does not seem to be read by MM2
  => works with plain js
  => helper logs in terminal atm
  => missing set notif message from module to helper...
    => Also fix the legacy js template
- Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
  => migrate to create root in client part

# DONE
- ERROR in /home/djey/dev/perso/MMM-React-Canvas-ts/src/server/helper.ts
./src/server/helper.ts 8:28-41
[tsl] ERROR in /home/djey/dev/perso/MMM-React-Canvas-ts/src/server/helper.ts(8,29)
      TS2307: Cannot find module 'node_helper' or its corresponding type declarations.
  => prevents production build, find way of declaring MM2-provided module
