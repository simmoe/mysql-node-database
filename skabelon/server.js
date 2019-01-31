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