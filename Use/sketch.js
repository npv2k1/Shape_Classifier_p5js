let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;
/**
 * TODO khởi tạo
 */
function setup() {
  canvas = createCanvas(400, 400); // Khởi tạo canvas kích thước 400x400px

  /**
   *  TODO tạo neuralNetwork
   */
  let options = {
    inputs: [128, 128, 4], // [width, heigth, color(r g b a)]
    task: "imageClassification",
  };
  shapeClassifier = ml5.neuralNetwork(options);

  const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  background(255); // tạo nền canvas trắng

  clearButton = createButton("clear");
  clearButton.mousePressed(() => {
    background(255);
  });

  resultsDiv = createDiv("loading model"); // tạo div chứa kết quả nhận dạng

  inputImage = createGraphics(128, 128); // tạo ảnh input để đưa vào neural network

  shapeClassifier.load(modelDetails, modelLoaded); // load model
}
/**
 * TODO Hàm sẽ chạy khi model được load thành công
 */
function modelLoaded() {
  console.log("model ready!");
  classifyImage();
}

/**
 * TODO Thực hiện phân loại
 */
function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 128, 128); // chuyển ảnh 400x400 -> 128x128
  shapeClassifier.classify({ image: inputImage }, gotResults); // thực hiện nhận dạng
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  let label = results[0].label;
  let confidence = nf(100 * results[0].confidence, 2, 0);
  resultsDiv.html(`${label} ${confidence}%`);
  // console.log(results);
  classifyImage();
}

/**
 * TODO Thực hiện vẽ lên canvas
 */
function draw() {
  if (mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
