//Storage
var FILLED = [false, false, false, false, 
              false, false, false, false, 
              false, false, false, false, 
              false, false, false, false];

var FILLEDNUMS = [0, 0, 0, 0,
                  0, 0, 0, 0,
                  0, 0, 0, 0,
                  0, 0, 0, 0];

//Points
var SCORE = 0;
var scoreText1 = new Text("SCORE", "10pt Arial");
var scoreText2 = new Text(SCORE, "12pt Arial");
var HASLOST = false;
var HASWON = false;

//Colors
var box2 = new Color(238, 228, 218);
var box4 = new Color(237, 224, 200);
var box8 = new Color(242, 177, 121);
var box16 = new Color(245, 149, 99);
var box32 = new Color(246, 124, 95);
var box64 = new Color(246, 94, 59);
var box128 = new Color(237, 207, 114);
var box256 = new Color(237, 204, 97);
var box512 = new Color(237, 200, 80);
var box1024 = new Color(237, 197, 63);
var box2048 = new Color(237, 194, 46);

//Keyboard
var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;
var ADDED_TILE = false;

function start() {
    setup();
    tileSpawn(2);
    keyDownMethod(pressDown);
    keyUpMethod(pressUp);
    setTimer(isLost, 100);
    setTimer(hasWon, 100);
}

function hasWon() {
    if(!HASWON) {
        if(FILLEDNUMS[0] == 2048  || FILLEDNUMS[1] == 2048  || FILLEDNUMS[2] == 2048  || FILLEDNUMS[3] == 2048  || 
           FILLEDNUMS[4] == 2048  || FILLEDNUMS[5] == 2048  || FILLEDNUMS[6] == 2048  || FILLEDNUMS[7] == 2048  || 
           FILLEDNUMS[8] == 2048  || FILLEDNUMS[9] == 2048  || FILLEDNUMS[10] == 2048 || FILLEDNUMS[11] == 2048 || 
           FILLEDNUMS[12] == 2048 || FILLEDNUMS[13] == 2048 || FILLEDNUMS[14] == 2048 || FILLEDNUMS[15] == 2048) {
            var textColor = new Color(102, 100, 88);
            var text = new Text("YOU WON!", "50pt Arial");
            text.setColor(textColor);
            text.setPosition(30, getHeight() / 2 + 25);
                add(text);
                HASWON = true;
        }
    }
}

function isLost() {
    if(hasLost()) {
        if(!HASLOST) {
            var textColor = new Color(102, 100, 88);
            var text = new Text("YOU LOST!", "50pt Arial");
            text.setColor(textColor);
            text.setPosition(25, getHeight() / 2 + 25);
            add(text);
            HASLOST = true;
        }
    }
}

function addScore(score) {
    SCORE += score;
    scoreText2.setText(SCORE);
    var elem = getElementAt(250, 55);
    remove(elem);
    add(scoreText2);
}

function move(direction) {
    combine("UP");
    if(direction == "UP" && UP == false) {
        for(var i = 0; i < 4; i++) {
            for(var y = 0; y <= FILLED.length-1; y++) {
                if(FILLED[y] == true) {
                    if(FILLED[y - 4] == false) {
                        genTile(FILLEDNUMS[y], y - 4);
                        deleteTile(y);
                        if(!ADDED_TILE) {
                            tileSpawn(1);
                        }
                        ADDED_TILE = true;
                    }
                }
            }
        }
    } else if(direction == "DOWN" && DOWN == false) {
        combine("DOWN");
        for(var i = 0; i < 4; i++) {
            for(var y = FILLED.length; y >= -1; y--) {
                if(FILLED[y] == true) {
                    if(FILLED[y + 4] == false) {
                        genTile(FILLEDNUMS[y], y + 4);
                        deleteTile(y);
                        if(!ADDED_TILE) {
                            tileSpawn(1);
                        }
                        ADDED_TILE = true;
                    }
                }
            }
        }
    } else if(direction == "LEFT" && LEFT == false) {
        combine("LEFT");
        for(var i = 0; i < 4; i++) {
            for(var y = FILLED.length; y >= -1; y--) {
                if(FILLED[y] == true) {
                    if(FILLED[y - 1] == false) {
                        if(diffYLevel(y - 1, y)) {
                            genTile(FILLEDNUMS[y], y - 1);
                            deleteTile(y);
                            if(!ADDED_TILE) {
                                tileSpawn(1);
                            }
                            ADDED_TILE = true;
                        }
                    }
                }
            }
        }
    } else if(direction == "RIGHT" && RIGHT == false) {
        combine("RIGHT");
        for(var i = 0; i < 4; i++) {
            for(var y = 0; y <= FILLED.length-1; y++) {
                if(FILLED[y] == true) {
                    if(FILLED[y + 1] == false) {
                        if(diffYLevel(y + 1, y)) {
                            genTile(FILLEDNUMS[y], y + 1);
                            deleteTile(y);
                            if(!ADDED_TILE) {
                                tileSpawn(1);
                            }
                            ADDED_TILE = true;
                        }
                    }
                }
            }
        }
    }
}

