/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

module.exports = {
	common:{

	},
	production:{},
	qa: {},
	dev: {},
	fe: {
        // proxy: {
        // 	'**': 'http://localhost:9000'
        // }
        host: '0.0.0.0',
        port: '8080',
        disableHostCheck: true
        // contentBase: 'dist/',
        // historyApiFallback: true,
    }
};
