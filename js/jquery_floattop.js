/**
 * created by pwf
 */
;
(function ($, document, window, undefined) {
    function FloatTop(ele, options) {
        var $this = ele,   // 导航的class/id
            iwidth = options.width,
            scrolltop = 0,
            _isShow = function (pos) {
                // 如果有滚动条
                if ($(document).height() > ($(document).height() - $(window).height())) {
                    if (scrolltop < pos) {
                        $this.css({'position': 'initial', 'padding': '0', 'top': 0}).css('background', '');
                    } else {
                        if (options.isGap) {
                            scrolltop < 0 ? $this.css({
                                'position': 'initial',
                                'padding': '0',
                                'top': 0
                            }).css('background', '') : $this.css({
                                'position': 'fixed',
                                'padding': options.pad,
                                'top': options.top
                            }).css('background-color', options.bgcolor);
                        } else {
                            $this.css({'position': 'fixed'});
                        }
                    }
                    if (iwidth) {
                        $this.outerWidth(iwidth);
                    }
                } else {
                    $this.css({'position': 'initial', 'padding': '0', 'top': 0}).css('background', '');
                }
            };
        
        this.scroll = function (pos) {
            $(window).scroll(function () {
                scrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                _isShow(pos);
            });
        };
    }

    $.fn.floatTop = function (parameter) {
        parameter = typeof parameter == 'object' ? parameter : {};
        var defaults = {
            pos: 0,                       // 滚动条在该位置时停止浮动
            top: 0,                       // 导航的纵向定位
            isGap: true,                  // 是否需要padding
            pad: '20px 15px 0 15px',      // padding的值
            width: '',                    // 设置导航宽度
            bgcolor: '#fff'               // 背景色颜色
        };
        var options = $.extend({}, defaults, parameter),
            newfloatTop = new FloatTop(this, options);
        newfloatTop.scroll(options.pos);
    }
})(jQuery, document, window);
