var STD_WIDTH_RECTANGLE = 20;
var SMALL_OBJECT = 25;
var MEDIUM_OBJECT = 50;
var LARGE_OBJECT = 75;

var GOAL_HEIGHT = 160;
var BALL_SIZE = 30;
var BALL_COLOR = "white";
var FIELD_TYPE = "grass";

//replace with original value 150, 500 only for tests
var MAX_DISTANCE_PLAY = 150;

var PLAYER_ONE_ID = 0;
var PLAYER_TWO_ID = 1;
var STANDARD_BALL = 2;
var GOAL_ONE_ID = 3;
var GOAL_TWO_ID = 4;
var GRASS_FIELD_ID = 5;
var SNOW_FIELD_ID = 6;
var EARTH_FIELD_ID = 7;
var WHITE_BALL_ID = 8;
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

var GRASS_FRICTION = 0.90;
var SNOW_FRICTION = 0.92;
var EARTH_FRICTION = 0.88;

var BLACK_BALL_SIZE = 25;
var WHITE_BALL_SIZE = 30;
var ORANGE_BALL_SIZE = 35;

var FRICTION = 0.90;
var EPSILON = 0.05;

var AXIS_X = 640;
var AXIS_Y = 480;

var PLAYER_ONE_NAME = "Yellow";
var PLAYER_TWO_NAME = "Purple";

var HIDE_CANVAS = false;

var time = new Date().getTime();
var markers = [];
var ball = {};
var score = {playerOne: 0,
             playerTwo: 0};

var actualPlayerTurn = PLAYER_ONE_ID;

