const fs = require('fs');
const path = require('path');
const defaultConfig = require('./default/psb.config');
const psb = require('./psb');

let config = null;
const configName = 'psb.config';
const isCustomConfigExist = fs.existsSync(configName);

if (isCustomConfigExist) {
    const workingDir = process.env.PWD;
    config = require(path.join(workingDir, configName));
} else {
    config = defaultConfig;
}

try {
    const arg = process.argv[2];
    psb[arg](config);
} catch {
    throw new Error(`Unexpected argument: ${arg}`);
}