function combine(direction) {
    if(direction == "UP" && UP == false) {
        for(var y = FILLED.length; y >= -1; y--) {
            if(FILLED[y] == true) {
                if(FILLEDNUMS[y - 4] == FILLEDNUMS[y]) {
                    addScore(FILLEDNUMS[y] * 2);
                    deleteTile(y - 4);
                    genTile(FILLEDNUMS[y] * 2, y - 4);
                    deleteTile(y);
                }
            }
        }
    } else if(direction == "DOWN" && DOWN == false) {
        for(var y = 0; y <= FILLED.length-1; y++) {
            if(FILLED[y] == true) {
                if(FILLEDNUMS[y + 4] == FILLEDNUMS[y]) {
                    addScore(FILLEDNUMS[y] * 2);
                    deleteTile(y + 4);
                    genTile(FILLEDNUMS[y] * 2, y + 4);
                    deleteTile(y);
                }
            }
        }
    } else if(direction == "LEFT" && LEFT == false) {
        for(var y = 0; y <= FILLED.length-1; y++) {
            if(FILLED[y] == true) {
                if(FILLEDNUMS[y - 1] == FILLEDNUMS[y]) {
                   if(diffYLevel(y - 1, y)) {
                        addScore(FILLEDNUMS[y] * 2);
                        deleteTile(y - 1);
                        genTile(FILLEDNUMS[y] * 2, y - 1);
                        deleteTile(y);
                    }
                }
            }
        }
    } else if(direction == "RIGHT" && RIGHT == false) {
        for(var y = FILLED.length; y >= -1; y--) {
            if(FILLED[y] == true) {
                if(FILLEDNUMS[y + 1] == FILLEDNUMS[y]) {
                    if(diffYLevel(y + 1, y)) {
                        addScore(FILLEDNUMS[y] * 2);
                        deleteTile(y + 1);
                        genTile(FILLEDNUMS[y] * 2, y + 1);
                        deleteTile(y);
                    }
                }
            }
        }
    }
}

