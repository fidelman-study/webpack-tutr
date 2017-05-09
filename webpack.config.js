'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },
    watch: NODE_ENV == 'development',
    watchOptions: { // to change timeout from IDE to save evth
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : false,
    plugins: [ // needs local webpack, pass vars to app
        //new webpack.EnvironmentPlugin('NODE_ENV') // always set NODE_ENV
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV) // will be NODE_ENV in app, always JSON.stringify
        }) // not always set NODE_ENV
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }

};