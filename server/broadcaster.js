const Request = require('./httpRequest.js');
const sleep = require('sleep')

function Broadcast() {
	this.Req = new Request();
	this.messages = []
	this.isBusy = false
}

Broadcast.prototype.startTicking = function () {
	setInterval(function () {
    	if (this.messages.length === 0) {
    		this.isBusy = false
			this.Req.broadcast('')
			//console.log('tick')
		} else {
			var message = this.messages.shift()
			if (message[0] === 'me') {
				console.log(message[1])
			} else {
				this.Req.broadcast(message[1])
			}
		}
	}.bind(this), 2000);
}

Broadcast.prototype.broadcast = function (messages) {
	this.isBusy = true
	for (var i = 0; i < messages.length; i++) {
		this.messages.push(messages[i])
	}
}

module.exports = Broadcast