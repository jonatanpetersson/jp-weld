# jp-weld

weld is a miniature component framework and web compiler for simpler web applications.  
Just a side project that kind of got started while building something else, so decided to export it into its own thing.

## Install

`npm i jp-weld`

- Add `"weld": "node node_modules/jp-weld/weld.js"` to the scripts in your package.json.
- Initialize a boilderplate by running `npm run weld -- init`

## Usage

### Requirements

In project root folder you need this folder structure:

```
|-- /src
  |-- /assets (will be exported as is)
  |-- index.html (requires a <div class="root"></div> in the body tag)
  |-- root.html (inject first parent component here)
  |-- script.js
  |-- style.css
  |-- /components
      |-- /ComponentName
        |-- ComponentName.html
        |-- ComponentName.js
        |-- ComponentName.css
```

weld is now also directory agnostic, meaning you can put any component in any sub directory inside /components.
Components must be injected in each html as `<ComponentName />`, using the same name as the file.

### Compiling

- Run `npm run weld -- build` to build and compile your app and export a single `index.html`, `script.js` and `style.css` and if provided `/assets` to the directory `/dist` in your root directory.

### WIP - Slice 2

- ✅ Rewrite project in TS
- ✅ Initiating project boilerplate by running `npm run weld -- init`
- Support different environments
- ✅ Support for folder structure inside /components
- Make config to enable custom things like input and output directories

### ✅ Slice 1

- Develop working component system
- Implement compiling
