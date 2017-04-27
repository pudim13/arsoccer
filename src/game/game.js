var STD_WIDTH_RECTANGLE = 20;
var SMALL_OBJECT = 25;
var MEDIUM_OBJECT = 50;
var LARGE_OBJECT = 75;

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

function drawGame(markers) {
  var canvas = document.getElementById('gameField');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'grey';
  ctx.fillRect(0,0,640,480);
  ctx.font = "20px URW Gothic L, Arial, Sans-serif";

  for(var i=0;i<markers.length;i++) {
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

function startGame() {
    var markers = [];
    detectMarkers(markers);

    drawGame(markers);

    setInterval(gameTick(),1);
}

function gameTick() {

}
