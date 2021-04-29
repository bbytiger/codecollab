
var mX, mY, draw;
var canvas, ctx;

const clearcanvas = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const down = function(e) {
  draw = 1;
  console.log(e)
  getposition(e)
  drawstroke(ctx, mX, mY)
}

const up = function() {
  draw = 0;
}

const move = function(e) {
  getposition(e)
  var m = e;

  if (draw) {
    drawstroke(ctx, mX, mY)
  }
} 

const drawstroke = function(c, x, y) {
  console.log(x,y)
  //c.fillStyle = "rgba(0,0,0,1)";
  c.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI*2, true);
  c.closePath();
  c.fill();
}

const getposition = function(e) {
  if (e.offsetX && e.offsetY) {
    mX = e.offsetX
    mY = e.offsetY
  }
  else if (e.layerX && e.layerY) {
    mX = e.layerX
    mY = e.layerY
  }
  else if (e.screenX && e.screenY) {
    mX = e.screenX
    mY = e.screenY
  }
  
} 

window.onload = function() {
  canvas = document.getElementById("whiteboard")
  canvas.width = window.innerWidth; // can multiply this to expand the board size
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  if (ctx) {
    canvas.addEventListener('mousedown', down, false);
    canvas.addEventListener('mousemove', move, false);
    canvas.addEventListener('mouseup', up, false);
  } else {
    console.log("unable to access 2d javascript canvas")
  }
}

