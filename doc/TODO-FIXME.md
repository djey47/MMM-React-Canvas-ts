TODO-FIXME
==========

# TODO
- Provide module configuration to Main component
  => (see MMM-LKY-TIC implementation)
  => Use React Context??
- React HOC for notifications:
  [x] Basic client implementation
  [x] Helper implementation
  [x] Debug logs
  - Support for different handlers per subscription?
- Helper logging to electron debug tools via socket notification

# FIXME

# DONE
- [x] Fix systematic notif handler switch
- [x] MM2 integrated logger does not support varargs
  => fix all signatures
- [x] Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
  => migrate to create root in client part
  => update unit test in renderer
- [x] add prettier as formatter
- [x] Better MM2 interface doc
  => see https://docs.magicmirror.builders/development/core-module-file.html#module-instance-methods
- [x] ERROR in /home/djey/dev/perso/MMM-React-Canvas-ts/src/server/helper.ts
./src/server/helper.ts 8:28-41
[tsl] ERROR in /home/djey/dev/perso/MMM-React-Canvas-ts/src/server/helper.ts(8,29)
      TS2307: Cannot find module 'node_helper' or its corresponding type declarations.
  => prevents production build, find way of declaring MM2-provided module
- [x] Unit tests
- [x] - Helper implementation: bundle does not seem to be read by MM2
  => works with plain js
  => helper logs in terminal atm
  => missing set notif message from module to helper...
    => Also fix the legacy js template
