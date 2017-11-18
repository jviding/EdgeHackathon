const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/', (req, res) => {
	console.log(req.body.message)
	res.send('Hello world!')
})

function emptyTerminalScreen() {
	for (var i = 0; i < 30; i++) {
		console.log('')
	}
}

app.listen(3001, () => {
	console.log('Broadcast server listening on port 3001!')
	emptyTerminalScreen()
})