function SpeedUp() {
    speed += defaultSpeedIncriment;
}
function SpeedDown() {
    speed -= defaultSpeedIncriment;
}
function doKeyDown(e) {
    if (e.keyCode == 87) //W = forward
    {
        SpeedUp();
    }
    if (e.keyCode == 83) //S = backward
    {
        SpeedDown();
    }
    if (e.keyCode == 65) //A = left
    {
        rotateCar(-defaultRotatValue);
    }
    if (e.keyCode == 68) //D = right
    {
        rotateCar(defaultRotatValue);
    }
}
function forward() {
    var nyPos = lineToAngle(ctx, center.x, center.y, speed, angle);
    center.x = nyPos.x;
    center.y = nyPos.y;
}
function backward() {
    var nyPos = lineToAngle(ctx, center.x, center.y, -1, angle);
    center.x = nyPos.x;
    center.y = nyPos.y;
}
function rotateCar(leftRigth) {
    angle = angle + leftRigth;
    if (angle > 360)
        angle = 0;
}
function lineToAngle(ctx, x1, y1, length, angle) {
    angle *= Math.PI / 180;

    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    return { x: x2, y: y2 };
}
