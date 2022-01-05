const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = (envVars) => {
    const { env, analyze } = envVars;

    const envConfig = require(`./webpack.${env}.js`);
    const baseConfig = {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.environment': JSON.stringify(env),
            }),
        ]
    };

    if (analyze) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        baseConfig.plugins.push(new BundleAnalyzerPlugin());
    }

    return merge(
        baseConfig,
        commonConfig(env),
        envConfig,
    );
}