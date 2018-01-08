/*
* @Author: jialaibin
* @Date:   2017-08-11
*/

'use strict';

let Env = require('./env');
let path = require('path');

// 不同环境下的静态资源的url根路径
let PRODUCT_STATIC_URL= '/';
let QA_STATIC_URL = '/';
let DEV_STATIC_URL = 'https://10.4.71.84:8095/b2c/';//联调环境静态资源存放路径
let FE_STATIC_URL = '/dist/';

// 根据环境来获取不同的静态资源部署的根路径
let publicPath = (function getPublicPath(){
    if(Env.isProductEnv){
        return PRODUCT_STATIC_URL;
    }

    if(Env.isQAEnv){
        return QA_STATIC_URL;
    }

    if(Env.isDevEnv){
        return DEV_STATIC_URL;
    }

    return FE_STATIC_URL;
})();

module.exports = publicPath;