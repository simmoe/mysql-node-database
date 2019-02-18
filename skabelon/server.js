/*Følgende sætter en socket server op på port 3000*/
var request = require('request');
var io = require('socket.io');
var express = require('express');
var mysql = require('mysql');

var app = express();
var server = app.listen(3000);
app.use(express.static('client'));
var socket = require('socket.io');
var io = socket(server);
console.log("Socket server kører på port 3000");

io.sockets.on('connection', function (socket) {
	console.log('connection: ' + socket.id);


	var connection = mysql.createConnection({
		host: 'xxx.it.slotshaven.dk',
		user: 'brugernavn',
		password: 'kodeord',
		database: 'databasenavn',
		connectTimeout: 10000
	});

	connection.connect()

	connection.query('SELECT * FROM Users', function (err, rows, fields) {
		if (err) throw err
		console.log(rows)
	})

	connection.end();
});

/* 
OPGAVER 

Kør npm install for at lægge de nødvendige moduler ind i biblioteket 

Programmet skal først tilrettes så det opretter forbindelse til jeres database - hvor i selvfølgelig skal oprette en tabel, 
Users, med minimum et id og en kolonne til brugernavne.

Nu bør man kunne se i server konsollen, at programmet henter alle felter i Users tabellen

Lad os forsøge at lave programmet sådan, at klienten kan indtaste brugernavn i et input felt, som derefter bliver sat ind i databasen af server.js

Opret variable til et input felt og en submitknap i sketch.js, fx

usernameInput = createElement("input")

submitButton = createElement("button", "Gem")

Knappen skal nu kodes, så den sender et json objekt til serveren, når man klikker på den (mousePressed)

I første omgang skal objektet kun indeholde et brugernavn:

var post = {
	username: usernameInput.value(),
}

På serveren skal i bruge et SQL INSERT statement, når i modtager besked fra klienten, fx: 

connection.query("INSERT INTO Users SET ?", post, function (err, rows, fields) { ... }

Prøv at tilrette programmet, så serveren ført tjekker om brugernavnet er taget - hvis det er ledigt får klienten besked om at det er gået godt, 
hvis det IKKE er ledigt, får den besked om at prøve igen (brug rows.length)

Lad os udvide formen på klienten, så den også beder om et password.
Indtil videre ser vi bort fra at kryptere - vi skal bare have gemt og valideret et password i databasen

Udvid sketch.js med et password felt

Udvid socket.on på serveren, så den modtager både brugernavn og password - men den skal stadig tjekke om brugernavnet er optaget

*/