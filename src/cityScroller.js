var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = 600;
var BACKGROUND_COLOR = color(255);
<<<<<<< HEAD
var LEFT = '37';
var RIGHT = '39';
var DOWN = '40';
var UP = '38';
var direction = LEFT;

Character fatguy = new Character();
||||||| merged common ancestors
=======
var LEFT = '37';
var RIGHT = '39';
var DOWN = '40';
var UP = '38';
>>>>>>> f4b0946e871b07f238bdcb7974caaed19e1cb479

<<<<<<< HEAD
||||||| merged common ancestors
Character tmp = new Character();
=======
Character fatguy = new Character();
>>>>>>> f4b0946e871b07f238bdcb7974caaed19e1cb479

/* @pjs preload= "tmp-0.gif, tmp-1.gif, tmp-2.gif, tmp-3.gif, tmp-4.gif, tmp-5.gif, tmp-6.gif, tmp-7.gif, tmp-8.gif, tmp-9.gif, tmp-10.gif, tmp-11.gif, tmp-12.gif, tmp-13.gif, tmp-14.gif, tmp-15.gif";*/
/* @pjs preload= "rtmp-0.gif, rtmp-1.gif, rtmp-2.gif, rtmp-3.gif, rtmp-4.gif, rtmp-5.gif, rtmp-6.gif, rtmp-7.gif, rtmp-8.gif, rtmp-9.gif, rtmp-10.gif, rtmp-11.gif, rtmp-12.gif, rtmp-13.gif, rtmp-14.gif, rtmp-15.gif";*/
PImage characterImage;

PImage[] left = new PImage[16];
PImage[] right = new PImage[16];

void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(30); //how many times the draw function is called per second
<<<<<<< HEAD
  for (var i = 0; i < left.length; i++) {
    left[i] = loadImage("tmp-" + i + ".gif");
  }
  for (var i = 0; i < right.length; i++) {
    right[i] = loadImage("rtmp-" + i + ".gif");
||||||| merged common ancestors
  for (var i = 0; i < character.length; i++) {
    character[i] = loadImage("tmp-" + i + ".gif");
=======
  backgroundImage = loadImage("1.jpg");
  for (var i = 0; i < left.length; i++) {
    left[i] = loadImage("tmp-" + i + ".gif");
  }
  for (var i = 0; i < right.length; i++) {
    right[i] = loadImage("tmp-" + i + ".gif");
>>>>>>> f4b0946e871b07f238bdcb7974caaed19e1cb479
  }

  ;

}

void draw() {
<<<<<<< HEAD
  background(BACKGROUND_COLOR);

||||||| merged common ancestors
=======
  image(backgroundImage, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
>>>>>>> f4b0946e871b07f238bdcb7974caaed19e1cb479
  if (keyPressed) {
    console.log("Pressed a key");
<<<<<<< HEAD
    if (keyCode == LEFT) {
      direction = LEFT;
      fatguy.updateCharacterLeft();
    } else if (keyCode == RIGHT) {
      direction = RIGHT;

      fatguy.updateCharacterRight();
    }

||||||| merged common ancestors
    tmp.updateCharacterRight();
=======
    fatguy.updateCharacterRight();
>>>>>>> f4b0946e871b07f238bdcb7974caaed19e1cb479
  }
  fatguy.drawCharacter(direction);


}

class Character {
  var xPos;
  var characterNumber;

  Character() {
    xPos = 200;
    characterNumber = 0;
  }
  void moveCharacter() {
    drawCharacter();
    updateCharacter();
  }

  void drawCharacter(var direction) {
    if (direction == LEFT) {
      image(left[characterNumber], xPos, 475, 100, 100);
    } else if (direction == RIGHT) {
      image(right[characterNumber], xPos, 475, 100, 100);
    }
  }

  void updateCharacterLeft() {
    characterNumber++;
    if (xPos > WINDOW_WIDTH + 50) {
      xPos = -50;
    }
    if (xPos < -50) {
      xPos = WINDOW_WIDTH + 50;
    }

    if (characterNumber == left.length) {
      characterNumber = 0;
    }
    xPos -= 3
  }
  void updateCharacterRight() {
    characterNumber++;
    if (xPos > WINDOW_WIDTH + 50) {
      xPos = -50;
    }
    if (xPos < -50) {
      xPosition = WINDOW_WIDTH + 50;
    }
    if (characterNumber == right.length) {
      characterNumber = 0;
    }
    xPos += 3
  }
}
