let socket, containerSection, usernameInput, passwordInput, post, confirmButton, responseDiv;

function setup() {
	socket = io.connect('http://localhost:8080');

	containerSection = createElement("section")
		.addClass("container");
	responseDiv = createElement("div")
		.parent(containerSection);
	usernameInput = createElement("input")
		.parent(containerSection)
		.attribute("placeholder", "Velkommen - foreslå venligst et brugernavn");
	passwordInput = createElement("input")
		.parent(containerSection)
		.attribute("placeholder", "...og et password")
		.attribute("type", "password");
	confirmButton = createElement("button", "Gem")
		.parent(containerSection)
		.mousePressed(function () {
			if(usernameInput.value() == "" || passwordInput.value() == ""){
				responseDiv.html("Udfyld venligst felterne");
				return;
			}
			post = {
				username: usernameInput.value(),
				password: passwordInput.value(),
			}
			socket.emit("save", post, function (msg, success) {
				console.log(success);
				if (success) {
					responseDiv.html(msg);
				} else {
					usernameInput.value("").attribute("placeholder", msg);
				}
			});
		});
}