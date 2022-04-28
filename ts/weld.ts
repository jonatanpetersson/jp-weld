#!/usr/bin/env node

import { build } from './weld/build.js';
import { RunOption } from './weld/model/enums.js';
import { init } from './weld/init.js';

const scriptToRun = process.argv[2];

switch (scriptToRun) {
  case RunOption.Init:
    init();
    break;
  case RunOption.Build:
    build();
    break;
  case RunOption.Dev:
    init();
    build();
    break;
}
