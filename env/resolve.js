/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';
let Env = require('./env');
let resolve = Env.resolve;

module.exports = {
	common:{
		extensions: ['.vue', '.js', '.json'],
		alias: {
            'vue$': 'vue/dist/vue.esm.js',
			'api': resolve('src/api'),
			'common': resolve('src/common'),
			'component': resolve('src/component')

		}
	},
	production: {},
	qa: {},
	dev:{},
	fe:{}
};