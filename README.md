# jp-weld

weld is a miniature component framework and web compiler for simpler web applications.  
Just an idea that arose while starting building a new portfolio.

## Install

`npm i jp-weld`

## Usage
### Requirements
In project root folder you need this folder structure:
```
|- /src
  |- /assets (will be exported as is)
  |- index.html (requires a <div class="root"></div> in the body tag)
  |- root.html (inject first parent component here)
  |- script.js
  |- style.css
  |- /components
    |- ComponentName.html
    |- ComponentName.js
    |- ComponentName.css
```
Components must be injected in each html as `<ComponentName />`

### Compiling
* Add `"weld": "node node_modules/jp-weld/weld.js"` to the scripts in your package.json.  
* Run `npm run weld -- build` to build and compile your app and export a single `index.html`, `script.js` and `style.css` and if provided `/assets` to the directory `/dist` in your root directory.

### WIP
- Rewrite project in TS, add support for TS
- Initiating project boilerplate by running `npm run weld -- init`
- Support different environments
- Support for folder structure inside /components
- Make config to enable custom things like input and output directories
