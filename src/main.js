
//入口配置文件

import Global from 'common/global';
import Fetch from 'common/fetch';
import Utils from 'common/utils';
import Base64 from 'common/base64.js';

import Vue from 'vue';
import Axios from 'axios';
import App from './App';

import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import C from 'common/log';


if(process.env.NODE_ENV == 'fe'){
    window.C = C;
    C.init();
    
}

Vue.use(MintUI);

//清空倒计时
let clearTimeoutArr = ()=>{
	let idArr = Global.get('timeoutId');
    for(let i = 0, l = idArr.length; i < l; i++){
        clearInterval(idArr[i]);
    }
    Global.set('timeoutId',[]);
};

//路由拦截器--跳转之前
router.beforeEach((to, from, next) => {
	//清空倒计时
	clearTimeoutArr();

    // !store.getters.userInfo ? store.dispatch('getUserInfo').then(res => {
    // 	next();
    // }).catch(err => {
    //     console.log(err);
    // }) : 
    next();
    
});
// 路由拦截器--跳转之后
router.afterEach((to, from) => {

   //防止ios页面切换白屏
    window.scrollTo(0, 1); 
});


new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
});
