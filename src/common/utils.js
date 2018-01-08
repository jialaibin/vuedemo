let isType = (type) => {
	return function(obj) {
		return Object.prototype.toString.call(obj) === "[object " + type + "]"
	}
};
import moment from 'moment';
import {Toast} from 'mint-ui';
window.Utils =  {
    //简写选择器
	$: (select)=>{
		let list = document.querySelectorAll(select);
		if(list.length == 1){
			return list[0];
		}
	    return list.length ? list : null;
	},
	//type judge
    
	isObject: isType('Object'),
	isArray: Array.isArray || isType('Array'),
	isFunction: isType('Function'),
	isString: isType('String'),

	date: {
		/*
		*格式时间
		@StringTime string 2017-02-23 12:35
		@StringFormat string YYYYMM/DD hh:mm
		**/
		format: (StringTime,StringFormat) => {
            return moment(StringTime).format(StringFormat);
		},
        /*
		*获取某段时间
		@StringTime string 2017-02-23 12:35
		@StringFormat string 
		*		'year'
		*		'month'  // 0 to 11
		*		'date'
		*		'hour'
		*		'minute'
		*		'second'
		*		'millisecond'
		**/
        get:(StringTime,StringFormat) => {
        	return moment(StringTime).get(StringFormat);
        },
       
        /**
         * @function utils.data.isSame 比较两日期是否相同
         * @params Date date1 比较日期1
         * @params Date date2 比较日期2
         */
		isSame: (date1, date2) => {
			var yearFlag = false,
				monthFlag = false,
				dayFlag = false;
			if(date1.getYear() == date2.getYear()){
				yearFlag = true;
			}
            if(date1.getMonth() == date2.getMonth()){
                monthFlag = true;
            }
            if(date1.getDate() == date2.getDate()){
                dayFlag = true;
            }
			return yearFlag && monthFlag && dayFlag;
		}
	},

	string: {

		/**
		 * @function sogou.string.trim 删除目标字符串两端的空白字符
		 * @param a -
		 *            字符串
		 */
		trim: (a) => {
			a = "" + a;
			return a.replace(/(^[\s　]*)|([\s　]*$)/g, "");
		},

		/**
		 * @function sogou.string.lTrim 删除目标字符串左端的空白字符
		 * @param a -
		 *            字符串
		 */
		lTrim: (a) => {
			a = "" + a;
			return a.replace(/(^[\s　]*)/g, "");
		},
		/**
		 * @function sogou.string.rTrim 删除目标字符串右端的空白字符
		 * @param a -
		 *            字符串
		 */
		rTrim: (a) => {
			a = "" + a;
			return a.replace(/([\s　]*$)/g, "");
		},
		/**
		 * @function getLengthCase 字符串长度计算
		 * @param e -
		 *            字符串
		 */
		getLengthCase: (e) => {
			var a = e.length;
			e.replace(/[\u0080-\ufff0]/g, function() {
				a++;
			});
			return a;
		},

		/**
		 * @function sogou.string.toCamelCase 转为驼峰格式
		 * @param e -
		 *            字符串
		 */
		toCamelCase: (a) => {
			if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
				return a;
			}
			return a.replace(/[-_][^-_]/g, function(d) {
				return d.charAt(1).toUpperCase();
			});
		},
	},

	money: {
		//格式化两位小数
	    round: (n) => {
	        if (isNaN(n))
	            return 0;
	        n = Math.round(n * 100) / 100;
	        n = (n + 0.001) + '';
	        return n.substring(0, n.indexOf('.') + 2);
	    }
	},
	

	//将参数字符串转成成对象
	parseParams: (param, doubleDecode) => {
		let P = {};
		if (!param) {
			return P;
		}

		param = param.split("&");
		for (let i = 0; i < param.length; i++) {
			let kv = param[i].split("=");
			if (doubleDecode) {
				P[kv[0]] = decodeURIComponent(decodeURIComponent(kv[1]));
			} else {
				P[kv[0]] = decodeURIComponent(kv[1]);
			}

		}
		return P;
	},


	cookie: {
		/**
		 * 获取cookie内容
		 * @param  {string} e cookie的key
		 * @return {[type]}   [description]
		 */
		getCookie: (e) => {
			let f = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
			let a = f.exec(document.cookie);
			if (a) {
				return a[2] || null;
			}
			return null;
		},
		/**
		 * 设置cookie内容
		 * @param {string} key    cookie的key
		 * @param {string} value  对应key的value
		 * @param {object} cookie cookie对象
		 */
		setCookie: (key, value, cookie) => {
			let e = cookie || {};
			let a = e.expires;
			if ("number" == typeof e.expires) {
				a = new Date();
				a.setTime(a.getTime() + e.expires);
			}
			document.cookie = key + "=" + value + (e.path ? "; path=" + e.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (e.domain ? "; domain=" + e.domain : "") + (e.secure ? "; secure" : "");
		}
	},
    storage: {
        //获取localStorage内容
		get: (key, {json = false}) => {
			let value = window.localStorage.getItem(key);
			if(json && value){
				try{
					value = JSON.parse(value);
				}catch(e){
					throw new Error(`Storage get error when try to parse a string to json: ${value}`, e)
				}
			}
			return value;
		},
		//设置localStorage内容
		set: (key, value) => {
			try{
				if(Utils.isObject(value) || Utils.isArray(value)){
					window.localStorage.setItem(key, JSON.stringify(value));
				}else{
					window.localStorage.setItem(key, value);
				}
			}catch(e){
				throw new Error(e);
			}
		}
	},
	//自定义加密
	getHashCode: (input) => {
	    let I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
	    let hash = 5381;
	    let i = input.length - 1;

	    if (typeof input == 'string') {
	        for (; i > -1; i--)
	            hash += (hash << 5) + input.charCodeAt(i);
	    } else {
	        for (; i > -1; i--)
	            hash += (hash << 5) + input[i];
	    }
	    let value = hash & 0x7FFFFFFF;

	    let retValue = '';
	    do {
	        retValue += I64BIT_TABLE[value & 0x3F];
	    }
	    while (value >>= 6);
	    return retValue;
	},
	// 设置提示消息
	toast: (message) =>{
        return new Promise((resolve, reject) => {
        	if(window.nativeProvider){
	            Fetch({
	                service:'CreditComponentService',
	                action:'showMessageToast',
	                method:"post",
	                data:{
	                    message:message
	                },
	                successName:'nativeAction_showMessageToast',
	                success:(data)=>{
	                    resolve(data);
	                },
	                error:(error)=>{
	                    reject(error);
	                }
	            });
	        }else{
                Toast(message);
	        }
        });
	},
	

};
export default window.Utils;
