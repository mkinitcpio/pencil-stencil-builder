const fs = require('fs');
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
    const definitonData = pasteMetadata(definitionTemplate, config.stencilMetadata);
    const resultDefinitonData = pasteShapes(definitonData, resultShapesData);

    if (!fs.existsSync(config.buildDir)) {
        fs.mkdirSync(config.buildDir);
    }

    const pathToCompiledFile = path.join(config.buildDir, 'Definition.xml');
    fs.writeFileSync(pathToCompiledFile, resultDefinitonData, fileConfig);
}

const pasteMetadata = (fileData, metadata) => fileData.replace('#id#', metadata.id)
                                                      .replace('#name#', metadata.displayName)
                                                      .replace('#description#', metadata.description)
                                                      .replace('#author#', metadata.author)
                                                      .replace('#url#', metadata.url);

const pasteShapes = (definitonData, shapesData) => definitonData.replace('#shapes#', shapesData);

const pack = config => {
    console.log('pack ->', config);
}

module.exports = {
    build,
    pack
}