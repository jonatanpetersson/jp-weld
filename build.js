import fs from 'fs';

export function build() {

  const buildHtml = (components) => {
    let html = components['index'].replace('<div class="root">', '<div class="root">' + components['root']);
    delete components['index'];
    delete components['root'];
  
    let match = true;;
    while (match === true) {
      match = false;
      Object.keys(components).forEach(component => {
        if (html.includes(component)) {
          html = html.replace(component, components[component]);
          match = true;
        }
      })
    }
    return html;
  }
  
  const buildCss = (components) => {
    let css = '';
    Object.keys(components).forEach(c => css += components[c]);
    return css;
  }
  
  const buildJs = (components) => {
    let js = '';
    Object.keys(components).forEach(c => js += components[c]);
    return js;
  }
  
  const getComponentContent = path => fs.readFileSync(path, 'utf-8');
  const getComponents = (path, components) => {
    const items = getItemsInFolder(path);

    items.forEach(item => {
      const childPath = path + '/' + item;

      if (isFolder(item)) {
        getComponents(childPath, components);
      }
      
      if (!isFolder(item)) {
        const fileFormat = item.split('.')[1];
        const selector = '<' + item.split('.')[0] + ' />';

        components[fileFormat][selector] = getComponentContent(childPath);
      }
    })
    return components;
  }
  const getItemsInFolder = path => fs.readdirSync(path);
  const isFolder = item => !(item.includes('.html') || item.includes('.css') || item.includes('.js'));

  const initialComponents = {
    html: {
      index: getComponentContent('src/index.html'),
      root: getComponentContent('src/root.html'),
    },
    css: {
      style: getComponentContent('src/style.css'),
    },
    js: {
      script: getComponentContent('src/script.js'),
    }
  }

  const components = getComponents('src/components', initialComponents);
  const html = buildHtml(components['html']);
  const css = buildCss(components['css']);
  const js = buildJs(components['js']);
  
  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/index.html', html);
  fs.writeFileSync('dist/style.css', css);
  fs.writeFileSync('dist/script.js', js);
  fs.cpSync('src/assets', 'dist/assets', {recursive: true});
}
