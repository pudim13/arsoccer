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
    drawSquare(ctx, markers[i], 50);
  }
  ctx.restore();
}

function startGame() {
    var markers = [];
    detectMarkers(markers);

    drawGame(markers);
}
