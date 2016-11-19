var request = require('request');
// var prompt = require('prompt');
var prompt = require('prompt-sync')();
var moment = require('moment');

request({
	url: 'http://lauzhack.ael.li/events',
	method: 'GET',
	headers: {
		'token': 'saEbYNtHbxZ6ThHE'
	}
},	function(error, response, body){
    if(error){
        return console.log('Error:', error);
    }
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    // console.log(body);
    eventsResponse = JSON.parse(body);
    //this should be 1000
    console.log(eventsResponse.length);
    getIntervals();

});

function getIntervals() {
	var pillIntervals = [];
	var n = prompt('Please enter the number of times you must take medicine in one day: ');
	var regex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g
		for(var i = 0; i < n; i++) {
		console.log('Interval # ' + i);
		
		pillIntervals.push({
			start: getStartTime(),
			end: getEndTime()
		});
	}
	console.log(pillIntervals);
}

function getStartTime() {
	var regex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g
	var startTime = prompt('Start [hh:mm]: ');
	while (!regex.test(startTime)) {
		console.log('START: Not proper time format. Please enter again!');
		startTime = null;
		startTime = prompt('Start [hh:mm]: ');
	}
	console.log(startTime);
	var parts = startTime.split(":");
	var hours = parseInt(parts[0]);
	var minutes = parseInt(parts[1]);
	var seconds = (hours + minutes * 60) * 60;
	return moment().startOf('day').unix() + seconds;
}

function getEndTime() {
	var regex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g
	var endTime = prompt('End [hh:mm]: ');
	regex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g
	while (!regex.test(endTime)) {
		console.log('END: Not proper time format. Please enter again!');
		endTime = null;
		endTime = prompt('End [hh:mm]: ');
	}
	console.log(endTime);
	var parts = endTime.split(":");
	var hours = parseInt(parts[0]);
	var minutes = parseInt(parts[1]);
	var seconds = (hours + minutes * 60) * 60;
	return moment().startOf('day').unix() + seconds;
}







