var app = angular.module('app', []);

// ====================================
//    Supporting functions
// ====================================

// true weather dictionary (unused)
weatherDict = {0: "tornado",1: "tropical storm",2: "hurricane",3: "severe thunderstorms",4: "thunderstorms",5: "mixed rain and snow",6: "mixed rain and sleet",7: "mixed snow and sleet",8: "freezing drizzle",9: "drizzle",10: "freezing rain",11: "showers",12: "showers",13: "snow flurries",14: "light snow showers",15: "blowing snow",16: "snow",17: "hail",18: "sleet",19: "dust",20: "foggy",21: "haze",22: "smoky",23: "blustery",24: "windy",25: "cold",26: "cloudy",27: "mostly cloudy (night)",28: "mostly cloudy (day)",29: "partly cloudy (night)",30: "partly cloudy (day)",31: "clear (night)",32: "sunny",33: "fair (night)",34: "fair (day)",35: "mixed rain and hail",36: "hot",37: "isolated thunderstorms",38: "scattered thunderstorms",39: "scattered thunderstorms",40: "scattered showers",41: "heavy snow",42: "scattered snow showers",43: "heavy snow",44: "partly cloudy",45: "thundershowers",46: "snow showers",47: "isolated thundershowers",3200: "not available"};
// reduced weather mapping from weather dictionary 
rainy = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,35,37,38,39,40,45,47];
snowy = [14,15,16,17,18,41,42,43,46];
pcloudy = [19,20,21,22,23,24,25,26,27,28,29,30,44];
clear = [31,32,33,34,36,3200];
// map the weather code to a 1 of 4 conditions types
function mapToCondition(val){
	val = parseInt(val);
	if(rainy.indexOf(val) > -1){
		return "rainy";
	}
	if(snowy.indexOf(val) > -1){
		return "snowy";
	}
	if(pcloudy.indexOf(val) > -1){
		return "pcloudy";
	}
	if(clear.indexOf(val) > -1){
		return "clear";
	}
}

// sky overlay gradient strings corresponding to conditions
skyOverlayRainy = "linear-gradient(rgb(30,30,30),rgb(60,60,60))";
skyOverlaySnowy = "linear-gradient(rgb(115, 115, 115),rgb(230, 230, 230))";
skyOverlayClear = "transparent";
// map the condition type to a sky gradient
function mapSkyOverlay(code){
	if(code == "rainy"){
		return skyOverlayRainy;
	}
	else if(code == "snowy"){
		return skyOverlaySnowy;
	}
	else{
		return skyOverlayClear;
	}
}

// map the condition type to a cloud boolean
function mapToCloud(code, dayOrNight){
	if(dayOrNight == "night"){
		return false;
	}else if(code == "pcloudy"){
		return true;
	}else{
		return false;
	}
}

// weather effect filenames
precipRain = "rain.png";
precipSnow = "snow.png";
clear = "clear.png"
// map the condition type to a precipitation file name
function mapToPrecip(code){
	if(code == "rainy"){
		return precipRain;
	}
	else if(code == "snowy"){
		return precipSnow;
	}else{
		return clear;
	}
}

// sun positioning function
// assumes that sunrise < sunset in 0-24 range...
// is that a safe assumption in the continental US?
function positionSun(time, sunrise, sunset){
	// get page proportions for scaling
	var sky = $('.sky');
	var sun = $('.sun');
	var xscal = sky.width() * .9;
	var xscaldif = sky.width() * .05;
	var yscal = sky.height() * .9;
	var x = xscal + xscaldif;
	var y = -300;
	var dayOrNight = "night";
	if(time >= sunrise && time <= sunset){
		dayOrNight = "day";
		// find fraction of X position (0-1)
		x01 = (time - sunrise) / (sunset - sunrise);
		// convert (0-1) to sine cycle (0-pi)
		rads = x01 * Math.PI;
		// find fraction of Y position (0-1)
		y01 = Math.sin(rads);
		// scale (0-1) values to page dimensions
		x = (x01 * xscal) + xscaldif;
		y = y01 * yscal;
		//y = Math.round(sky.height() - y - sun.width());
	}
	// set x and y to middle of sun
	x = Math.round(x - sun.width() / 2);
	y = y - sun.width() / 2;
	return {"left":x,"bottom":y,"dayOrNight":dayOrNight};
}

