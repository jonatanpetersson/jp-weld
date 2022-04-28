# jp-weld

Weld is a minimalistic component framework and web compiler for simpler frontend web applications.  
Just a side project that kind of got started while building something else, so decided to export it into its own thing.

## Install

`npm i -D jp-weld`

## Setup and usage

### weldconfig.json

Create a `weldconfig.json` in the root directory of your project. It is optional but currently supports the following settings:

```
{
  "input": "src",
  "output": "dist",
  "netlify": {
    "_redirects": false
  }
}

```

`input` specifies the path you wish to use the root of your project. Default is `src`.  
`output` specifies the path to which you wish to compile your project. Default is `dist`.  
`_redirects` tells Weld to look for a netlify \_redirects file and copy it to your output directory on compilation. Default is `false`.

### Boilerplate

Initialize a boilderplate by running `npx weld init`.

### Usage

In your project root folder you need this folder structure:

```
|-- /src
  |-- /assets     (will be exported as is)
  |-- index.html  (requires a <div class="root"></div> in the body tag)
  |-- root.html   (inject first parent component here)
  |-- script.js
  |-- style.css
  |-- /Components
      |-- /ComponentName
        |-- ComponentName.html
        |-- ComponentName.js
        |-- ComponentName.css
```

Weld is also directory agnostic, meaning you can put any component in any sub directory inside /components.
Components must be injected in each html as `<ComponentName />`, using the same name as the file.
Initiating the boilerplate explained above will help you understand how it works.

### Compiling

- Run `npx weld build` to build and compile your app and to a single `index.html`, `script.js` and `style.css` and if provided `/assets` to your output directory.

## Development

### Upcoming - Slice 3

- Implement further error handling (pretty much none atm...)
- Allow for some kind of data-binding to make components more flexible and reusable
- More config settings: Make files to copy on compilation generic.
- Suggestions?

### WIP

- Planning Slice 3

### Complete

Slice 2

- Rewrite project in TS
- Initiating project boilerplate by running `npx weld init`
- Support for custom folder structure inside /components
- Make config to enable custom things like input and output directories
- Started off graceful error handling on the congfig file.

Slice 1

- Develop basic but working component system
- Implement compiling functionality
