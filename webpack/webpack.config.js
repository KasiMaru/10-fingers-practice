const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = (envVars) => {
    const { env, analyze } = envVars;

    const envConfig = require(`./webpack.${env}.js`);
    const baseConfig = {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.environment': JSON.stringify(env),
            }),
            analyze && new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    };

    return merge(
        baseConfig,
        commonConfig,
        envConfig,
    );
}