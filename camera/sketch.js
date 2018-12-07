let capture;
let maximums = {x: 0, y: 0}
let minimums = {x: 9999, y: 9999}
let windowX = 640;
let windowY = 480;
let socket;
let onMotion = false;
let motionState = false;

function setup() {
  var con = window.prompt("Enter link", "http://localhost:3000");
  socket = io.connect(con);
  socket.emit('type', {type: "Camera"});
  createCanvas(windowX, windowY);
  capture = createCapture(VIDEO);
  capture.size(windowX, windowY);
  capture.hide();
  poseNet = ml5.poseNet(capture, modelReady);
  poseNet.on('pose', detectMotion);
}

function detectMotion(poses){
  maximums.x = maximums.y = 0;
  minimums.x = minimums.y = 99999;
  if(poses.length > 0){
    onMotion = true;
    for(var i = 0; i < 17; i++){
      if(poses[0].pose.keypoints[i].score > 0.01){
        maximums.x = Math.max(maximums.x, poses[0].pose.keypoints[i].position.x);
        maximums.y = Math.max(maximums.y, poses[0].pose.keypoints[i].position.y);
        minimums.x = Math.min(minimums.x, poses[0].pose.keypoints[i].position.x);
        minimums.y = Math.min(minimums.y, poses[0].pose.keypoints[i].position.y);
      }
    }
  }
  else{
    onMotion = false;
  }

  if(onMotion){
    if(motionState != onMotion){
      socket.emit('motion');
      motionState = onMotion;
    }
  }
  else if(!onMotion){
    if(motionState != onMotion){
      socket.emit('un-motion');
      motionState = onMotion;
    }
  }
}

function modelReady(){
 	 select("#status").html("WebCam Loaded");
}

function draw() {
  background(220);
  image(capture, 0, 0, windowX, windowY);
  stroke(255, 255, 255);
  noFill();
  rect(minimums.x, minimums.y, maximums.x - minimums.x, maximums.y - minimums.y);
}