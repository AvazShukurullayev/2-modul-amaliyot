const path = require('path');
// import {resolve} from "path"

module.exports = {
    mode: "development",
    entry: './js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    watch: true,
    devtool: "source-map",
    module: {}
};