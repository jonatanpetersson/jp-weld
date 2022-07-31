import * as fs from 'fs';
import { Component, Components, Config } from './model/types.js';
import {
  Base,
  Dir,
  File,
  FileFormat,
  Strings,
  CatchType,
  WarningMessage,
  WeldConfig,
  Router,
} from './model/enums.js';
import { tryCatch } from './functions/try-catch.js';

export function build(): void {
  // Expressions

  const isFolder = (item: string): boolean =>
    !(
      item.includes(FileFormat.Html) ||
      item.includes(FileFormat.Css) ||
      item.includes(FileFormat.Js)
    );

  const getConfig = (): Config | undefined =>
    JSON.parse(fs.readFileSync(WeldConfig, 'utf-8'));

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
    while (match) {
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

  // Consts and calls

  const config: Config | undefined = tryCatch(
    getConfig,
    CatchType.Warning,
    false,
    WarningMessage.WeldConfig
  );

  const sourceDir: string = config?.input || Dir.Source;
  const destinationDir: string = config?.output || Dir.Destination;
  const netlifyRedirects: boolean = config?.netlify?._redirects || false;

  const initialComponents: Components = {
    [FileFormat.Html]: {
      index: getComponentContent(sourceDir + '/' + File.Index),
      root: getComponentContent(sourceDir + '/' + File.Root),
    },
    [FileFormat.Css]: {
      style: getComponentContent(sourceDir + '/' + File.Style),
    },
    [FileFormat.Js]: {
      script: getComponentContent(sourceDir + '/' + File.Script),
    },
  };

  const components: Components = getComponents(
    sourceDir + '/' + Dir.Components,
    initialComponents
  );

  const indexContent: string = buildHtml(components[FileFormat.Html]);
  const styleContent: string = buildCss(components[FileFormat.Css]);
  const scriptContent: string = buildJs(components[FileFormat.Js]);

  fs.mkdirSync(destinationDir, { recursive: true });
  fs.writeFileSync(destinationDir + '/' + File.Index, indexContent);
  fs.writeFileSync(destinationDir + '/' + File.Style, styleContent);
  fs.writeFileSync(destinationDir + '/' + File.Script, scriptContent);
  fs.cpSync(sourceDir + '/' + Dir.Assets, destinationDir + '/' + Dir.Assets, {
    recursive: true,
  });
  if (netlifyRedirects) {
    fs.copyFileSync(sourceDir + '/_redirects', destinationDir + '/_redirects');
  }
}
