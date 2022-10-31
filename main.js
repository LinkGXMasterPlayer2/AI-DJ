song = "";
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){

    song = loadSound("music.mp3");

}


function setup(){

    canvas = createCanvas(600,500);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses())

}

function modelLoaded(){

    console.log('PoseNet is initialized');

}

function gotPoses(results){

    if(results.length > 0){


        console.log(results);
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("score left wrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
    }
}

function draw(){

    image(video,0,0,600,500);
    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
    inNumberLeftWristY = Number(leftWristY);
    removeDecimals = floor(inNumberLeftWristY);
    volume = removeDecimals / 500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);

    }
    

}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);

}

