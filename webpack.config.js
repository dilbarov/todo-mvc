const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => (
    {
        entry: {
            app: ['./src/index.tsx']
        },
        output: {
            filename:
                argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
            chunkFilename:
                argv.mode === 'production'
                    ? 'chunks/[name].[chunkhash].js'
                    : 'chunks/[name].js',
            path: path.resolve(__dirname, "dist")
        },
        mode: "none",
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            new MiniCssExtractPlugin({
                filename: argv.mode === 'production'
                    ? '[name].[contenthash].css'
                    : '[name].css',
            })
        ]
    }
);