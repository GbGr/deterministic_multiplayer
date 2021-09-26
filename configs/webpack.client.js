const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';
const isProd = mode === 'production'

module.exports = {
    mode,
    entry: {
        app: path.resolve(__dirname, '../src/client/index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, '../dist/client')
    },
    devtool: isProd ? 'inline-source-map' : undefined,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ],
    optimization: isProd ? {
        minimize: true,
        minimizer: [ new TerserPlugin() ],
    } : undefined,
}
