const path = require('path');
const glob = require('glob');

const PurgeCssPlugin = require('purgecss-webpack-plugin');


const productionConfig = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    plugins: [
        new PurgeCssPlugin({
            paths: glob.sync(path.resolve(__dirname, '..', './src/**/*'), { nodir: true }),
        }),
    ],
};

module.exports = productionConfig;
