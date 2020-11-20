const VERSION = 1;

var srcCanvas;
var ctx;
var dstCanvas;
var dstctx;
var screenOffsetX = 0;
var screenOffsetY = 0;
var newGameWidth = 0;
var newGameHeight = 0;
var dscale = 1200 / 900;
var gameScale = 0;

function initGfx() {
    srcCanvas = document.createElement('canvas');
    srcCanvas.width = 1200;
    srcCanvas.height = 900;
    ctx = srcCanvas.getContext('2d');
    dstCanvas = document.getElementById('canvas');
    dstctx = dstCanvas.getContext('2d');
}

function drawScreen() {
    ctx.fillStyle = 0;
    ctx.fillRect(0, 0, 1200, 900);

    // Add drawing code here?

    dstctx.fillStyle = 0;
    dstctx.fillRect(0, 0, dstCanvas.width, dstCanvas.height);
    dstctx.drawImage(srcCanvas, 0, 0, 1200, 900, screenOffsetX, screenOffsetY, newGameWidth, newGameHeight);
    window.requestAnimationFrame(drawScreen);
}

function resizeGame() {
    dstCanvas.width = window.innerWidth;
    dstCanvas.height = window.innerHeight;

    if (dstCanvas.width / dstCanvas.height > dscale) {
        newGameHeight = dstCanvas.height;
        newGameWidth = newGameHeight / 3 * 4;
        gameScale = newGameHeight / 900;
    } else {
        newGameWidth = dstCanvas.width;
        newGameHeight = newGameWidth / 4 * 3;
        gameScale = newGameWidth / 1200;
    }

    screenOffsetX = Math.abs((dstCanvas.width - newGameWidth)) / 2;
    screenOffsetY = Math.abs((dstCanvas.height - newGameHeight)) / 2;
}

function update() {

}

window.onload = function () {
    // Kick everything off!
    initGfx();
    resizeGame();
    drawScreen();
    window.setTimeout(update, 1000 / 60);
    window.addEventListener('resize', resizeGame);
};