const path = require('path');
const fs = require('fs');
const process = require('process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => {
    const resolvedPath = path.resolve(appDirectory, relativePath);
    return resolvedPath;
};

module.exports = { resolveApp, appDirectory };