// sky backdrop gradient strings
skyDropDay = "#A5C9D6";
skyDropSunrise = "linear-gradient(185deg, rgb(87, 156, 156) 65%, rgb(240, 152, 25), rgb(255, 81, 47))";
skyDropSunset = "linear-gradient(175deg, rgb(68, 113, 113) 65%, rgb(240, 152, 25), rgb(255, 81, 47));";
skyDropNight = "#141414";
// sky background function
// assumes that sunrise < sunset in 0-24 range...
function colorSky(time,sunrise,sunset){
	t = .8;
	// if time is within t of the sunrise
	if(time < (sunrise + t) && time > (sunrise - .7)){
		return skyDropSunrise;
	}
	else if(time < (sunset + t) && time > (sunset - .7)){
		return skyDropSunset;
	}
	else if(time >= sunrise && time <= sunset){
		return skyDropDay;
	}
	else{
		return skyDropNight;
	}
	return skyDropDay;
}

// time conversion function 7:30 PM -> 19.5
function convertTime(a){
	pref = a.slice(0,-3);
	suff = a.slice(-2,a.length);
	if (pref.length < 5){
		pref = "0"+pref;
	}
	hh = parseFloat(pref.slice(0,2));
	mm = parseFloat(pref.slice(3,5));
	mm = mm/60;
	if(suff == "pm"){
		hh = hh + 12;
	}
	return hh + mm;
}

// mapping a datetime object to spring or winter
function convertSeason(date){
	m = date.getMonth();
	// 0-indexed months
	if(m >= 3 && m < 10){
		return "spring";
	}else{
		return "winter"
	}
}

// filtering scene objects based on conditions
function filterObjects(conds, objs){
	fprops = [];
	var removal = false;
	// for each object
	for(i=0; i < objs.length; i++){
		removal = false;
		// for each of the current conditions
		for(j=0; j<conds.length; j++){
			// if the condition calls for removal
			if(objs[i].remove.indexOf(conds[j]) > -1){
				removal = true;
				break;
			}
		}
		if(!removal){
			fprops.push(objs[i]);
		}
	}
	return fprops;
}


// ====================================
//    Main Controller
// ====================================

