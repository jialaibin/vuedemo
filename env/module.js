/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Env = require('./env');
const resolve = Env.resolve;

let common = {
    loaders: [

        //css 相关配置
        {
            test: /\.css$/i,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },

        //支持图片文件的base64处理
        {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: ['url?limit=10000&name=image/[hash:8].[name].[ext]']
        },

        //js文件进行编译
        {
            test: /\.js$/i,
            include: [
                resolve('src'),
            ],
            loader: 'happypack/loader?id=happybabel'
        },
        //对vue文件进行处理
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' })
                }
            }
        },
        //对iconfont字体文件的支持，使用file-loader直接复制文件
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
        }
    ]

};

module.exports = {
	common: common,
	production: {},
	qa: {},
	dev: {},
    fe: {}
};

