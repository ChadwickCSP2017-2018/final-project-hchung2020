var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 600;
var BACKGROUND_COLOR = color(255);
var LEFT = '37';
var RIGHT = '39';
var DOWN = '40';
var UP = '38';
var direction = RIGHT;
var gameScreen = 0;

Character fatguy = new Character();
Skyline tallSkyline = new Skyline(1, 250, 350, color(220));
Skyline middleSkyline = new Skyline(3, 80, 250, color(180));
Skyline shortSkyline = new Skyline(5, 50, 100, color(100));
Cloud cloud1 = new Cloud(400, 100);
Cloud cloud2 = new Cloud(600, 150);
Cloud cloud3 = new Cloud(1200, 130);
Cloud cloud4 = new Cloud(150, 200);
Moon moon = new Moon();
Danger car = new Danger();
Danger car2 = new Danger();



/* @pjs preload= "tmp-0.gif, tmp-1.gif, tmp-2.gif, tmp-3.gif, tmp-4.gif, tmp-5.gif, tmp-6.gif, tmp-7.gif, tmp-8.gif, tmp-9.gif, tmp-10.gif, tmp-11.gif, tmp-12.gif, tmp-13.gif, tmp-14.gif, tmp-15.gif";*/
/* @pjs preload= "rtmp-0.gif, rtmp-1.gif, rtmp-2.gif, rtmp-3.gif, rtmp-4.gif, rtmp-5.gif, rtmp-6.gif, rtmp-7.gif, rtmp-8.gif, rtmp-9.gif, rtmp-10.gif, rtmp-11.gif, rtmp-12.gif, rtmp-13.gif, rtmp-14.gif, rtmp-15.gif";*/
/* @pjs preload="car0.gif,car1.gif,car2.gif,car3.gif,car4.gif,car5.gif,car6.gif,car7.gif,car8.gif,car9.gif,car10.gif,car11.gif,car12.gif,car13.gif,car14.gif,car15.gif,car16.gif,car17.gif,car18.gif,car19.gif";*/
/* @pjs preload= "BackgroundColor.png";*/
PImage backgroundImage;

PImage[] left = new PImage[16];
PImage[] right = new PImage[16];
PImage[] danger = new PImage[20];

void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT);
  frameRate(30);
  backgroundImage = loadImage("BackgroundColor.png");
  for (var i = 0; i < left.length; i++) {
    left[i] = loadImage("tmp-" + i + ".gif");
  }
  for (var i = 0; i < right.length; i++) {
    right[i] = loadImage("rtmp-" + i + ".gif");
  }
  for (var i = 0; i < danger.length; i++) {
    danger[i] = loadImage("car" + i + ".gif");
  }

}

