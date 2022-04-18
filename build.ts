import { Component, Components } from './types.js';
import { Base, Dir, File, FileFormat, Strings } from './enums.js';
import * as fs from 'fs';

export function build(): void {
  // Expressions

  const isFolder = (item: string): boolean =>
    !(
      item.includes(FileFormat.Html) ||
      item.includes(FileFormat.Css) ||
      item.includes(FileFormat.Js)
    );

  const getComponentContent = (path: string): string =>
    fs.readFileSync(path, 'utf-8');

  const getComponents = (path: string, components: Components): Components => {
    const items = getItemsInFolder(path);

    items.forEach((item) => {
      const childPath = path + '/' + item;

      if (isFolder(item)) {
        getComponents(childPath, components);
      }
      if (!isFolder(item)) {
        const fileFormat: string = item.split('.')[1];
        const selector: string = '<' + item.split('.')[0] + ' />';
        components[fileFormat][selector] = getComponentContent(childPath);
      }
    });
    return components;
  };

  const getItemsInFolder = (path: string): string[] => fs.readdirSync(path);

  const initialComponents: Components = {
    [FileFormat.Html]: {
      index: getComponentContent(Dir.Source + '/' + File.Index),
      root: getComponentContent(Dir.Source + '/' + File.Root),
    },
    [FileFormat.Css]: {
      style: getComponentContent(Dir.Source + '/' + File.Style),
    },
    [FileFormat.Js]: {
      script: getComponentContent(Dir.Source + '/' + File.Script),
    },
  };

  const buildHtml = (components: Component): string => {
    let html = components[Base.Index].replace(
      Strings.DivRoot,
      Strings.DivRoot + components[Base.Root]
    );
    delete components[Base.Index];
    delete components[Base.Root];

    let match: boolean = true;
    while (match === true) {
      match = false;
      Object.keys(components).forEach((component) => {
        if (html.includes(component)) {
          html = html.replace(component, components[component]);
          match = true;
        }
      });
    }
    return html;
  };

  const buildCss = (components: Component): string => {
    let css: string = '';
    Object.keys(components).forEach((c) => (css += components[c]));
    return css;
  };

  const buildJs = (components: Component): string => {
    let js: string = '';
    Object.keys(components).forEach((c) => (js += components[c]));
    return js;
  };

  // Calls

  const components: Components = getComponents(
    Dir.Source + '/' + Dir.Components,
    initialComponents
  );

  const html: string = buildHtml(components[FileFormat.Html]);
  const css: string = buildCss(components[FileFormat.Css]);
  const js: string = buildJs(components[FileFormat.Js]);

  fs.mkdirSync(Dir.Destination, { recursive: true });
  fs.writeFileSync(Dir.Destination + '/' + File.Index, html);
  fs.writeFileSync(Dir.Destination + '/' + File.Style, css);
  fs.writeFileSync(Dir.Destination + '/' + File.Script, js);
  fs.cpSync(Dir.Source + '/' + Dir.Assets, Dir.Destination + '/' + Dir.Assets, {
    recursive: true,
  });
}
