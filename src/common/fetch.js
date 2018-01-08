import axios from 'axios';
import qs from 'qs';
import Api from '../api';
import jsonstyle from 'jsonstyle';


const service = axios.create({
    // baseURL : baseURL,// api的base_url
    timeout: 100000                  // 请求超时时间
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 每次请求，根据环境设置headers，baseURL
        // if (process.env.NODE_ENV == 'dev') {
           
        //     config.headers['service'] = 'inboudService';
        //     config.headers['provider'] = '106700100';
        //     config.headers['version'] = 'version';
        // }
        return config;
    },
    error => {
        // 请求失败执行的逻辑
        Utils.toast('加载超时');
        return Promise.reject(error)
    });

axios.interceptors.response.use(
    data=>{
        return data
    },error=>{
        Utils.toast('加载超时');
    }
)

//添加产品参数
let paramsAssign = (obj) => { 
    if(!obj){
        return obj
    }
    return Object.assign({},{
        productId:'WSTAR',
        projectId:'WSTAR'
    }, obj);
};

let errorFun = (err) => {
    window.nativeProvider && Fetch({
        service:'CreditComponentService',
        action:'dismissProgressDialog',
        method:"get",
        successName:'nativeAction_dismissProgressDialog',
        success:(data)=>{},
        error:(error)=>{}
    });
    err =  JSON.parse(err);
    //是否跳转首页
    if(err.message == '存在放款中订单'&& err.code == 'BBLCFS02008'){
        setTimeout(function(){
            Fetch({
                service: 'CreditComponentService',
                action:'linkToPage',
                method:"post",
                data:{
                    page:'main'
                },
                successName:'nativeAction_linkToPage',
                success:(data)=>{},
                error:(error)=>{}
            });
        },3000);
    }
    Utils.toast(err.message||'请求异常');
};

window['errorCallback'] = (data)=>{  
     errorFun(data);
     Global.set("checkClick",true);
};
window['successCallback'] = (data)=>{  
     errorFun(data);
};
//处理native的回调
let resolveCallback = (config) =>{

    window[config.successName] = (data)=>{
        let json = jsonstyle.c(JSON.parse(data)); 
        config.success ? config.success(json) : errorFun(json);
        if(config.successName == 'loanRecord_queryLoanRecord'){
            // C && C.log(data);
        }
    };
    config.errorName && (window[config.errorName] = (data)=>{  
        let json = jsonstyle.c(JSON.parse(data));  
        config.error ? config.error(json) : errorFun(json);
    });
};
window.Fetch = function fetch(config){

    if(window.nativeProvider){
        resolveCallback(config);
        let natives = config.service == 'CreditComponentService';
        window.nativeProvider.execute(
            config.service || '',
            config.action || '',
            JSON.stringify(natives ? (config.data||'') : paramsAssign(config.data||{}) ),
            config.successName || 'successCallback',
            config.errorName || 'errorCallback'
        );
    }else{
         
        service({
            url:Api[config.service][config.action] || '',
            method: (process.env.NODE_ENV != 'fe') ? (config.method  || 'get') : 'get',
            data: qs.stringify(paramsAssign(config.data ||{})),
            params: paramsAssign(config.data||{}),
        }).then(response => {
            config.success(jsonstyle.c(response.data));
        }).catch(error => {
            config.error ? config.error(error) : errorFun(error) ;

        });
    }
};
export default window.Fetch;