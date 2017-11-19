const http = require('http');

function Request(name) {
	this.name = name
	//var IP = '192.168.43.245'
	var IP = '127.0.0.1'
	this.joinURL = 'http://'+IP+':3000/join'
	this.mooseURL = 'http://'+IP+':3000/moose'
	this.holeURL = 'http://'+IP+':3000/hole'
	this.leaveURL = 'http://'+IP+':3000/leave'
	this.crashURL = 'http://'+IP+':3000/crash'
	this.getIncidentCountURL = 'http://'+IP+':3000/incidentCount'
	this.receivedURL = 'http://'+IP+':3000/received'
}

Request.prototype.sendReceived = function () {
	const url = this.receivedURL + '?name=' + this.name
	this.makeHttpRequest(url, function () {
		return true
	}, function (err) {
		return false
	})
}

Request.prototype.getIncidentCount = function (successCallback) {
	const url = this.getIncidentCountURL
	this.makeHttpRequest(url, successCallback, function (err) {
		return false
	})
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
			if (data === '400') {
				successCallback(false)
			} else {
				successCallback(data)
				return true;
			}
		});
	}).on("error", (err) => {
		errorCallback("Error: " + err.message)
		return true;
	});
}

module.exports = Request