var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkeyrun, monkeycrashed;
var life=2
var banana, bananaimage, bananagroup;
var obstaclesGroup, obstacle, obstacleimage;
var invi
var score;
var hedwig, Hedwigsound
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var dm,bg,bgi;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	monkeyrun = loadAnimation ( "monkey (1).jpg" , "monkey (2).jpg" , "monkey (3).jpg" , "monkey (4).jpg" , "monkey (5).jpg" ,  "monkey (6).jpg" , "monkey (7).jpg" );
	monkeycrashed = loadAnimation("m9.png");
	
	bananaimage = loadImage("banana.png");
	
	obstacleimage = loadImage("obsstacle.png");
	bgi = loadImage("aa.png");
  }
  

function setup() {
	createCanvas(900, 500);


	engine = Engine.create();
	world = engine.world;

	monkey = createSprite(50,390,20,50);
	monkey.addAnimation("run", monkeyrun);
	  monkey.addAnimation("crashed", monkeycrashed);
   invi = createSprite(500,430,1000,20);
	monkey.scale = 0.85;
	
	
	//create Obstacle and Cloud Groups
	obstaclegroup = createGroup();
	bananagroup = createGroup();
	
	
	monkey.setCollider("CIRCLE",0,0,35);
	bg = createSprite(450,250)
	bg.addImage(bgi);
	bg.scale=0.45;
	bg.depth=-10
score=0

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  
  drawSprites();
  
  background(180);
  //displaying score
  text("Score : "+ score, 500,15);
    text("life : "+ life, 100,15);

    monkey.collide(invi)
  invi.visible=false
  if(frameCount===10){
  }

  if(gameState === PLAY){

    if(monkey.isTouching(bananagroup)){
      score=score+2
      bananagroup.destroyEach();
      if(monkey.scale<1.4){
      monkey.scale=monkey.scale+0.2
      }
    }
    console.log(life)

    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 350) {
        monkey.velocityY = -14;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnobstacle();
    
    if(obstaclegroup.isTouching(monkey)){
      life=life-1
      obstaclegroup.destroyEach();
        monkey.scale=0.85

    }
if(life<1){
      gameState=END
    }
  }
  
   else if (gameState === END) {

      monkey.velocityY = 0
     
      //change the trex animation
      monkey.changeAnimation("crashed" ,monkeycrashed);
   
      //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
	monkey.scale=0.5

     if(keyDown("r")){
       obstaclegroup.destroyEach();
       bananagroup.destroyEach();
       score=0
       gameState=PLAY;
       monkey.changeAnimation("run",monkeyrun);
       life=2
       monkey.scale=0.85
     }
     obstaclegroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down

  
  
  
  drawSprites();
}

function spawnobstacle(){
 if (frameCount % 90 === 0){
   var obstacle = createSprite(900,400,10,40);
   obstacle.velocityX = -(5+score/500)
   obstacle.addImage(obstacleimage);
       
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclegroup.add(obstacle);
 }
}



function spawnbanana() {
	//write code here to spawn the clouds
	if (frameCount % 50 === 0) {
	   banana = createSprite(900,250,40,10);
	  banana.y = Math.round(random(280,330));
	  banana.addImage(bananaimage);
	  banana.scale = 0.1;
	  banana.velocityX = -(5+score/500);
	  
	   //assign lifetime to the variable
	  banana.lifetime = 200;
	  
	  //adjust the depth
	  banana.depth = monkey.depth;
	  monkey.depth = monkey.depth + 1;
	  
	  //adding cloud to the group
	bananagroup .add(banana);
	  }
  }
  