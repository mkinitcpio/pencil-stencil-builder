const fs = require('fs');
const path = require('path');
const defaultConfig = require('./src/default/psb.config');
const psb = require('./src/psb');
const merge = require('deepmerge');

let config = null;
const configName = 'psb.config.json';
const isCustomConfigExist = fs.existsSync(configName);

if (isCustomConfigExist) {
    const workingDir = process.cwd();
    config = require(path.join(workingDir, configName));
    config = merge(defaultConfig, config);
} else {
    config = defaultConfig;
}

const arg = process.argv[2];
if (psb[arg]) {
    psb[arg](config);
} else {
    throw new Error(`Unexpected argument ${arg}`);
}