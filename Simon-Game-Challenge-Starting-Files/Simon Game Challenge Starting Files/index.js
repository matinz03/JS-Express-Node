var pad = [];
var user = [];
var start = false;
var level = 0;
var over = false;
$(document).keydown(function () {
  if (!start) {
    $("h1").text("Press Any key to start");
    gameplay();
  }
  start = true;
});
function gameplay() {
  user = [];
  level++;
  $("h1").text("current level --> " + level);
  var num = Math.ceil(Math.random() * 4);
  posh(num);
  sound(pad, pad.length - 1);
  game(pad.length - 1, 0);
  console.log(pad);
}
$(".btn").click(function () {
  user.push($(this).attr("id"));
  sound(user, user.length - 1);
  game(user.length - 1, 1);
  checkAnswer(user.length - 1);
});
function checkAnswer(currentLevel) {
  if (user[currentLevel] === pad[currentLevel]) {
    console.log("success");
    if (user.length === pad.length) {
      setTimeout(function () {
        gameplay();
      }, 1000);
    }
  } else {
    console.log("wrong");
    startOver();
  }
}
function startOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("GameOver !!! Press Any Key to Restart");
  level = 0;
  pad = [];
  start = false;
}
console.log(user);
function sound(source, i) {
  var audio = new Audio("sounds/" + source[i] + ".mp3");
  audio.play();
}
function game(length, call) {
  if (call == 1) {
    var element = $("#" + user[length]);
    element.addClass("pressed");
    setTimeout(function () {
      element.removeClass("pressed");
    }, 500);
  } else {
    var element = $("#" + pad[length]);
    element.fadeIn(100).fadeOut(100).fadeIn(100);
  }
}

function posh(num) {
  switch (num) {
    case 1:
      pad.push("red");
      break;
    case 2:
      pad.push("blue");
      break;
    case 3:
      pad.push("yellow");
      break;
    case 4:
      pad.push("green");
      break;

    default:
      alert("Boh");
      break;
  }
}
