
var AXIS_X = 640;
var AXIS_Y = 480;

window.onload = function() {

  document.body.addEventListener('mouseup', function (e){
      if(e.button === 0){
          if(actualPlayerTurn == PLAYER_ONE_ID) {
            HIDE_CANVAS = true;
            setTimeout(function(){player1Play(); HIDE_CANVAS = false;},500);
          } else {
            HIDE_CANVAS = true;
            setTimeout(function(){player2Play(); HIDE_CANVAS = false;},500);
          }
      }
      else if(e.button === 1){
          HIDE_CANVAS = true;
          setTimeout(function(){startGame(); HIDE_CANVAS = false;},500);
      }
  }, false);

  var video = document.createElement('video');

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
  }

  video.width = AXIS_X;
  video.height = AXIS_Y;
  video.loop = true;
  video.volume = 0;
  video.controls = true;
  //video.style = 'display:none';
  document.body.appendChild(video);

  var canvas = document.createElement('canvas');
  canvas.width = AXIS_X;
  canvas.height = AXIS_Y;
  canvas.style = 'display:none';
  var raster = new NyARRgbRaster_Canvas2D(canvas);
  document.body.appendChild(canvas);

  var param = new FLARParam(AXIS_X,AXIS_Y);
  var pmat = mat4.identity();
  param.copyCameraMatrix(pmat, 100, 10000);

  var resultMat = new NyARTransMatResult();

  var detector = new FLARMultiIdMarkerDetector(param, 2);
  detector.setContinueMode(true);
  var frame = 0;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,AXIS_X,AXIS_Y);
  ctx.font = "24px URW Gothic L, Arial, Sans-serif";

  var times = [];
  var pastResults = {};

  function updateCanvas(ctx, video) {
    //replace mock with video after tests
    var mock = document.getElementById('mock');
    ctx.drawImage(video, 0,0,AXIS_X,AXIS_Y);
  }

  window.detectMarkers = function detectMarkers(markers) {
    while(markers.length > 0) {
      markers.pop();
    }
    updateCanvas(ctx, video);
    canvas.changed = true;
    var detected = detector.detectMarkerLite(raster, 100);
    pastResults = [];
    for (var idx = 0; idx<detected; idx++) {
      var id = detector.getIdMarkerData(idx);
      var currId;
      if (id.packetLength > 4) {
        currId = -1;
      }else{
        currId=0;
        for (var i = 0; i < id.packetLength; i++ ) {
          currId = (currId << 8) | id.getPacketData(i);
        }
      }
      pastResults[currId] = {};

      detector.getTransformMatrix(idx, resultMat);
      var mat = resultMat;
      var cm = mat4.create();
      cm[0] = mat.m00;
      cm[1] = -mat.m10;
      cm[2] = mat.m20;
      cm[3] = 0;
      cm[4] = mat.m01;
      cm[5] = -mat.m11;
      cm[6] = mat.m21;
      cm[7] = 0;
      cm[8] = -mat.m02;
      cm[9] = mat.m12;
      cm[10] = -mat.m22;
      cm[11] = 0;
      cm[12] = mat.m03;
      cm[13] = -mat.m13;
      cm[14] = mat.m23;
      cm[15] = 1;
      mat4.multiply(pmat, cm, cm);
      pastResults[currId].transform = cm;
    }

    var w2 = AXIS_X/2;
    var h2 = AXIS_Y/2;

    for (var i in pastResults) {
      if(isNaN(i)) {
        continue;
      }
      var mat = pastResults[i].transform;
      var verts = [
        vec4.create(-0.05, -0.05, 0, 1),
        vec4.create(0.05, -0.05, 0, 1),
        vec4.create(0.05, 0.05, 0, 1),
        vec4.create(-0.05, 0.05, 0, 1) ];
      ctx.save();

      var v = {};
      jQuery.extend(true, v, verts[0]);
      mat4.multiplyVec4(mat, v);
      v[0] = v[0]*w2/v[3] + w2;
      v[1] = -v[1]*h2/v[3] + h2;

      console.log('Meu ID: ' + i + ', Meu X=' + v[0] + ' Y=' + v[1]);
      markers.push({
        id: i,
        x: v[0]+13,
        y: v[1]+13,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0
      });

        ctx.beginPath();
          verts.forEach(function(v,i) {
            mat4.multiplyVec4(mat, v);
            v[0] = v[0]*w2/v[3] + w2;
            v[1] = -v[1]*h2/v[3] + h2;
            if (i) {
              ctx.lineTo(v[0], v[1]);
            } else {
              ctx.moveTo(v[0], v[1]);
            }
          });
        ctx.closePath()
        ctx.fillStyle = "red";
        ctx.fill();
      ctx.restore();
    }
  }

}
