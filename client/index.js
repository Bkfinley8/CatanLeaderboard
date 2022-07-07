var connection = new BackendConnection()

class Player {
    constructor (i,j) {
        this.name = i;
        this.color = j;
    }
}  

function addPlayer() {
    var nameField = document.getElementById("nameField");
    var colorField = document.getElementById("colorField");

    var playerName = nameField.value;
    var color = colorField.value;
    //console.log(playerName);
    //console.log(color);

    nameField.value = "";
    colorField.value = "White";
    
    var newPlayer = new Player(playerName, color);

    playerList.push(newPlayer);

    addPlayerToList(newPlayer);
}

function addPlayerToList(player){
    var tr = document.createElement('tr');
    var td = tr.appendChild(document.createElement('td'));
    td.innerHTML = player.name;
    var td2 = tr.appendChild(document.createElement('td'));
    td2.innerHTML = player.color;
    document.getElementById("playerListBody").appendChild(tr);

    checkStartBtn();

}

function checkStartBtn() {
    if(playerList.length > 1){
        console.log("enable");
        document.getElementById("startGameBtn").disabled = false;
    }
}

function startGame() {
    connection.startGame(playerList);
}

function gotoAdminStartPage(){
    //console.log("Swap page");
    document.getElementById("launchPage").style.display = 'none';
    document.getElementById("startGameAdminPage").style.display = 'block';
}

function gotoAdminPlayPage(){
    document.getElementById("launchPage").style.display = 'none';
    document.getElementById("startGameAdminPage").style.display = 'none';
    document.getElementById("adminPlayScreen").style.display = 'grid';
}

