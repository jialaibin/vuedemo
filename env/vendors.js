/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';

let vendors_common = [
	'es6-promise',
	'mint-ui',
    'axios',
    'vue',
    'vue-cookie',
    'vue-router',
    'vuex'
];

let vendors_other = [];


let allVendors = vendors_common.concat(vendors_other);


module.exports = {
	allVendors: allVendors
};