const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const mode = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development'

module.exports = {
    mode,
    entry: './src/server/index.ts',
    devtool: 'eval-source-map',
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
            {
                test: /\.ts$/,
                use: [ 'ts-loader', ],
                exclude: '/node_modules/',
            }
        ]
    },
    plugins: [
        new NodemonPlugin(),
    ],
    externalsPresets: { node: true },
    externals: [nodeExternals({ allowlist: [ /@babylonjs\/core/ ] })],
}
