
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;



$(document).keydown(function() {
  if(!started)
{
  $("#level-title").text("level " + level);
  nextSequence();
  started = true;
}
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatedPress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

 userClickedPattern = [];
 var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColor = buttonColours[randomNumber];
 gamePattern.push(randomChosenColor);
 $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
 playSound(randomChosenColor);
 level++;
 $("#level-title").text("level " + level);
 return
};

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColor){
      $("#"+currentColor).addClass("pressed");
      setTimeout(function(){
          $("#"+currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
console.log(gamePattern.length);

  var count = 0;
  console.log(count);

  for(var i = 1 ; i <= gamePattern.length ; i++){

    if(gamePattern[i] === userClickedPattern[i])
    {
      count++;
    }
  }

  if(count == gamePattern.length){
    console.log("success");
      setTimeout(function(){
        nextSequence();
      },1000);
    }
}
  else
  {
  console.log("wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press any key to restart");
    startOver();
  }
}

function startOver(){
  level= 0
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
