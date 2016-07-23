/**
 * Created by Peter on 2016/7/23.
 */
var pwf = angular.module('pwf',['ui.router']);
pwf.controller(['$scope','$rootScope'],function($scope,$rootScope){
    $rootScope.pwf='life0001'
});



pwf.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                '':{
                    templateUrl:'pwf.html'
                },
                'main@index':{
                    templateUrl:'main.html'
                }
            }
        })
}]);
