function Broadcast() {
	this.messages = []
	this.isBusy = false
}

Broadcast.prototype.startTicking = function () {
	setInterval(function () {
    	if (this.messages.length === 0) {
    		this.isBusy = false
			//console.log('tick')
		} else {
			var message = this.messages.shift()
			console.log(message)
		}
	}.bind(this), 2000);
}

Broadcast.prototype.write = function (messages) {
	this.isBusy = true
	for (var i = 0; i < messages.length; i++) {
		this.messages.push(messages[i])
	}
}

module.exports = Broadcast