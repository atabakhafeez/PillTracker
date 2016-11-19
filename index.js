var request = require('request');

request({
	url: 'http://lauzhack.ael.li/test',
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
    console.log(body); 

});