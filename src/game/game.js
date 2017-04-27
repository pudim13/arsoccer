var LITTLE_OBJECT = 25;
var MEDIUM_OBJECT = 50;
var LARGE_OBJECT = 75;


var SQUARE_MEDIUM_ID = 12;

function drawSquare(ctx,marker,size) {
  ctx.beginPath();
  ctx.moveTo(marker.x, marker.y);
  ctx.lineTo(marker.x+size, marker.y);
  ctx.lineTo(marker.x+size, marker.y+size);
  ctx.lineTo(marker.x, marker.y+size);
  ctx.lineTo(marker.x, marker.y);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.fillText(marker.id,marker.x+(size/2),marker.y+(size/2));
}

function drawGame(markers) {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'grey';
  ctx.fillRect(0,0,640,480);
  ctx.font = "20px URW Gothic L, Arial, Sans-serif";

  for(var i=0;i<markers.length;i++) {
    if(marker[i].id == SQUARE_MEDIUM_ID) {
      drawSquare(ctx, markers[i], MEDIUM_OBJECT);
    }
  }
  ctx.restore();
}

function startGame() {
    var markers = [];
    detectMarkers(markers);

    drawGame(markers);

    setInterval(gameTick(),1);
}

function gameTick() {

}
