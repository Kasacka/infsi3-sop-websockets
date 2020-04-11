const express = require("express");
const fs = require("fs");
const url = require("url");

const app = express();
const port = +process.argv[2];

app.get("/", (request, response) => {
	fs.readFile("log.txt", (error, content) => {
		response.end(content);
	});
});

app.get("/data", (request, response) => {
	response.writeHead(200, {"Access-Control-Allow-Origin" : "*"})
	const { query } = url.parse(request.url, true);
	const requestBuffer = new Buffer(query.data, 'base64')
	const requestString = requestBuffer.toString();
	fs.writeFileSync("log.txt", requestString);
	response.end();
});

app.listen(port);