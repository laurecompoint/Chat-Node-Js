// Initialisation
const express = require('express')
const app = express()
const port = 3000
const http = require('http').Server(app);
const io = require('socket.io')(http)

// Routes
//app.get('/', (request, response) => response.send('Hello World!'))
//app.get('/webstart', (request, response) => response.send('Webstart'))

/*
app.get(
	'/',
	(request, response) => response.sendFile(
		__dirname + '/index.html')
	);
*/

app.use('/static', express.static(__dirname + '/public'))

app.get(
	'/',
	function (request, response) {
		response.sendFile(__dirname + '/index.html')
	}
	);

io.on('connection', function (socket) {
    console.log('Someone joined')
	var names = ['leonard', 'arthur'];
    var name = names[Math.floor(Math.random() * names.length)];
	var user = Date.now();
    socket.on('message.sent', function(message){

        io.emit('message',  name + ':' + message);
	});
    io.emit('message',  name + '  connected');

})

// Server
http.listen(
	port,
	() => console.log(`Example app listening on port ${port}!`)
)