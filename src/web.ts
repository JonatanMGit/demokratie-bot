import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res) {
	res.status(404).sendFile(__dirname + '/public/404.html');
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
