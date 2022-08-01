import * as fs from 'fs';
import { Base, Dir, File, FileFormat, Strings, CatchType, WarningMessage, WeldConfig, } from './model/enums.js';
import { tryCatch } from './functions/try-catch.js';
import { addRoutesToJS, buildRoutes, hasRoutes, loadRouteComponent, } from './functions/routes.js';
import util from 'util';
export function build() {
    // Expressions
    var _a;
    let routesString;
    let loadRouteComponentString;
    function isFolder(item) {
        return !(item.includes(FileFormat.Html) ||
            item.includes(FileFormat.Css) ||
            item.includes(FileFormat.Js));
    }
    function getConfig() {
        return JSON.parse(fs.readFileSync(WeldConfig, 'utf-8'));
    }
    function getComponentContent(path) {
        return fs.readFileSync(path, 'utf-8');
    }
    function getComponents(path, components) {
        const items = getItemsInFolder(path);
        items.forEach((item) => {
            const childPath = path + '/' + item;
            if (isFolder(item)) {
                getComponents(childPath, components);
            }
            if (!isFolder(item)) {
                const fileFormat = item.split('.')[1];
                const selector = '<' + item.split('.')[0] + ' />';
                components[fileFormat][selector] = getComponentContent(childPath);
            }
        });
        return components;
    }
    function getItemsInFolder(path) {
        return fs.readdirSync(path);
    }
    function buildHtml(components) {
        let html = components[Base.Index].replace(Strings.DivRoot, Strings.DivRoot + components[Base.Root]);
        delete components[Base.Index];
        delete components[Base.Root];
        let match = true;
        while (match) {
            match = false;
            Object.keys(components).forEach((component) => {
                if (html.includes(component)) {
                    html = html.replace(component, components[component]);
                    match = true;
                }
            });
        }
        if (hasRoutes(components, html)) {
            const builtRoutes = buildRoutes(components, html);
            routesString = `\nconst routes = ${util.inspect(builtRoutes.routes)};`;
            loadRouteComponentString = `\n${loadRouteComponent}`;
            html = builtRoutes.html;
        }
        return html;
    }
    function buildCss(components) {
        let css = '';
        Object.keys(components).forEach((c) => (css += components[c]));
        return css;
    }
    function buildJs(components) {
        let js = '';
        Object.keys(components).forEach((c) => (js += components[c]));
        js += addRoutesToJS(routesString, loadRouteComponentString);
        return js;
    }
    // Consts and calls
    const config = tryCatch(getConfig, CatchType.Warning, false, WarningMessage.WeldConfig);
    const sourceDir = (config === null || config === void 0 ? void 0 : config.input) || Dir.Source;
    const destinationDir = (config === null || config === void 0 ? void 0 : config.output) || Dir.Destination;
    const netlifyRedirects = ((_a = config === null || config === void 0 ? void 0 : config.netlify) === null || _a === void 0 ? void 0 : _a._redirects) || false;
    const initialComponents = {
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
    const components = getComponents(sourceDir + '/' + Dir.Components, initialComponents);
    const indexContent = buildHtml(components[FileFormat.Html]);
    const styleContent = buildCss(components[FileFormat.Css]);
    const scriptContent = buildJs(components[FileFormat.Js]);
    fs.mkdirSync(destinationDir, { recursive: true });
    fs.writeFileSync(destinationDir + '/' + File.Index, indexContent);
    fs.writeFileSync(destinationDir + '/' + File.Style, styleContent);
    fs.writeFileSync(destinationDir + '/' + File.Script, scriptContent.trim());
    fs.cpSync(sourceDir + '/' + Dir.Assets, destinationDir + '/' + Dir.Assets, {
        recursive: true,
    });
    if (netlifyRedirects) {
        fs.copyFileSync(sourceDir + '/_redirects', destinationDir + '/_redirects');
    }
}
