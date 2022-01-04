// TODO: Add cashing, add hashes for filenames, add vendor bundles, add dead code elimination, add favicon to HtmlWebpackPlugin, add linting, add loaders for images/fonts
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const developmentConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        open: true,
    },

    plugins: [
        new ReactRefreshWebpackPlugin(),
    ]
}

module.exports = developmentConfig;