#!/usr/bin/env node
import { build } from './build.js';
import { Run } from './enums.js';
import { init } from './init.js';
const scriptToRun = process.argv[2];
switch (scriptToRun) {
    case Run.Init:
        init();
        break;
    case Run.Build:
        build();
        break;
    case Run.Dev:
        init();
        build();
        break;
}
