
//------------Zeichner-Funktionen für Player 1 & Player 2------------
function drawPlayer1() {
    var canvas1 = document.getElementById("game1");
    var ctx1 = canvas1.getContext("2d");
    
    //aktuelles Canvas wird gespeichert, damit es fehlerfrei bearbeitet werden kann
    ctx1.save();

    //canvas wird komplett gelöscht
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
    //manuelle Skalierung des Spiels (KeyZ)
    //if(scalingEvent == true) {
        var scaleFactor1 = canvasScale;
        ctx1.scale(scaleFactor1, scaleFactor1);
        scaleFactor1 = 1;
        //scalingEvent = false;
    //};

    //Walls werden gezeichnet
    ctx1.fillStyle = wallColor;
    for(var i = 0; i < walls.length; i++) {
        var wall = walls[i];
        ctx1.fillRect((wall.x - canvas1Xzero), (wall.y - canvas1Yzero), wall.w, wall.h);
    };

    //generischer Spieler (player2) wird gezeichnet
    ctx1.fillStyle = player2.color;
    ctx1.fillRect((player2.x - canvas1Xzero), (player2.y - canvas1Yzero), player2.w, player2.h);
    
    //player1 wird gezeichnet
    ctx1.fillStyle = player1.color;
    ctx1.fillRect(player1.canvasPosX, player1.canvasPosY, player1.w, player1.h);
    
    if(showDetails == true){
        //String für Koordinatenanzeige
        var PosText = "Player Position X: " + player1.x + " Y: " + player1.y;
        var CposText = "Canvas Position X: " + canvas1Xzero + " Y: " + canvas1Yzero;
        var KillsText = "Player kills:"
        var weaponText = "Current weapon:"
        var energyText = "Total Energy: "
        var hitPointsText = "HitPoints: "

        //Koordinaten werden gezeichnet
        ctx1.fillStyle = "black";
        ctx1.font = "30px Arial";
        ctx1.fillText(PosText, 0, 30);
        ctx1.fillText(CposText, 0, 60);
        ctx1.fillText(KillsText, 0, 90);
        ctx1.fillText(weaponText, 0, 120);
        ctx1.fillText(energyText, 0, 150);
        ctx1.fillText(hitPointsText, 0, 180);
    };

    //bearbeitetes Canvas wird wiederhergestellt und gezeichnet
    ctx1.restore();

    //"requestAnimationFrame" verhindert Zucken des Canvas, da eine Animation zwischen den Intervallen angefordert wird
    requestAnimationFrame(drawPlayer1);
};

function drawPlayer2() {
    var canvas2 = document.getElementById("game2");
    var ctx2 = canvas2.getContext("2d");

    //aktuelles Canvas wird gespeichert, damit es fehlerfrei bearbeitet werden kann
    ctx2.save();

    //canvas wird komplett gelöscht
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    //manuelle Skalierung des Spiels (KeyZ)
    //if(scalingEvent == true) {
        var scaleFactor2 = canvasScale;
        ctx2.scale(scaleFactor2, scaleFactor2);
        scaleFactor2 = 1;
        //scalingEvent = false;
    //};

    //Walls werden gezeichnet
    ctx2.fillStyle = wallColor;
    for(var i = 0; i < walls.length; i++) {
        var wall = walls[i];
        ctx2.fillRect((wall.x - canvas2Xzero), (wall.y - canvas2Yzero), wall.w, wall.h);
    };

    //generischer Spieler (player2) wird gezeichnet
    ctx2.fillStyle = player1.color;
    ctx2.fillRect((player1.x - canvas2Xzero), (player1.y - canvas2Yzero), player1.w, player1.h);

    //player2 wird gezeichnet
    ctx2.fillStyle = player2.color;
    ctx2.fillRect(player2.canvasPosX, player2.canvasPosY, player1.w, player1.h);

    if(showDetails == true){
        //String für Koordinatenanzeige
        var PosText = "Player Position X: " + player2.x + " Y: " + player2.y;
        var CposText = "Canvas Position X: " + canvas2Xzero + " Y: " + canvas2Yzero;
        var KillsText = "Player kills:"
        var weaponText = "Current weapon:"
        var energyText = "Total Energy: "
        var hitPointsText = "HitPoints: "

        //Koordinaten werden gezeichnet
        ctx2.fillStyle = "black";
        ctx2.font = "30px Arial";

        ctx2.fillText(PosText, 0, 30);
        ctx2.fillText(CposText, 0, 60);
        ctx2.fillText(KillsText, 0, 90);
        ctx2.fillText(weaponText, 0, 120);
        ctx2.fillText(energyText, 0, 150);
        ctx2.fillText(hitPointsText, 0, 180);
    };

    //bearbeitetes Canvas wird wiederhergestellt und gezeichnet
    ctx2.restore();

    //"requestAnimationFrame" verhindert Zucken des Canvas, da eine Animation zwischen den Intervallen angefordert wird
    requestAnimationFrame(drawPlayer2);
};