noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

color = "black";

random_number_r = Math.floor(Math.random() * 255) + 1;
random_number_g = Math.floor(Math.random() * 255) + 1;
random_number_b = Math.floor(Math.random() * 255) + 1;

function setup() {
    video = createCapture(VIDEO);
    video.size(500, 380);
    video.position(70, 150);

    canvas = createCanvas(500, 380);
    canvas.position(700, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    background('#afe8fa');

    document.getElementById("square_side").innerHTML = "Width And Height of a Square will be = " + difference + "px";
    fill('orange');
    stroke('black');
    square(noseX, noseY, difference);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " nose Y =" + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX =" + leftWristX + "rightWristX =" + rightWristX + "difference =" + difference);
        document.getElementById("heading").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_r + ")";
    }
}