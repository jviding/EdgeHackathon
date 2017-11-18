const http = require('http');

function Request(name) {
	this.name = name
	this.joinURL = 'http://127.0.0.1:3000/join'
	this.mooseURL = 'http://127.0.0.1:3000/moose'
	this.holeURL = 'http://127.0.0.1:3000/hole'
	this.leaveURL = 'http://127.0.0.1:3000/leave'
	this.crashURL = 'http://127.0.0.1:3000/crash'
}

Request.prototype.joinServer = function (success, failure) {
	const url = this.joinURL + '?name=' + this.name
	this.makeHttpRequest(url, success, failure)
}

Request.prototype.reportMoose = function () {
	const url = this.mooseURL + '?name=' + this.name
	this.makeHttpRequest(url, function (resp) {
		return true
		//console.log(resp)
	}, function (err) {
		console.log(err)
	})
}

Request.prototype.reportHole = function () {
	const url = this.holeURL + '?name=' + this.name
	this.makeHttpRequest(url, function (resp) {
		return true
		//console.log(resp)
	}, function (err) {
		console.log(err)
	})
}

Request.prototype.reportCrash = function (successCallback) {
	const url = this.crashURL + '?name=' + this.name
	this.makeHttpRequest(url, successCallback, function (err) {
		console.log(err)
	})
}

Request.prototype.leaveServer = function () {
	const url = this.leaveURL + '?name=' + this.name
	this.makeHttpRequest(url, function (resp) {
		console.log(resp)
	}, function (err) {
		console.log(err)
	})
}

Request.prototype.makeHttpRequest = function (url, successCallback, errorCallback) {
	http.get(url, (resp) => {
			let data = ''
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk
		});
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			successCallback(data)
			return true;
		});
	}).on("error", (err) => {
		errorCallback("Error: " + err.message)
		return true;
	});
}

module.exports = Request