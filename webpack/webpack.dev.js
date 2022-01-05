const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const developmentConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
    },
    devServer: {
        hot: true,
        open: false,
    },

    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
};

module.exports = developmentConfig;
