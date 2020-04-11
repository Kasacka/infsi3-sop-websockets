"ws" is the websocket server with the sensitive data
start with
	node app 1111

"victim" delivers the "evil" page which gets visited by the victim
the page steals data by WebSocket on a page and sends it by AJAX to the
"attacker" page
start with
	node app 2222

"attacker" is the server which steals the data
start with
	node app 3333
