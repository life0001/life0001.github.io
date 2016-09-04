var OgActivity1 = angular.module('OgActivity1', ['ui.router']);
OgActivity1.controller('main', function ($scope) {
    $scope.$on('$locationChangeSuccess', function () {
        location.reload();
    });
});

OgActivity1.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('index', {
		url: '/index',
		views: {
			'': {
				templateUrl: 'tpls/game_jjp/index.html'
			},
			'main@index': {
				templateUrl: 'tpls/game_jjp/main.html'
			}
		}
	})
	.state('index.GameIntroduce', {
		url: '/GameIntroduce',
		views: {
			'main': {
				templateUrl: 'tpls/game_jjp/introduce.html'
			}
		}
	})
	.state('index.GameCandidate', {
		url: '/GameCandidate',
		views: {
			'main': {
				templateUrl: 'tpls/game_jjp/candidate.html'
			}
		}
	})
	.state('index.game', {
		url: '/game?c',
		views: {
			'main': {
				templateUrl: 'tpls/game_jjp/game.html'
			}
		}
	});
}]);


