const Request = require('./httpRequest.js');
const Req = new Request('Robert');

function sensorMooseCallback() {
	Req.reportMoose()
}

function sensorHoleCallback() {
	Req.reportHole()
}

function checkServerAndDoSomething() {
	// Poll sensors
	// Receive
	// Do something
}

function waitOneSecond() {
	sleep(1000)
}

Req.joinServer()

/*while (true) {
	waitOneSecond();
	checkServerAndDoSomething()
}*/
sensorMooseCallback()
sensorHoleCallback()

Req.leaveServer()