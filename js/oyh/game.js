/*
 * Copyright (c) 2016.
 *
 * Author: life0001 <life0001@126.com>
 * Blog: life0001.github.io
 *
 */
    var _Game={
        a: [],
        //retina: window.devicePixelRatio || 1,
        init: function (ele, ele_btn) {
            delete this.init;
            var i, win = window, Game = {
                version: "1",
                width: win.innerWidth,
                height: win.innerHeight,

                /**
                 * 初始化
                 * @param ob_ele
                 */
                init: function (ob_ele, ob_btn) {
                    this.canvas = this.Event.getEle(ob_ele);
                    this.btn = this.Event.getEle(ob_btn);
                    if (!this.canvas.getContext) return; // 不支持 canvas
                    this.ctx = this.canvas.getContext('2d');
                    this.canvas.setAttribute('width', this.width);
                    this.canvas.setAttribute('height', this.height);
                    this.canvas.style.width = this.width + 'px';
                    this.canvas.style.height = this.height + 'px';
                    this.Draw.render();
                    this.Event.init();
                },

                /**
                 * 开始游戏，或重新开始游戏
                 */
                start: function () {
                    this.FallObjects.down();
                }
            };
            for (i = 0; this.a[i]; i++) {
                this.a[i](Game);
            }
            delete this.a;
            Game.init(ele, ele_btn);
        }
    };
