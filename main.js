var leftWrist_x = 0;
var leftWrist_y = 0;
var rightWrist_x = 0;
var rightWrist_y = 0;

var song = ""
var song_is_playing = false;

function preload(){
song = loadSound("song.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    if (leftWrist_score > 0.2){
        fill('red');
        stroke("red");
        circle(leftWrist_x,leftWrist_y,20);
        number_leftWrist_y = Number(leftWrist_y);
        remove_decimal = floor(number_leftWrist_y);
        vol = remove_decimal/500;
        document.getElementById("volume").innerHTML = "VOLUME = "+vol;
        song.setVolume(vol);
    }
}

function play(){
    song.play();
    song_is_playing = true;
    song.rate(1);
    song.setVolume(1);
}
function pause_music(){
    if (song_is_playing == true){
        song.pause();
        song_is_playing = false;
    }
  }

  function modelLoaded(){
    console.log("model successfully loaded");
  }

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_score = results[0].pose.keypoints[9].score;
    }
        
    }