function fillAdminPage(dict){
    console.log(Object.keys(dict).length);
    for (x in dict) {
        var color = dict[x].color;
        if(color == "Red"){
            var card = document.getElementById("playerOne");
            document.getElementById("playerOneHeader").innerHTML = dict[x].name;
            document.getElementById("playerOnePoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerOneRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerOneRoad').src = "./icons/road.svg"
            }

            if(!dict[x].production.wool){
                document.getElementById('playerOneWoolOn').style.display = 'block';
                document.getElementById('playerOneWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerOneWoolOn').style.display = 'none';
                document.getElementById('playerOneWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerOneWheatOn').style.display = 'block';
                document.getElementById('playerOneWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerOneWheatOn').style.display = 'none';
                document.getElementById('playerOneWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerOneWoodOn').style.display = 'block';
                document.getElementById('playerOneWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerOneWoodOn').style.display = 'none';
                document.getElementById('playerOneWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerOneBrickOn').style.display = 'block';
                document.getElementById('playerOneBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerOneBrickOn').style.display = 'none';
                document.getElementById('playerOneBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerOneOreOn').style.display = 'block';
                document.getElementById('playerOneOreOff').style.display = 'none';
            } else {
                document.getElementById('playerOneOreOn').style.display = 'none';
                document.getElementById('playerOneOreOff').style.display = 'block';
            }

            card.style.display = 'block';
            
        } else if(color == "Blue"){
            var card = document.getElementById("playerTwo");
            document.getElementById("playerTwoHeader").innerHTML = dict[x].name;
            document.getElementById("playerTwoPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerTwoRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerTwoRoad').src = "./icons/road.svg"
            }

            if(!dict[x].production.wool){
                document.getElementById('playerTwoWoolOn').style.display = 'block';
                document.getElementById('playerTwoWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerTwoWoolOn').style.display = 'none';
                document.getElementById('playerTwoWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerTwoWheatOn').style.display = 'block';
                document.getElementById('playerTwoWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerTwoWheatOn').style.display = 'none';
                document.getElementById('playerTwoWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerTwoWoodOn').style.display = 'block';
                document.getElementById('playerTwoWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerTwoWoodOn').style.display = 'none';
                document.getElementById('playerTwoWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerTwoBrickOn').style.display = 'block';
                document.getElementById('playerTwoBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerTwoBrickOn').style.display = 'none';
                document.getElementById('playerTwoBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerTwoOreOn').style.display = 'block';
                document.getElementById('playerTwoOreOff').style.display = 'none';
            } else {
                document.getElementById('playerTwoOreOn').style.display = 'none';
                document.getElementById('playerTwoOreOff').style.display = 'block';
            }

            card.style.display = 'block';
        } else if(color == "Green"){
            var card = document.getElementById("playerThree");
            document.getElementById("playerThreeHeader").innerHTML = dict[x].name;
            document.getElementById("playerThreePoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerThreeRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerThreeRoad').src = "./icons/road.svg"
            }
            
            if(!dict[x].production.wool){
                document.getElementById('playerThreeWoolOn').style.display = 'block';
                document.getElementById('playerThreeWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerThreeWoolOn').style.display = 'none';
                document.getElementById('playerThreeWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerThreeWheatOn').style.display = 'block';
                document.getElementById('playerThreeWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerThreeWheatOn').style.display = 'none';
                document.getElementById('playerThreeWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerThreeWoodOn').style.display = 'block';
                document.getElementById('playerThreeWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerThreeWoodOn').style.display = 'none';
                document.getElementById('playerThreeWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerThreeBrickOn').style.display = 'block';
                document.getElementById('playerThreeBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerThreeBrickOn').style.display = 'none';
                document.getElementById('playerThreeBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerThreeOreOn').style.display = 'block';
                document.getElementById('playerThreeOreOff').style.display = 'none';
            } else {
                document.getElementById('playerThreeOreOn').style.display = 'none';
                document.getElementById('playerThreeOreOff').style.display = 'block';
            }


            
            card.style.display = 'block';
        } else if(color == "Brown"){
            var card = document.getElementById("playerFour");
            document.getElementById("playerFourHeader").innerHTML = dict[x].name;
            document.getElementById("playerFourPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerFourRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerFourRoad').src = "./icons/road.svg"
            }

            if(!dict[x].production.wool){
                document.getElementById('playerFourWoolOn').style.display = 'block';
                document.getElementById('playerFourWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerFourWoolOn').style.display = 'none';
                document.getElementById('playerFourWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerFourWheatOn').style.display = 'block';
                document.getElementById('playerFourWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerFourWheatOn').style.display = 'none';
                document.getElementById('playerFourWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerFourWoodOn').style.display = 'block';
                document.getElementById('playerFourWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerFourWoodOn').style.display = 'none';
                document.getElementById('playerFourWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerFourBrickOn').style.display = 'block';
                document.getElementById('playerFourBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerFourBrickOn').style.display = 'none';
                document.getElementById('playerFourBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerFourOreOn').style.display = 'block';
                document.getElementById('playerFourOreOff').style.display = 'none';
            } else {
                document.getElementById('playerFourOreOn').style.display = 'none';
                document.getElementById('playerFourOreOff').style.display = 'block';
            }

            card.style.display = 'block';
        } else if(color == "Orange"){
            var card = document.getElementById("playerFive");
            document.getElementById("playerFiveHeader").innerHTML = dict[x].name;
            document.getElementById("playerFivePoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerFiveRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerFiveRoad').src = "./icons/road.svg"
            }

            if(!dict[x].production.wool){
                document.getElementById('playerFiveWoolOn').style.display = 'block';
                document.getElementById('playerFiveWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerFiveWoolOn').style.display = 'none';
                document.getElementById('playerFiveWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerFiveWheatOn').style.display = 'block';
                document.getElementById('playerFiveWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerFiveWheatOn').style.display = 'none';
                document.getElementById('playerFiveWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerFiveWoodOn').style.display = 'block';
                document.getElementById('playerFiveWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerFiveWoodOn').style.display = 'none';
                document.getElementById('playerFiveWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerFiveBrickOn').style.display = 'block';
                document.getElementById('playerFiveBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerFiveBrickOn').style.display = 'none';
                document.getElementById('playerFiveBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerFiveOreOn').style.display = 'block';
                document.getElementById('playerFiveOreOff').style.display = 'none';
            } else {
                document.getElementById('playerFiveOreOn').style.display = 'none';
                document.getElementById('playerFiveOreOff').style.display = 'block';
            }


            card.style.display = 'block';
        } else if(color == "White"){
            var card = document.getElementById("playerSix");
            document.getElementById("playerSixHeader").innerHTML = dict[x].name;
            document.getElementById("playerSixPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            if(dict[x].largest.road) {
                document.getElementById('playerSixRoad').src = "./icons/roadShiny.svg"
            } else {
                document.getElementById('playerSixRoad').src = "./icons/road.svg"
            }

            if(!dict[x].production.wool){
                document.getElementById('playerSixWoolOn').style.display = 'block';
                document.getElementById('playerSixWoolOff').style.display = 'none';
            } else {
                document.getElementById('playerSixWoolOn').style.display = 'none';
                document.getElementById('playerSixWoolOff').style.display = 'block';
            }

            if(!dict[x].production.wheat){
                document.getElementById('playerSixWheatOn').style.display = 'block';
                document.getElementById('playerSixWheatOff').style.display = 'none';
            } else {
                document.getElementById('playerSixWheatOn').style.display = 'none';
                document.getElementById('playerSixWheatOff').style.display = 'block';
            }

            if(!dict[x].production.wood){
                document.getElementById('playerSixWoodOn').style.display = 'block';
                document.getElementById('playerSixWoodOff').style.display = 'none';
            } else {
                document.getElementById('playerSixWoodOn').style.display = 'none';
                document.getElementById('playerSixWoodOff').style.display = 'block';
            }

            if(!dict[x].production.brick){
                document.getElementById('playerSixBrickOn').style.display = 'block';
                document.getElementById('playerSixBrickOff').style.display = 'none';
            } else {
                document.getElementById('playerSixBrickOn').style.display = 'none';
                document.getElementById('playerSixBrickOff').style.display = 'block';
            }

            if(!dict[x].production.ore){
                document.getElementById('playerSixOreOn').style.display = 'block';
                document.getElementById('playerSixOreOff').style.display = 'none';
            } else {
                document.getElementById('playerSixOreOn').style.display = 'none';
                document.getElementById('playerSixOreOff').style.display = 'block';
            }

            card.style.display = 'block';
        }
    }
}

