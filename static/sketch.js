
let player;
let blobs = [];
let score = 0;
let minScore = 0;

function setup() {
  createCanvas(800, 250);
  player = new Player();
}

function keyPressed() {
  if (key == 'w') {
    player.jump();
  }
}

function draw() {

  background(220);



  score += .05;
  fill(0, 102, 153);

  textSize(30);
  text(round(score), 10, 32);

  player.show();
  player.move();

  if (random(1) < 0.03) {
    if (score > minScore) {
      blobs.push(new Blob());
      minScore = score + 2 + random(1);
    }
  }

  for (blob of blobs) {
    blob.setSpeed(8 + sqrt(score) / 5);
    blob.move();
    blob.show();

    if (player.hits(blob)) {
      print("GAME OVER");
      noLoop();
    }

    if (blob.getX() < -50) {
      blobs.shift();
      print("Removed");
    }
  }

}