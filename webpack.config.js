'use strict';

module.exports = {
    entry: "./home",
    output: {
        filename: "build.js",
        library: "home"
    },
    watch: true,
    watchOptions: { // to change timeout from IDE to save evth
        aggregateTimeout: 100
    },
    devtool: 'source-map'
};