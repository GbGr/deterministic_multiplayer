const path = require('path')
const fs = require('fs')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const mode = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development'

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    mode,
    entry: './src/server/index.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../src/server/tsconfig.json') }),
        ]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: [ 'ts-loader', ] }
        ]
    },
    externals: nodeModules,
}
