const NAME = 'Robert';

const Request = require('./httpRequest.js');
const Req = new Request(NAME);
const TickerClass = require('./broadcaster.js');
const Ticker = new TickerClass()
Ticker.startTicking()

var incidentCount = 0;

// import Timi function

function sensorMooseCallback() {
	incidentCount++;
	Req.reportMoose()
	Ticker.write([
		'CAR < Pilot ' + NAME + '> ** An obstacle detected.    **\n',
		'CAR < Pilot ' + NAME + '> ** Avoiding the obstacle... **',
		'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
	])
}
// setTimi(mooseCallback)

function sensorHoleCallback() {
	incidentCount++;
	Req.reportHole()
	Ticker.write([
		'CAR < Pilot ' + NAME + '> ** An obstacle detected.    **\n',
		'CAR < Pilot ' + NAME + '> ** Avoiding the obstacle... **',
		'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
	])

}
// setTimi(holeCallback)

function reportCrash() {
	incidentCount++;
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

function checkIncidents() {
	Req.getIncidentCount(function (count) {
		if (parseInt(count) > incidentCount) {
			incidentCount = parseInt(count)
			Req.sendReceived()
			Ticker.write([
				'CAR < > ** Warning received!    **\n',
				'CAR < > ** Slowing down... **',
				'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
			])
		} else {
			return true
		}
	})
}

function emptyTerminalScreen() {
	for (var i = 0; i < 30; i++) {
		console.log('')
	}
}
emptyTerminalScreen()


//joinServer()

//sensorMooseCallback()
sensorHoleCallback()

/*setInterval(function () {
	//sensorMooseCallback()
	//sensorHoleCallback()

	try {
		checkIncidents()
	} catch(err) {
		return true;
	}
}, 1000)*/

//Req.leaveServer()