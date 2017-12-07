var btn = document.getElementById("play");
var canvas = document.getElementById("mazecanvas");
var context = canvas.getContext("2d");
var currRectX = 425;
var currRectY = 3;
var mazeWidth = 556;
var mazeHeight = 556;
var intervalVar;
var display = document.querySelector("#mazecanvas");
var modal;  
var score = 1000;

function play() {
  function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function() {
      context.drawImage(mazeImg, 0, 0);
      drawRectangle(rectX, rectY, "#0000FF");
      context.beginPath();
      context.arc(283, 550, 7, 0, 2 * Math.PI, false);
      context.closePath();
      context.fillStyle = "#00FF00";
      context.fill();
    };
    mazeImg.src = "img-maze/maze6.gif";
  }

  function drawRectangle(x, y, style) {
    makeWhite(currRectX, currRectY, 15, 15);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = style;
    context.fill();
  }

  function moveRect(e) {
    var newX;
    var newY;
    var movingAllowed;
    e = e || window.event;
    switch (e.keyCode) {
      case 38: 
      case 87: 
        newX = currRectX;
        newY = currRectY - 3;
        break;
      case 37: 
      case 65: 
        newX = currRectX - 3;
        newY = currRectY;
        break;
      case 40: 
      case 83: 
        newX = currRectX;
        newY = currRectY + 3;
        break;
      case 39: 
      case 68: 
        newX = currRectX + 3;
        newY = currRectY;
        break;
      default:
        return;
    }
    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) {

      drawRectangle(newX, newY, "#0000FF");
      currRectX = newX;
      currRectY = newY;
    } else if (movingAllowed === 2) {
    
      clearInterval(intervalVar);
      
      makeWhite(0, 0, canvas.width, canvas.height);
      context.font = "40px Arial";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
      console.log(score);
      window.removeEventListener("keydown", moveRect, true);
      
      $('#score').val(score).toString();
     
      $('#myModal').modal();
      score = 1000;
    }

  }

  function canMoveTo(destX, destY) {
    var imgData = context.getImageData(destX, destY, 15, 15);
    var data = imgData.data;
    var canMove = 1; 
    if (
      destX >= 0 &&
      destX <= mazeWidth - 15 &&
      destY >= 0 &&
      destY <= mazeHeight - 15
    ) {
      for (var i = 0; i < 4 * 15 * 15; i += 4) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
         
          canMove = 0;
          break;
        } else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) {
          
          canMove = 2;
          break;
        }
      }
    } else {
      canMove = 0;
    }
    return canMove;
  }

  function createTimer(seconds) {
    intervalVar = setInterval(function() {
      makeWhite(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);

      if (seconds === 0) {
        clearInterval(intervalVar);
        window.removeEventListener("keydown", moveRect, true);
        makeWhite(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Time's up!", canvas.width / 2, canvas.height / 2);
        return;
      }

      context.font = "20px Arial";
      if (seconds <= 10 && seconds > 5) {
        context.fillStyle = "orangered";
      } else if (seconds <= 5) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "green";
      }
      context.textAlign = "center";
      context.textBaseline = "middle";
      var minutes = Math.floor(seconds / 60);
      var secondsToShow = (seconds - minutes * 60).toString();
      if (secondsToShow.length === 1) {
        secondsToShow = "0" + secondsToShow; 
     
      }
      context.fillText(
        minutes.toString() + ":" + secondsToShow,
        mazeWidth + 30,
        canvas.height / 2
      );
      score--;
      seconds--;
      
    }, 1000);

  }

  function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
  }
  drawMazeAndRectangle(307, 23);
  window.addEventListener("keydown", moveRect, true);
  createTimer(120);


  console.log(score);
}
btn.onclick = function() {
  modal.style.display = "none";
  var maze = document.getElementById("img-maze");
  maze.innerHTML = '';
  display.style.display = "block";
  play();
};