app.controller('mainController', function($scope, $http) {

	// Docs at http://simpleweatherjs.com
	// Calling API to update the weather data and local time
	function getLiveWeatherTime(loc, cb){
		var woeid = "";
		var targetDate = new Date();
		var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60;
		// api string with insecure key :)
		var api_str = "https://maps.googleapis.com/maps/api/timezone/json?location="+loc+"&timestamp="+timestamp+"&key=AIzaSyA0y9W6EeAmMWTzZ5uuvsBVFB6RC6CnYsA";
		// set a fallback response (should be overwritten by cb anyway)
		var wtemp = {
			     "sunrise":6.5,
			     "sunset":19.5,
			     "cloudBool":true,
			     "code":30
	      	};
		var res = {
			     "weater":wtemp,
			     "failedW":1,
			     "failedT":1,
			     "season":"spring",
			     "time":12
	      	};
		// unfortunate branching asynchronous functions
		$.simpleWeather({
			location: loc,
			woeid: woeid,
			unit: 'f',
			success: function(weather){
				// modify the results
				weather.sunrise = convertTime(weather.sunrise);
				weather.sunset = convertTime(weather.sunset);
				res.weather = weather;
				res.failedW = 0
				// call the time api to get local time
				$.ajax({url:api_str}).done(function(response){
					if(response.timeZoneId != null){
						// convert response to usable value
						var timeZoneId = response.timeZoneId;
						var offsets = response.dstOffset * 1000 + response.rawOffset * 1000;
						time = new Date(timestamp * 1000 + offsets);
						// get season data
						res.season = convertSeason(time);
						time = time.getHours() + (time.getMinutes()/60);
						res.time = time;
						res.failedT = 0;
					}else{
						alert("Could not get time data. Try again shortly!");
					}
					cb(res);
				});
			},
			error: function(error) {
				// call the time api to get local time
				$.ajax({url:api_str}).done(function(response){
					if(response.timeZoneId != null){
						// convert response to usable value
					      var timeZoneId = response.timeZoneId;
					      var offsets = response.dstOffset * 1000 + response.rawOffset * 1000;
				       	time = new Date(timestamp * 1000 + offsets);
				       	// get season data
				       	res.season = convertSeason(time);
				       	time = time.getHours() + (time.getMinutes()/60);
				       	res.time = time;
				       	res.failedT = 0;
					}else{
						alert("Could not get time data. Try again shortly!");
					}
					cb(res);
					alert("Could not get weather data. Try again shortly!");
				});
			}
		});
	}

	// ====================================
	//    Callback Function to Update the 'environment' object
	// ====================================

	weatherTimeCb = function(wti){
		// if getting time failed
		if(wti.failedT == 1){
			// go to default time
			wti.time = $scope.env.wt.time;
		}
		// if getting weather failed
		if(wti.failedW == 1){
			// stay with previous weather
			wti.weather = $scope.env.wt.weather;
			wti.season = $scope.env.wt.season;
		}
		$scope.env.wt = wti;
		$scope.env = updateData($scope.env);
		// propagate the change
		$scope.$apply();
		// allow the cool animation to finish!
		setTimeout(function(){
			$('.golive').removeClass('goinglive');
		},1250);
	}


	// click event for the menu open icon
	$('.go-menu').click(function(){
		$('.go-menu').addClass('hide');
		$('.menu').removeClass('hide');
		$('.control-panel').removeClass('pullout');
	});

	// click event for the control-panel open icon
	$('.control-button').click(function(){
		$('.control-panel').toggleClass('pullout');
	});

	// Function to change the location from the menu screen
	$scope.changePlace = function(locStr){
		// update the scope with the defaults of the target location
		$http.get('json/places.json').success(function(data) {

			$scope.env = data.locations[locStr];
			$scope.env = updateData($scope.env);
			$scope.goLive = function(){
				$('.golive').addClass('goinglive');
				getLiveWeatherTime($scope.env.loc, weatherTimeCb);
			};
			$('.menu').addClass('hide');
			$('.go-menu').removeClass('hide');
		});
	}

	// change just the current season
	$scope.changeSeason = function(seaStr){
		$scope.env.wt.season = seaStr;
		$scope.env = updateData($scope.env);
	}

	// change just the current time (day/night)
	$scope.changeTime = function(dayOrNight){
		// if they want night and its currently day
		if((dayOrNight == "night") && ($scope.env.wt.sunPos.dayOrNight == "day")){
			// go to some night time (near sunset for nice sun transition)
			$scope.env.wt.time = ($scope.env.wt.weather.sunset + 5) % 24;
		}
		// if they want day and its currently night
		if((dayOrNight == "day") && ($scope.env.wt.sunPos.dayOrNight == "night")){
			// go to some day time
			$scope.env.wt.time = 14.5
		}
		$scope.env = updateData($scope.env);
	}

	// Function to perform all the mappings and update the 'environment' object
	// this one is important!
	function updateData(envi){
		// create a temporary weather time sub-object
		wti = envi.wt;
		// get parameters for sun positioning and scene mappings
		var time = wti.time;
		var sunrise = wti.weather.sunrise;
		var sunset = wti.weather.sunset;
		var code = mapToCondition(wti.weather.code);
		// calculate sun positioning
		wti.sunPos = positionSun(time,sunrise,sunset);
		// map local time data to a sky backdrop
		wti.skyDrop = colorSky(time,sunrise,sunset);
		// map weather to a sky overlay
		wti.skyOverlay = mapSkyOverlay(code);
		// map weather and time to presence of cloud (true/false)
		wti.cloudBool = mapToCloud(code, wti.sunPos.dayOrNight);
		// map weather code to a weather effects overlay
		wti.precip = mapToPrecip(code);
		// grab season (set in the time api call)
		wti.season = envi.wt.season;

		// get parameters for the 'current conditions'
		conds = [wti.sunPos.dayOrNight, wti.season];
		// filter the location's props by the current conditions
		filteredObjects = filterObjects(conds, envi.objects);

		// update the environment's object
		envi.filteredObjects = filteredObjects;
		// map the season to a landscape background
		envi.landscape = envi.landscapes[wti.season]
		// overwrite the weather-time sub-object
		envi.wt = wti;

		return envi;
	}
});
