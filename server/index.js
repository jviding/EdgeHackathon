const express = require('express')
const app = express()
const BC = require('./broadcaster.js')

const Broadcaster = new BC()
Broadcaster.startTicking()

const SERVER_NAME = 'Supervisor Steve'

var hadIncidents = false
var incidentCount = 0

app.get('/join', (req, res) => {
	//console.log(req.query)
	Broadcaster.broadcast([
		['me', 'EDGE      ** Pilot ' + req.query.name + ' has joined.'],
		['me', ' '],
		['me', ' '],
		['me', '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n']
	])
	if (incidentCount > 0) {
		res.send('incidents')
	} else {
		res.send('OK')
	}
})

app.get('/incidentCount', (req, res) => {
	res.send('' + incidentCount)
})

app.get('/moose', (req, res) => {
	if (Broadcaster.isBusy) {
		res.send('400');
		res.send('Supervisor busy');
	} else {
		incidentCount++;
		//console.log(req.query)
		Broadcaster.broadcast([
			['me', ' '],
			['me', ' '],
			['me', ' '],
			['me', 'EDGE < Pilot ' + req.query.name + '> There is an obstacle at the coordinates [60.226, 24.946].'],
			['me', 'EDGE < Pilot ' + req.query.name + '> Here\'s the sensor data: data.txt.'],
			['me', 'EDGE < Supervisor Steve> Let me see.'],
			['me', 'EDGE < Supervisor Steve> ** Analyzing the data... **'],
			['me', 'EDGE < Supervisor Steve> ** ... **'],
			['me', 'EDGE < Supervisor Steve> It\'s a moose! Watch out!'],
			['me', ' '],
			['me', '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n']
		])
		Broadcaster.broadcast([
			['all', 'BROADCAST < >      ** Breaking news! **\n'],
			['all', 'BROADCAST < Supervisor Steve> A moose has been detected at [60.226, 24.946].'],
			['all', 'BROADCAST < Supervisor Steve> All pilots drive with care!']
		])
		res.send('Moose noted.')
	}
})

app.get('/hole', (req, res) => {
	if (Broadcaster.isBusy) {
		res.send('400');
	} else {
		incidentCount++;
		//console.log(req.query)
		Broadcaster.broadcast([
			['me', ' '],
			['me', ' '],
			['me', ' '],
			['me', 'EDGE < Pilot ' + req.query.name + '> Whoooooaaa!!'],
			['me', 'EDGE < Pilot ' + req.query.name + '> The road is bumpy at [61.315, 23.527].'],
			['me', 'EDGE < Pilot ' + req.query.name + '> Here\'s the sensor data: data.txt.'],
			['me', 'EDGE < Supervisor Steve> Let me see.'],
			['me', 'EDGE < Supervisor Steve> ** Analyzing the data... **'],
			['me', 'EDGE < Supervisor Steve> ** ... **'],
			['me', 'EDGE < Supervisor Steve> There\'s a hole in the road.'],
			['me', 'EDGE < Supervisor Steve> I have informed the road maintenance and it will be fixed!'],
			['me', ' '],
			['me', '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n']
		])
		Broadcaster.broadcast([
			['all', 'BROADCAST < >      ** Breaking news! **\n'],
			['all', 'BROADCAST < Supervisor Steve> A hole has been detected at [61.315, 23.527].'],
			['all', 'BROADCAST < Supervisor Steve> All pilots drive with care!']
		])
		res.send('Hole noted.')
	}
})

app.get('/crash', (req, res) => {
	if (Broadcaster.isBusy) {
		res.send('400');
	} else {
		incidentCount++;
		//console.log(req.query)
		Broadcaster.broadcast([
			['me', ' '],
			['me', 'EDGE < Pilot ' + req.query.name + '> There is an obstacle at the coordinates [60.226, 24.946].'],
			['me', 'EDGE < Pilot ' + req.query.name + '> Here\'s the sensor data: data.txt.'],
			['me', 'EDGE < Supervisor Steve> Let me see.'],
			['me', 'EDGE < Supervisor Steve> ** Analyzing the data... **'],
			['me', 'EDGE < Supervisor Steve> ** ... **'],
			['me', 'EDGE < Supervisor Steve> Oh, dear. It\'s a car accident.'],
			['me', 'EDGE < Supervisor Steve> With the infamouse moose.\n'],
			['me', 'EDGE < Supervisor Steve> There driver should have probably used the Smart Cars -solutions.']
		])
		res.send('Crash noted.')
	}
})

app.get('/received', (req, res) => {
	//console.log(req.query)
	Broadcaster.broadcast([['all', '\nBROADCAST < Pilot ' + req.query.name + '> Received.\n']])
	res.send('Good bye!')
})

app.get('/leave', (req, res) => {
	//console.log(req.query)
	res.send('Good bye!')
})

function emptyTerminalScreen() {
	for (var i = 0; i < 30; i++) {
		console.log('')
	}
}

app.listen(3000, () => {
	console.log('Server listening on port 3000!')
	emptyTerminalScreen()
})
