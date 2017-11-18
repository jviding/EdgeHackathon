const NAME = 'Robert';

const Request = require('./httpRequest.js');
const Req = new Request(NAME);
const TickerClass = require('./broadcaster.js');
const Ticker = new TickerClass()
Ticker.startTicking()

// import Timi function

function sensorMooseCallback() {
	Req.reportMoose()
	Ticker.write([
		'CAR < Pilot ' + NAME + '> ** An obstacle detected.    **\n',
		'CAR < Pilot ' + NAME + '> ** Avoiding the obstacle... **',
		'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
	])
}
// setTimi(mooseCallback)

function sensorHoleCallback() {
	Req.reportHole()
	Ticker.write([
		'CAR < Pilot ' + NAME + '> ** An obstacle detected.    **\n',
		'CAR < Pilot ' + NAME + '> ** Avoiding the obstacle... **',
		'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
	])

}
// setTimi(holeCallback)

function reportCrash() {
	Req.reportCrash(function (success) {
		return true
	})
}

function joinServer() {
	Req.joinServer(function (success) {
		if (success === 'incidents') {
			Ticker.write([
				' ',
				'CAR < > ** You are now driving the highway E45 from Tuusula to Helsinki. **\n',
				'CAR < Supervisor Steve> Supervisor Steve: Hello ' + NAME + '!',
				'CAR < Supervisor Steve> Highway E45 status report:',
				'CAR < Supervisor Steve>    - Risk: High',
				'CAR < Supervisor Steve>    - Moose at [60.226, 24.946].',
				'CAR < Supervisor Steve>    - Risk: Low',
				'CAR < Supervisor Steve>    - Hole at [61.315, 23.527].',
				' ',
				'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
			])
			setTimeout(function() {
				Ticker.write([
					'CAR < > ** An obstacle detected.    **\n',
					'CAR < > ** Avoiding the obstacle... **',
					'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
				])
				reportCrash()
			}, 23000)
		} else {
			Ticker.write([
				' ',
				'CAR < > ** You are driving the highway E45 from Tuusula to Helsinki. **\n',
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
}

function emptyTerminalScreen() {
	for (var i = 0; i < 30; i++) {
		console.log('')
	}
}
emptyTerminalScreen()


joinServer()

setInterval(function () {
	//sensorMooseCallback()
	//sensorHoleCallback()

	//queryServer
}, 1000)

//Req.leaveServer()