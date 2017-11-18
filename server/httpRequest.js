var request = require('request');

function Request() {
	this.url = 'http://127.0.0.1:3001'
}

Request.prototype.broadcast = function(message) {
	request.post(
	    this.url,
	    { json: { message: message } },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            return true;
	        }
	    }
	);
}

module.exports = Request