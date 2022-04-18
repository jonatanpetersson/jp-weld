import * as fs from 'fs';
import { Init } from './enums.js';
export function init() {
    fs.mkdirSync('src/assets/img', { recursive: true });
    fs.mkdirSync('src/Components/Logo', { recursive: true });
    fs.writeFileSync('src/index.html', Init.IndexHtml);
    fs.writeFileSync('src/root.html', Init.RootHtml);
    fs.writeFileSync('src/style.css', Init.StyleCss);
    fs.writeFileSync('src/script.js', Init.ScriptJs);
    fs.writeFileSync('src/assets/img/weld.svg', Init.Svg);
    fs.writeFileSync('src/Components/Base.html', Init.BaseHtml);
    fs.writeFileSync('src/Components/Base.css', Init.BaseCss);
    fs.writeFileSync('src/Components/Base.js', Init.BaseJs);
    fs.writeFileSync('src/Components/Logo/Logo.html', Init.LogoHtml);
    fs.writeFileSync('src/Components/Logo/Logo.css', Init.LogoCss);
    fs.writeFileSync('src/Components/Logo/Logo.js', Init.LogoJs);
}
