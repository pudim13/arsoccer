var STD_WIDTH_RECTANGLE = 20;
var SMALL_OBJECT = 25;
var MEDIUM_OBJECT = 50;
var LARGE_OBJECT = 75;

var BALL_SIZE = 30;
var MAX_DISTANCE_PLAY = 75;

var PLAYER_ONE_ID = 0;
var PLAYER_TWO_ID = 1;
var STANDARD_BALL = 2;
var GOAL_ONE_ID = 3;
var GOAL_TWO_ID = 4;
var GREEN_FIELD_ID = 5;
var WHITE_FIELD_ID = 6;
var BROWN_FIELD_ID = 7;
var GRAY_BALL_ID = 8;
var BLACK_BALL_ID = 9;
var ORANGE_BALL_ID=10;
var RECTANGLE_SMALL_ID = 11;
var RECTANGLE_MEDIUM_ID = 12;
var RECTANGLE_LARGE_ID = 13;
var CIRCLE_SMALL_ID = 14;
var CIRCLE_MEDIUM_ID = 15;
var CIRCLE_LARGE_ID = 16;
var SQUARE_SMALL_ID = 17;
var SQUARE_MEDIUM_ID = 18;
var SQUARE_LARGE_ID = 19;

var FRICTION = 0.90;
var EPSILON = 0.05;

var time = new Date().getTime();
var markers = [];
var ball = {};

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

