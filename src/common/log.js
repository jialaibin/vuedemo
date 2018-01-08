/**
 * @project jiuxin
 * @author jialaibin
 * @version 1.0
 */

var inited = false;
var C = {
    init : function () {
		if (inited) return;
        var wrapper = document.createElement('div');
        wrapper.id = 'mobile-console-wrapper';
        wrapper.style.cssText = 'font-size:11px;line-height:1.1;word-break:break-all;position:absolute;position:fixed;bottom:100px;right:0;background-color:#fff;width:90px;opacity:0.8;z-index:999999999';

        var clear = document.createElement('div');
        clear.innerHTML = 'clear';
        clear.style.cssText = 'background-color:red;line-height:18px;text-align:center;color:#fff;';
        clear.addEventListener('click', function(){
            var r;
            while (r = C.el.firstChild) {
                C.el.removeChild(r);
            }
            C.callback.call(C);
        }, false);

        wrapper.appendChild(clear);

        var el = document.createElement('div');
        el.id = 'mobile-console';
        wrapper.appendChild(el);

        // (document.getElementById('s_app') || document.body).appendChild(wrapper);
        (document.getElementById('sApp') || document.body).appendChild(wrapper);
        this.wrapper = wrapper;
        this.el = el;
        // setInterval(function(){
            // wrapper.style.top = win.pageYOffset + 'px';
        // }, 100);

        // win.addEventListener('resize', function () {
            // wrapper.style.display = 'none';
            // wrapper.style.display = 'block';
        // }, false);
        // win.addEventListener('scroll', function () {
            // wrapper.style.display = 'none';
            // wrapper.style.display = 'block';
        // }, false);
		inited = true;
    },
    callback: function(){},
    debug : true,
    el  : null,
    log : function () {
        if (!this.debug) return;
		this.init();
            var args = Array.prototype.slice.call(arguments).join('<br />');
        var p = document.createElement('p');
        // p.style.fontSize   = '12px';
        // p.style.lineHeight = '15px';
        p.style.margin       = 0;
        p.style.borderLeft = '3px solid green';
        p.innerHTML = args;
        this.el.appendChild(p);
    },
    dir : function (obj) {
        if (!this.debug) return;
		this.init();
        var str = [];
        for (var i in obj) {
            str.push(i + ':' + obj[i]);
        }
        this.log.apply(this, str);
    },
    ing : function (id) {
        if (!this.debug) return;
		this.init();
        var cid = '$' + id;

        var args = Array.prototype.slice.call(arguments);
        args.shift();
        args = '<div style="background-color:#333;color:#fff;font-weight:bold;">' + id + '</div>' + args.join('<br />');

        var p = document.getElementById(cid);
        if (p) {
            p.innerHTML = args;
        } else {
            p = document.createElement('p');
            p.id = cid
            // p.style.fontSize     = '12px';
            // p.style.lineHeight   = '15px';
            p.style.margin       = 0;
            p.style.borderLeft = '3px solid red';
            p.innerHTML = args;
            this.el.appendChild(p);
        }
    },
    ing2 : function (id) {
        if (!this.debug) return;
		this.init();
        var cid = '$' + id;

        var args = Array.prototype.slice.call(arguments);
        args.shift();

        for (var i=0, l=args.length; i<l; i++) {
            args[i] = args[i] + ':'+ (''+new Date().getTime()).slice(8);
        }
        args = '<div style="background-color:#333;color:#fff;font-weight:bold;">' + id + '</div>' + args.join('<br />');

        var p = document.getElementById(cid);
        if (p) {
            p.innerHTML = args;
        } else {
            p                    = document.createElement('p');
            p.id                 = cid
            // p.style.fontSize     = '12px';
            // p.style.lineHeight   = '15px';
            p.style.margin       = 0;
            p.style.borderLeft   = '3px solid red';
            p.innerHTML          = args;
            this.el.appendChild(p);
        }
    }
};



export default C;