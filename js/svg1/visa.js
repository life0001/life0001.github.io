$(function () {
    var Visa = {
        event: function () {
            var $SelectEventShow = $('.SelectEventShow'),
                $SelectEventHover = $('.SelectEventHover'),
                $curSelect = $('.curSelect'),
                $navTabs = $('.navTabs_tit'),
                $hotTitle = $('.hotTitle'),
                $curCity = $('.curCity'),
                $Region_city = $('.Region_city'),
                $cityEventHide = $('.cityEventHide'),
                $cityLi = $('.cityEventHide li'),
                $cityUl = $('.cityEventHide ul'),
                $navContents = $('.navContents');

            // 点击更多事件
            $('.navMore').on('click', function () {
                $(this).text() == '更多' ? $(this).text('收起').prev().show() : $(this).text('更多').prev().hide();
            });

            // 导航切换
            $navTabs.on('click', 'a', function () {
                var nzIndex = $(this).index();
                $(this).addClass('titCur').siblings().removeClass('titCur');
                $navContents.removeClass('navOn').eq(nzIndex).addClass('navOn');
            });

            // 显示城市下拉框
            $Region_city.on('click', function (e) {
                e.stopPropagation();
                $cityEventHide.show();
                $SelectEventHover.hide();
            });

            // 城市切换
            $hotTitle.on('click', 'a', function (e) {
                e.stopPropagation();
                var nzIndex = $(this).index();
                $(this).addClass('cityCur').siblings().removeClass('cityCur');
                $cityLi.removeClass('cityOn').eq(nzIndex).addClass('cityOn')
            });

            // 选择城市
            $cityUl.on('click', 'li a', function (e) {
                e.stopPropagation();
                $curCity.text($(this).text());
                $cityEventHide.hide();
            });

            // 旅游、商务、探亲切换
            $SelectEventShow.on('click', function (e) {
                e.stopPropagation();
                $SelectEventHover.show();
                $cityEventHide.hide();
            });

            // 下拉选择框
            $SelectEventHover.on('click', 'a', function (e) {
                e.stopPropagation();
                $curSelect.text($(this).text());
                $SelectEventHover.hide();
                $cityEventHide.hide();
            });

            // 隐藏下拉框
            $(document).click(function () {
                $cityEventHide.hide();
                $SelectEventHover.hide();
            });
        }
    };
    Visa.event();
});
