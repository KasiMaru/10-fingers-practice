// TODO: Add cashing, add hashes for filenames, add vendor bundles, add dead code elimination, add favicon to HtmlWebpackPlugin, add linting, add loaders for images/fonts
const path = require('path');
const glob = require('glob');

const PurgeCssPlugin = require('purgecss-webpack-plugin');


const productionConfig = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1000 * 600, // 600kb
        },
    },

    plugins: [
        new PurgeCssPlugin({
            paths: glob.sync(
                path.resolve(__dirname, '..', './src/**/*'),
                { nodir: true },
            ),
        }),
    ]
}

module.exports = productionConfig;
