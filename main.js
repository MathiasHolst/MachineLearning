function startAll() {

    document.body.addEventListener('keydown', doKeyDown);
    hentBilledeAfBanen();
}

function hentBilledeAfBanen() {
    Bane.src = 'bane.png';
    Bane.onload = function () {
        myTimer = setInterval(Timer, 20);
        drawEveryThing();
    }
}

function Timer() {
    forward();
    drawEveryThing();
    timeCount++;
    GA();
}
var distantFront;
var distantLeft;
var distantRight;
function GA(){
    if (distantRight < 100 && distantRight < distantLeft){
        rotateCar(-defaultRotatValue);
    }
    else if (distantLeft < 100 && distantLeft < distantRight){
        rotateCar(defaultRotatValue);
    } else {

    }
}
function newGame() {
    center = { x: 130, y: 65 };
    timeCount = 0;
    angle = 0;
    speed = defaultSpeedStart;
    clearInterval(myTimer);
    myTimer = setInterval(Timer, 20);
}
//Used for drawing the distance, so that the
//start point is not center but further in front, so that
//the check for out of the lane is not checking this line also.
function justInfrontfarwardDistance() {
    var length = 10;
    var x2, y2;

    var curentAngel = (Math.PI / 180) * angle;
    x2 = center.x + length * Math.cos(curentAngel);
    y2 = center.y + length * Math.sin(curentAngel);

    return { x: x2, y: y2 };
}

function farwardDistance() {
    var length = 5;
    var x2, y2;
    for (var i = 0; i < 200; i++) {

        var curentAngel = (Math.PI / 180) * angle;

        x2 = center.x + length * Math.cos(curentAngel);
        y2 = center.y + length * Math.sin(curentAngel);

        var imgData = ctx.getImageData(x2, y2, 10, 10);
        var red = imgData.data[0];
        var green = imgData.data[1];
        var blue = imgData.data[2];
        var alpha = imgData.data[3];
        length += 5;
        //alert(red + " " + green + " " + blue + " " + alpha);
        if (green < 200) {
            break;
        }
    }
    return { x: x2, y: y2 };
}

function leftDistance() {
    var length = 5;
    var x2, y2;
    for (var i = 0; i < 200; i++) {

        var curentAngel = (Math.PI / 180) * angle - 70;

        x2 = center.x + length * Math.cos(curentAngel);
        y2 = center.y + length * Math.sin(curentAngel);

        var imgData = ctx.getImageData(x2, y2, 10, 10);
        var red = imgData.data[0];
        var green = imgData.data[1];
        var blue = imgData.data[2];
        var alpha = imgData.data[3];
        length += 5;
        //alert(red + " " + green + " " + blue + " " + alpha);
        if (green < 200) {
            break;
        }
    }
    return { x: x2, y: y2 };
}
function rightDistance() {
    var length = 5;
    var x2, y2;
    for (var i = 0; i < 200; i++) {

        var curentAngel = (Math.PI / 180) * angle + 70;

        x2 = center.x + length * Math.cos(curentAngel);
        y2 = center.y + length * Math.sin(curentAngel);

        var imgData = ctx.getImageData(x2, y2, 10, 10);
        var red = imgData.data[0];
        var green = imgData.data[1];
        var blue = imgData.data[2];
        var alpha = imgData.data[3];
        length += 5;
        //alert(red + " " + green + " " + blue + " " + alpha);
        if (green < 200) {
            break;
        }
    }
    return { x: x2, y: y2 };
}
function dist(x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
};
function diff(num1, num2) {
    if (num1 > num2) {
        return (num1 - num2);
    } else {
        return (num2 - num1);
    }
};
function drawEveryThing() {
    // ctx.clearRect(0, 0, 800, 400);
    ctx.drawImage(Bane, 0, 0, 800, 400);

    //Calculating the first Corner
    var angle1 = angle + 240;
    if (angle1 > 360)
        angle1 = angle - 120;
    var newPos1 = lineToAngle(ctx, center.x, center.y, lineLength - 15, angle1);

    //Calculating the second Corner
    var angle2 = angle;
    var newPos2 = lineToAngle(ctx, center.x, center.y, lineLength - 10, angle2);

    //Calculating the third Corner
    var angle3 = angle + 120;
    if (angle3 > 360)
        angle3 = angle - 240;
    var newPos3 = lineToAngle(ctx, center.x, center.y, lineLength - 15, angle3);

    //Drawing the distance front
    var distFarward = farwardDistance();
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "Blue";
    var justInFront = justInfrontfarwardDistance();
    ctx.moveTo(justInFront.x, justInFront.y);
    ctx.lineTo(distFarward.x, distFarward.y);
    ctx.stroke();
    ctx.strokeStyle = aktuelColor;

    //Drawing the distance left
    var distLeft = leftDistance();
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "Green";
    ctx.moveTo(justInFront.x, justInFront.y);
    ctx.lineTo(distLeft.x, distLeft.y);
    ctx.stroke();
    ctx.strokeStyle = aktuelColor;


    //Drawing the distance right
    var distRight = rightDistance();
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "Red";
    ctx.moveTo(justInFront.x, justInFront.y);
    ctx.lineTo(distRight.x, distRight.y);
    ctx.stroke();
    ctx.strokeStyle = aktuelColor;


    //Drawing the Car
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = aktuelColor;
    ctx.moveTo(newPos1.x, newPos1.y);
    ctx.lineTo(newPos2.x, newPos2.y);
    ctx.lineTo(newPos3.x, newPos3.y);
    ctx.lineTo(newPos1.x, newPos1.y);
    ctx.stroke();

    // Draw Text Draw Text Draw Text Draw Text Draw Text Draw Text Draw Text
    ctx.strokeStyle = "black";
    ctx.font = "15px Arial";
    var xpos = 350;
    ctx.fillText("Car left = 'a'", xpos, 20);
    ctx.fillText("Car right = 'd'", xpos, 40);
    distantFront = dist(distFarward.x, distFarward.y, justInFront.x, justInFront.y);
    distantLeft = dist(distLeft.x, distLeft.y, justInFront.x, justInFront.y);
    distantRight = dist(distRight.x, distRight.y, justInFront.x, justInFront.y);

    ctx.fillText("Distance front = " + Math.ceil(distantFront), xpos, 70);
    ctx.fillText("Distance left = " + Math.ceil(distantLeft), xpos, 90);
    ctx.fillText("Distance right = " + Math.ceil(distantRight), xpos, 110);
    ctx.fillText("Time = " + timeCount, xpos, 130);

    //Collision control - Collision control - Collision control - Collision control
    //Collision control - Collision control - Collision control - Collision control
    var imgData = ctx.getImageData(center.x, center.y, 10, 10);
    var red = imgData.data[0];
    var green = imgData.data[1];
    var blue = imgData.data[2];
    var alpha = imgData.data[3];
    if (green + red + blue < 600) {
        aktuelColor = "red";
        clearInterval(myTimer);
        Death();
    }
    else {
        aktuelColor = "black";
    }
}

function Death(){
    newGame();
}
