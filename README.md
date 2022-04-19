# jp-weld

weld is a minimal component framework and web compiler for vanilla JS web applications.  
Just a side project that kind of got started while building something else, so decided to export it into its own thing.

## Install

`npm i -D jp-weld`

## Setup and usage

- Initialize a boilderplate by running `npx weld init`.

- In your project root folder you need this folder structure:

```
|-- /src
  |-- /assets (will be exported as is)
  |-- index.html (requires a <div class="root"></div> in the body tag)
  |-- root.html (inject first parent component here)
  |-- script.js
  |-- style.css
  |-- /Components
      |-- /ComponentName
        |-- ComponentName.html
        |-- ComponentName.js
        |-- ComponentName.css
```

weld is now also directory agnostic, meaning you can put any component in any sub directory inside /Components.
Components must be injected in each html as `<ComponentName />`, using the same name as the file(s).

### Compiling

- Run `npx weld build` to build and compile your app and to a single `index.html`, `script.js` and `style.css` and if provided `/assets` to the directory `/dist` in your root directory.

## Development

### Upcoming - Slice 3
- Error handling (pretty much none atm...)
- Make config to enable custom things like input and output directories
- Suggestions?

### WIP - Slice 2

- ✅ Rewrite project in TS
- ✅ Initiating project boilerplate by running `npx weld init`
- ✅ Support for custom folder structure inside /Components
- Data bidning of some sort so that components can be reusable and customizable

### Complete

Slice 1

- Develop basic but working component system
- Implement compiling functionality
