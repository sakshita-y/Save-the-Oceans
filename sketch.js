var superhero, apple, bottle, can, plasticBag;
var superheroImg, appleImg, bottleImg, canImg, plasticBagImg;
var bgImg, bg;
var gameOver, gameOverImg;
var reset, resetImg;

var score = 0;
var lives = 3;
var gameState = 1;
PLAY = 1;
END = 2;

function preload() {
  bgImg = loadImage("assets/background.jpeg");
  appleImg = loadImage("assets/apple.png");
  bottleImg = loadImage("assets/bottle.png");
  canImg = loadImage("assets/can.png");
  plasticBagImg = loadImage("assets/plasticBag.png");
  superheroImg = loadImage("assets/Superhero.png");
  gameOverImg = loadImage("gameOver.png");
  resetImg = loadImage("assets/reset.png");
}

function setup() {
  createCanvas(450,450);
  //background
  bg = createSprite(225,225);
  bg.addImage(bgImg);
  bg.scale = 0.7;

  //superhero
  superhero = createSprite(200,200);
  superhero.addImage(superheroImg);
  superhero.scale = 0.4;
  superhero.setCollider("rectangle",80,0,300,100);

  //gameOver
  gameOver = createSprite(220,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  //reset
  reset = createSprite(240,350);
  reset.addImage(resetImg);
  reset.visible = false;
  reset.scale = 0.1;

  //invisible sprite
  invisibleBox = createSprite(225,350,450,250);
  invisibleBox.visible = false;

  canG=new Group();
  bottleG=new Group();
  appleG=new Group();
  plasticBagG=new Group();

}

function draw() {
  background(0);  
  edges= createEdgeSprites();
  superhero.collide(edges);
  if(gameState == PLAY) {
    playerControls();
    createApples();
    createBottles();
    createPlasticBags();
    createCans();

    gameOver.visible = false;
     reset.visible = false;

    if(appleG.isTouching(superhero)) {
      appleG.destroyEach();
      score += 1;
      apple.velocity +=0.2;
    }
    if(bottleG.isTouching(superhero)) {
      bottleG.destroyEach();
      score += 1;
      bottle.velocity +=0.2;
    }
    if(canG.isTouching(superhero)) {
      canG.destroyEach();
      score += 1;
      can.velocity +=0.2;
    }
    if(plasticBagG.isTouching(superhero)) {
      plasticBagG.destroyEach();
      score += 1;
      plasticBag.velocity +=0.2;
    }


    if(invisibleBox.isTouching(appleG)) {
      lives -= 1;
      appleG.destroyEach();
    }

    if(invisibleBox.isTouching(bottleG)) {
      lives -= 1;
      bottleG.destroyEach();
    }

    if(invisibleBox.isTouching(canG)) {
      lives -= 1;
      canG.destroyEach();
    }

    if(invisibleBox.isTouching(plasticBagG)) {
      lives -= 1;
      plasticBagG.destroyEach();
    }

    if(lives<1 || score>10) {
      gameState = 2;
    }

  }else 
  if(gameState == END) {
    appleG.velocityY = 0;
    bottleG.velocityY = 0;
    canG.velocityY = 0;
    plasticBagG.velocityY = 0;
    
   gameOver.visible = true;
   reset.visible = true;

   if(mousePressedOver(reset)) {
     gameState = 1;
     score = 0;
     lives = 3;
     gameOver.visible = false;
     reset.visible = false;
   }

  }

  drawSprites();

  fill("black");
  textFont("Courier");
  textSize(22);
  text("SAVE THE OCEANS!",125,20);
  text("Score: " + score,25,50);
  text("Lives: " + lives,325,50);

  if(score>10) {
    textSize(40);
    text("YOU WIN",150,300);
  }
  if(lives<1){
    textSize(40);
    text("YOU LOSE",150,300);
  }

}

function playerControls() {
  if(keyDown("left")) {
    superhero.position.x -= 5;
  }
  if(keyDown("right")) {
    superhero.position.x += 5;
  }
  if(keyDown("up")) {
    superhero.position.y -= 5;
  }
  if(keyDown("down")) {
    superhero.position.y += 5;
  }
}

function createApples() {
  if (World.frameCount % 200 == 0) {
  //apple
  apple = createSprite(random(50,375),-50);
  apple.addImage(appleImg);
  apple.scale = 0.2;
  apple.lifetime = 200;
  apple.velocityY = 5;
  apple.rotationSpeed = 3;
  appleG.add(apple);
  }
}

function createBottles() {
  if (World.frameCount % 150 == 0) {
  //bottle
  bottle = createSprite(random(50,375),-150);
  bottle.addImage(bottleImg);
  bottle.scale = 0.2;
  bottle.lifetime = 200;
  bottle.velocityY = 5;
  bottle.rotationSpeed = 3;
  bottleG.add(bottle);
  }
}

function createCans() {
  if (World.frameCount % 100 == 0) {
  //can
  can = createSprite(random(50,375),-250);
  can.addImage(canImg);
  can.scale = 0.2;
  can.lifetime = 200;
  can.velocityY = 5;
  can.rotationSpeed = 3;
  canG.add(can);
  }
}

function createPlasticBags() {
  if (World.frameCount % 80 == 0) {
  //plasticBag
  plasticBag = createSprite(random(50,375),-350);
  plasticBag.addImage(plasticBagImg);
  plasticBag.scale = 0.2;
  plasticBag.lifetime = 200;
  plasticBag.velocityY = 5;
  plasticBag.rotationSpeed = 3;
  plasticBagG.add(plasticBag);
  }
}
 
