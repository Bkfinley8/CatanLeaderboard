const electron = require('electron')
const {app, BrowserWindow, ipcMain, Menu, MenuItem} = electron;
const { spawn } = require('child_process');
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
var win;
var WebSocketServer = require('websocket').server;
const http = require('http');
const { connect } = require('http2');
const { connection } = require('websocket');
const { networkInterfaces } = require('os');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    if(request.url=="/")
    {
        request.url = "/main.html";
    }
    fs.promises.readFile("C:/Users/Maxwell/Documents/GitHub/CatanLeaderboard/client"+request.url)
    .then(contents => {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.end(contents);
    }).catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        // res.setHeader("Content-Type", "text/html");
        response.writeHead(404);
        response.end("cant find");
    });
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
function getIP(nameOf)
{
	const nets = networkInterfaces();
	const results = {};

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
			if (net.family === familyV4Value && !net.internal) {
				if (!results[name]) {
					results[name] = [];
				}
				results[name].push(net.address);
			}
		}
	}
    return results[nameOf][0];
}
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
connections = {};
wsServer.on('request', function(request) {
    // if (!originIsAllowed(request.origin)) {
    //   // Make sure we only accept requests from an allowed origin
    //   request.reject();
    //   console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    //   return;
    // }
    var session = generateUUID();
    var connection = request.accept('main', request.origin);
	connections[session] = connection;
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
		console.log('"'+session+'" -> ' + message.utf8Data);
		var message = JSON.parse(message.utf8Data);
		message.session = session;
        sendBack("message", JSON.stringify(message));
		// if(message.request=="startGame")
		// {
		// 	sendBack("fromMainSaveSuc", stringified);
		// }
		// connection.sendUTF();
    });
    connection.on('close', function(reasonCode, description) {
		delete connections[session];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected. session was '+session);
    });
});

function sendBack(key, val)
{
	try {
		win.webContents.send(key, val);
	} catch (e) {
		console.log(e);
	}
}
app.whenReady().then(() => {
	startup();
});
ipcMain.on("send", (event, args) =>
{
	message = JSON.parse(args);
	console.log('"'+message["session"]+'"<-:'+JSON.stringify(message["message"]));
    if(message["session"]=="broadcast")
    {
        for(var session in connections)
        {
            connections[session].send(JSON.stringify(message["message"]));
        }
    }
    else
    {
        connections[message["session"]].send(JSON.stringify(message["message"]));
    }
	// sendBack("fromMainConfig", "watup");
});
ipcMain.on("ip", (event, args) =>
{
	sendBack("ip", getIP("Wi-Fi"));
});
function createWindow ()
{
	win = new BrowserWindow(
	{
		minWidth: 1220,
		width: 1600,
		height: 900,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false, // is default value after Electron v5
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
			preload: path.join(__dirname, "preload.js") // use a preload script
		}
	});

	win.loadFile('index.html');
}
function startup()
{
	createWindow();
}

// function saveRepairPart()
// {
// 	//console.log("check");
// 	if(goodToSave)
// 	{
// 		clearInterval(savingTimer);
// 		try
// 		{
// 			var txt = fs.readFileSync(backendPath, 'utf8');
// 			//console.log(repairJSON);
// 			var jsonData = JSON.parse(txt);
// 			var jsonRepair = JSON.parse(repairJSON);
// 			jsonRepair["descriptors"] = makeDescriptors(jsonRepair);//just easier to do it "backend"
// 			if(!jsonData["repairs"])
// 			{
// 				jsonData["repairs"] = {};
// 			}
// 			jsonData["repairs"][jsonRepair.refNum] = jsonRepair;
// 			var stringified = JSON.stringify(jsonData);
// 			fs.writeFileSync(backendPath, stringified);
// 			doneSaving = true;
// 			sendBack("fromMainSaveSuc", stringified);
// 		}
// 		catch(err)
// 		{
// 			//savingTimer = setInterval(saveRepairPart, 2000);
// 			console.log(err);
// 			doneSaving = true;
// 			sendBack("fromMainSaveFail", "");
// 		}
// 	}
// }
// function saveRepair(inJSON)
// {
// 	console.log("saving repair");
// 	saving = true;
// 	doneSaving = false;
// 	repairJSON = inJSON;
// 	savingTimer = setInterval(saveRepairPart, 1000);
// }

// function loadRepairPart()
// {
// 	//console.log("check");
// 	if(goodToSave)
// 	{
// 		clearInterval(loadingTimer);
// 		try
// 		{
// 			var txt = fs.readFileSync(backendPath, 'utf8');
// 			//console.log(repairJSON);
// 			//repairJSONIn = JSON.parse(txt);
// 			doneSaving = true;
// 			sendBack(loadMessageName, txt);
// 		}
// 		catch(err)
// 		{
// 			//loadingTimer = setInterval(loadRepairPart, 2000);
// 			console.log(err);
// 			doneSaving = true;
// 			sendBack("fromMainSaveFail", "");
// 		}
// 	}
// }