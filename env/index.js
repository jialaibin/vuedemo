/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';

let path = require('path');

let Env = require('./env');
let Module = require('./module');
let Plugins = require('./plugins');
let Resolve = require('./resolve');
let vendors = require('./vendors');
let DevServer = require('./devServer');
let publicPath = require('./publicPath');
let env = Env.env;
let resolve = Env.resolve;
let smartEnv = Env.smartEnv;

let fileName = 'js/[name].[chunkhash].js';
let chunkFilename = 'js/[id].[chunkhash].js';
const devTool = env('source-map', '');

let Entry = {
	app: './src/main.js',
    vendor: vendors.allVendors
};

// if(!Env.isFeEnv){
//     Entry.vendor = vendors.oldAtlasVendors;
//     Entry.reactvendor = vendors.newAtlasVendors;
// }

let config = {
    entry: Entry,
    output: {
        path: resolve('dist'),
        filename: fileName,
        publicPath: publicPath,
        chunkFilename: chunkFilename
    },
    resolve: smartEnv(Resolve),
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: smartEnv(Module),
    plugins: smartEnv(Plugins),
    devServer: smartEnv(DevServer),
    devtool: devTool
}


module.exports = config;
