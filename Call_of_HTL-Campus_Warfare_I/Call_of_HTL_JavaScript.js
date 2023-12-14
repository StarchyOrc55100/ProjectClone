
//------------globale Variablen------------
//Positionsvariablen für player
//x & y sind die rechnerischen Positionen
//canvasPosX & canvasPosY sind die Positionen am canvas und werden NICHT VERÄNDERT!
var player1 = {
    x: 100,
    y: 100,
    
    vx: 0,
    vy: 0,

    w: 100,
    h: 100,

    canvasPosX: 0,
    canvasPosY: 0,
    color: "red",

    lastMove: 0,
};

var player2 = {
    x: 100,
    y: 100,

    vx: 0,
    vy: 0,

    w: 100,
    h: 100,

    canvasPosX: 0,
    canvasPosY: 0,
    color: "blue",

    lastMove: 0,
};

//Zähler für die Spiel-Zeit (Zeit, Cooldowns, scores, etc.)
var gameTick = 0;

//X-/Y-Koordinaten der Canvas-Nullpunkte von player1 & player2
var canvas1Xzero = 0;
var canvas1Yzero = 0;
var canvas2Xzero = 0;
var canvas2Yzero = 0;

//Pixel pro Bewegung eines Spielers (Bewegungsgeschwindigkeit, Bewegungszähler)
var movementSpeed = 6;
//Zeiabstand, in dem der Bewegungszähler addiert/subtrahiert werden kann
var movementTimer = 5; //[ms]

//Speichert Aktivierungsstatus für Detail-Screen (um Ein-/Ausschalten mit einer Taste zu ermöglichen)
var showDetails = false;
var detailDisplayed = Date.now();
var detailTimer = 10;

//Variable für Skalierung des Canvas
var canvasScale = 1;
var scalingEvent = false;

//------------Definition der Wände------------
var walls = [];
var wallColor = "grey";

//==============================
var mapBorder = {
    x: 0,
    y: 0,
    w: 2600,
    h: 4000,
    b: 100,
    color: "orange",
};
//==============================

//Positionsvariablen für map-border
var mapBorderTOP = {
    x: 0,
    y: 0,
    w: 2600,
    h: 100,
}
var mapBorderBOTTOM = {
    x: 0,
    y: 4000,
    w: 2600,
    h: 100,
}
var mapBorderLEFT = {
    x: 0,
    y: 0,
    w: 100,
    h: 4000,
}
var mapBorderRIGHT = {
    x: 2600,
    y: 0,
    w: 100,
    h: 4100,
}

//Positionsvariablen für walls
var wall1 = {
    x: 800,
    y: mapBorder.b,
    w: 100,
    h: 600,
};
var wall2 = {
    x: 1700,
    y: mapBorder.b,
    w: 100,
    h: 600,
};
var wall3 = {
    x: 800,
    y: 500,
    w: 400,
    h: 100,
};
var wall4 = {
    x: 1400,
    y: 500,
    w: 400,
    h: 100,
};
var wall5 = {
    x: mapBorder.b,
    y: 1000,
    w: 800,
    h: 100,
};
var wall6 = {
    x: 800,
    y: 900,
    w: 100,
    h: 1000,
};
var wall7 = {
    x: 1700,
    y: 900,
    w: 100,
    h: 1000,
};
var wall8 = {
    x: 1700,
    y: 1000,
    w: 900,
    h: 100,
};
var wall9 = {
    x: mapBorder.b,
    y: 2900,
    w: 800,
    h: 100,
};
var wall10 = {
    x: 800,
    y: 2100,
    w: 100,
    h: 1200,
};
var wall11 = {
    x: 1700,
    y: 2100,
    w: 100,
    h: 1700,
};
var wall12 = {
    x: 1700,
    y: 2900,
    w: 900,
    h: 100,
};
var wall13 = {
    x: 800,
    y: 3600,
    w: 100,
    h: 400,
};

//------------Startfunktion------------
//Funktion zum Starten der einzelnen Funktionen
function init() {
    //canvases werden zum Spielstart skaliert
    canvasScaleFunc();

    //die einzelnen Walls werden auf ein Array kopiert, da sie zusammengefasst leichter zu bearbeiten sind
    walls.push(mapBorderTOP);
    walls.push(mapBorderBOTTOM);
    walls.push(mapBorderLEFT);
    walls.push(mapBorderRIGHT);

    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);
    walls.push(wall5);
    walls.push(wall6);
    walls.push(wall7);
    walls.push(wall8);
    walls.push(wall9);
    walls.push(wall10);
    walls.push(wall11);
    walls.push(wall12);
    walls.push(wall13);

    setInterval(drawPlayer1, 40);
    setInterval(drawPlayer2, 40);

    setInterval(canvasScaleFunc, 6000);

    setInterval(gameSelectFunc, 6000);

    setInterval(calculationPlayer1, 10);
    setInterval(calculationPlayer2, 10);

    setInterval(tickFunc, 100);
};

