var LITTLE_OBJECT = 25;
var MEDIUM_OBJECT = 50;
var LARGE_OBJECT = 75;

var SQUARE_MEDIUM_ID = 12;

var FRICTION = 0.01;

var time = new Date().getTime();
var markers = [];

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

function drawGame() {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');
  //ctx.fillStyle = 'grey';
  //ctx.fillRect(0,0,640,480);

  var img=document.getElementById("grass");
  ctx.drawImage(img,0,0,640,480);

  ctx.font = "20px URW Gothic L, Arial, Sans-serif";

  for(var i=0;i<markers.length;i++) {
    //if(marker[i].id == SQUARE_MEDIUM_ID) {
      drawSquare(ctx, markers[i], MEDIUM_OBJECT);
    //}
  }
  ctx.restore();
}

function startGame() {
    detectMarkers(markers);

    setInterval(gameTick,1);
}

function gameTick(markers) {
    if(new Date().getTime()-time>17) {
        calculateNextPosition();
        drawGame();

        time = new Date().getTime();
    }
}

function calculateNextPosition() {
    for(var i=0;i<markers.length;i++) {
        if(markers[i].ax) {
           if(Math.abs(markers[i].ax)<FRICTION*10) {
              markers[i].ax = 0;
           }
           markers[i].vx += markers[i].ax;
           markers[i].ax -= FRICTION;
        }
        if(markers[i].ay) {
            if(Math.abs(markers[i].ay)<FRICTION*10) {
              markers[i].ay = 0;
            }
            markers[i].vy += markers[i].ay;
            markers[i].ay -= FRICTION;
        }
        if(markers[i].vx) {
            if(Math.abs(markers[i].vx)<FRICTION*10) {
              markers[i].vx = 0;
            }
            markers[i].x += markers[i].vx;
            markers[i].vx -= FRICTION;
        }
        if(markers[i].vy) {
            if(Math.abs(markers[i].vy)<FRICTION*10) {
              markers[i].vy = 0;
            }
            markers[i].y += markers[i].vy;
            markers[i].vy -= FRICTION;
        }
    }
}
