;(function ($, document, window, undefined) {
    function ScrollPos(ele, options) {
        var $this = ele,   // 回到顶部按钮的class/id
            pos = options.pos,
            scrollPos = options.toPos,
            scrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        this.show = function (pos) {
            if (scrolltop > pos) {
                $this.show();
            } else {
                $this.hide();
            }
        };
        this.init = function () {
            var _this = this;
            $this.on('click', function () {
                $('html,body').animate({scrollTop: scrollPos});
            });
            $(window).scroll(function () {
                scrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                _this.show(pos);
            });
        };
    }

    $.fn.scrollPos = function (parameter, callback) {
        if (typeof parameter == 'function') {
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {
            };
        }
        var defaults = {
            pos: 100,     // 滚动条在该位置时显示
            toPos: 0     // 点击之后滚动条到达的位置
        };
        var options = $.extend({}, defaults, parameter),
            scrollPos = new ScrollPos(this, options);
        scrollPos.init();
    }
})(jQuery, document, window);