function tickFunc() {
    gameTick++;
}

//------------Grafik-Verarbeitung------------
//canvases werden der Bildschirmgröße angepasst
//canvas is gay
function canvasScaleFunc() {
    var canvas1 = document.getElementById("game1");
    var canvas2 = document.getElementById("game2");
    
    var healthBar1 = document.getElementById("player1Health");
    var healthBar2 = document.getElementById("player2Health");
    
    var Abilities1 = document.getElementById("abilities1");
    var Abilities2 = document.getElementById("abilities2");
        
    canvas1.width = window.innerWidth * 0.38;
    canvas2.width = window.innerWidth * 0.38;
    
    canvas1.height = canvas1.width;
    canvas2.height = canvas2.width;
    
    healthBar1.width = canvas1.width;
    healthBar2.width = canvas2.width;

    Abilities1.style.height = canvas1.height + 'px';            // + 'px' sagt den code das die höhe in Pixel berechnet werden soll
    Abilities2.style.height = canvas2.height + 'px';
};
//Funktions zum "anklicken" beider canvas
function gameSelectFunc() {
    canvases = document.getElementById("canvas-container");

    canvases.setAttribute('tabindex' , '0');
    canvases.focus();
    canvases.addEventListener('keypress', f_keypress, false);
};

//------------Wall-Verarbeitung------------
function calculationPlayer1() {
    var canvas1 = document.getElementById("game1");

    //Position von player1 auf canvas (Mittelpunkt)
    player1.canvasPosX = (canvas1.width / 2) - (player1.w / 2);
    player1.canvasPosY = (canvas1.height / 2) - (player1.h / 2);
    
    //Berechnung der X-/Y-Koordinaten der Canvas-Nullpunkte
    canvas1Xzero = (player1.x - player1.canvasPosX);
    canvas1Yzero = (player1.y - player1.canvasPosX);

    //Zähler-Funktion für Movement -> kann nur in fixen Zeitabständen ausgeführt werden
    //if(Date.now() > (player1.lastMove + movementTimer)) {
        player1.x = (player1.x + player1.vx);
        player1.y = (player1.y + player1.vy);

        //player1.lastMove = Date.now();
    //};

    //Zusammentreffen mit Map-Border
    if(player1.x <= (mapBorder.x + mapBorder.b))                player1.x = (mapBorder.x + mapBorder.b);
    if(player1.x >= (mapBorder.x + mapBorder.w - mapBorder.b))  player1.x = (mapBorder.x + mapBorder.w  - mapBorder.b);
    if(player1.y <= (mapBorder.y + mapBorder.b))                player1.y = (mapBorder.y + mapBorder.b);
    if(player1.y >= (mapBorder.y + mapBorder.h - mapBorder.b))  player1.y = (mapBorder.y + mapBorder.h - mapBorder.b);

    //Zusammentreffen mit Walls
    /*
    //Zusammentreffen mit Walls
    for(var i = 0; i < walls.length; i++) {
        var wall = walls[i];

        //player1 befindet sich zwischen der oberen Kante der wall (wall.y) und der unteren Kante (wall.y + wall.h)
        //Möglichkeiten: player1 kann mit der wall von links oder rechts zusammenstoßen
        if(player1.y <= (wall.y + wall.h) && player1.y >= wall.y) {
            //if(player1.y > (wall.y + wall.h) && player1.y > wall.y) {
                if(player1.x >= wall.x              && player1.x <= (wall.x + wall.w + 1))  player1.x = wall.x;
                if(player1.x <= (wall.x + wall.w)   && player1.x >= (wall.x - 1))           player1.x = (wall.x + wall.w);
            //};
        };

        //player1 befindet sich zwischen der linken Kante der wall (wall.x) und der rechten Kante (wall.x + wall.w)
        //Möglichkeiten: player1 kann mit der wall von oben oder unten zusammenstoßen
        if(player1.x <= (wall.x + wall.w) && player1.x >= wall.x) {
            if(player1.y >= wall.y              && player1.y <= (wall.y + wall.h + 1))  player1.y = wall.y;
            if(player1.y <= (wall.y + wall.h)   && player1.y >= (wall.y - 1))           player1.y = (wall.y + wall.h);
        };
    };
    */

    //player1 wird in canvas zentriert
    /*
    if(scalingEvent == true) {
        //player1.canvasPosX = (canvas1.width / 2) - (player1.w / 2);
        //player1.canvasPosY = (canvas1.height / 2) - (player1.h / 2);

        player1.canvasPosX = (canvas1.width - player1.w * canvasScale) * 0.5;
        player1.canvasPosY = (canvas1.height - player1.h * canvasScale) * 0.5;

        scalingEvent = false;
    };
    */
};

