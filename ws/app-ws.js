const express = require("express");
const fs = require("fs");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const socketServer = new WebSocket.Server({ server });
const port = +process.argv[2];

const sensitiveData = {
	"Bundesratkreditkartennummern" : [
		8347954, 43875, 34968574, 2354874385, 54354, 23484
	],
	"AtombombenkammerPIN" : [
		7485745
	],
	"NSAUeberwachungsdaten" : [
		87, 784, 645, 456
	]
};

app.get("/stealData1", (request, response) => {
	response.json(sensitiveData);
});

socketServer.on("connection", socket => {
	socket.on("message", message => {
		try {
			const messageData = JSON.parse(message);
			switch (messageData.requestType) {
				case "stealData2":
					socket.send(JSON.stringify(sensitiveData));
					break;
			}
		} catch (error) {
			socket.send("{ error: true }");
		}
	});
});

server.listen(port, () => {
	console.log(`Server listens on port ${port}`);
});