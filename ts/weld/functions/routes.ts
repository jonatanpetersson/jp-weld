import { Component } from '../model/types';

export function hasRoutes(components: Component, html: string): boolean {
  let hasRoutes = false;
  Object.keys(components).forEach((component) => {
    const componentName = component.match(/\w+/i)?.[0];
    const routeString = '<Route component="' + componentName + '" />';
    const routeDefaultString =
      '<Route component="' + componentName + '" DefaultRoute />';
    const linkString = 'loadComponent="' + componentName + '"';

    if (
      componentName &&
      (html.includes(routeString) || html.includes(routeDefaultString)) &&
      html.includes(linkString)
    ) {
      hasRoutes = true;
    }
  });
  return hasRoutes;
}

export function buildRoutes(
  components: Component,
  html: string
): { html: string; routes: Component } {
  let routes: Component = {};
  let match = true;
  while (match === true) {
    match = false;
    Object.keys(components).forEach((component) => {
      const componentName = component.match(/\w+/i)?.[0];
      const routeString = '<Route component="' + componentName + '" />';
      const routeDefaultString =
        '<Route component="' + componentName + '" DefaultRoute />';
      const routeStringReplacement = `<div data-routecomponent="${componentName}" data-routenotmounted style="visibility: hidden;"></div>`;
      const routeDefaultStringReplacement = components[component];
      const linkString = 'loadComponent="' + componentName + '"';
      const linkStringReplacement = `data-routelink="${componentName}" onclick="loadRouteComponent(event, '${componentName}')"`;

      if (
        componentName &&
        (html.includes(routeString) || html.includes(routeDefaultString)) &&
        html.includes(linkString)
      ) {
        routes[componentName] = components[component];
        html = html.replace(linkString, linkStringReplacement);
        if (html.includes(routeString)) {
          html = html.replace(routeString, routeStringReplacement);
        }
        if (html.includes(routeDefaultString)) {
          html = html.replace(
            routeDefaultString,
            routeDefaultStringReplacement
          );
        }
        delete components[component];
        match = true;
      }
    });
  }
  return { html, routes };
}

// Temporary hack solution for necessary global vars
let currentRoute: string = '';
let routes: Component = {};

export function loadRouteComponent(event: any, component: string) {
  event.preventDefault();

  currentRoute = component;
  let shouldReload = true;
  const elements = document.querySelectorAll(
    '[data-routecomponent]'
  ) as unknown as HTMLElement[];

  elements.forEach((el) => {
    const tempWrapper = document.createElement('div');
    const routeComponent = el.dataset.routecomponent;
    if (routeComponent === component) {
      if (el.style.visibility !== 'hidden') {
        shouldReload = false;
        return;
      }
      tempWrapper.innerHTML = routes[component];
      const newElement = tempWrapper.firstChild;
      el.replaceWith(newElement!);
    } else {
      tempWrapper.innerHTML = `<div data-routecomponent="${routeComponent}" style="visibility: hidden;"></div>`;
      const newElement = tempWrapper.firstChild;
      el.replaceWith(newElement!);
    }
  });
  // @ts-ignore
  if (window[component] && shouldReload) {
    // @ts-ignore
    window[component]();
  }
}

export function addRoutesToJS(
  routesString: string,
  loadRouteComponentString: string
) {
  if (routesString && loadRouteComponentString) {
    const currentRouteString: string = `let currentRoute = '';\n`;
    return currentRouteString + routesString + loadRouteComponentString;
  }

  return '';
}
