const Request = require('./httpRequest.js');

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
			} else if (message[0] === 'all') {
				this.Req.broadcast(message[1])
			}
			if (this.messages.length > 0 && this.messages[0][0] === 'func') {
				var callback = this.messages[0][1];
				callback()
			}			
		}
	}.bind(this), 2000);
}

Broadcast.prototype.broadcast = function (messages, incrementIncidents) {
	this.isBusy = true
	for (var i = 0; i < messages.length; i++) {
		this.messages.push(messages[i])
	}
	if (incrementIncidents) {
		this.messages.push([['func', incrementIncidents]])
	}
}

module.exports = Broadcast