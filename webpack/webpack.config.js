const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = (environment, args) => {
    const { env } = environment;

    const envConfig = require(`./webpack.${env}.js`);
    const baseConfig = {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.environment': JSON.stringify(env),
            }),
        ]
    };
    const fullConfig = merge(
        baseConfig,
        commonConfig,
        envConfig
    );

    return fullConfig;
}