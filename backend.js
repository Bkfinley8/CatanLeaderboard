
// var wsUri = "ws://localhost:8080"; // Localhost
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
		// this.startGame([{"name":"Maxwell","color":"Blue"},{"name":"Chloe","color":"White"},{"name":"Donovan","color":"Red"},{"name":"Cory","color":"Orange"},{"name":"Johnathan","color":"Brown"},{"name":"Zach","color":"Green"}]);
		// setTimeout(this.addSettlement, 2000, "Chloe");
		// setTimeout(this.addCity, 5000, "Chloe");
	}

	onClose(evt) {
		console.log("DISCONNECTED");
    	//location.reload();
	}

	onMessage(evt) {
		console.log('<-: ' + evt.data);
		// var params = evt.data.split("|");
		var message = JSON.parse(evt.data);
		if(message.request=="gotoAdminWait")
		{
			gotoAdminStartPage();
		}
		if(message.request=="gotoAdminPlayer")
		{
			gotoAdminPlayPage();
		}
		if(message.request=="gotoPlayerWait")
		{
			gotoPlayerWait();
		}
		if(message.request=="gotoPlayerPlay")
		{
			gotoPlayerPlay();
		}
		if(message.request=="fill")
		{
			json in message.data
			// gotoPlayerPlay();
		}
		
	}

	onError(evt) {
		console.log('ERROR: ' + evt.type);
	}

	send(message) {
		this.websocket.send(message);
		console.log("->: " + message);
	}

	addSettlement(name)
	{
        var message = {"request": "addSettlement", "name": name};
        connection.send(JSON.stringify(message));
	}
	addCity(name)
	{
        var message = {"request": "addCity", "name": name};
        connection.send(JSON.stringify(message));
	}

	removeSettlement(name)
	{
        var message = {"request": "removeSettlement", "name": name};
        connection.send(JSON.stringify(message));
	}
	removeCity(name)
	{
        var message = {"request": "removeCity", "name": name};
        connection.send(JSON.stringify(message));
	}

	claimKnight(name)
	{
        var message = {"request": "claimKnight", "name": name};
        connection.send(JSON.stringify(message));
	}
	claimRoad(name)
	{
        var message = {"request": "claimRoad", "name": name};
        connection.send(JSON.stringify(message));
	}

	addVP(name)
	{
        var message = {"request": "addVP", "name": name};
        connection.send(JSON.stringify(message));
	}
	removeVP(name)
	{
        var message = {"request": "removeVP", "name": name};
        connection.send(JSON.stringify(message));
	}

	
	addDevCard(name)
	{
        var message = {"request": "addDevCard", "name": name};
        connection.send(JSON.stringify(message));
	}
	removeDevCard(name)
	{
        var message = {"request": "removeDevCard", "name": name};
        connection.send(JSON.stringify(message));
	}

	startGame(pl)
    {
        var message = {"request": "startGame", "playerList": pl};
        connection.send(JSON.stringify(message));
    }

    adminClicked()
	{
        connection.send(JSON.stringify({"request": "adminClicked"}));
    }
	playerClicked() 
	{
		connection.send(JSON.stringify({"request": "playerClicked"}));
	}
}