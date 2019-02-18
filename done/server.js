/*Følgende sætter en socket server op på port 3000*/
var request = require('request');
var io = require('socket.io');
var express = require('express');
var mysql = require('mysql2');
var connection, msg;

var app = express();
var server = app.listen(8080);
app.use(express.static('client'));
var socket = require('socket.io');
var io = socket(server);
console.log("Socket server kører på port 8080");

io.sockets.on('connection', function (socket) {
	console.log('connection: ' + socket.id);

	connection = mysql.createConnection({
		host: 'moe.it.slotshaven.dk',
		user: 'moe',
		password: 'it372181',
		database: 'moe'
	});

	socket.on("save", function (post, callback) {
		connection.query("SELECT * FROM Users WHERE username = ?", post.username, function (err, rows, fields) {
			if (err) throw err
			//Ingen med dette brugernavn
			if(rows.length == 0){
				var query = connection.query("INSERT INTO Users SET ?", post, function (err, rows, fields) {
					if(err) throw err
					console.log(query.sql)
					callback("Velkommen til " + post.username + ". Dit brugernavn er nu gemt i databasen", true); 
				});
			}else{
				callback("Det brugernavn er desværre taget - prøv igen", false);
			}
		});
	});
});