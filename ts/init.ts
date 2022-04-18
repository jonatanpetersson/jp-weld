import * as fs from 'fs';
import { Init } from './enums.js';

export function init(): void {
  fs.mkdirSync('src/assets/img', { recursive: true });
  fs.mkdirSync('src/components/Base/Image', { recursive: true });
  fs.writeFileSync('src/index.html', Init.IndexHtml);
  fs.writeFileSync('src/root.html', Init.RootHtml);
  fs.writeFileSync('src/style.css', Init.StyleCss);
  fs.writeFileSync('src/script.js', Init.ScriptJs);
  fs.writeFileSync('src/assets/img/weld.svg', Init.Svg);
  fs.writeFileSync('src/components/Base/Base.html', Init.BaseHtml);
  fs.writeFileSync('src/components/Base/Base.css', Init.BaseCss);
  fs.writeFileSync('src/components/Base/Base.js', Init.BaseJs);
  fs.writeFileSync('src/components/Base/Image/Image.html', Init.ImageHtml);
  fs.writeFileSync('src/components/Base/Image/Image.css', Init.ImageCss);
  fs.writeFileSync('src/components/Base/Image/Image.js', Init.ImageJs);
}
