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
            card.style.display = 'block';
        } else if(color == "Blue"){
            var card = document.getElementById("playerTwo");
            document.getElementById("playerTwoHeader").innerHTML = dict[x].name;
            document.getElementById("playerTwoPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            card.style.display = 'block';
        } else if(color == "Green"){
            var card = document.getElementById("playerThree");
            document.getElementById("playerThreeHeader").innerHTML = dict[x].name;
            document.getElementById("playerThreePoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            card.style.display = 'block';
        } else if(color == "Brown"){
            var card = document.getElementById("playerFour");
            document.getElementById("playerFourHeader").innerHTML = dict[x].name;
            document.getElementById("playerFourPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            card.style.display = 'block';
        } else if(color == "Orange"){
            var card = document.getElementById("playerFive");
            document.getElementById("playerFiveHeader").innerHTML = dict[x].name;
            document.getElementById("playerFivePoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
            card.style.display = 'block';
        } else if(color == "White"){
            var card = document.getElementById("playerSix");
            document.getElementById("playerSixHeader").innerHTML = dict[x].name;
            document.getElementById("playerSixPoint").innerHTML = calculateVPforPlayer(dict[x].name,dict);
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

playerList = [];