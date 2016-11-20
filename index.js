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
},  function(error, response, body){
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
    console.log('Looking at data...');
    for (var i = 0; (i < data.length) && (counter < intervals.length); i++){
        if (time_now < intervals[counter].start){ //still not time
            counter = intervals.length;
            break;
        }
        if (counter < intervals.length - 1){
            if (data[i].creationTimestamp > intervals[counter].end && data[i].creationTimestamp < intervals[counter+1].start){
                console.log('You took it in wrong time');
                var start_mins = (intervals[counter].start -moment().startOf('day').unix()) / 60;
                var start_hours = Math.floor(start_mins/60);
                var start_minutes = start_mins % 60;
                if (start_minutes == 0){
                    start_minutes = '00';
                }
                var end_mins = (intervals[counter].end - moment().startOf('day').unix()) / 60;
                var end_hours = Math.floor(end_mins/60);
                var end_minutes = end_mins % 60;
                if (end_minutes == 0){
                    end_minutes = '00'
                }
                var took_hours = Math.floor(((data[i].creationTimestamp - moment().startOf('day').unix())/60)/60);
                var took_minutes = ((data[i].creationTimestamp - moment().startOf('day').unix())/60) % 60;
                var took_minutes = Math.round(took_minutes);
                console.log('Instead of taking between '+start_hours+':'+start_minutes+'-'+end_hours+':'+end_minutes+', you took at '+took_hours+':'+took_minutes); 
                counter++;
            }
        }
        if ((intervals[counter].start <= data[i].creationTimestamp) && (intervals[counter].end >= data[i].creationTimestamp)){
            counter++;
        } else if (data[i].creationTimestamp < intervals[counter].start){
            console.log('Took pill in appropriate time');
        }
    }
    if (counter != intervals.length)
        console.log('You forgot to take the pill.');
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
    var seconds = (hours * 60 + minutes) * 60;
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
    var seconds = (hours * 60 + minutes) * 60;
    return moment().startOf('day').unix() + seconds;
}
