const NAME = 'Robert';

const Request = require('./httpRequest.js');
const Req = new Request(NAME);
const TickerClass = require('./broadcaster.js');
const Ticker = new TickerClass()
Ticker.startTicking()

// import Timi function

function sensorMooseCallback() {
	Req.reportMoose()
}
// setTimi(mooseCallback)

function sensorHoleCallback() {
	Req.reportHole()
}
// setTimi(holeCallback)

function checkServerAndDoSomething() {
	// Poll sensors
	// Receive
	// Do something
}

function waitOneSecond() {
	return true
	//sleep(1000)
}

Req.joinServer(function (success) {
	if (success === 'incidents') {
		Ticker.write([
			'CAR < > ** You are now driving the highway E45 from Tuusula to Helsinki. **',
			'CAR < Supervisor Steve> Supervisor Steve: Hello ' + NAME + '!',
			'CAR < Supervisor Steve> Highway E45 status report:',
			'CAR < Supervisor Steve>    - Risk: High',
			'CAR < Supervisor Steve>    - Moose at [60.226, 24.946].',
			'CAR < Supervisor Steve>    - Risk: Low',
			'CAR < Supervisor Steve>    - Hole at [61.315, 23.527].',
			' ',
			'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
		])
	} else {
		Ticker.write([
			'CAR < > ** You are now driving the highway E45 from Tuusula to Helsinki. **',
			'CAR < Supervisor Steve> Hello ' + NAME + '!',
			'CAR < Supervisor Steve> Highway E45 status report:',
			'CAR < Supervisor Steve>    - No active warnings.',
			' ',
			'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
		])
	}
}, function (error) {
	return false
})

/*while (true) {
	waitOneSecond();
	checkServerAndDoSomething()
}*/
/*sensorMooseCallback()
sensorHoleCallback()

Req.leaveServer()*/

function emptyTerminalScreen() {
	for (var i = 0; i < 30; i++) {
		console.log('')
	}
}
emptyTerminalScreen()