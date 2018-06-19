const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const recursive = require('recursive-readdir');
const fileConfig = { encoding: 'utf-8' };

const build = async config => {
    const buildDir = path.join('./', config.buildDir);
    const packDir = path.join('./', config.packDir);
    const ignores = ['.git', 'node_modules', buildDir, packDir];

    const allFilesPath = await recursive(config.rootDir, ignores);

    const resultShapesData = allFilesPath
        .filter(file => path.extname(file) === '.xml')
        .map(filePath => fs.readFileSync(filePath, fileConfig))
        .reduce((resultData, fileData) => `${resultData}\n${fileData}\n`, '');

    const pathToTemplate = path.join(__dirname, 'default/Definition.template.xml');
    const definitionTemplate = fs.readFileSync(pathToTemplate, fileConfig);
    const definitionData = pasteMetadata(definitionTemplate, config.stencilMetadata);
    const resultDefinitionData = pasteShapes(definitionData, resultShapesData);

    if (!fs.existsSync(config.buildDir)) {
        fs.mkdirSync(config.buildDir);
    }

    const pathToCompiledFile = path.join(config.buildDir, 'Definition.xml');
    fs.writeFileSync(pathToCompiledFile, resultDefinitionData, fileConfig);
}

const pasteMetadata = (fileData, metadata) => fileData
    .replace('#id#', metadata.id)
    .replace('#name#', metadata.displayName)
    .replace('#description#', metadata.description)
    .replace('#author#', metadata.author)
    .replace('#url#', metadata.url);

const pasteShapes = (definitionData, shapesData) => definitionData.replace('#shapes#', shapesData);

const pack = config => {
    console.log('pack ->', config);
}

const watch = async config => {
    chokidar.watch(path.join('./', config.rootDir), {
        ignored: /(^|[\/\\])\../
    })
    .on('all', (event, filePath) => {
        const isDeleteDir = event === 'unlinkDir' && path.extname(filePath) === '';
        const isXmlChange = path.extname(filePath) === '.xml';
        if(isDeleteDir || isXmlChange) {
            build(config);
        }
    });
}

module.exports = {
    build,
    watch,
    pack
}