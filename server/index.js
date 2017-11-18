const express = require('express')
const app = express()
const Request = require('./httpRequest.js');
const Req = new Request();

const SERVER_NAME = 'Supervisor Steve'


app.get('/join', (req, res) => {
	console.log(req.query)
	res.send('Hello you!')
})

app.get('/moose', (req, res) => {
	Req.broadcast('** Breaking news! **')
	Req.broadcast('< Supervisor Steve> A moose has been detected at [60.226, 24.946].')
	Req.broadcast('< Supervisor Steve> All pilots drive with care!')
	console.log(req.query)
	res.send('Oh no!')
})

app.get('/hole', (req, res) => {
	Req.broadcast('** Breaking news! **')
	Req.broadcast('< Supervisor Steve> A hole has been detected at [61.315, 23.527].')
	Req.broadcast('< Supervisor Steve> All pilots drive with care!')
	console.log(req.query)
	res.send('Oh no!')
})

app.get('/leave', (req, res) => {
	console.log(req.query)
	res.send('Good bye!')
})


app.listen(3000, () => console.log('Server listening on port 3000!'))