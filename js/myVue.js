var myVue = (function () {
    var __Defualts__ = {
        el: 'body',
        data: {}
    };

    function Vue(options) {
        this.extend(__Defualts__, options);
        this.el = document.querySelector(this.el);
        var models = this.el.querySelectorAll('[v-model]'),
            data = this.data;
        for (var i = 0, len = models.length; i < len; i++) {
            models[i].onkeyup = function () {
                data[this.getAttribute('v-model')] = this.value;
            }
        }
        this.observer();
    }

    Vue.prototype = {
        extend: function () {
            for (var i = 0, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    this[prop] = arguments[i][prop];
                }
            }
        },

        //  监视
        observer: function () {
            var el = this.el,
                data = this.data,
                _this = this;
            for (let key in data) {
                // 获取对象属性的所有配置信息，可以用来查看是否用户设置了set和get方法，避免重名
                //var property = Object.getOwnPropertyDescriptor(data,key);
                Object.defineProperty(data, key, {
                    //value:1234,          // 属性的默认值
                    //writable: true,      // 是否可写
                    //enumerable: false,   // 是否可以枚举,是否可以通过for...in 遍历到，是否可以通过 Object.keys() 方法获取属性名称
                    //configurable: false, // 如果为false，则任何尝试删除目标属性或修改属性都无效
                    // 如果不指定: configurable， enumerable， writable特性,那默认值都是false

                    /**
                     * 一旦对象访问该属性，就会调用get方法
                     */
                    get: function () {
                        return this.value;  // this.value等于当前对象的属性值
                    },

                    /**
                     * 一旦对象修改该属性，就调用set方法
                     */
                    set: function (newVal) {
                        var binds = el.querySelectorAll('[v-bind=' + key + ']'),
                            models = el.querySelectorAll('[v-model=' + key + ']');
                        _this.updateVal(binds, newVal);
                        _this.updateVal(models, newVal);
                        this.value = newVal;
                    }
                });
            }
        },
        // 在页面上更新值
        updateVal: function (doms, newVal) {
            for (var i = 0, len = doms.length; i < len; i++) {
                doms[0].tagName == 'INPUT' ? doms[i].value = newVal : doms[i].innerHTML = newVal;
            }
        }
    };
    return Vue;
})();