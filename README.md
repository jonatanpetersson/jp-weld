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
Running `npm run weld -- build` will build and compile your app and export a single `index.html`, `script.js` and `style.css` to a directory `/dist`

### WIP
- Initiating project boilerplate by running `npm run weld -- init`
- Support different environments
- Support for folder structure inside /components
- Make config to enable custom things like input and output directories