function calculationPlayer2 () {
    var canvas2 = document.getElementById("game2");

    //Position von player1 auf canvas (Mittelpunkt)
    player2.canvasPosX = (canvas2.width / 2) - (player2.w / 2);
    player2.canvasPosY = (canvas2.height / 2) - (player2.h / 2);
    
    //Berechnung der X-/Y-Koordinaten der Canvas-Nullpunkte
    canvas2Xzero = (player2.x - player2.canvasPosX);
    canvas2Yzero = (player2.y - player2.canvasPosY);

    //Zähler-Funktion für Movement -> kann nur in fixen Zeitabständen ausgeführt werden
    //if(Date.now() > (player2.lastMove + movementTimer)) {
        player2.x = (player2.x + player2.vx);
        player2.y = (player2.y + player2.vy);

        //player2.lastMove = Date.now();
    //};

    //Zusammentreffen mit Map-Border
    if(player2.x <= (mapBorder.x + mapBorder.b))                player2.x = (mapBorder.x + mapBorder.b);
    if(player2.x >= (mapBorder.x + mapBorder.w  - mapBorder.b)) player2.x = (mapBorder.x + mapBorder.w  - mapBorder.b);
    if(player2.y <= (mapBorder.y + mapBorder.b))                player2.y = (mapBorder.y + mapBorder.b);
    if(player2.y >= (mapBorder.y + mapBorder.h - mapBorder.b))  player2.y = (mapBorder.y + mapBorder.h - mapBorder.b);
    
    //Zusammentreffen mit Walls
    /*
    //Zusammentreffen mit Walls
    for(var i = 0; i < walls.length; i++) {
        var wall = walls[i];
            
        //player1 befindet sich zwischen der oberen Kante der wall (wall.y) und der unteren Kante (wall.y + wall.h)
        //Möglichkeiten: player1 kann mit der wall von links oder rechts zusammenstoßen
        if(player2.y < (wall.y + wall.h) && player2.y > wall.y) {
            if(player2.x >= wall.x)               player2.x = wall.x;
            if(player2.x <= (wall.x + wall.w))    player2.x = (wall.x + wall.w);
        }

        //player1 befindet sich zwischen der linken Kante der wall (wall.x) und der rechten Kante (wall.x + wall.w)
        //Möglichkeiten: player1 kann mit der wall von oben oder unten zusammenstoßen
        if(player2.x < (wall.x + wall.w) && player2.x > wall.x) {
            if(player2.y >= wall.y)               player2.y = wall.y;
            if(player2.y <= (wall.y + wall.h))    player2.y = (wall.y + wall.h);
        }
    };
    */

    //player2 wird in canvas zentriert
    /*
    if(scalingEvent == true) {
        player2.canvasPosX = (canvas2.width / 2) - (player2.w / 2);
        player2.canvasPosY = (canvas2.height / 2) - (player2.h / 2);

        //player2.canvasPosX = player2.canvasPosX + (player2.canvasPosX * canvasScale);
        //player2.canvasPosY = player2.canvasPosY + (player2.canvasPosY * canvasScale);

        scalingEvent = false;
    };
    */
};

//------------Tasteneingaben------------
//solange "keydown" der fall ist, wird in der Zeichner-Funktion des jeweiligen players in 
//bestimmten Zeitabständen (movementTimer) der movementSpeed/Bewegungszähler addiert/subtrahiert
addEventListener("keydown", function(e) {
    
    if(e.code == 'KeyW') player1.vy = ((-1) * movementSpeed);
    if(e.code == 'KeyS') player1.vy = movementSpeed;
    if(e.code == 'KeyA') player1.vx = ((-1) * movementSpeed);
    if(e.code == 'KeyD') player1.vx = movementSpeed;
    
    if(e.code == "ArrowUp")     player2.vy = ((-1) * movementSpeed);
    if(e.code == "ArrowDown")   player2.vy = movementSpeed;
    if(e.code == "ArrowLeft")   player2.vx = ((-1) * movementSpeed);
    if(e.code == "ArrowRight")  player2.vx = movementSpeed;
    
    /*
    if(e.code == 'KeyW') player1.y = player1.y - movementSpeed;
    if(e.code == 'KeyS') player1.y = player1.y + movementSpeed;
    if(e.code == 'KeyA') player1.x = player1.x - movementSpeed;
    if(e.code == 'KeyD') player1.x = player1.x + movementSpeed;
    
    if(e.code == "ArrowUp")     player2.y = player2.y - movementSpeed;
    if(e.code == "ArrowDown")   player2.y = player2.y + movementSpeed;
    if(e.code == "ArrowLeft")   player2.x = player2.x - movementSpeed;
    if(e.code == "ArrowRight")  player2.x = player2.x + movementSpeed;
    */
    
    //if(e.code == 'KeyI') player2.vy = ((-1) * movementSpeed);
    //if(e.code == 'KeyK') player2.vy = movementSpeed;
    //if(e.code == 'KeyJ') player2.vx = ((-1) * movementSpeed);
    //if(e.code == 'KeyL') player2.vx = movementSpeed;
});

