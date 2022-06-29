
// var wsUri = "ws://localhost:12389"; // Localhost
var wsUri = "ws://192.168.1.47:8080"; // Max's

class BackendConnection {
	constructor() {
		this.connectionError = false;
		this.websocket = new WebSocket(wsUri, "main");
		var self = this;
		this.websocket.onopen = function(evt) { self.onOpen(evt) };
		this.websocket.onclose = function(evt) { self.onClose(evt) };
		this.websocket.onmessage = function(evt) { self.onMessage(evt) };
		this.websocket.onerror = function(evt) { self.onError(evt) };
	}

	onOpen(evt) {
		console.log("CONNECTED");
	}

	onClose(evt) {
		console.log("DISCONNECTED");
    	//location.reload();
	}

	onMessage(evt) {
		console.log('<-: ' + evt.data);
		var params = evt.data.split("|");
		if(params[0]=="gotoAdminWait")
		{
			gotoStartPage();
		}
	}

	onError(evt) {
		console.log('ERROR: ' + evt.type);
	}

	send(message) {
		this.websocket.send(message);
		console.log("->: " + message);
	}

	startGame(playerList)
    {
        var message = {"request": "startGame", "playerList": playerList};
        this.send(JSON.stringify(message));
    }

    adminClicked(){
        this.send(JSON.stringify({"request": "adminClicked"}));
    }
}