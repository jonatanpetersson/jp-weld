import { Base, Dir, File, FileFormat, Strings, CatchType, WarningMessage, WeldConfig, } from './model/enums.js';
import * as fs from 'fs';
import { tryCatch } from './functions/try-catch.js';
export function build() {
    // Expressions
    var _a;
    const isFolder = (item) => !(item.includes(FileFormat.Html) ||
        item.includes(FileFormat.Css) ||
        item.includes(FileFormat.Js));
    const getConfig = () => JSON.parse(fs.readFileSync(WeldConfig, 'utf-8'));
    const getComponentContent = (path) => fs.readFileSync(path, 'utf-8');
    const getComponents = (path, components) => {
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
    };
    const getItemsInFolder = (path) => fs.readdirSync(path);
    const buildHtml = (components) => {
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
        return html;
    };
    const buildCss = (components) => {
        let css = '';
        Object.keys(components).forEach((c) => (css += components[c]));
        return css;
    };
    const buildJs = (components) => {
        let js = '';
        Object.keys(components).forEach((c) => (js += components[c]));
        return js;
    };
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
    fs.writeFileSync(destinationDir + '/' + File.Script, scriptContent);
    fs.cpSync(sourceDir + '/' + Dir.Assets, destinationDir + '/' + Dir.Assets, {
        recursive: true,
    });
    if (netlifyRedirects) {
        fs.copyFileSync(sourceDir + '/_redirects', destinationDir + '/_redirects');
    }
}
