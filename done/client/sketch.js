let socket, containerSection, usernameInput, responseDiv;

function setup() {
	socket = io.connect('http://localhost:3000');

	containerSection = createElement("section")
		.addClass("container");
	responseDiv = createElement("div")
		.parent(containerSection);
	usernameInput = createElement("input")
		.parent(containerSection)
		.changed(function(){
			socket.emit("username", usernameInput.value(), function(msg, success){
				console.log(success);
				if(success){
					responseDiv.html(msg);
					usernameInput.hide();
				}else{
					usernameInput.value("").attribute("placeholder", msg);
				}
			});
		})
		.attribute("placeholder", "Velkommen - foreslå venligst et brugernavn");
}