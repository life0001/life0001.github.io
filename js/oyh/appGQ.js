var OgActivity2=angular.module('OgActivity2', ['ui.router']);
OgActivity2.controller('gq', function ($scope) {
	$scope.$on('$locationChangeSuccess', function () {
		location.reload();
	});
});
OgActivity2.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('index', {
		url: '/index',
		views: {
			'': {
				templateUrl: 'tpls/game_gq/index.html'
			},
			'main@index': {
				templateUrl: 'tpls/game_gq/introduce.html'
			}
		}
	})
	.state('index.detail', {
		url: '/detail',
		views: {
			'main': {
				templateUrl: 'tpls/game_gq/details.html',
				controller: function ($scope) {
					$scope.gq = {
						isShow: false,
						yuan: 205000,     // 投资金额
						allHeight: 10,
						countMoney: function () {
							if (this.yuan >= 1000000) {
								return 10000;
							}else if (this.yuan >= 800000) {
								return 8000;
							}else if (this.yuan >= 600000) {
								return 6000;
							}else if (this.yuan >= 400000) {
								return 4000;
							}else if (this.yuan >= 200000) {
								return 2000;
							}else if (this.yuan >= 100000) {
								return 1000;
							}else if (this.yuan >= 50000) {
								return 500;
							}else {
								return 0
							}
						},
						getHeight: function (val) {
							if (val == 10) {
								$scope.$apply(
									this.isShow =! this.isShow,
									$scope.height = 10
								)
							}else{
								$scope.$apply(
									this.isShow =! this.isShow,
									$scope.height = this.yuan == 0 ? 0 : (10*((106.5-val.split('top:')[1].split('%;')[0])/100)).toString().substr(0,4)
								)
							}
						},
						upFlag: function () {
							var $gq = $('#gq'),
								halfPos = 42.7-6.5,   //42.7是旗杆标尺一半的地方，包括6.5，   6.5是旗杆顶部距离页面顶部的距离
								allPos = halfPos*2,   //最高处
								_this = this,
								speed = 1000;
							if (this.yuan > 2000000) {
								$gq.animate({top: 6.5+'%'}, speed, function () {
									_this.getHeight(10);
								});
							}else{
								if (this.yuan <= 200000) {
									$gq.animate({top: (allPos*(1-this.yuan/2000000*5)+6.5)+'%'}, speed, function () {     //移动距离是根据页面顶部开始计算，所以要+旗杆顶部距离页面顶部的距离6.5
										_this.getHeight($gq.attr('style'));
									});
								}else if (this.yuan > 200000 && this.yuan <= 1000000) {
									$gq.animate({top: (allPos/1.8*(1-_this.yuan/2000000)+6.5)+'%'}, speed, function () {
										_this.getHeight($gq.attr('style'));
									});
								}else if (this.yuan > 1000000 && this.yuan <= 2000000) {
									$gq.animate({top: (allPos/1.8*(1-_this.yuan/2000000)+6.5)+'%'}, speed, function () {
										_this.getHeight($gq.attr('style'));
									});
								}
							}
						}
					};
					$scope.gq.upFlag();
				}
			}
		}
	})
	.state('index.list', {
		url: '/list',
		views: {
			'main': {
				templateUrl: 'tpls/game_gq/list.html'
			}
		}
	})
}]);
//	$scope.url = sUrl;
//	var aServeDate = [];	 //在列表页防止触发watcher
//	$scope.list = {
//		alen: ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'],
//		money: rs,
//		phone: user,
//		getDate: function (index) { //生成日期
//			var iIndex = index+6; //index初始0
//			return iIndex < 10 ? '0'+iIndex : iIndex;
//		},
//		addDate: function () {  //生成数组
//			for (var i=0, len=rs.length; i<len; i++) {
//				aServeDate.push(rs[i].tender_date.substr(8,2));
//			}
//			for (var j=0, leng=$scope.list.alen.length; j<leng; j++) {
//				if ($scope.list.alen[j]!=aServeDate[j]) {
//					aServeDate.splice(j,0,'');
//				}
//			}
//		},
//		getData: function (x) {  //获得数据
//			if ($scope.list.alen[x] == aServeDate[x]) {
//				if (rs[x] == undefined) {
//					for (var i=0, len=rs.length; i<len; i++) {
//						if (rs[i].tender_date.substr(8,2) == aServeDate[x]) {
//							return {
//								Amount: rs[i].tender_amount,
//								Money: rs[i].draw_cash
//							}
//						}
//					}
//				}
//				 return {
//					Amount: rs[x].tender_amount,
//					Money: rs[x].draw_cash
//				}
//			}else{
//				return 0;
//			}
//		}
//	}
//	$scope.list.addDate();
