let circles = [];
let squares = [];
let triangles = [];
function preload() {
  for (let i = 0; i < 100; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`./data/circle${index}.png`);
    squares[i] = loadImage(`./data/square${index}.png`);
    triangles[i] = loadImage(`./data/triangle${index}.png`);
  }
}
let shapeClassifier;
function setup() {
  createCanvas(400, 400);
//   background(0)
//   image(circles[0],0,0,width,height)
  let options = {
    inputs: [128, 128, 4],
    task: "imageClassification",
    debug: true
  };
  shapeClassifier = ml5.neuralNetwork(options);
  for (let i = 0; i < circles.length; i++) {
    // let input = {image: circles[i]};
    // let target={label : "circle"};
    shapeClassifier.addData({ image: circles[i] }, { label: "circle" });
    shapeClassifier.addData({ image: squares[i] }, { label: "square" });
    shapeClassifier.addData({ image: triangles[i] }, { label: "triangle" });
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({epochs:50}, finshedTraining);


}
function finshedTraining(){
    console.log("Finshed train")
    shapeClassifier.save();
}