void draw() {
  var characterHealth = fatguy.getHealth();

  if (characterHealth > 0) {
    image(backgroundImage, 0, 0);
    moon.drawAndUpdateMoon();
    cloud1.drawAndUpdateCloud();
    cloud2.drawAndUpdateCloud();
    cloud3.drawAndUpdateCloud();
    cloud4.drawAndUpdateCloud();



    fill(93, 111, 122);
    noStroke();
    rect(0, WINDOW_HEIGHT - 50, WINDOW_WIDTH, 50);
    stroke(255);


    if (keyPressed) {
      console.log("Pressed a key");
      if (keyCode == LEFT) {
        direction = LEFT;
        fatguy.updateCharacterLeft(car);

      } else if (keyCode == RIGHT) {
        direction = RIGHT;
        tallSkyline.moveSkyline();
        middleSkyline.moveSkyline();
        shortSkyline.moveSkyline();
        fatguy.updateCharacterRight(car);
      } else if (keyCode == UP) {
        fatguy.updateCharacterUp(car);

      }

    }


    tallSkyline.drawSkyline();
    middleSkyline.drawSkyline();
    shortSkyline.drawSkyline();
    fatguy.drawCharacter(direction);
    car.drawAndUpdateDanger();



  } else {
    background(0);
    textAlign(CENTER);
    fill(255);
    textSize(14);
    text("GAME OVER", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    textSize(12);
    text("Click to start over", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 20);

  }
}
void mouseClicked() {
  var health = fatguy.getHealth();
  console.log("mouse");
  if (health <= 0) {
    console.log("mouse-pressed");
    fatguy.setHealth();
    fatguy.setX();
    car.setXPosition();
  }
}

class Character {
  var xPos, yPos;
  var characterNumber;
  var speed;
  var distance;
  var healthNumber;
  var yVel;
  var gravity;
  var isJumping;
  var characterGround;

  Character() {
    xPos = 200;
    yPos = 475;
    characterNumber = 0;
    healthNumber = 100;
    distance = 100000000;
    yVel = 0;
    gravity = 1.2;
    isJumping = false;
    characterGround = 460;
    speed = 4
  }

  void drawCharacter(var direction) {
    stroke();
    if (healthNumber > 67) {
      fill(48, 232, 60);
    }
    if (healthNumber <= 67 && healthNumber > 33) {
      fill(216, 232, 47);
    }
    if (healthNumber <= 33) {
      fill(255, 0, 0);
    }
    rect(775, 10, healthNumber * 2, 20);

    if (direction == LEFT) {
      image(left[characterNumber], xPos, yPos, 100, 100);
    } else if (direction == RIGHT) {
      image(right[characterNumber], xPos, yPos, 100, 100);
    }
    if (isCollidingWith(car) && healthNumber >= 20) {
      healthNumber -= 20;
      car.setXPosition();
    }


    if (isJumping) {
      yVel += gravity;
      yPos += yVel;
      if (yPos > characterGround) {
        yPos = characterGround;
        yVel = 0;
        isJumping = false;
      }
    }
  }

  void updateCharacterLeft(car) {
    if (isCollidingWith(car) && healthNumber >= 20) {
      healthNumber -= 20;
      car.setXPosition();
    }
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

    xPos -= speed

  }

  void updateCharacterRight(car) {
    if (isCollidingWith(car) && healthNumber >= 20) {
      healthNumber -= 20;
      car.setXPosition();
    }
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

    xPos += speed
  }

  void updateCharacterUp(car) {
    if (isJumping == false) {
      yVel = -18;
      isJumping = true;
    }
  }

  void updateCharacterDown(car) {
    if (isCollidingWith(car) && healthNumber >= 20) {
      healthNumber -= 20;
      car.setXPosition();
    }

  }
  int findYPosition() {
    return yPos;
  }
  int getHealth() {
    return healthNumber;
  }
  void setHealth() {
    healthNumber = 100;
  }
  void setX() {
    xPos = 200;
  }

  function isCollidingWith(car) {
    var dangerX = car.getXPosition();
    var dangerY = car.getYPosition();
    distance = sqrt(sq(dangerX - xPos) + sq(dangerY - yPos));
    if (distance <= 60) {
      return true;
      console.log("true");
    } else {
      return false;
    }
  }

}
class Skyline {
  ArrayList < Building > buildingList;
  var xPosition, speed, skylineUpbound, skylineLowbound;
  var skylineColor;


  Skyline(float s,
    var sl,
      var su,
        var sc) {
    buildingList = new ArrayList < Building > ();
    xPosition = 0;
    speed = s;
    skylineUpbound = su;
    skylineLowbound = sl;
    skylineColor = sc;
    fillSkyline();
  }

  void moveSkyline() {

    drawSkyline();
    update();
    addBuilding();

  }


  void drawSkyline() {

    for (var i = 0; i < buildingList.size(); i++) {
      var building = buildingList.get(i);
      if (building.xPosition < -100) {
        buildingList.remove(i);
        i--;
      }
      building.drawBuilding();
    }
  }


  void update() {

    for (var s = 0; s < buildingList.size(); s++) {
      var building = buildingList.get(s);
      building.update();

    }
  }


  void addBuilding() {
    var randomBuildingWidth = random(50, 100);
    Building currentBuilding = new Building(xPosition, randomBuildingWidth, skylineUpbound,
      skylineLowbound, speed, skylineColor);
    buildingList.add(currentBuilding);
    xPosition += randomBuildingWidth - 5;
  }


  void fillSkyline() {

    while (xPosition < WINDOW_WIDTH - 10) {
      addBuilding();
    }

    console.log(buildingList.size());
  }
}


class Building {

  var xPosition, yPosition, buildingHeight, buildingWidth;
  var buildingColor;
  var speed;
  var winHeight, winWidth, winColor;

  /**
   * Constructs a Building object
   * @param xPos - the x position of the top left corner of the building
   * @param bw - the building's width
   */
  Building(var xPos,
    var bw,
      var bh,
        var lb, float s,
          var bc) {

    buildingHeight = random(lb, bh);
    buildingWidth = bw;
    speed = s;
    xPosition = xPos;
    buildingColor = bc;
    winWidth = buildingWidth / 4;
    winHeight = buildingHeight / 2 + 5;
    winColor = color(239, 242, 247);
  }

  void drawAndUpdate() {

    drawBuilding();
    update();
  }


  void drawBuilding() {
    fill(buildingColor);
    rect(xPosition, WINDOW_HEIGHT - buildingHeight - 50, buildingWidth, buildingHeight);
    fill(winColor);
    rect(xPosition + (buildingWidth - winWidth) / 4, WINDOW_HEIGHT - buildingHeight + (buildingHeight - winHeight) / 2 - 50, winWidth, winHeight);
    rect(xPosition + buildingWidth - winWidth - 15, WINDOW_HEIGHT - buildingHeight + (buildingHeight - winHeight) / 2 - 50, winWidth, winHeight);
  }

  /**
   * Updates the x position of the building
   * @param speed - the speed at which the building updates
   */
  void update() {
    xPosition -= speed;
  }

}
class Moon {
  var speed, xPosition, radius;

  /**
   * Constructs a Building object
   * @param xPos - the x position of the top left corner of the building
   */

  Moon() {
    speed = 0.05;
    xPosition = 100;
    radius = 60;
  }

  void drawAndUpdateMoon() {

    drawMoon();
    update();
  }


  void drawMoon() {
    noStroke();
    fill(color(255, 255, 204));
    ellipse(xPosition, 125, radius, radius);
    stroke();
  }

  /**
   * Updates the x position of the building
   * @param speed - the speed at which the building updates
   */
  void update() {
    xPosition += speed;
    if (xPosition > WINDOW_WIDTH + 50) {
      xPosition = -60;
    }
  }
}
class Cloud {
  var xPosition, yPosition, speed;

  Cloud(var x,
    var y) {
    xPosition = x;
    yPosition = y;
    speed = 0.1;
  }

  void drawAndUpdateCloud() {
    drawCloud();
    updateCloud();
  }

  void drawCloud() {
    fill(color(255));
    ellipse(xPosition, yPosition, 70, 50);
    ellipse(xPosition + 40, yPosition, 70, 50);
    ellipse(xPosition + 20, yPosition - 25, 70, 50);
  }
  void updateCloud() {
    xPosition += speed;
    if (xPosition > WINDOW_WIDTH + 50) {
      xPosition = -60;
    }
  }

}
class Danger {
  var xPosition, yPosition, speed, dangerNumber;
  Danger() {
    xPosition = 900;
    yPosition = WINDOW_HEIGHT - 120;
    speed = random(3, 5);
    dangerNumber = 0;
  }

  void drawAndUpdateDanger() {
    drawDanger();
    updateDanger();
  }
  void drawDanger() {
    image(danger[dangerNumber], xPosition, yPosition, 130, 104.000000004);
  }
  void updateDanger() {
    dangerNumber++;
    if (xPosition < -190) {
      xPosition = WINDOW_WIDTH + 190;
    }

    if (dangerNumber == danger.length) {
      dangerNumber = 0;
    }
    xPosition -= speed;

  }
  int getXPosition() {
    return xPosition;
  }
  int getYPosition() {
    return yPosition;
  }
  void setXPosition() {
    xPosition = 1030;
  }
}
