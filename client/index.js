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

function gotoStartPage(){
    //console.log("Swap page");
    document.getElementById("launchPage").style.display = 'none';
    document.getElementById("startGameAdminPage").style.display = 'block';
}

playerList = [];