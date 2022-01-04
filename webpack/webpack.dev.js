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
    ],
};

module.exports = developmentConfig;
