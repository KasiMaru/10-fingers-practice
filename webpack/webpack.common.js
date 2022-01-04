// TODO: Add cashing, add hashes for filenames, add vendor bundles, add dead code elimination, add favicon to HtmlWebpackPlugin, add linting, add loaders for images/fonts

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const commonConfig = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [ReactRefreshBabelPlugin]
                        }
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ]
}

module.exports = commonConfig;