function drawSquare(ctx,marker,size) {
  ctx.beginPath();
  ctx.moveTo(marker.x-size/2, marker.y-size/2);
  ctx.lineTo(marker.x+size/2, marker.y-size/2);
  ctx.lineTo(marker.x+size/2, marker.y+size/2);
  ctx.lineTo(marker.x-size/2, marker.y+size/2);
  ctx.lineTo(marker.x-size/2, marker.y-size/2);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawCircle(ctx,marker,size, color) {
  ctx.beginPath();
  ctx.arc(marker.x,marker.y,size/2,0,2*Math.PI);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if(color!=="black") {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
  }
  else {
    ctx.fillStyle = "dark-gray";
    ctx.strokeStyle = "dark-gray";
  }
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawRadius(ctx,marker,size, color) {
  ctx.beginPath();
  ctx.arc(marker.x,marker.y,size,0,2*Math.PI);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawRectangle(ctx,marker,size) {
  ctx.beginPath();
  ctx.moveTo(marker.x-STD_WIDTH_RECTANGLE/2, marker.y-size/2);
  ctx.lineTo(marker.x+STD_WIDTH_RECTANGLE/2, marker.y-size/2);
  ctx.lineTo(marker.x+STD_WIDTH_RECTANGLE/2, marker.y+size/2);
  ctx.lineTo(marker.x-STD_WIDTH_RECTANGLE/2, marker.y+size/2);
  ctx.lineTo(marker.x-STD_WIDTH_RECTANGLE/2, marker.y-size/2);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawGoal(ctx,marker,player) {
  ctx.beginPath();
  var tamX = 4;
  var goalX = player == GOAL_ONE_ID ? 0 : AXIS_X-tamX;

  ctx.moveTo(goalX, marker.y-GOAL_HEIGHT/2);
  ctx.lineTo(goalX+tamX, marker.y-GOAL_HEIGHT/2);
  ctx.lineTo(goalX+tamX, marker.y+GOAL_HEIGHT/2);
  ctx.lineTo(goalX, marker.y+GOAL_HEIGHT/2);
  ctx.lineTo(goalX, marker.y-GOAL_HEIGHT/2);
  ctx.closePath();
  ctx.lineWidth=5;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function drawGame() {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');

  var img=document.getElementById(FIELD_TYPE);
  if(HIDE_CANVAS) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, AXIS_Y);
    ctx.lineTo(AXIS_X, AXIS_Y);
    ctx.lineTo(AXIS_X, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    return;
  }
  ctx.drawImage(img,0,0,AXIS_X,AXIS_Y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, AXIS_Y);
  ctx.lineTo(AXIS_X, AXIS_Y);
  ctx.lineTo(AXIS_X, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.setLineDash([5, 5]);

  ctx.beginPath();
  ctx.moveTo(0.2*AXIS_X, 0);
  ctx.lineTo(0.2*AXIS_X, AXIS_Y);
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(220,220,220,0.5)';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.4*AXIS_X, 0);
  ctx.lineTo(0.4*AXIS_X, AXIS_Y);
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(220,220,220,0.5)';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.6*AXIS_X, 0);
  ctx.lineTo(0.6*AXIS_X, AXIS_Y);
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(220,220,220,0.5)';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0.8*AXIS_X, 0);
  ctx.lineTo(0.8*AXIS_X, AXIS_Y);
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(220,220,220,0.5)';
  ctx.stroke();

  ctx.font = "20px URW Gothic L, Arial, Sans-serif";

  if(ball.vx==0 && ball.vy==0) {
    drawRadius(ctx,ball,MAX_DISTANCE_PLAY,'red');
  }

  ctx.setLineDash([]);

  drawCircle(ctx,ball,BALL_SIZE,BALL_COLOR);

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
    //DRAWING CIRCLES
    if(markers[i].id == CIRCLE_SMALL_ID) {
      drawCircle(ctx, markers[i], SMALL_OBJECT, 'red');
    }
    if(markers[i].id == CIRCLE_MEDIUM_ID) {
      drawCircle(ctx, markers[i], MEDIUM_OBJECT, 'red');
    }
    if(markers[i].id == CIRCLE_LARGE_ID) {
      drawCircle(ctx, markers[i], LARGE_OBJECT, 'red');
    }

    //DRAWING GOALS
    if(markers[i].id == GOAL_ONE_ID || markers[i].id == GOAL_TWO_ID) {
      drawGoal(ctx, markers[i], markers[i].id);
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

        if(markers[i].x + MEDIUM_OBJECT/2  > (AXIS_X/5)*2) {
            showMessage("Jogador 1 posicionado fora da area valida!",true);
            return false;
        }
      }
      if(markers[i].id == PLAYER_TWO_ID) {
         hasPlayer2 = true;

         if(markers[i].x - MEDIUM_OBJECT/2  < AXIS_X - ((AXIS_X/5)*2) ) {
             showMessage("Jogador 2 posicionado fora da area valida!",true);
             return false;
         }
      }
      if(markers[i].id == STANDARD_BALL) {
         hasBall = true;

         if(markers[i].x - BALL_SIZE/2  < (AXIS_X/5)*2 ||
            markers[i].x + BALL_SIZE/2  > (AXIS_X/5)*3 ) {
             showMessage("Bola fora da area valida!",true);
             return false;
         }

         $.extend(true,ball, markers[i]);
      }
      if(markers[i].id == GOAL_ONE_ID) {
         hasGoal1 = true;

         if(markers[i].x + MEDIUM_OBJECT/2  > (AXIS_X/5)) {
             showMessage("Gol do Jogador 1 posicionado fora da area valida!",true);
             return false;
         }
      }
      if(markers[i].id == GOAL_TWO_ID) {
         hasGoal2 = true;

         if(markers[i].x - MEDIUM_OBJECT/2  < AXIS_X - (AXIS_X/5) ) {
             showMessage("Gol do Jogador 2 posicionado fora da area valida!",true);
             return false;
         }
      }

      if(markers[i].id == GRASS_FIELD_ID) {
          FIELD_TYPE = "grass";
          FRICTION = GRASS_FRICTION;
      }
      if(markers[i].id == SNOW_FIELD_ID) {
          FIELD_TYPE = "snow";
          FRICTION = SNOW_FRICTION;
      }
      if(markers[i].id == EARTH_FIELD_ID) {
          FIELD_TYPE = "earth";
          FRICTION = EARTH_FRICTION;
      }

      if(markers[i].id == WHITE_BALL_ID) {
          BALL_COLOR = "white";
          BALL_SIZE = WHITE_BALL_SIZE;
      }
      if(markers[i].id == BLACK_BALL_ID) {
          BALL_COLOR = "black";
          BALL_SIZE = BLACK_BALL_SIZE;
      }
      if(markers[i].id == ORANGE_BALL_ID) {
          BALL_COLOR = "orange";
          BALL_SIZE = ORANGE_BALL_SIZE;
      }
    }

    if(!hasBall) {
      showMessage("Nao foi encontrada bola no cenario",true);
      return false;
    }

    if(!hasGoal1) {
      showMessage("Nao foi encontrado gol do jogador " + PLAYER_ONE_NAME,true);
      return false;
    }

    if(!hasGoal2) {
      showMessage("Nao foi encontrado gol do jogador " + PLAYER_TWO_NAME ,true);
      return false;
    }

    if(!hasPlayer1) {
      showMessage("Nao foi encontrado jogador " + PLAYER_ONE_NAME,true);
      return false;
    }

    if(!hasPlayer2) {
      showMessage("Nao foi encontrado jogador " + PLAYER_TWO_NAME,true);
      return false;
    }

    return true;
}

function showMessage(message,error,goal) {
    if(goal===0 || goal===1) {
      document.getElementById("goalSpan").style = 'color:' + (goal == PLAYER_ONE_ID ? 'yellow;' : 'purple;');
      document.getElementById("goalSpan").innerHTML = 'G';
      for(var i=0;i<13;i++) {
        setTimeout(function(i){document.getElementById("goalSpan").innerHTML = document.getElementById("goalSpan").innerHTML + (document.getElementById("goalSpan").innerHTML.length%2==0 ? 'o':'O')},i*100);
      }
      setTimeout(function(){document.getElementById("goalSpan").innerHTML = document.getElementById("goalSpan").innerHTML + 'L!!!'},1300);
      setTimeout(function(){document.getElementById("goalSpan").innerHTML =''},2000);
    } else {
      document.getElementById("messageSpan").style = 'color:' + (error ? 'red;' : 'white;');
      document.getElementById("messageSpan").innerHTML = message;
      setTimeout(function(){document.getElementById("messageSpan").innerHTML =''},2000);
    }
}

function player1Play() {
  var newMarkers = [];
  detectMarkers(newMarkers);

    for(var i=0;i<newMarkers.length;i++) {
      if(newMarkers[i].id == PLAYER_ONE_ID) {
        for(var j=0;j<markers.length;j++) {
           if(markers[j].id == newMarkers[i].id) {
              markers[j].x = newMarkers[i].x;
              markers[j].y = newMarkers[i].y;
           }
        }
        var fX = ball.x - newMarkers[i].x;
        var fY = ball.y - newMarkers[i].y;
        var mod = Math.sqrt((fX*fX) + (fY*fY));
        if(mod > MAX_DISTANCE_PLAY+BALL_SIZE) {
          showMessage("Jogador " + PLAYER_ONE_NAME + " muito longe da bola, reposicione!", true);
        } else {
          ball.ax = fX/75;
          ball.ay = fY/75;

          $('#play1').prop("disabled",true);
          $('#play2').prop("disabled",false);
          actualPlayerTurn = PLAYER_TWO_ID;
        }
      }
    }
}

function player2Play() {
    var newMarkers = [];
    detectMarkers(newMarkers);

    for(var i=0;i<newMarkers.length;i++) {
      if(newMarkers[i].id == PLAYER_TWO_ID) {
        for(var j=0;j<markers.length;j++) {
           if(markers[j].id == newMarkers[i].id) {
              markers[j].x = newMarkers[i].x;
              markers[j].y = newMarkers[i].y;
           }
        }
        var fX = ball.x - newMarkers[i].x;
        var fY = ball.y - newMarkers[i].y;
        var mod = Math.sqrt((fX*fX) + (fY*fY));
        if(mod > MAX_DISTANCE_PLAY+BALL_SIZE) {
          showMessage("Jogador " + PLAYER_TWO_NAME + " muito longe da bola, reposicione!", true);
        } else {
          ball.ax = fX/50;
          ball.ay = fY/50;

          $('#play2').prop("disabled",true);
          $('#play1').prop("disabled",false);
          actualPlayerTurn = PLAYER_ONE_ID;
        }
      }
    }
}

function startGame() {
    detectMarkers(markers);

    if(validMarkers(markers)) {
       $('#startButton').prop("disabled",true);

       if(actualPlayerTurn == PLAYER_TWO_ID) {
         $('#play1').prop("disabled",true);
         $('#play2').prop("disabled",false);
       } else {
         $('#play1').prop("disabled",false);
         $('#play2').prop("disabled",true);
       }


       showMessage("Jogador " + (actualPlayerTurn == PLAYER_TWO_ID ? PLAYER_TWO_NAME:PLAYER_ONE_NAME) + ", posicione o jogador e dispare a jogada", true);
    }

    setInterval(gameTick,1);
}

function gameTick() {
    if(new Date().getTime()-time>17) {
        verifyCollision();
        calculateNextPosition();
        drawGame();

        time = new Date().getTime();
    }
}

function verifyCollision() {
  for(var i=0;i<markers.length;i++) {
    var posX=9999999;
    var posY=9999999;
    var tam;

    //COLISAO COM JOGADORES
    if(markers[i].id == PLAYER_ONE_ID || markers[i].id == PLAYER_TWO_ID) {
      posX = markers[i].x;
      posY = markers[i].y;
      tam = MEDIUM_OBJECT/2;
    }

    //COLISAO COM RETANGULOS
    if(markers[i].id == RECTANGLE_SMALL_ID || markers[i].id == SQUARE_SMALL_ID  || markers[i].id == CIRCLE_SMALL_ID ) {
      posX = markers[i].x;
      posY = markers[i].y;
      tam = SMALL_OBJECT/2;
    }

    //COLISAO COM QUADRADOS
    if(markers[i].id == RECTANGLE_MEDIUM_ID || markers[i].id == SQUARE_MEDIUM_ID || markers[i].id == CIRCLE_MEDIUM_ID ) {
      posX = markers[i].x;
      posY = markers[i].y;
      tam = MEDIUM_OBJECT/2;
    }

    //COLISAO COM CIRCULOS
    if(markers[i].id == RECTANGLE_LARGE_ID || markers[i].id == SQUARE_LARGE_ID || markers[i].id == CIRCLE_LARGE_ID ) {
      posX = markers[i].x;
      posY = markers[i].y;
      tam = LARGE_OBJECT/2;
    }

    //COLISAO COM O GOL
    if(markers[i].id == GOAL_TWO_ID && ball.x > AXIS_X-BALL_SIZE/2 && ball.y-BALL_SIZE/2 > markers[i].y-GOAL_HEIGHT/2 && ball.y+BALL_SIZE/2 < markers[i].y+GOAL_HEIGHT/2) {
      disparaEventoGolJogador(PLAYER_ONE_ID);
      break;
    }

    if (markers[i].id == GOAL_ONE_ID && ball.x < 0+BALL_SIZE/2 && ball.y-BALL_SIZE/2 > markers[i].y-GOAL_HEIGHT/2 && ball.y+BALL_SIZE/2 < markers[i].y+GOAL_HEIGHT/2) {
      disparaEventoGolJogador(PLAYER_TWO_ID);
      break;
    }

    var vecX = ball.x - posX;
    var vecY = ball.y - posY;
    var modulo = Math.sqrt(vecX*vecX + vecY*vecY);
    if(modulo<=(tam+BALL_SIZE/2)) {
      modA = Math.sqrt(ball.ax*ball.ax + ball.ay*ball.ay);
      modV = Math.sqrt(ball.vx*ball.vx + ball.vy*ball.vy);
      ball.vx = modV * (vecX/modulo);
      ball.vy = modV * (vecY/modulo);
      ball.ax = modA * (vecX/modulo);
      ball.ay = modA * (vecY/modulo);
      break;
    }

  }

  //COLISAO COM O CAMPO
  if(ball.x > AXIS_X-BALL_SIZE/2) {
    ball.x = AXIS_X-BALL_SIZE/2;
    ball.vx = -ball.vx;
    ball.ax = -ball.ax;
  }
  if(ball.x < BALL_SIZE/2) {
    ball.x = BALL_SIZE/2;
    ball.vx = -ball.vx;
    ball.ax = -ball.ax;
  }
  if(ball.y > AXIS_Y-BALL_SIZE/2) {
    ball.y = AXIS_Y-BALL_SIZE/2;
    ball.vy = -ball.vy;
    ball.ay = -ball.ay;
  }
  if(ball.y < BALL_SIZE/2) {
    ball.y = BALL_SIZE/2;
    ball.vy = -ball.vy;
    ball.ay = -ball.ay;
  }

}

function disparaEventoGolJogador(playerId) {
    if(playerId == PLAYER_ONE_ID) {
        score.playerOne++;
    }
    else if(playerId == PLAYER_TWO_ID) {
        score.playerTwo++;
    }
    showMessage("Goooll!", false, playerId);
    ball.x = 320;
    ball.y = 240;
    ball.vx = 0;
    ball.vy = 0;
    ball.ax = 0;
    ball.ay = 0;

    updateScore();
    $('#startButton').prop("disabled",false);
    $('#play1').prop("disabled",true);
    $('#play2').prop("disabled",true);

    actualPlayerTurn = (playerId == PLAYER_TWO_ID ? PLAYER_ONE_ID : PLAYER_TWO_ID);
}

function updateScore() {
      $('#scorePlayerOne').text(score.playerOne);
      $('#scorePlayerTwo').text(score.playerTwo);
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
