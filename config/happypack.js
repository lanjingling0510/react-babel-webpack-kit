const HappyPack = require('happypack');

function happyPackPlugin({name, loaders}) {
    return new HappyPack({
        id: name,
        verbose: false,
        threads: 4,
        loaders
    });
}

module.exports = happyPackPlugin;
