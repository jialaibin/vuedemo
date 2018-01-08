import Vue from 'vue';
import VueRouter from 'vue-router';

/* error page */
import Err404 from '../views/error/404';

Vue.use(VueRouter);

const Home = Vue.extend({
    template: '<div>首页</div>'
});

export default new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', component: Home },
        { path: '/home', component: Home },
        { path: '/404', component: Err404 },
        { path: '*', redirect: '/404' }
    ]
});