import { build } from "./build.js";
import { init } from "./init.js";

const Run = {
  Init: 'init',
  Build: 'build'
}

const scriptToRun = process.argv[2];

switch (scriptToRun) {
  case Run.Init:
    init();
    break;
  case Run.Build:
    build();
    break;
}