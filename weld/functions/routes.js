export function hasRoutes(components, html) {
    let hasRoutes = false;
    Object.keys(components).forEach((component) => {
        var _a;
        const componentName = (_a = component.match(/\w+/i)) === null || _a === void 0 ? void 0 : _a[0];
        const routeString = '<Route component="' + componentName + '" />';
        const linkString = 'loadComponent="' + componentName + '"';
        if (componentName &&
            html.includes(routeString) &&
            html.includes(linkString)) {
            hasRoutes = true;
        }
    });
    return hasRoutes;
}
export function buildRoutes(components, html) {
    let routes = {};
    let match = true;
    while (match === true) {
        match = false;
        Object.keys(components).forEach((component) => {
            var _a;
            const componentName = (_a = component.match(/\w+/i)) === null || _a === void 0 ? void 0 : _a[0];
            const routeString = '<Route component="' + componentName + '" />';
            const routeStringReplacement = `<div data-routecomponent="${componentName}" data-routenotmounted style="visibility: hidden;"></div>`;
            const linkString = 'loadComponent="' + componentName + '"';
            const linkStringReplacement = `data-routelink="${componentName}" onclick="loadRouteComponent(event, '${componentName}')"`;
            if (componentName &&
                html.includes(routeString) &&
                html.includes(linkString)) {
                routes[componentName] = components[component];
                html = html.replace(linkString, linkStringReplacement);
                html = html.replace(routeString, routeStringReplacement);
                delete components[component];
                match = true;
            }
        });
    }
    return { html, routes };
}
let routes = {};
export function loadRouteComponent(event, component) {
    event.preventDefault();
    const elements = document.querySelectorAll('[data-routecomponent]');
    elements.forEach((el) => {
        const tempWrapper = document.createElement('div');
        const routeComponent = el.dataset.routecomponent;
        if (routeComponent === component) {
            tempWrapper.innerHTML = routes[component];
            const newElement = tempWrapper.firstChild;
            el.replaceWith(newElement);
        }
        else {
            tempWrapper.innerHTML = `<div data-routecomponent="${routeComponent}" style="visibility: hidden;"></div>`;
            const newElement = tempWrapper.firstChild;
            el.replaceWith(newElement);
        }
    });
    // @ts-ignore
    window[component]();
}
export function addRoutesToJS(routesString, loadRouteComponentString) {
    if (routesString && loadRouteComponentString) {
        return routesString + loadRouteComponentString;
    }
    return '';
}
