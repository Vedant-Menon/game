
var bg,bgimg,start,startimg
var gameState=0
var boy, playerimg,ground,groundimg,mainimg,mainbg;
var obstacle1, obstacle2, obstacle3, obstacle4;
var bulletimg, coinimg;
var obstacleGroup, coinGroup, bulletGroup,obstacle
var score;


function preload(){
bgimg=loadImage("images/bg1.jpg")
startimg = loadImage("images/text0.png")
playicon=loadAnimation("images/frame0.gif","images/frame1.gif","images/frame2.gif","images/frame3.gif")
playerimg=loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png","images/r5.png","images/r6.png","images/r7.png","images/r8.png")
mainimg=loadImage("images/bg.png")
groundimg = loadImage("images/race.png")
obstacle1 = loadImage("images/h1.png")
obstacle2 = loadImage("images/h2.png")
obstacle3 = loadImage("images/h3.png")
obstacle4 = loadImage("images/h4.png")
bulletimg = loadImage("images/bullet.png")
coinimg = loadImage("images/coin.png")


}



function setup() {
  createCanvas(800,400);
  bg=createSprite(200, 200,300,250);
  bg.addImage(bgimg)
  bg.scale=0.5

  start=createSprite(300,200,50,50)
  start.addImage(startimg)
  start.scale=0.5

  play=createSprite(250,300,10,10)
  play.addAnimation("playing",playicon)
  play.scale=0.1

  boy=createSprite(50,192,20,50)
  boy.addAnimation("playing",playerimg)
  boy.scale=0.2
  mainbg = createSprite(300,130,600,200)
  mainbg.addImage(mainimg)
  mainbg.scale = 0.7;
 // mainbg.velocityX=-3;
  boy.scale=0.2
     
  ground = createSprite(200,310,400,20);
 ground.addImage(groundimg);
 ground.velocityX = -4;
 ground.x = ground.width /2;
 boy.depth=mainbg.depth
 boy.depth=boy.depth+1
 
 invisibleGround = createSprite(200,220,400,10);
 invisibleGround.visible = false

 obstacleGroup = new Group();
 coinGroup = new Group();
 bulletGroup = new Group();

 score = 0;
}

function draw() {
  background(255,255,255); 
 
  
  if(gameState===1){
   bg.visible=false;
   start.visible=false;
   play.visible=false;
   mainbg.visible=false;
  ground.visible = false;
   boy.visible = false;

   background("lightblue")

   textSize(25)
   textStyle(BOLD)
   textFont("SNAP ITC")
   text("INSTRUCTIONS",200,45)

   textSize(15)
   textStyle(ITALIC)
   textFont("Calibri")
   text("This is a obstacle couse race.",100,95)
   text("You have to overcome obstacles and also collect coins to reach the next levels.",100,125)
   text("Press the UP ARROW KEY to make the player jump.",100,155)
   text("Press the DOWN ARROW KEY to reduce the player's scale,",100,185)
   text("so that the player doesn't get hit by the bullet." ,100,205)
   text("Press the Z key to increase the player's size once it has been reduced",100,255)
   

   textStyle(BOLD)
   text("Press SPACE to continue",200,325)

   

  

   if(keyDown("space")&&gameState===1){
     gameState=2
   }

 }

 if(gameState===2){
   createCanvas(600,200)
   mainbg.visible=true
  ground.visible=true
  boy.visible=true

  
  

   
  if(keyDown("up")){
    boy.velocityY=-10
  }

  if(keyDown("down")){
    boy.scale = boy.scale-0.01
  }

  if(keyDown("z")){
    boy.scale+=0.01
  }
 boy.velocityY=boy.velocityY+0.5
  if (ground.x < 0){
    ground.x = ground.width/2;

  };

  if(coinGroup.isTouching(boy)){
    score = score+5;
  }

  if(bulletGroup.isTouching(boy)){
    score = score-5;
  }

  if(obstacleGroup.isTouching(boy)){
    score = score-2;
  }
 



  boy.collide(invisibleGround)
  spawnObstacles()
  spawnBullets()
  spawnCoins()

  if(score===-500){
    gameState=3;
  }

 }
 
 if(mousePressedOver(play)&&gameState===0){
     gameState=1
   }

   if(gameState===3){
    bg.visible=false;
    start.visible =false;;
    play.visible=false;;
    mainbg.visible=false;
 ground.visible = false;
  boy.visible = false;
 obstacleGroup.destroyEach();
 //bulletGroup.visible = false;
// coinGroup.visible = false;

  textStyle(BOLD)
  textSize(20)
  text("YOU HAVE REACHED LEVEL 2!!",100,200)
   }
 
  
 
   drawSprites();
   textSize(20)
  text("Score:"+score,200,35)

   
 
   if(gameState===0){
     bg.visible=true
     start.visible =true;
     play.visible=true;
     mainbg.visible=false;
  ground.visible = false;
   boy.visible = false;

     textSize(15)
   textStyle(BOLDITALIC)
   textFont("Algerian")
   fill("black")
   text("OBSTACLES COURSE RACE",200,100)

 
   }
 
   
  
 
 }
 function spawnObstacles(){
   if(frameCount%50===0){
  obstacle = createSprite(600,170,10,40)
     obstacle.velocityX = -6;
     obstacle.scale = 0.1;

     var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    obstacleGroup.add(obstacle)
   }
 }

 function spawnBullets(){
  if(frameCount%250===0){
    var  bullet = createSprite(600,170,10,40)
    bullet.velocityX = -20;
    bullet.y = Math.round(random(50,340));
    bullet.addImage(bulletimg);
    bullet.scale = 0.5;

    bulletGroup.add(bullet)
  }
 }

  function spawnCoins(){
    if(frameCount%110===0){
    var coin = createSprite(600,170,10,40)
    coin.velocityX = -9;
    coin.y = Math.round(random(30,280));
    coin.addImage(coinimg);
    coin.scale = 0.5;

    coinGroup.add(coin)
    }
  }
