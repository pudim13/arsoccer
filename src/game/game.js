function drawGame(markers) {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'grey';
  ctx.fillRect(0,0,640,480);
  ctx.font = "25px URW Gothic L, Arial, Sans-serif";

  for(var i=0;i<markers.length;i++) {
    ctx.beginPath();
    ctx.moveTo(markers[i].x, markers[i].y);
    ctx.lineTo(markers[i].x+50, markers[i].y);
    ctx.lineTo(markers[i].x+50, markers[i].y+50);
    ctx.lineTo(markers[i].x, markers[i].y+50);
    ctx.lineTo(markers[i].x, markers[i].y);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillText(markers[i].id,markers[i].x+25,markers[i].y+25);
  }
  ctx.restore();
}

function startGame() {
    var markers = [];
    detectMarkers(markers);

    drawGame(markers);
}