function drawCircle(ctx,marker,size, color) {
  ctx.beginPath();
  ctx.arc(marker.x,marker.y,size/2,0,2*Math.PI);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRadius(ctx,marker,size, color) {
  ctx.beginPath();
  ctx.arc(marker.x,marker.y,size,0,2*Math.PI);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawRectangle(ctx,marker,size) {
  ctx.beginPath();
  ctx.moveTo(marker.x, marker.y);
  ctx.lineTo(marker.x+STD_WIDTH_RECTANGLE, marker.y);
  ctx.lineTo(marker.x+STD_WIDTH_RECTANGLE, marker.y+size);
  ctx.lineTo(marker.x, marker.y+size);
  ctx.lineTo(marker.x, marker.y);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.fillText(marker.id,marker.x+(STD_WIDTH_RECTANGLE/2),marker.y+(size/2));
}

function drawGoal(ctx,marker) {
  ctx.beginPath();
  ctx.moveTo(marker.x, marker.y);
  ctx.lineTo(marker.x+50, marker.y);
  ctx.lineTo(marker.x+50, marker.y+160);
  ctx.lineTo(marker.x, marker.y+160);
  ctx.lineTo(marker.x, marker.y);
  ctx.closePath();
  ctx.fillStyle = "blue";
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.fillText(marker.id,marker.x,marker.y+80);
}

function drawGame() {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');

  var img=document.getElementById("grass");
  ctx.drawImage(img,0,0,640,480);

  ctx.font = "20px URW Gothic L, Arial, Sans-serif";

  drawCircle(ctx,ball,BALL_SIZE,'white');
  drawRadius(ctx,ball,MAX_DISTANCE_PLAY,'red');

  for(var i=0;i<markers.length;i++) {
    //DRAWING PLAYERS
    if(markers[i].id == PLAYER_ONE_ID) {
      drawCircle(ctx, markers[i], MEDIUM_OBJECT, 'yellow');
    }
    if(markers[i].id == PLAYER_TWO_ID) {
      drawCircle(ctx, markers[i], MEDIUM_OBJECT, 'purple');
    }

    //DRAWING SQUARES
    if(markers[i].id == SQUARE_SMALL_ID) {
      drawSquare(ctx, markers[i], SMALL_OBJECT);
    }
    if(markers[i].id == SQUARE_MEDIUM_ID) {
      drawSquare(ctx, markers[i], MEDIUM_OBJECT);
    }
    if(markers[i].id == SQUARE_LARGE_ID) {
      drawSquare(ctx, markers[i], LARGE_OBJECT);
    }
    //DRAWING RECTANGLES
    if(markers[i].id == RECTANGLE_SMALL_ID) {
      drawRectangle(ctx, markers[i], SMALL_OBJECT);
    }
    if(markers[i].id == RECTANGLE_MEDIUM_ID) {
      drawRectangle(ctx, markers[i], MEDIUM_OBJECT);
    }
    if(markers[i].id == RECTANGLE_LARGE_ID) {
      drawRectangle(ctx, markers[i], LARGE_OBJECT);
    }
    //DRAWING GOALS
    if(markers[i].id == GOAL_ONE_ID) {
      drawGoal(ctx, markers[i]);
    }
    if(markers[i].id == GOAL_TWO_ID) {
      drawGoal(ctx, markers[i]);
    }
  }
  ctx.restore();
}

function validMarkers(markers) {
    var hasBall = false;
    var hasPlayer1 = false;
    var hasPlayer2 = false;
    var hasGoal1 = false;
    var hasGoal2 = false;

    for(var i=0;i<markers.length;i++) {
      if(markers[i].id == PLAYER_ONE_ID) {
        hasPlayer1 = true;
      }
      if(markers[i].id == PLAYER_TWO_ID) {
         hasPlayer2 = true;
      }
      if(markers[i].id == STANDARD_BALL) {
         hasBall = true;
         $.extend(true,ball, markers[i]);
      }
      if(markers[i].id == GOAL_ONE_ID) {
         hasGoal1 = true;
      }
      if(markers[i].id == GOAL_TWO_ID) {
         hasGoal2 = true;
      }
    }

    if(!hasBall) {
      showMessage("Nao foi encontrada bola no cenario",true);
      return false;
    }

    if(!hasGoal1) {
      showMessage("Nao foi encontrado gol 1",true);
      return false;
    }

    if(!hasGoal2) {
      showMessage("Nao foi encontrado gol 2",true);
      return false;
    }

    if(!hasPlayer1) {
      showMessage("Nao foi encontrado primeiro jogador",true);
      return false;
    }

    if(!hasPlayer2) {
      showMessage("Nao foi encontrado segundo jogador",true);
      return false;
    }

    return true;
}

function showMessage(message,error) {
    alert(message);
}

function player1Play() {
    var newMarkers = [];
    detectMarkers(newMarkers);

    for(var i=0;i<newMarkers.length;i++) {
      if(newMarkers[i].id == PLAYER_ONE_ID) {
        var fX = ball.x - newMarkers[i].x;
        var fY = ball.y - newMarkers[i].y;
        var mod = Math.sqrt((fX*fX) + (fY*fY));
        if(mod > MAX_DISTANCE_PLAY) {
          showMessage("Jogador 1 muito longe da bola("+mod+"), reposicione", true);
        } else {
          ball.ax = fX/100;
          ball.ay = fY/100;

          $('#play1').prop("disabled",true);
          $('#play2').prop("disabled",false);
        }
      }
    }
}

function startGame() {
    detectMarkers(markers);
    if(validMarkers(markers)) {
       $('#startButton').prop("disabled",true);
       $('#play1').prop("disabled",false);

       showMessage("Jogador 1, posicione o jogador e dispare a jogada", true);
    }

    setInterval(gameTick,1);
}

function gameTick() {
    if(new Date().getTime()-time>17) {
        calculateNextPosition();
        drawGame();

        time = new Date().getTime();
    }
}

function calculateNextPosition() {
        if(ball.ax) {
           if(Math.abs(ball.ax)<EPSILON) {
              ball.ax = 0;
           }
           ball.vx += ball.ax;
           ball.ax = FRICTION*ball.ax;
        }
        if(ball.ay) {
            if(Math.abs(ball.ay)<EPSILON) {
              ball.ay = 0;
            }
            ball.vy += ball.ay;
            ball.ay = FRICTION*ball.ay;
        }
        if(ball.vx) {
            if(Math.abs(ball.vx)<EPSILON) {
              ball.vx = 0;
            }
            ball.x += ball.vx;
            ball.vx = FRICTION*ball.vx ;
        }
        if(ball.vy) {
            if(Math.abs(ball.vy)<EPSILON) {
              ball.vy = 0;
            }
            ball.y += ball.vy;
            ball.vy = FRICTION*ball.vy;
        }
}