//sobalt "keyup" passiert, wird die addierte/subtrahierte Zahl auf "0" gesetzt
//es wird in jedem Intervall die Zahl "0" addiert/subtrahiert: passiert keine Bewegung
addEventListener("keyup", function(e) {
    
    if(e.code == 'KeyW') player1.vy = 0;
    if(e.code == 'KeyS') player1.vy = 0;
    if(e.code == 'KeyA') player1.vx = 0;
    if(e.code == 'KeyD') player1.vx = 0;
    
    if(e.code == "ArrowUp")     player2.vy = 0;
    if(e.code == "ArrowDown")   player2.vy = 0;
    if(e.code == "ArrowLeft")   player2.vx = 0;
    if(e.code == "ArrowRight")  player2.vx = 0;
    
    /*
    if(e.code == 'KeyW') player1.vy = 0, player1.y = (player1.y + player1.vy);
    if(e.code == 'KeyS') player1.vy = 0, player1.y = (player1.y + player1.vy);
    if(e.code == 'KeyA') player1.vx = 0, player1.x = (player1.x + player1.vx);
    if(e.code == 'KeyD') player1.vx = 0, player1.x = (player1.x + player1.vx);
    
    if(e.code == "ArrowUp")     player2.vy = 0, player2.y = (player2.y + player2.vy);
    if(e.code == "ArrowDown")   player2.vy = 0, player2.y = (player2.y + player2.vy);
    if(e.code == "ArrowLeft")   player2.vx = 0, player2.x = (player2.x + player2.vx);
    if(e.code == "ArrowRight")  player2.vx = 0, player2.x = (player2.x + player2.vx);
    */
    /*
    if(e.code == 'KeyI') player2.vy = 0;
    if(e.code == 'KeyK') player2.vy = 0;
    if(e.code == 'KeyJ') player2.vx = 0;
    if(e.code == 'KeyL') player2.vx = 0;
    */
});

//f_keypress muss wegen der gameSelectFunc() im Code bleiben!
function f_keypress(e) {
    //Tastatur-Eingaben für das Anzeigen der Spiel-Details (Z)
    if(e.code == 'KeyY' && showDetails == false) {
        showDetails = true; 
        detailDisplayed = Date.now();
        console.log("Spiel-Details werden angezeigt! Zeitpunkt: " + detailDisplayed);
    };
    if(e.code == 'KeyY' && ((detailDisplayed + detailTimer) < Date.now())) {
        showDetails = false;
        console.log("Spiel-Details werden nicht mehr angezeigt!");
    };

    //Tastatur-Eingaben zum vergrößern/verkleinern der Spiel-Grafik (+/-)
    if(e.code == 'BracketRight') {
        console.log("Spiel-Oberfläche wird vergrößert! Skalierungsfaktor: " + canvasScale);
        canvasScale = canvasScale * 1.1;
        scalingEvent = true;
    }; 
    if(e.code == 'Slash') {
        console.log("Spiel-Oberfläche wird verkleinert! Skalierungsfaktor: " + canvasScale);
        canvasScale = canvasScale / 1.1;
        scalingEvent = true;
    };
};

//-------------------Theme------------------
/*
document.addEventListener('keydown', function(event) {
    var audio = document.getElementById('audio3');
    audio.play();
});
*/


//-------------Console-----------------------
//DOMContentLoaded ist ein Ereignis, das auftritt, wenn die grundlegende HTML-Struktur geladen ist.
//Es erlaubt JavaScript, sicher mit der Seite zu interagieren, bevor alle Bilder oder Styles geladen sind.
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("radiance1").onclick = function() {
        console.log("Player 1 casts Radiance");
    };

    document.getElementById("radiance2").onclick = function() {
        console.log("Player 2 casts Radiance");
    };

    document.getElementById("goldenGun1").onclick = function() {
        console.log("Player 1 casts Golden Gun");
    };

    document.getElementById("goldenGun2").onclick = function() {
        console.log("Player 2 casts Golden Gun");
    };

    document.getElementById("wardOfDawn1").onclick = function() {
        console.log("Player 1 casts Ward of Dawn");
    };

    document.getElementById("wardOfDawn2").onclick = function() {
        console.log("Player 2 casts Ward of Dawn");
    };
});
