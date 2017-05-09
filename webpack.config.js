'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },
    watch: NODE_ENV === 'development',
    watchOptions: { // to change timeout from IDE to save evth
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === 'development' ? 'source-map' : false,
    plugins: [ // needs local webpack, pass vars to app
        //new webpack.EnvironmentPlugin('NODE_ENV') // always set NODE_ENV
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV) // will be NODE_ENV in app, always JSON.stringify
        }) // not always set NODE_ENV
    ],

    resolve: { // where to find files
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: { // where to find loader
        modules: ['node_modules'],
        extensions: ['.js'],
        moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}