var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/items', {
			templateUrl : 'pages/items.html',
			controller  : 'mainController'
		});
});

app.controller('mainController', function($scope, $http, $location, $rootScope) {
	$http.get('json/data.json').success(function(data) {
		$scope.photos = data;
		// starting position
		if(angular.isUndefined($rootScope.curPhoto)){
			$rootScope.pindex = Math.floor(Math.random()*$scope.photos.length);
			$rootScope.curPhoto = $scope.photos[$rootScope.pindex]
			console.log('defining cur photo');
		}
		// Generate the linear gradient strings for each photo
		grads = [];
		for (i = 0; i < $scope.photos.length; i++){
			ip = $scope.photos[i];
			degs = Math.random() * 360;
			bW = Math.ceil(100 / ip.colors.length);
			gradStr = "linear-gradient(" + degs + "deg,";
			/* Concatenate the strings to something like
			linear-gradient(  30deg,
						#37425b 19.9%,
						#909caa 20%,
						#909caa 39.9%,
						#13192e 40%,   .... )
			*/
			for (j = 0; j < ip.colors.length; j++){
				if (j === 0){
					tbW = bW -.1
					gradStr = gradStr + "#" + ip.colors[j] + " " +
						tbW + "%,";
				}else if( j+1 < ip.colors.length){
					tbW = j*bW;
					gradStr = gradStr + "#" + ip.colors[j] + " " +
						tbW + "%,"
					tbW = ((j+1)*bW) - .1;
					gradStr = gradStr + "#" + ip.colors[j] + " " +
						tbW + "%,"
				}else{
					tbW = j*bW;
					gradStr = gradStr + "#" + ip.colors[j] + " " +
						tbW + "%);";
				}
			};
			grads.push(gradStr);
		};
		$scope.grads = grads;
	});

	$scope.directLink = function(clickedIndex){
		$rootScope.curPhoto = $scope.photos[clickedIndex];
		$rootScope.pindex = clickedIndex;
		$location.path("/items");
	};


	// Random, next and previous functions
	$scope.randomPhoto = function(){
		while($scope.photos[$rootScope.pindex] === $rootScope.curPhoto){
			$rootScope.pindex = Math.floor(Math.random()*$scope.photos.length);
		}
		$rootScope.curPhoto = $scope.photos[$rootScope.pindex];
	};
	$scope.nextPhoto = function(){
		$rootScope.pindex = ($rootScope.pindex + 1) % ($scope.photos.length)
		$rootScope.curPhoto = $scope.photos[$rootScope.pindex];
	};
	$scope.prevPhoto = function(){
		$rootScope.pindex = ($rootScope.pindex - 1) % ($scope.photos.length)
		$rootScope.curPhoto = $scope.photos[$rootScope.pindex];
	};
});