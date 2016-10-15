/**
 * Created by pwf on 2016/7/23.
 */
(function (doc, win) {
    var pwf = {
        init: function () {
            this.angular();
            this.setFontSize();
            //onresize = this.setFontSize;
        },
        angular: function () {
            angular.module('pwf', ['ui.router'])
                .controller('pwf', ['$scope', '$rootScope', function ($scope, $rootScope) {
                    $rootScope.pwf = 'life0001';
                }])

            /**
             * 路由
             */
                .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise('/index');
                    $stateProvider
                        .state('index', {
                            url: '/index',
                            views: {
                                'pwf': {
                                    templateUrl: 'tpls/pwf.html',
                                    controller: function () {
                                        $('.navList').on('click', 'li', function () {
                                            $(this).addClass('cur').siblings().removeClass('cur');
                                        })
                                    }
                                },
                                'main@index': {
                                    templateUrl: 'tpls/main.html'
                                }
                            }
                        })
                        .state('index.project', {
                            url: '/project',
                            views: {
                                'main': {
                                    templateUrl: 'tpls/project.html'
                                }
                            }
                        })
                        .state('index.writing', {
                            url: '/writing',
                            views: {
                                'main': {
                                    templateUrl: 'tpls/writing.html'
                                }
                            }
                        })
                }]);
        },
        /**
         * 设置字体大小
         */
        setFontSize: function () {
            doc.documentElement.style.fontSize = win.innerWidth / 10 + 'px';
        }
    };
    pwf.init();
})(document, window);

