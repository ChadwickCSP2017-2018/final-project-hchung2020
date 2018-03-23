var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = screen.height;
var BACKGROUND_COLOR = color(255);

Character tmp = new Character();

/* @pjs preload= "tmp-0.gif, tmp-1.gif, tmp-2.gif, tmp-3.gif, tmp-4.gif, tmp-5.gif, tmp-6.gif, tmp-7.gif, tmp-8.gif, tmp-9.gif, tmp-10.gif, tmp-11.gif, tmp-12.gif, tmp-13.gif, tmp-14.gif, tmp-15.gif";*/
PImage characterImage;

PImage[] character = new PImage[16];

void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(30); //how many times the draw function is called per second
  for (var i = 0; i < character.length; i++) {
    character[i] = loadImage("tmp-" + i + ".gif");
  }
    //noLoop();
}

void draw() {
  if (keyPressed) {
    console.log("Pressed a key");
    tmp.updateCharacterRight();
  }

tmp.drawCharacter();

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

  void drawCharacter() {
    image(character[characterNumber], xPos, 475, 100, 100);
  }

  void updateCharacterLeft() {
    characterNumber++;
    if (xPos > WINDOW_WIDTH + 50) {
      xPos = -50;
    }
    if (xPos < -50) {
      xPos = WINDOW_WIDTH + 50;
    }

    if (characterNumber == character.length) {
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
    if (characterNumber == character.length) {
      characterNumber = 0;
    }
    xPos += 3
  }
}
