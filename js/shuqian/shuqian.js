/***
 * 数钱游戏
 */
//if(${user!=null} && ${status==1}) {
//    location.href="${pathWeb }/countmoney/tip.do?aaa=1";
//}
//if (${status==0}&&${type==0}) {
//    $(function(){
//        $.ajax({
//            url:'${pathWeb }/countmoney/getMoney.do',
//            data:{
//                type:1
//            },
//            success: function(data){
//                var money=$('.count1 span').text();
//                location.href="${pathWeb }/countmoney/tip.do";
//            }
//        })
//    });
//}
$(function () {
    var shuqian = {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        num: 1,
        allTime: 10,
        s: '<s></s>',
        r: [1, 2, 3, 4, 5, 6],
        delay: 2500,
        startY: 0,
        endY: 0,
        rIndex: 0,
        posClass: ['shun', 'ni', 'yanshi1', 'yanshi2', 'yanshi3'],
        iindex: 0,
        isplay: true,
        isfirst: true,
        speed: 200,
        page2: '<div class="play">' +
                    '<div class="countAll">' +
                        '<p class="count1">¥<span>0</span></p>' +
                        '<p class="count2"><span class="second">10</span><span>\'\'</span></p>' +
                    '</div>' +
                    '<div class="playMain">' +
                        '<span class="images"><span class="arrow"></span><img src="img/shuqian/100.jpg" width="100%" class="money" id="money"/></span>' +
                    '</div>' +
                '</div>',
        dataImg: [
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/10.jpg", money: 10},
            {src: "img/shuqian/20.jpg", money: 20},
            {src: "img/shuqian/50.jpg", money: 50},
            {src: "img/shuqian/100.jpg", money: 100}
        ],

        init: function () {
            this.Event.init();
        },

        /**
         * 掉钱
         */
        downMoney: function () {
            this.num = Math.floor(Math.random() * this.r.length);
            for (var i = 0, len = this.r[this.num]; i < len; i++) {
                $('.animat').append(this.s);
            }
            for (var j = 0, len = $('.animat s').length; j < len; j++) {
                var sIndex = Math.floor(Math.random() * this.winWidth),
                    sClass = Math.floor(Math.random() * this.posClass.length);
                $('.animat s').eq(j).css('left', sIndex).removeClass().addClass(this.posClass[sClass]);
            }
        },

        /**
         * 不停地掉钱
         */
        reDownMoney: function () {
            var _this = this;
            setInterval(function () {
                if (_this.num++ >= 3) {
                    $('.animat').html('');
                    num = 0;
                }
                _this.downMoney();
            }, _this.delay);
        },

        /**
         * 手势动作开始
         */
        slider: function () {
            if (this.allTime == 0) return;
            if ((this.startY - this.endY) >= 70) {
                this.doMove();
                if ($('.play').length) {
                    $('.images').append('<img src=' + this.dataImg[this.rIndex].src + ' width="100%" class="money active" style="z-index:3" />');  // 显示  下一张钱的图片
                    this.iindex++;
                }
                if (this.isfirst) {
                    $('.money').eq(1).attr('src', 'img/shuqian/10.jpg');
                    this.isfirst = false;
                }
            }
        },
        doMove: function () {
            // 进入第二页
            var timer, _this = this;
            if (this.isplay) {
                $('.main').append(this.page2);
                $('.play').show();
                $('.init').remove();
                $('#money').addClass('active');
                this.downMoney();
                this.allTime = +$('.second').text();
                $('.money').attr('m', 10);  // 规定首张面值10元
                this.reDownMoney();
                this.isplay = false;
            }
            // 开始倒计时 去掉箭头
            if (this.iindex == 1) {
                clearTimeout(timer);
                $('.arrow').remove();
                timer = setInterval(function () {
                    // 判断倒计时是否结束
                    if (_this.allTime == 0) {
                        clearTimeout(timer);
                        $('.footer').show();
                        return;
                    }
                    $('.second').text(--_this.allTime);
                }, 1000);
            }
            // 数完钱后
            if (!$('.arrow').length) {
                $('.money:eq(1)').remove();  // 删除显示图——最上面一张图（第2张图）
                $('.count1 span').text(+$('.count1 span').text() + +$('.money').attr('m'));	 // 总额加上第一张当前图片对应的数额的合
                $('#money').attr('src', this.dataImg[this.rIndex].src);  // 准备 数下一张钱的图片 ——把第2张图片的url替换给第一张图片的URL
                $('.money').attr('m', this.dataImg[this.rIndex].money);   // 准备 数下一张钱的图片对应的数额
            }
        },

        /**
         * 服务器交互
         */
        toajax: function (url) {
            $.ajax({
                url: url,
                data: {
                    type: 2,
                    money: $('.count1 span').text()
                },
                success: function (data) {
                    location.href = "${pathWeb }/countmoney/tip.do?money=" + $('.count1 span').text();
                }
            })
        },

        /**
         * 事件
         */
        Event: {
            init: function () {
                $(document).on({
                    'touchstart': this.touch,
                    'touchmove': this.touch,
                    'touchend': this.touch
                }, '.money');

                // 去登录
                $('.logon').click(function () {
                    var money = $('.count1 span').text();
                    location.href = "${pathWeb }/Consumer/toLogin.do?type=1&&money=" + money;
                });

                // 点击领取
                $('.menu3').one('click', function () {
                    shuqian.toajax('${pathWeb }/countmoney/getMoney.do');
                });
            },
            touch: function (event) {
                var e = event || window.event;
                e.preventDefault();
                switch (e.type) {
                    case 'touchstart':
                        shuqian.rIndex = Math.floor(Math.random() * shuqian.dataImg.length);
                        shuqian.startY = e.originalEvent.changedTouches[0].screenY;
                        break;
                    case 'touchmove':
                        shuqian.endY = e.originalEvent.changedTouches[0].screenY;
                        break;
                    case 'touchend':
                        shuqian.slider();
                        break;
                }
            }
        }
    };
    shuqian.init();
});
