const path = require('path');

module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process(src, filename, config, options) {
        return `module.exports = ${JSON.stringify(path.basename(filename))};`;
    },
};
