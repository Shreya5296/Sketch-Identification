var s_wt= 5;
var s_color = "black";

function setup() {
  canvas = createCanvas(580, 350);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;

  s_wt="";
  s_color="black";
}

function preload() {


  classifier = ml5.imageClassifier('DoodleNet');
}



function clearCanvas() {

  background("white");
}

function draw() {

  // Set stroke weight to 13
  strokeWeight(s_wt);
  // Set stroke color to black
  stroke(s_color);
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

  document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}

function strokeSettings(){
  s_wt = document.getElementById("stroke_weight").value;
  s_color = document.getElementById("stroke_color").value;
}

