/**
 * Created by Peter on 2016/7/23.
 */
var pwf = angular.module('pwf',['ui.router']);
pwf.controller('pwf',['$scope','$rootScope',function($scope,$rootScope){
    $rootScope.pwf='life0001';
}]);



pwf.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                'pwf':{
                    templateUrl:'tpls/pwf.html',
                    controller:function(){
                        $('.navList').on('click','li',function(){
                            $(this).addClass('cur').siblings().removeClass('cur');
                        })
                    }
                },
                'main@index':{
                    templateUrl:'tpls/main.html'
                }
            }
        })
        .state('index.project',{
            url:'/project',
            views:{
                'main':{
                    templateUrl:'tpls/project.html'
                }
            }
        })
        .state('index.writing',{
            url:'/writing',
            views:{
                'main':{
                    templateUrl:'tpls/writing.html'
                }
            }
        })
}]);

