import * as fs from 'fs';
import { tryCatch } from './functions/try-catch.js';
import {
  CatchType,
  Dir,
  Init,
  WarningMessage,
  WeldConfig,
} from './model/enums.js';
import { Config } from './model/types.js';

export function init(): void {
  const getConfig = (): Config | undefined =>
    JSON.parse(fs.readFileSync(WeldConfig, 'utf-8'));

  const config: Config | undefined = tryCatch(
    getConfig,
    CatchType.Warning,
    false,
    WarningMessage.WeldConfig
  );

  const sourceDir: string = config?.input || Dir.Source;

  fs.mkdirSync(sourceDir + '/assets/img', { recursive: true });
  fs.mkdirSync(sourceDir + '/Components/Logo', { recursive: true });
  fs.writeFileSync(sourceDir + '/index.html', Init.IndexHtml);
  fs.writeFileSync(sourceDir + '/root.html', Init.RootHtml);
  fs.writeFileSync(sourceDir + '/style.css', Init.StyleCss);
  fs.writeFileSync(sourceDir + '/script.js', Init.ScriptJs);
  fs.writeFileSync(sourceDir + '/assets/img/weld.svg', Init.Svg);
  fs.writeFileSync(sourceDir + '/Components/Base.html', Init.BaseHtml);
  fs.writeFileSync(sourceDir + '/Components/Base.css', Init.BaseCss);
  fs.writeFileSync(sourceDir + '/Components/Base.js', Init.BaseJs);
  fs.writeFileSync(sourceDir + '/Components/Logo/Logo.html', Init.LogoHtml);
  fs.writeFileSync(sourceDir + '/Components/Logo/Logo.css', Init.LogoCss);
  fs.writeFileSync(sourceDir + '/Components/Logo/Logo.js', Init.LogoJs);
}
