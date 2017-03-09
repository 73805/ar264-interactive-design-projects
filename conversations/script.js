var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl : 'pages/line-1.html',
			controller  : 'lyricsController'
		})
		.when('/line-2', {
			templateUrl : 'pages/line-2.html',
			controller  : 'lyricsController'
		})
		.when('/line-3', {
			templateUrl : 'pages/line-3.html',
			controller  : 'lyricsController'
		})
		.when('/line-4', {
			templateUrl : 'pages/line-4.html',
			controller  : 'lyricsController'
		})
		.when('/line-5', {
			templateUrl : 'pages/line-5.html',
			controller  : 'lyricsController'
		})
		.when('/line-6', {
			templateUrl : 'pages/line-6.html',
			controller  : 'lyricsController'
		})
		.when('/line-7', {
			templateUrl : 'pages/line-7.html',
			controller  : 'lyricsController'
		})
		.when('/line-8', {
			templateUrl : 'pages/line-8.html',
			controller  : 'lyricsController'
		})
		.when('/line-9', {
			templateUrl : 'pages/line-9.html',
			controller  : 'lyricsController'
		})
		.when('/line-10', {
			templateUrl : 'pages/line-10.html',
			controller  : 'lyricsController'
		})
		.when('/line-11', {
			templateUrl : 'pages/line-11.html',
			controller  : 'lyricsController'
		});
});

app.controller('mainController', function($scope, $interval) {
	// A function used by lyric pages
	$scope.harmonize = function(){
		elems = $('.container').find('.lyric:not(".target")');
		off = $('.target').offset();
		elems.css({top:off['top'], left:off['left'], opacity:0});
		$('.container').css({background: 'rgb(30,30,30)'});
		$scope.nextUrl = $scope.getNextUrl(2000);
		console.log('continue');
	};
	$scope.fader = function(){
		$('.container').css({background: 'white'});
		$('.target').css({color: 'rgb(60,60,60)'});
	};
	// function to get the next url (line-1 -> line-2)
	$scope.getNextUrl = function(delay){
		$scope.nextUrl = '';
		console.log('getting next Url');
		urlSeg = $(location).attr('href').split("/").pop();
		// if we are on the root
		if(urlSeg.length < 1){
			$interval(function(){
				$scope.nextUrl = '#line-2';
			}, delay);
		}
		// if we are in the pages
		else{
			//split into base and index
			urlSeg = urlSeg.split('-');
			// increment last number of URL
			nextUrl = '#line-' + (parseInt(urlSeg[1]) + 1);
			$interval(function(){
				$scope.nextUrl = nextUrl;
			}, delay);
		};
	};
});

app.controller('restController', function($scope, $interval){
	
});

app.controller('lyricsController', function($scope, $interval) {
	randTop = [];
	randLeft = [];
	indices = [];
	// Scalers for random position to fit on page
	leftScaler = $('.container').innerWidth() - $('.sneaky').innerWidth();
	topScaler = $('.container').height() - $('.sneaky').height();
	max = 20;
	for (i = 0; i < max; i++){
		rando = Math.round(Math.random() * topScaler);
		randTop.push(rando);
		rando = Math.round(Math.random() * leftScaler);
		randLeft.push(rando);
		indices.push(i)
	}
	indices.pop();
	$scope.randTop = randTop;
	$scope.randLeft = randLeft;
	$scope.indices = indices;
	/* On second loop */
	if($scope.looped){
		$('.container div:not(".final-chorus")').removeClass();
		$('p').removeClass();
		$('p').addClass('boldwhite');
		$('.rest').css({color:'white'});	
		$('.container').css({background: 'rgb(30,30,30)', transition: 'none'});	
	}
});