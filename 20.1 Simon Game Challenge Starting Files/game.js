var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(".btn").click(function(){
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var aLength = userClickedPattern.length;
    checkAnswer(aLength-1);


})

function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level) ;
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(40).fadeIn(40);
    playSound(randomChosenColour);
   
}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(()=> {
        $("#" + currentColour).removeClass("pressed");

    }, 100);


}

function checkAnswer(currentLevel){
  if (userClickedPattern[(currentLevel)] ===  gamePattern[(currentLevel)]){
    console.log("sucess");
     if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
  }
  else{
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")

    },200)

    $("#level-title").text("Game Over! Press Any Key to Start Again.");
    startover();

  }

}

function startover(){
    gamePattern=[];
    started = false;
    level = 0;

}