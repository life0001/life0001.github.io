/**
 * Created by pwf on 2016/9/29.
 */
define(function () {
    function Calendar(c_data) {
        if (c_data.id instanceof Array) {
            this.id = [];
            this.outputId = [];
            for (var i = 0, len = c_data.id.length; i < len; i++) {
                this.id[i] = c_data.id[i];
                this.outputId[i] = c_data.outputId[i]
            }
            if (this.id.length > 1) {
                this.isAddCalendarByOne = true;      // 是否增加一个耦合日历（双日历）
            }
            this.targetId = this.id[1];              // 在这个id元素内添加第2个日历（耦合日历）
            this.id = this.id[0];                    // 在这个id元素内添加1个日历
            this.targetOutputId = this.outputId[1];  // 点击该id元素时会展示出对应的耦合日历（第2个日历,须先生成第1个日历）及输出用户选择的日期值也在该元素上显示
            this.outputId = this.outputId[0];        // 点击该id元素时会展示出对应的日历，及输出用户选择的日期值也在该元素上显示
        }
        this.date = c_data.targetDate;               // 根据这个日期值来生成对应的日历
    }

    // 日历dom结构
    Calendar.prototype.html =
        '<ul>' +
            '<li class="header" class="clearfix">' +
                '<span class="date"></span>' +
                '<a href="javascript:;" class="arrow left">上月</a>' +
                '<a href="javascript:;" class="arrow right">下月</a>' +
            '</li>' +
            '<li class="week clearfix">' +
                '<span class="weekend">日</span>' +
                '<span>一</span>' +
                '<span>二</span>' +
                '<span>三</span>' +
                '<span>四</span>' +
                '<span>五</span>' +
                '<span class="weekend">六</span>' +
            '</li>' +
            '<li class="days clearfix"></li>' +
        '</ul>';


    // 格式化日期
    Calendar.prototype.format = function (date) {
        if (!date) return;
        var a = date.toString();

        return {
            year: +a.substr(0, 4),
            month: +a.substr(4, 2),
            day: +a.substr(6)
        }
    };

    // 初始化
    Calendar.prototype.init = function () {
        delete this.init;
        var $outputId = this.$el(this.outputId),
            date = !this.date ? 0 : this.format(this.date);
        this.addDom(this._getDate(date, date.month -= 1), $outputId, this.id, 1);
        this.Event.init(this, this.id, $outputId);
    };

    // 获得所需日期
    Calendar.prototype._getDate = function (date, eventMonth) {
        var odate = new Date(),
            year = odate.getFullYear(),
            month = odate.getMonth(),
            curDay = odate.getDate(),
            eMonth = !eventMonth ? date.month : eventMonth;
        if (date) {
            return {
                year: new Date(date.year, eMonth, 1).getFullYear(),             // 目标年
                month: new Date(date.year, eMonth, 1).getMonth(),               // 目标月，返回0-11
                week: new Date(date.year, eMonth, 1).getDay(),                  // 当月1号星期几
                curMonthDays: new Date(date.year, eMonth + 1, 0).getDate(),     // 当月总天数,
                curDay: date.day                                                // 目标日
            }
        } else {
            return {                                                            // 未传参数（目标年份）的首次调用
                year: year,                                                     // 当年
                month: month,                                                   // 当月，返回0-11
                week: new Date(year, month, 1).getDay(),                        // 当月1号星期几
                curMonthDays: new Date(year, month + 1, 0).getDate(),           // 当月总天数,
                curDay: curDay                                                  // 今日
            }
        }
    };

    // 获得元素
    Calendar.prototype.$el = function (id, clas) {
        if (!clas) {
            return document.getElementById(id);
        } else {
            var i,
                array = [],
                all = document.getElementById(id).getElementsByTagName("*");
            for (i = 0; i < all.length; i++) {
                if (all[i].className.indexOf(clas) != -1) {
                    array.push(all[i]);
                }
            }
            return array;
        }
    };

    // 添加dom
    Calendar.prototype.addDom = function (Data, $outputId, id, one) {
        if (one) this.$el(id).innerHTML = this.html;                                     // 添加静态dom
        this.html = '';
        this.$el(id, 'date')[0].innerHTML = Data.year + '年' + (Data.month + 1) + '月';  // 获取头部年月
        var $day = this.$el(id, 'days')[0];
        this.getPreMonthDays($day, Data, id);
        this.getCurMonthDays($day, Data);
        this.getNextMonthDays($day, $outputId, id);
    };

    // 获取 本月 或 目标月 1号之前的天数
    Calendar.prototype.getPreMonthDays = function (eDay, data, id) {
        var preMonthDays = new Date(data.year, data.month, 0).getDate(),
            date_preMonthDays = data.week != 0 ? data.week : 7;                          // 获取上月的天数
        for (var i = 0; i < date_preMonthDays; i++) {
            this.html += '<span class="fc_gray">' + (preMonthDays - (date_preMonthDays - 1) + i) + '</span>';
        }
        // 清空dom前先移除事件绑定
        var el = this.$el(id, 'optional'),       										 // ID 和 optional是class名可选日期的元素
            j = el.length;
        while (j--) {
            el[j].removeEventListener('click', this.getDate, false);
        }

        eDay.innerHTML = this.html;
    };

    // 获取 本月 或 目标月 天数
    Calendar.prototype.getCurMonthDays = function (eDay, data) {
        this.html = eDay.innerHTML;
        var tdate = this.format(this.date),
            d = new Date(),
            year = !this.date ? d.getFullYear() : tdate.year,
            month = !this.date ? d.getMonth() : tdate.month - 1,
            im = data.month + 1,
            iMonth = initNum(im),
            iyear = data.year;

        function initNum(n) {
            if (n < 10) {
                n = '0' + n
            }
            return n
        }

        for (var i = 1, len = data.curMonthDays + 1; i < len; i++) {
            var days = initNum(i);
            if (iyear == year) {
                if (data.month == month) {
                    if (i < data.curDay) {                                                 // 今日之前日期
                        this.html += '<span class="fc_gray">' + i + '</span>';
                    } else if (i == data.curDay) {                                         // 今日标记
                        this.html += '<span date=' + iyear + iMonth + days + ' class="cur optional ' + this.getHolidayInfo(im, i) + '</span>';
                    } else {                                                               // 今日之后几天
                        this.html += '<span date=' + iyear + iMonth + days + ' class="optional ' + this.getHolidayInfo(im, i) + '</span>';
                    }
                } else if (data.month < month) {                                           // 当年 月份小于当月

                    this.html += '<span class="fc_gray">' + i + '</span>';
                } else {                                                                   // 当年 月份大于当月
                    this.html += '<span date=' + iyear + iMonth + days + ' class="optional ' + this.getHolidayInfo(im, i) + '</span>';
                }
            } else if (iyear < year) {                                                     // 小于当年
                this.html += '<span class="fc_gray">' + i + '</span>';
            } else {                                                                       // 大于当年
                this.html += '<span date=' + iyear + iMonth + days + ' class="optional ' + this.getHolidayInfo(im, i) + '</span>';
            }
        }
        eDay.innerHTML = this.html;
    };

    // 获取 本月 或 目标月 之后一月天数
    Calendar.prototype.getNextMonthDays = function (eDay, $outputId, id) {
        var allDays = 42,   // 月日历总天数固定不变
            _this = this;
        this.html = eDay.innerHTML;
        if (eDay.childNodes.length <= allDays) {
            var len = allDays - eDay.childNodes.length;
            for (var i = 1; i < len + 1; i++) {
                this.html += '<span class="fc_gray">' + i + '</span>';
            }
            eDay.innerHTML = this.html;
        }

        // 添加可选日期元素的监听事件
        this.Event.optionalEventListener(_this, id, function (event) {
            var e = event || window.event;
            e.stopPropagation();
            _this.getDate(this, $outputId, id);
        });
    };

    // 获取点击后的日期
    Calendar.prototype.getDate = function (that, $outputId, id) {
        var date = that.getAttribute('date'),
            _this = this;
        if ($outputId.tagName == 'INPUT') {
            $outputId.value = date;
        } else {
            $outputId.innerHTML = date;
        }

        this.$el(id).style.display = 'none';
        if (this.targetId) this.$el(this.targetId).style.display = 'block';
        if (this.isAddCalendarByOne) {
            var o = new Calendar({
                id: [this.targetId],
                outputId: [this.targetOutputId],
                targetDate: date
            });
            o.init();

            this.$el(this.targetOutputId).addEventListener('click', function (event) {
                var e = event || window.event;
                e.stopPropagation();
                _this.$el(_this.targetId).style.display = 'block';
            }, false);
        }
    };

    // 获得节日信息
    Calendar.prototype.getHolidayInfo = function (month, day) {
        switch (month) {
            case 1:
                if (day == 1) {
                    return 'holiday">元旦';
                } else {
                    return '">' + day;
                }
                break;
            case 4 :
                if (day == 5) {
                    return 'holiday">清明';
                } else {
                    return '">' + day;
                }
                break;
            case 5 :
                if (day == 1) {
                    return 'holiday">五一';
                } else {
                    return '">' + day;
                }
                break;
            case 10 :
                if (day == 1) {
                    return 'holiday">国庆';
                } else {
                    return '">' + day;
                }
                break;
            case 12 :
                if (day == 25) {
                    return 'holiday">圣诞';
                } else {
                    return '">' + day;
                }
            default :
                return '">' + day;
        }
    };

    // 事件
    Calendar.prototype.Event = {
        init: function (_this, id, $outputId) {
            this.arrowEventListener(_this, id, $outputId);

            // 通过事件来展示日历
            $outputId.addEventListener('click', function (event) {
                var e = event || window.event;
                e.stopPropagation();
                _this.$el(id).style.display = 'block';
            }, false);

            document.addEventListener('click', function () {
                _this.$el(id).style.display = 'none';
            });
        },
        // 左右箭头事件监控
        arrowEventListener: function (_this, id, $outputId) {
            var targetDate = _this.format(_this.date),
                d = new Date(),
                odate = {
                    year: !_this.date ? d.getFullYear() : targetDate.year,
                    month: !_this.date ? d.getMonth() : targetDate.month - 1,
                    day: !_this.date ? d.getDate() : targetDate.day
                };

            _this.$el(id, 'left')[0].addEventListener('click', event, false);
            _this.$el(id, 'right')[0].addEventListener('click', event, false);

            function event(event) {
                var e = event || window.event;
                e.stopPropagation();
                if (this.className.indexOf('left') != -1) {
                    _this.addDom(_this._getDate(odate, --odate.month), $outputId, id);
                } else {
                    _this.addDom(_this._getDate(odate, ++odate.month), $outputId, id);
                }
            }
        },

        // 可选日期元素的事件监控
        optionalEventListener: function (_this, id, fn) {
            var el = _this.$el(id, 'optional'),       // ID 和 optional是class名可选日期的元素
                i = el.length;
            while (i--) {
                el[i].addEventListener('click', fn, false);
            }
        }
    };
    return Calendar;
});
