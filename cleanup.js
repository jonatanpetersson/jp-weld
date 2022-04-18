import * as fs from 'fs';
export function cleanUp() {
    fs.rmSync('build.js');
    fs.rmSync('init.js');
    fs.rmSync('weld.js');
    fs.rmSync('cleanup.js');
    fs.rmSync('enums.js');
    fs.rmSync('types.js');
}
