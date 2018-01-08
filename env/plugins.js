/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';
const Env = require('./env');
const os = require('os');
const webpack = require("webpack");
    // AssetsPlugin = require('assets-webpack-plugin'),
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let HappyPack = require('happypack');
let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

let env = Env.env;
const resolve = Env.resolve;
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

let unFePlugins = [

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['app', 'vendor']
    }),
	new webpack.optimize.OccurrenceOrderPlugin()
];

module.exports = {
    common: [
		new HappyPack({
			id: 'happybabel',
			loaders: [{
				path: 'babel'
			}],
			threadPool: happyThreadPool,
			cache: true,
			verbose: true
		}),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/zh\-cn$/),

        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     bizui: 'biz-ui',
        //     _: 'underscore'
        // }),

        new ExtractTextPlugin({ filename: 'css/[name].[chunkhash].css', disable: false, allChunks: true }),

        new HtmlWebpackPlugin({
            filename: resolve('/dist/app.html'),
            template: 'app.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
    ],
    production: unFePlugins.concat([
        //注入发布环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    	new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            // workerCount: os.cpus().length,
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
    	})
	]),
    qa: unFePlugins.concat([
        //注入发布环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('qa')
        })
    ]),
    dev: unFePlugins.concat([
        //注入发布环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ]),
	fe: unFePlugins.concat([
        //注入发布环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('fe')
        })
    ])
};