function hasLost() {
    if(!FILLED[0]  || !FILLED[1]  || !FILLED[2]  || !FILLED[3]  || 
       !FILLED[4]  || !FILLED[5]  || !FILLED[6]  || !FILLED[7]  || 
       !FILLED[8]  || !FILLED[9]  || !FILLED[10] || !FILLED[11] || 
       !FILLED[12] || !FILLED[13] || !FILLED[14] || !FILLED[15]) {
        return false;
    }
    for(var y = FILLED.length; y >= -1; y--) {
        if(FILLED[y] == true) {
            if(FILLEDNUMS[y - 4] == FILLEDNUMS[y]) {
                return false;
            }
        }
    }
    for(var y = 0; y <= FILLED.length-1; y++) {
        if(FILLED[y] == true) {
            if(FILLEDNUMS[y + 4] == FILLEDNUMS[y]) {
                return false;
            }
        }
    }
    for(var y = 0; y <= FILLED.length-1; y++) {
        if(FILLED[y] == true) {
            if(FILLEDNUMS[y - 1] == FILLEDNUMS[y]) {
               if(diffYLevel(y - 1, y)) {
                    return false;
                }
            }
        }
    }
    for(var y = FILLED.length; y >= -1; y--) {
        if(FILLED[y] == true) {
            if(FILLEDNUMS[y + 1] == FILLEDNUMS[y]) {
                if(diffYLevel(y + 1, y)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function diffYLevel(low, high) {
    var ylow = getFinalYLevel(low);
    var yhigh = getFinalYLevel(high);
    if(ylow != yhigh) {
        return false;
    } else {
        return true;
    }
}

function deleteTile(coord) {
    var finalX = getFinalX(coord);
    var finalY = getFinalY(coord);
    var elem = getElementAt(finalX + 20, finalY + 40);
    remove(elem);
    elem = getElementAt(finalX + 20, finalY + 40);
    remove(elem);
    FILLED[coord] = false;
    FILLEDNUMS[coord] = 0;
}

function pressDown(e) {
    if(e.keyCode == Keyboard.UP || e.keyCode == Keyboard.letter('W')) {
        move("UP");
        UP = true;
    } else if(e.keyCode == Keyboard.DOWN || e.keyCode == Keyboard.letter('S')) {
        move("DOWN");
        DOWN = true;
    } else if(e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) {
        move("LEFT");
        LEFT = true;
    } else if(e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) {
        move("RIGHT");
        RIGHT = true;
    }
}

function pressUp(e) {
    if(e.keyCode == Keyboard.UP || e.keyCode == Keyboard.letter('W')) {
        UP = false;
        ADDED_TILE = false;
    } else if(e.keyCode == Keyboard.DOWN || e.keyCode == Keyboard.letter('S')) {
        DOWN = false;
        ADDED_TILE = false;
    } else if(e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) {
        LEFT = false;
        ADDED_TILE = false;
    } else if(e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) {
        RIGHT = false;
        ADDED_TILE = false;
    }
}

function setup() {
    var backgroundColor = new Color(251, 248, 239);
    var background = new Rectangle(getWidth(), getHeight());
    background.setColor(backgroundColor);
    add(background);
    
    var foregroundColor = new Color(189, 175, 162);
    var foreground = new Rectangle(350, 350);
    foreground.setColor(foregroundColor);
    foreground.setPosition(25, getHeight() - 370);
    add(foreground);
    
    var boxColor = new Color(205, 193, 179);
    
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 4; y++) {
            var box = new Rectangle(75, 75);
            box.setColor(boxColor);
            box.setPosition((x * 85) + 34, (y * 85) + 120);
            add(box);
        }
    }
    
    var textColor = new Color(102, 100, 88);
    
    var titleText = new Text("2048", "40pt Arial");
    titleText.setPosition(25, 60);
    titleText.setColor(textColor);
    add(titleText);
    
    var subText = new Text("Join the numbers and get to the 2048 tile!", "12pt Arial");
    subText.setPosition(25, 90);
    subText.setColor(textColor);
    add(subText);
    
    var scoreBox = new Rectangle(80, 40);
    scoreBox.setPosition(240, 20);
    scoreBox.setColor(foregroundColor);
    add(scoreBox);
    
    scoreText1.setPosition(250, 35);
    scoreText2.setPosition(250, 55);
    scoreText1.setColor(backgroundColor);
    scoreText2.setColor(backgroundColor);
    add(scoreText1);
    add(scoreText2);
    
}

function tileSpawn(amount) {
    var checked = 0;
    for(var i = 0; i < amount; i++) {
        var random = Randomizer.nextInt(0, 15);
        if(tileCheck(random)) {
            newTileGen(random);
        } else {
            for(var i = 0; i < 100; i++) {
                if(random < 15) {
                    random += 1;
                    if(tileCheck(random)) {
                        newTileGen(random);
                        checked = 0;
                        break;
                    }
                } else {
                    random = -1;
                }
            }
            checked = 0;
        }
    }
}

function getFinalX(coord) {
    var temp = coord / 4;
    var temp2 = temp.toString(10).split(".").map(function(t){return parseInt(t)})
    var temp3 = temp2[1];
    var xlevel;
    if(temp3 == null) {
        xlevel = 1;
    } else if(temp3 == 25) {
        xlevel = 2;
    } else if(temp3 == 5) {
        xlevel = 3;
    } else if(temp3 == 75) {
        xlevel = 4;
    }
    
    var xfinal = 34 + (((xlevel - 1) * 85));
    return xfinal;
}

function getFinalY(coord) {
    var temp = coord / 4;
    var ylevel;
    if(temp >= 0 && temp < 1) {
        ylevel = 1;
    } else if(temp >= 1 && temp < 2) {
        ylevel = 2;
    } else if(temp >= 2 && temp < 3) {
        ylevel = 3;
    } else if(temp >= 3 && temp <= 4) {
        ylevel = 4;
    }
    
    var yfinal = 120 + (((ylevel - 1) * 85));
    return yfinal;
}

function getFinalXLevel(coord) {
    var temp = coord / 4;
    var temp2 = temp.toString(10).split(".").map(function(t){return parseInt(t)})
    var temp3 = temp2[1];
    var xlevel;
    if(temp3 == null) {
        xlevel = 1;
    } else if(temp3 == 25) {
        xlevel = 2;
    } else if(temp3 == 5) {
        xlevel = 3;
    } else if(temp3 == 75) {
        xlevel = 4;
    }
    
    return xlevel;
}

function getFinalYLevel(coord) {
    var temp = coord / 4;
    var ylevel;
    if(temp >= 0 && temp < 1) {
        ylevel = 1;
    } else if(temp >= 1 && temp < 2) {
        ylevel = 2;
    } else if(temp >= 2 && temp < 3) {
        ylevel = 3;
    } else if(temp >= 3 && temp <= 4) {
        ylevel = 4;
    }
    return ylevel;
}

function genTile(num, coord) {
    var box = new Rectangle(75, 75);
    FILLED[coord] = true;
    FILLEDNUMS[coord] = num;
    box.setColor(Color.ORANGE);
    
    var xfinal = getFinalX(coord);
    var yfinal = getFinalY(coord);
    
    var number = new Text(num, "20pt Arial");
    if(yfinal != null) {
        number.setPosition(xfinal + 10, yfinal + 44);
    }
    
    
    if(num == 2) {
        box.setColor(box2);
        var textColor = new Color(102, 100, 88);
    } else if (num == 4) {
        box.setColor(box4);
        var textColor = new Color(102, 100, 88);
    } else if (num == 8) {
        box.setColor(box8);
        var textColor = new Color(251, 248, 239);
    } else if (num == 16) {
        box.setColor(box16);
        var textColor = new Color(251, 248, 239);
    } else if (num == 32) {
        box.setColor(box32);
        var textColor = new Color(251, 248, 239);
    } else if (num == 64) {
        box.setColor(box64);
        var textColor = new Color(251, 248, 239);
    } else if (num == 128) {
        box.setColor(box128);
        var textColor = new Color(251, 248, 239);
    } else if (num == 256) {
        box.setColor(box256);
        var textColor = new Color(251, 248, 239);
    } else if (num == 512) {
        box.setColor(box512);
        var textColor = new Color(251, 248, 239);
    } else if (num == 1024) {
        box.setColor(box1024);
        var textColor = new Color(251, 248, 239);
    } else if (num == 2048) {
        box.setColor(box2048);
        var textColor = new Color(251, 248, 239);
    }
    
    number.setColor(textColor);
    box.setPosition(xfinal, yfinal);
    add(box);
    add(number);
}

function tileCheck(num) {
    if(!FILLED[num]) {
        return true;
    } else {
        return false;
    }
}

function newTileGen(num) {
    var which1 = Randomizer.nextInt(0, 1);
    if(which1 == 0) {
        genTile(2, num);
    } else if(which1 == 1) {
        genTile(4, num);
    }
}