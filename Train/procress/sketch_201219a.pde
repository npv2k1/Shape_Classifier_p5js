void setup(){
  size(128,128);
}
void draw(){
  for(int i=0;i<3;i++){
    
  background(255);
  pushMatrix();
  
  strokeWeight(4);
  float r= random(24,64);
  float x = random(r,width-r);
  float y = random(r,height-r);
  stroke(random(100),random(100),random(100));
  translate(x,y);
  if(i==0){
    circle(0,0,r*2);
    saveFrame("E:/Quick/data/circle####.png"); 
  }
  else if(i==1){
    rectMode(CENTER);
    rotate(random(-0.1,0.1));
    square(0,0,r*2);
    saveFrame("E:/Quick/data/square####.png");

  }
  else if(i==2){
    rotate(random(-0.1,0.1));
    triangle(0, -r, r, r, -r, r);
    saveFrame("E:/Quick/data/triangle####.png");
  }
  popMatrix();
}
 if(frameCount == 100){
    exit();
  }
}
