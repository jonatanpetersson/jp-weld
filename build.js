import fs from 'fs';

export function build() {
  const getString = path => fs.readFileSync(path, 'utf-8', (err, data) => data);
  const getComponentsList = path => fs.readdirSync(path, (err, data) => data);
  
  const loadComponents = () => {
    const components = {};
    components['html'] = {};
    components['css'] = {};
    components['js'] = {};
    components['html']['index'] = getString('src/index.html');
    components['html']['root'] = getString('src/root.html');
    components['js']['script'] = getString('src/script.js');
    components['css']['style'] = getString('src/style.css');
  
    getComponentsList('src/components').map(file => {
      if (file.split('.')[1] === 'html') {
        let selector = '<' + file.split('.')[0] + ' />';
        const content = getString('src/components/' + file);
        components['html'][selector] = content;
      }
      if (file.split('.')[1] === 'js') {
        let selector = file.split('.')[0];
        const content = getString('src/components/' + file);
        components['js'][selector] = content;
      }
      if (file.split('.')[1] === 'css') {
        let selector = file.split('.')[0];
        const content = getString('src/components/' + file);
        components['css'][selector] = content;
      }
    });
  
    return components;
  }
  
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
    
  const components = loadComponents();
  const html = buildHtml(components['html']);
  const css = buildCss(components['css']);
  const js = buildJs(components['js']);
  
  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/index.html', html);
  fs.writeFileSync('dist/style.css', css);
  fs.writeFileSync('dist/script.js', js);
  fs.cpSync('src/assets', 'dist/assets', {recursive: true});
}

