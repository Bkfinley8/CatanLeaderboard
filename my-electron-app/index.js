var myModalAlternative;
$( document ).ready(function() {
	myModalAlternative = new bootstrap.Modal('#rollModal');
	window.api.send("ip", "");
});
function generatePlayerCard(name, color, largest, citys, settlements, roads, knights, hiddenCards, vpCards)
{
	var cardHTML = "<div class='playerCard' style='border-color: "+color+"; visibility: hidden' id='"+name+"-playercard'>";
	// cardHTML += "<div class='playerIconContainer'><img src='playericons/"+name+".svg' width=150 height=150 class='playerIcon'></img></div>";
	cardHTML += "<div class='playerIconContainer'><object type='image/svg+xml' data=playericons/"+name+".svg width='150' height='150' style='fill: "+color+"' id='"+name+"-icon'></object></div>";
	cardHTML += "<h1 class='playerName' id='"+name+"-namelabel'>"+name+"</h1>";
	cardHTML += "<div class='playerProduction'></div>"
	cardHTML += "<div class='largestIcons'><img src='road.svg' width=75 height=75 class='largestRoadIcon' style='display:"+(largest["army"] ? "block;" : "none;")+"'></img><img src='sword.svg' width=75 height=75 class='largestArmyIcon' style='display:"+(largest["road"] ? "block;" : "none;")+";></img></div>";
	cardHTML += "<div class='victoryPointsContainer'><img src='victory.svg' width=60 height=60 class='victoryIcon'></img><h1 class='victoryPoints'>"+calculateVPforPlayer(name)+"</h1></div>";
	cardHTML += "<div class='inventory'><img src='house.svg' width=25 height=25 class='settlementIcon'><h1 class='numSettlement'>"+settlements+"</h1></img><img src='city.svg' width=25 height=25 class='cityIcon'><h1 class='numCity'>"+citys+"</h1><img src='road.svg' width=25 height=25 class='roadIcon'><h1 class='numRoad'>"+roads+"</h1>"
	+ "<img src='sword.svg' width=25 height=25 class='armyIcon'><h1 class='numArmy'>"+knights+"</h1></img><img src='devCard.svg' width=25 height=25 class='cardIcon'><h1 class='numHiddenCards'>"+hiddenCards+"</h1><img src='victory.svg' width=25 height=25 class='VPSmall'><h1 class='numVPCards'>"+vpCards+"</h1></div>";
	cardHTML += "</div>";
	return cardHTML;
}
function appendPlayerToDOM(name, color, largest, citys, settlements, roads, knights, hiddenCards, vpCards)
{
	if(color=="White")
	{
		color = "Black";
	}
	var html = generatePlayerCard(name, color, largest, citys, settlements, roads, knights, hiddenCards, vpCards);
	$("#gameScreen").append(html);
	$("#"+name+"-icon").on("load", function() {
		$(this.contentDocument).find("svg").css("fill", color);
	});
}
function calculateVPforPlayer(name)
{
	var vp = 0;
	// console.log(name+":"+playerList[name]);
	vp += playerList[name].settlements;
	vp += playerList[name].cities*2;
	vp += playerList[name].vpFromDevCards;
	if(playerList[name]["largest"]["road"])
	{
		vp += 2;
	}
	if(playerList[name]["largest"]["army"])
	{
		vp += 2;
	}
	return vp;
}
function comparePlayers(a, b) {
	var playerAVP = calculateVPforPlayer(a);
	var playerBVP = calculateVPforPlayer(b);
	if (playerAVP > playerBVP) {
	  return -1;
	}
	if (playerAVP < playerBVP) {
	  return 1;
	}
	if (playerList[a].name.toLowerCase() < playerList[b].name.toLowerCase()) {
	  return -1;
	}
	if (playerList[a].name.toLowerCase() > playerList[b].name.toLowerCase()) {
	  return 1;
	}
	// a must be equal to b
	return 0;
}
function showPlayer(name)
{
	// console.log("showing "+name);
	$("#"+name+"-playercard").css("visibility", "visible").hide().fadeIn(500);
}
function sortPlayers()
{
	var elements = $(".playerCard > .playerName");
	var names = elements.map(function() {
		return $(this).text();
	}).get();
	names = names.sort(comparePlayers);
	return names;
	// console.log(names);
}
function sortPlayersAndDisplay(time) 
{
	var names = sortPlayers();
	doms = {};
	for(var i = 0; i < names.length; i++)
	{
		doms[names[i]] = $("#"+names[i]+"-playercard").detach();
	}
	for(var i = 0; i < names.length; i++)
	{
		$("#gameScreen").append(doms[names[i]]);
		// setTimeout(showPlayer, i*1000, names[i]);
		setTimeout(showPlayer, i*time, names[i]);
	}
}
var timerToSortPlayers = -1;
function hidePlayers()
{
	var elements = $(".playerCard > .playerName");
	var names = elements.map(function() {
		return $(this).text();
	}).get();
	for(var i = 0; i < names.length; i++)
	{
		var name = names[i];
		$("#"+name+"-playercard").delay(i*100).fadeOut(100, function() {
			$(this).css("visibility", "hidden"); 
			$(this).show();
			if(timerToSortPlayers >= 0)
			{
				clearTimeout(timerToSortPlayers);
				timerToSortPlayers = -1;
				timerToSortPlayers = setTimeout(sortPlayersAndDisplay, 100, 100);
			}
		});
		// setTimeout((n) => {$("#"+n+"-playercard").css("visibility", "hidden"); $("#"+n+"-playercard").show(); console.log(n)}, i*200+200, name);
	}
	timerToSortPlayers = setTimeout(sortPlayersAndDisplay, names.length*100+100, 100);
}
function updateNumbers()
{
	var elements = $(".playerCard > .playerName");
	var names = elements.map(function() {
		return $(this).text();
	}).get();
	for(var i = 0; i < names.length; i++)
	{
		var name = names[i];
		$("#"+name+"-playercard .numSettlement").text(playerList[name]["settlements"]);
		$("#"+name+"-playercard .numCity").text(playerList[name]["cities"]);
		$("#"+name+"-playercard .numRoad").text(playerList[name]["roads"]);
		$("#"+name+"-playercard .numArmy").text(playerList[name]["knights"]);
		$("#"+name+"-playercard .numHiddenCards").text(playerList[name]["devCards"]);
		$("#"+name+"-playercard .numVPCards").text(playerList[name]["vpFromDevCards"]);
		$("#"+name+"-playercard .victoryPoints").text(calculateVPforPlayer(name));
		if(playerList[name]["largest"]["road"])
		{
			$("#"+name+"-playercard .largestRoadIcon").show();
		}
		else
		{
			$("#"+name+"-playercard .largestRoadIcon").hide();
		}
		if(playerList[name]["largest"]["army"])
		{
			$("#"+name+"-playercard .largestArmyIcon").show();
		}
		else
		{
			$("#"+name+"-playercard .largestArmyIcon").hide();
		}
	}
}
function updateRoad()
{
	updateNumbers();
}
function updateScreen()
{
	hidePlayers();
	// console.log(playerList.length*200+400);
	var elements = $(".playerCard > .playerName");
	var names = elements.map(function() {
		return $(this).text();
	}).get();
	setTimeout(updateNumbers, names.length*100+100);
}
function generateProductionIcon(what, position, total)
{
	var x = 510;
	var y = 25;
	if(total>1)
	{
		if(position==0)
		{
			x += 0;
			y = 11;
		}
		else if(position==1)
		{
			x += 17;
			y = 40;
		}
		else if(position==2)
		{
			x += 33;
			y = 11;
		}
		else if(position==3)
		{
			x += 50;
			y = 40;
		}
		else if(position==4)
		{
			x += 67;
			y = 11;
		}
	}
	var html = "<object type='image/svg+xml' data=productionicons/"+what+".svg width='40' height='40' style='position: absolute; top: "+y+"; left: "+x+";'></object>";
	return html;
}
function showProduceIcon(who, what)
{
	// console.log(playerList);
	if(!playerList[who]["production"][what])
	{
		playerList[who]["production"][what] = true;
	}
	$("#"+who+"-playercard .playerProduction").empty();
	var i = 0;
	for(var resource in playerList[who]["production"])
	{
		var htmlIcon = generateProductionIcon(resource, i, Object.keys(playerList[who]["production"]).length);
		$("#"+who+"-playercard .playerProduction").append(htmlIcon);
		i++
	}
}
function removeProduceIcon(who, what)
{
	// console.log(playerList);
	// const index = playerList[who]["production"].indexOf(what);
	if (playerList[who]["production"][what]) { 
		delete playerList[who]["production"][what];
	}
	$("#"+who+"-playercard .playerProduction").empty();
	var i = 0;
	for(var resource in playerList[who]["production"])
	{
		var htmlIcon = generateProductionIcon(resource, i, Object.keys(playerList[who]["production"]).length);
		$("#"+who+"-playercard .playerProduction").append(htmlIcon);
		i++
	}
}
function ignore(time)
{
	ignoring = true;
	setTimeout(function() {ignoring = false}, time);
}
function broadcastFill()
{
	window.api.send("send", JSON.stringify({"message": {"request": "fill", "playerDictionary": playerList}, "session": "broadcast"}));
}
function playerHasLargestArmy(n)
{
	var currentLargest = 0;
	for(var name in playerList)
	{
		if(playerList[name].knights>currentLargest && name!=n)
		{
			currentLargest = playerList[name].knights;
		}
	}
	return playerList[n].knights > currentLargest && playerList[n].knights>2;
}
function removeLargestFromEveryoneExcept(n)
{
	for(var name in playerList)
	{
		if(n!=name)
		{
			playerList[name]["largest"]["army"] = false;
		}
	}
}
function playerHasLargestRoad(n)
{
	var currentLargest = 0;
	for(var name in playerList)
	{
		if(playerList[name].roads>currentLargest && name!=n)
		{
			currentLargest = playerList[name].roads;
		}
	}
	return playerList[n].roads > currentLargest && playerList[n].roads>2;
}
function removeLargestRoadFromEveryoneExcept(n)
{
	for(var name in playerList)
	{
		if(n!=name)
		{
			playerList[name]["largest"]["road"] = false;
		}
	}
}
var playerList;
var ignoring = false;
var admin;
var gameStarted = false;
var rollable = [];
var numFlashesLeft = 0;
var flashInterval = 1;
function showRoll(theNumber)
{
	$("#rollableNumbers").hide();
	$("#rolledNumber").fadeIn();
	$("#rolledNumber").html("<h1 style='text-align: center'>Rolled "+theNumber+"</h1>");
}
function flashNumber()
{
	var elements = $(".number");
	elements.css("background-color", "white");
	var index = Math.floor(Math.random()*rollable.length);
	$("#number"+rollable[index]).css("background-color", "#c28cf2");
	numFlashesLeft--;
	flashInterval += 8;
	if(numFlashesLeft<=0)
	{
		// clearInterval(flashInterval);
		var theNumber = rollable[index];
		removeNumber(parseInt(theNumber));
		setTimeout(showRoll, 1000, theNumber);
		setTimeout(stopRolling, 5000);
	}
	else
	{
		setTimeout(flashNumber, flashInterval);
	}
}
function removeNumber(theNumber)
{
	const index = rollable.indexOf(theNumber);
	if (index > -1) { 
		rollable.splice(index, 1); 
	}
}
function reroll()
{
	rollable = [2,3,3,4,4,4,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,10,10,10,11,11,12];
}
function stopRolling()
{
	myModalAlternative.hide();
}
function startRolling()
{
	$("#rollableNumbers").show();
	$("#rolledNumber").hide();
	if(rollable.length==0)
	{
		reroll();
	}
	$(".dots").text("");
	for(var i = 0; i < rollable.length; i++)
	{
		$("#dot"+rollable[i]).text($("#dot"+rollable[i]).text()+".");
	}
	myModalAlternative.show();
	numFlashesLeft = 30;
	flashInterval = 5;
	setTimeout(flashNumber, 300);
}
window.api.receive("ip", (data) => {
	// console.log(data);
	$("#ipLabel").text("Connect to http://"+data+":8080");
});
window.api.receive("message", (data) => {
	console.log(data);
	var message = JSON.parse(data);
	if(ignoring)
	{
		return;
	}
	if(message.request=="startGame")
	{
		$("#ipLabel").hide();
		playerList = {};
		gameStarted = true;
		$("#gameScreen").empty();
		for(var i = 0; i < message.playerList.length; i++)
		{
			playerList[message.playerList[i].name] = {};
			var player = playerList[message.playerList[i].name];
			// console.log(player);
			player.name = message.playerList[i].name;
			player.color = message.playerList[i].color;
			player.roads = 1;
			player.settlements = 2;
			player.cities = 0;
			player.knights = 0;
			player.devCards = 0;
			player.vpFromDevCards = 0;
			player.largest = {};
			player.production = {};
			appendPlayerToDOM(player.name, player.color, player.largest, player.cities, player.settlements, player.roads, player.knights, player.devCards, player.vpFromDevCards);
		}
		sortPlayersAndDisplay(1000);
		window.api.send("send", JSON.stringify({"message": {"request": "fill", "playerDictionary": playerList}, "session": admin}));
		window.api.send("send", JSON.stringify({"message": {"request": "gotoAdminPlay"}, "session": admin}));
		ignore(6000);
	}
	if(message.request=="adminClicked")
	{
		if(!gameStarted)
		{
			window.api.send("send", JSON.stringify({"message": {"request": "gotoAdminWait"}, "session": message.session}));
			admin = message.session;
		}
		else
		{
			window.api.send("send", JSON.stringify({"message": {"request": "gotoAdminPlay"}, "session": message.session}));
			window.api.send("send", JSON.stringify({"message": {"request": "fill", "playerDictionary": playerList}, "session": message.session}));
		}
	}
	if(message.request=="playerClicked")
	{
		if(!gameStarted)
		{
			window.api.send("send", JSON.stringify({"message": {"request": "gotoPlayerWait"}, "session": message.session}));
		}
		else
		{
			window.api.send("send", JSON.stringify({"message": {"request": "gotoPlayerPlay"}, "session": message.session}));
			window.api.send("send", JSON.stringify({"message": {"request": "fill", "playerDictionary": playerList}, "session": message.session}));
		}
	}
	if(message.request=="addSettlement")
	{
		playerList[message.name]["settlements"]++;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="removeSettlement")
	{
		playerList[message.name]["settlements"]--;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="addCity")
	{
		playerList[message.name]["cities"]++;
		playerList[message.name]["settlements"]--;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="removeCity")
	{
		playerList[message.name]["cities"]--;
		playerList[message.name]["settlements"]++;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="addRoad")
	{
		var hadLargest = playerHasLargestRoad(message.name) || playerList[message.name]["largest"]["road"];
		playerList[message.name]["roads"]++;
		var nowHasLargest = playerHasLargestRoad(message.name);
		playerList[message.name]["largest"]["road"] = nowHasLargest;//can remove if they lost it
		if(nowHasLargest && !hadLargest)
		{
			removeLargestRoadFromEveryoneExcept(message.name);
			updateScreen();
			ignore(2000);
		}
		else
		{
			updateNumbers();
		}
		broadcastFill();
		// updateScreen();
		// ignore(2000);
	}
	if(message.request=="removeRoad")
	{
		playerList[message.name]["roads"]--;
		var nowHasLargest = playerHasLargestRoad(message.name);
		if(!nowHasLargest)
		{
			removeLargestRoadFromEveryoneExcept("");
			updateScreen();
			ignore(2000);
		}
		else
		{
			updateNumbers();
		}
		broadcastFill();
		// updateScreen();
		// ignore(2000);
	}
	if(message.request=="addKnight")
	{
		var hadLargest = playerHasLargestArmy(message.name) || playerList[message.name]["largest"]["army"];
		playerList[message.name]["knights"]++;
		playerList[message.name]["devCards"]--;
		var nowHasLargest = playerHasLargestArmy(message.name);
		playerList[message.name]["largest"]["army"] = nowHasLargest;//can remove if they lost it
		if(nowHasLargest && !hadLargest)
		{
			removeLargestFromEveryoneExcept(message.name);
			updateScreen();
			ignore(2000);
		}
		else
		{
			updateNumbers();
		}
		broadcastFill();
		// updateScreen();
	}
	if(message.request=="removeKnight")
	{
		var hadLargest = playerHasLargestArmy(message.name) || playerList[message.name]["largest"]["army"];
		playerList[message.name]["knights"]--;
		playerList[message.name]["devCards"]++;
		var nowHasLargest = playerHasLargestArmy(message.name);
		playerList[message.name]["largest"]["army"] = nowHasLargest;//can remove if they lost it
		if(!nowHasLargest)
		{
			removeLargestFromEveryoneExcept("");
			updateScreen();
			ignore(2000);
		}
		else
		{
			updateNumbers();
			// ignore(2000);
		}
		broadcastFill();
		// updateScreen();
	}
	// if(message.request=="claimKnight")
	// {
	// 	playerList[message.name]["cities"]++;
	// 	playerList[message.name]["settlements"]--;
	// 	broadcastFill();
	// 	updateScreen();
	// 	ignore(2000);
	// }
	if(message.request=="claimRoad")
	{
		for(var name in playerList)
		{
			playerList[name]["largest"]["road"] = false;
		}
		playerList[message.name]["largest"]["road"] = true;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="addVP")
	{
		playerList[message.name]["cities"]++;
		playerList[message.name]["settlements"]--;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="removeVP")
	{
		playerList[message.name]["cities"]--;
		playerList[message.name]["settlements"]++;
		broadcastFill();
		updateScreen();
		ignore(2000);
	}
	if(message.request=="addDevCard")
	{
		playerList[message.name]["devCards"]++;
		broadcastFill();
		updateNumbers();
		ignore(2000);
	}
	if(message.request=="removeDevCard")
	{
		playerList[message.name]["devCards"]--;
		broadcastFill();
		updateNumbers();
		ignore(2000);
	}
	if(message.request=="produce")
	{
		showProduceIcon(message.name, message.what);
		broadcastFill();
	}
	if(message.request=="stopProducing")
	{
		removeProduceIcon(message.name, message.what);
		broadcastFill();
	}
	if(message.request=="roll")
	{
		startRolling();
	}
	// $("#updateProgressInside").css("width", data+"%");
});