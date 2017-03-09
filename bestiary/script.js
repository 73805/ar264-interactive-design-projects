// Dragging directive adapted from
// https://docs.angularjs.org/guide/compiler

var drag = angular.module('drag', [])
// This directive lets elements be draggable.
// It also sets up an effect where a draggable element
// placed on the sun will be hidden, and the sun will
// become redder. At maximum redness, a 'death' effect
// takes place. (desktop only)
drag.directive('draggable', function($document) {
    return function(scope, element, attr) {
      // dragging variables
      var startX = 0;
      var startY = 0;
      var x = 0;
      var y = 0;
      // for sun overlap detection
      var onSun = false;
      var sunEle = $('.sun');
      // center of sun
      var sunX = sunEle.offset().left + (sunEle.width() / 2);
      var sunY = sunEle.offset().top + (sunEle.height() / 2);
      // radius of sun
      var sunRad = sunEle.width() / 2;

      // when a draggable element is initially clicked
      element.on('mousedown', function(event) {
        // remove potential css transitions from element
        element.removeClass('trans-leaf');
        // Prevent default dragging of selected content
        event.preventDefault();
        // Get accurate initial positions by un-rotating instantaneously
        trans = element.css('transform');
        element.css({'transform' :'none'});
        startX = event.screenX - $(this).offset().left;
        startY = event.screenY - $(this).offset().top;
        // re-apply any rotation
        element.css({'transform' : trans});
        // click + move OR click + un-click
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      // distance formula for sun overlap detection
      distance = function(x1,y1,x2,y2){
        return  Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
      };

      // the 'drag' part of click + drag
      function mousemove(event) {
        // update position of element
        x = event.screenX - startX;
        y = event.screenY - startY;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
        // If center of element is on the sun
        eleX = x + (element.width() / 2);
        eleY = y + (element.height() / 2);
        if(distance(eleX, eleY, sunX, sunY) < sunRad){
          // show ring around sun and set boolean
        	$('.sun-ring').removeClass('hide');
        	onSun = true;
        }else{
          // or don't...
        	$('.sun-ring').addClass('hide');
        	onSun = false;
        };

      }

      // When draggable element is un-clicked'
      function mouseup() {
        $('.sun-ring').addClass('hide');
        // if the element was left over the sun
        if(onSun){
        	element.addClass('hide');
          // reduce opacity by .05 (starts at 1)
          sunOpac = sunEle.css('opacity') - .05;
          sunEle.css({'opacity' : sunOpac});
          // trigger death event if opacity at 0
          if(sunOpac < 0){
            $('.tree').addClass('tree-die');
            $('.leaf').addClass('leaf-die');
            $('.container').addClass('container-die');
          }
        	onSun = false;
        }
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    };
  });

// Two functions for random values between min and max at different distributions.

// Function to get evenly distributed randoms
randRange = function(min, max){
  // adjust to range
  return Math.floor(Math.random()*(max-min+1)+min);
};
// Function to get Gaussian distributed randoms (bell curve)
randGaussRange = function(min, max){
    // evenly distributed [-1 : 1]
    res = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    res = res + .5;
    // adjust to range
    return Math.floor(res*(max-min+1)+min);
};

// The Following code relates to the controller

// Main Controller
drag.controller('mainController', ['$scope', '$http', function($scope, $http) {

  //Get the page's text from a JSON file
  $http.get('json/text.json').success(function(data) {
    $scope.phrases = data.phrases;
    $scope.passages = data.passages;

    // PHRASES
    // The following segment gets a random position (left, top)
    // for each phrase.
    phraseNum = data.phrases.length;
    phraseTop = [], phraseLeft =[], 
    phraseIndices = [];
    // Get an estimate width and height based on an invisible hard-coded element
    phrase_w = $('.sneaky.phrase').width();
    phrase_h = $('.sneaky.phrase').height();

    for (i = 0; i < phraseNum; i++){
      // Even distribution within the lower half of the container
      phraseTop.push(randRange((container_h / 2), (container_h - phrase_h)));
      // Even distribution with some leftward overlap
      // (to balance the imminent rightward overlap)
      phraseLeft.push(randRange(-30, container_w - phrase_w));
    }
    // put the positional arrays in scope
    $scope.phraseTop = phraseTop;
    $scope.phraseLeft = phraseLeft;
  });

	// Adjusting leaf number and tree number by page width
  pageWidth = $('html').width();
  leafNum = (pageWidth / 10) + 70;
  if (leafNum > 250){leafNum = 250;}
  treeNum = pageWidth / 45;
  if (treeNum > 50){treeNum = 50;}

  // LEAVES
  // The following gets a random position (left, top)
  // and rotation for each leaf.
  leafTop = [], leafLeft = [], 
  leafDegs =[], leafIndices = [];
  // get container dimensions
  container_w = $('.container-sizer').width();
  container_h = $('.container-sizer').height();

	for (i = 0; i < leafNum; i++){
    // Gaussian distribution in top half of container (treetops)
		leafTop.push(randGaussRange(-100, (container_h / 2.2)));
    // Gaussian distribution horizontally allowing overflow on both sides
		leafLeft.push(randGaussRange(-90, container_w + 55));
    // random degrees rotation
    leafDegs.push(randRange(0,360));
    // create array 0:i for ng-repeating
		leafIndices.push(i)
	}
  // put the arrays in scope
	$scope.leafTop = leafTop;
	$scope.leafLeft = leafLeft;
  $scope.leafDegs = leafDegs;
	$scope.leafIndices = leafIndices;

  // TREES
  // The following gets a random position (left, bottom)
  // and dimensions (width, height) for each tree.
  treeBottom = [], treeLeft = [], 
  treeHeight = [], treeWidth = [], 
  treeIndices = [];
  for (i = 0; i < treeNum; i++){
    // bottoms close to ground
    treeBottom.push(randRange(10, 100));
    // no overflow on left or right
    treeLeft.push(randRange(10, container_w - 60));
    // width between 20, 50
    treeWidth.push(randRange(20,50));
    // height between 55% and 95% of the container height
    treeHeight.push(randRange((container_h * .55), (container_h*.95)));
    // create array 0:i for ng-repeating
    treeIndices.push(i);
  }
  // put the arrays in scope
  $scope.treeBottom = treeBottom;
  $scope.treeLeft = treeLeft;
  $scope.treeHeight = treeHeight;
  $scope.treeWidth = treeWidth;
  $scope.treeIndices = treeIndices;

  // SPECIAL EFFECTS

  // windBlow takes a class of a parent object
  // so mobile only has to effect passage leaves 
  // instead of all leaves.
	$scope.windBlow = function(parentClass){
    // concatenate the css selector
    selector = "." + parentClass + " " + ".leaf";
    // for each of the target elements
		$(selector).each(function(){
      console.log('happened');
      // add a css transition class
      $(this).addClass('trans-leaf');
      // pick random movement and rotate quantities
			randLeft = Math.round(Math.random() * 300 - 150);
			randTop = Math.round(Math.random() * 150 - 75);
			degs = Math.round(Math.random() * 180 - 90);
      // apply css changes (animated by css transitions)
			$(this).css({
				left : $(this).position().left + randLeft + "px",
				top : $(this).position().top + randTop + "px",
        transform : 'rotate('+ degs+'deg)'
			});
		});
	};
}]);
