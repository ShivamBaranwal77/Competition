var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, playerImg, player2Img;
var bg, bgImg;
var triangle, ob1;
var wood1, ob2;
var wood2, ob3;
var ground;
var obstaclesGroup
var score = 0;
var reset, resetImg;
var x = 20;

function preload(){
    playerImg = loadImage("player.png");
    player2Img = loadImage("player2.png");
    bgImg = loadImage("bg.jpg");
    ob1 = loadImage("ob1.png");
    ob2 = loadImage("ob2.png");
    ob3 = loadImage("ob3.png");
    resetImg = loadImage("reset.jpg");
}

function setup(){
    var canvas = createCanvas(800,400);
    
    ground = createSprite(400,400,800,50);
    ground.shapeColor = "green";
    ground.visible = false;

    player = createSprite(250,300,5,5);
    player.addImage("player", playerImg);
    player.scale = 0.07;
    player.visible = false;

    reset = createSprite(400,300,50,50);
    reset.addImage("reset", resetImg);
    reset.scale = 0.7;
    reset.visible = false;

    obstaclesGroup = new Group();
}

function draw(){
  if(gameState ===PLAY){
      background(bgImg);
      textSize(15);
      text("Score : " + score,380,25);
      
      player.visible = true;
      ground.visible = true;
      obstaclesGroup.setVisibleEach(true);
      reset.visible = false;

      player.velocityY = player.velocityY + 0.7;

      if(keyDown("space")){
          player.y = player.y - 13.5;
      }

      if(keyDown("left_arrow")){
          player.x = player.x - 7;
          player.addImage("player", player2Img); 
      }

      if(keyDown("right_arrow")){
          player.x = player.x + 7;
          player.addImage("player", playerImg);
      }

      if(player.y < 300){
          score = score + Math.round(getFrameRate()/60);
          ground.y = 1000;
      }

      player.collide(obstaclesGroup);
      player.collide(ground);

      spawnObstacles();
      
      if(player.x < 0 || player.y > 400){
          gameState = END;
      }
  }

  else if(gameState === END){
      textSize(15);
      text("Score : " + score,380,25);
      player.visible = false;
      reset.visible = true;
      obstaclesGroup.destroyEach();
      score = score;
  
      if(mousePressedOver(reset)){
          restart();
      }
  }

  drawSprites();
}   
  
function spawnObstacles() {
    if(frameCount % x === 0) {
      var obstacle = createSprite(780,random(50,300),10,40);
      
      if(score < 100){
        obstacle.velocityX = -4;
        x = 20;
      }

      if(score < 200 && score > 100){
        obstacle.velocityX = -4.1;
        x = 21;
      }

      if(score < 300 && score > 200){
        obstacle.velocityX = -4.2;
        x = 22;
      }

      if(score < 400 && score > 300){
        obstacle.velocityX = -4.3;
        x = 23;
      }

      if(score < 500 && score > 400){
        obstacle.velocityX = -4.4;
        x = 24;
      }

      if(score < 600 && score > 500){
        obstacle.velocityX = -4.5;
        x = 25;
      }

      if(score < 700 && score > 600){
        obstacle.velocityX = -4.6;
        x = 26;
      }

      if(score < 800 && score > 700){
        obstacle.velocityX = -4.7;
        x = 27;
      }
        
      if(score < 900 && score > 800){
        obstacle.velocityX = -4.8;
        x = 28;
      } 
      
      if(score < 1000 && score > 900){
        obstacle.velocityX = -4.9;
        x = 29;
      }

      if(score > 1000){
        obstacle.velocityX = -5;
        x = 30;
      }
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(ob1);
                break;
        case 2: obstacle.addImage(ob2);
                break;
        case 3: obstacle.addImage(ob3);
                break;
        default: break;
      }
      
      obstacle.scale = 0.5;
      obstacle.lifetime = 210;
      obstaclesGroup.add(obstacle);

     
    }
  }

function restart(){
    player.y = 300;
    player.x = 250;
    gameState = PLAY;
    score = 0;
    ground.y = 400;
    obstaclesGroup.setVelocityXEach(0);
    frameCount = 0;
    x = 20;
}