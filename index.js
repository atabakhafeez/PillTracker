var request = require('request');
// var prompt = require('prompt');
var prompt = require('prompt-sync')();
var moment = require('moment');
var _ = require('underscore');

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
    var button_events = _.where(eventsResponse, {type: 'button', major: '20', minor: '25'});
    console.log(button_events);
    var intervals = getIntervals();

    check_if_took(button_events, intervals);
});

function check_if_took (data, intervals){
    var time_now = Math.floor(Date.now() / 1000);
    var counter = 0;
    console.log('Inside the function');
    for (var i = 0; (i < data.length) && (counter < intervals.length); i++){
        if (time_now < intervals[counter].start){ //still not time
        	return;
        }
        if (counter < intervals.length - 1){
	        if (data[i].creationTimestamp > intervals[counter].end && data[i].creationTimestamp < intervals[counter+1].start){
	        	console.log('You took it in wrong time');
	        	counter++;
        	}
        }
        if ((intervals[counter].start <= data[i].creationTimestamp) && (intervals[counter].end >= data[i].creationTimestamp)){
            counter++;
        } else{
        	console.log('Took pill in appropriate time');
        }
    }
    if (counter != intervals.length)
        console.log('You forgot to take the pill.');
    else
	    console.log('You didn\'t forget any pills');
}

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
	return pillIntervals;
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







