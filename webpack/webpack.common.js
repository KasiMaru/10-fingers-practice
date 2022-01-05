// TODO: add favicon to HtmlWebpackPlugin, add loaders for images/fonts, refactor configs by functionality vs by env, add autoprefixer
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const commonConfig = (env) => {
    const isDev = env === 'dev';

    return {
        entry: path.resolve(__dirname, '..', './src/index.tsx'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                src: path.resolve(__dirname, '..', './src'),
            },
        },
        output: {
            path: path.resolve(__dirname, '..', './build'),
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
                                plugins: isDev ? [ReactRefreshBabelPlugin] : [],
                            }
                        },
                    ],
                },
                {
                    test: /\.scss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '..', './src/index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: `${isDev ? '[name]' : '[name].[contenthash]'}.css`,
            }),
        ],
    }
};

module.exports = commonConfig;
