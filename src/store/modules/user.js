import Fetch from 'common/fetch';
const user = {
    state:{
        userInfo:null,
        authInfo:null,
    },
    mutations:{
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_AUTHINFO: (state, authInfo) => {
            state.authInfo = authInfo;
        },
    },
    actions:{
        getUserInfo({commit}){
            return new Promise((resolve, reject) => {
                Fetch({
                    service:'CreditNetworkService',
                    action:'userInfo',
                    method:"get",
                    successName:'user_userInfo',
                    success:(data)=>{
                        commit('SET_USERINFO', data);
                        resolve(data);
                    },
                    error:(error)=>{
                        reject(error);
                    }
                });
            });
        },
        getAuthInfo({commit}){
            return new Promise((resolve, reject) => {
                Fetch({
                    service:'CreditNetworkService',
                    action:'authInfo',
                    method:"get",
                    successName:'user_authInfo',
                    success:(data)=>{
                        commit('SET_AUTHINFO', data);
                        resolve(data);
                    },
                    error:(error)=>{
                        reject(error);
                    }
                });
            });
        },
    }
};
export default user;