function increaseSettlements(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.addSettlement(name)
}

function decreaseSettlements(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.removeSettlement(name)
}

function increaseCities(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.addCity(name)
}

function decreaseCities(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.removeCity(name)
}

function increaseRoads(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.addRoad(name)
}

function decreaseRoads(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.removeRoad(name)
}

function increaseKnights(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.addKnight(name)
}

function decreaseKnights(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.removeKnight(name)
}

function increaseDev(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.addDevCard(name)
}

function decreaseDev(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.removeDevCard(name)
}

function claimLongestRoad(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;    
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.claimRoad(name);
}

function calculateVPforPlayer(name, playerList)
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

function produce(num,what){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;    
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.produce(name,what);
}

function notProduce(num,what){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;    
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    connection.stopProducing(name,what);
}

function decreaseDevScore(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;    
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    //connection.decreaseVP(name);
}

function increaseDevScore(num){
    var name = '';
    if (num == 1) {
        name = document.getElementById("playerOneHeader").innerHTML;
    } else if (num == 2) {
        name = document.getElementById("playerTwoHeader").innerHTML;    
    }  else if (num == 3) {
        name = document.getElementById("playerThreeHeader").innerHTML;
    }  else if (num == 4) {
        name = document.getElementById("playerFourHeader").innerHTML;
    }  else if (num == 5) {
        name = document.getElementById("playerFiveHeader").innerHTML;
    }  else if (num == 6) {
        name = document.getElementById("playerSixHeader").innerHTML;
    } 
    //connection.increaseVP(name);
}

playerList = [];