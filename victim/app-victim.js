const express = require("express");
const fs = require("fs");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = +process.argv[2];

app.get("/", (request, response) => {
	fs.readFile("index.html", (error, content) => {
		if (error) {
			response.writeHead(500);
			response.end();
		} else {
			response.writeHead(200, { "Content-Type" : "text/html" });
			response.end(content);
		}
	});
});

server.listen(port, () => {
	console.log(`Server listens on port ${port}`);
});