var app = angular.module('app', ['ngRoute']);

// Page routing
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

// Shuffle an array 
// from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    	}
	return array;
}

// Main Controller
app.controller('mainController', function($scope, $http, $location, $rootScope) {
	$http.get('json/data.json').success(function(data) {
		$scope.photos = data;
		// Get an image when refreshing a single-item page
		if(angular.isUndefined($rootScope.curPhoto)){
			$rootScope.pindex = Math.floor(Math.random()*$scope.photos.length);
			$rootScope.curPhoto = $scope.photos[$rootScope.pindex]
			console.log('defining cur photo');
		}
		// Generate the linear-gradient css strings for each photo
		grads = [];
		hexes = [];
		for (i = 0; i < $scope.photos.length; i++){
			ip = $scope.photos[i];
			// random rotation
			degs = Math.random() * 360;
			// color band width
			bW = Math.ceil(100 / ip.flat_hex.length);
			gradStr = "linear-gradient(" + degs + "deg,";
			/* Concatenate the strings to something like
			linear-gradient(  30deg,
						#37425b 19.9%,
						#909caa 20%,
						#909caa 39.9%,
						#13192e 40%,   .... )
			*/
			for (j = 0; j < ip.flat_hex.length; j++){
				if (j === 0){
					tbW = bW -.1;
					gradStr = gradStr + "#" + ip.flat_hex[j] + " " +
						tbW + "%,";
				}else if( j+1 < ip.flat_hex.length){
					tbW = j*bW;
					gradStr = gradStr + "#" + ip.flat_hex[j] + " " +
						tbW + "%,"
					tbW = ((j+1)*bW) - .1;
					gradStr = gradStr + "#" + ip.flat_hex[j] + " " +
						tbW + "%,"
				}else{
					tbW = j*bW;
					gradStr = gradStr + "#" + ip.flat_hex[j] + " " +
						tbW + "%);";
				}
				hexes.push(ip.flat_hex[j]);
			};
			grads.push(gradStr);
		};
		$scope.grads = grads;
		hexes = shuffle(hexes);
		$scope.hexes = hexes;
	});

	$scope.random = function() {
        return 0.5 - Math.random();
  	}
	// Linking from the grid to a single-item
	$scope.directLink = function(clickedIndex){
		$rootScope.curPhoto = $scope.photos[clickedIndex];
		$rootScope.pindex = clickedIndex;
		$location.path("/items");
	};

	// Random, next and previous single-item pagination functions
	$scope.randomPhoto = function(){
		$rootScope.pindex = Math.floor(Math.random()*$scope.photos.length);
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
		$rootScope.pindex = $rootScope.pindex - 1;
		if($rootScope.pindex < 0){
			$rootScope.pindex = $scope.photos.length - 1;
		}
		$rootScope.curPhoto = $scope.photos[$rootScope.pindex];
		console.log($rootScope.pindex);
	};
});