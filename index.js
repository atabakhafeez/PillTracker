var request = require('request');
// var prompt = require('prompt');
var prompt = require('prompt-sync')();

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
	for(var i = 0; i < n; i++) {
		console.log('Interval # ' + i);
		var startTime = prompt('Start [hh:mm]: ');
		var endTime = prompt('End [hh:mm]: ');
		pillIntervals.push({
			start: startTime,
			end: endTime 
		});
	}
	console.log(pillIntervals);
}
