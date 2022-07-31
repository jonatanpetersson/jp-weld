import { Component, Components } from './types.js';
import { Base, Dir, File, FileFormat, Router, Strings } from './enums.js';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

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
        const fileFormat: FileFormat = item.split('.')[1] as FileFormat;
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

  const routes: Component = {};
  let hadRoutes = false;

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

    match = true;
    while (match === true) {
      match = false;
      Object.keys(components).forEach((component) => {
        const componentName = component.match(/\w+/i)?.[0];
        const routeString = '<Route component="' + componentName + '" />';
        const routeStringReplacement = `<div data-routecomponent="${componentName}" data-routenotmounted style="visibility: hidden;"></div>`;
        const linkString = 'loadComponent="' + componentName + '"';
        const linkStringReplacement = `data-routelink="${componentName}" onclick="loadRouteComponent(event, '${componentName}')"`;

        if (
          componentName &&
          html.includes(routeString) &&
          html.includes(linkString)
        ) {
          routes[componentName] = components[component];
          html = html.replace(linkString, linkStringReplacement);
          html = html.replace(routeString, routeStringReplacement);
          delete components[component];
          hadRoutes = true;
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

    if (hadRoutes) {
      let routesString = `const routes = {`;
      Object.keys(routes).forEach((r) => {
        routesString += `${r}: '${routes[r].trim()}',`;
      });
      routesString += '};';
      js += routesString + Router.LoadFunction;
    }

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
