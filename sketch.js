var monkey , monkey_running
var banana ,bananaImage;
var bananaGroup;
var obstacle, obstacleImage;
var obstacleGroup;
var foodGroup;
var ground,groundImage;
var background1,backgroundImage1;
var score = 0;
var survivaltime = 0;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  background1Image = loadImage("jungle.jpg");
 
}

function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  background1 = createSprite(200,200,20,20);
  background1.addImage("moving",background1Image);
  background1.velocityX = -4;
  background1.x = background1.width/2;
  
  ground.visible = false;
    
  background1.depth = bananaGroup.depth;
  bananaGroup.depth = bananaGroup.depth + 1;
  
  background1.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  }

function draw() {

  background("white");
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
      }
  
  switch(score){
         case 10 : monkey.scale = 0.12;
                   break;
         case 20 : monkey.scale = 0.14;
                   break;
         case 30 : monkey.scale = 0.16;
                   break;
         case 40 : monkey.scale = 0.18;
                   break;
         default : break;
         }
    
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.1;
     }
  
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     monkey.scale = 0.2;
     score = +2;
     }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (background1.x < 0){
      background1.x = background1.width/2;
    }
    
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount/frameRate());
  text("survival time: "+survivaltime,100,50);
      
  food();
  obstacles();
  
  drawSprites();
}

function food(){
  
  if (frameCount % 80 === 0){
    var banana = createSprite(600,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage("moving",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 600;
    bananaGroup.add(banana);
  }
  }

function obstacles(){
  
  if (frameCount % 300 === 0){
    var obstacle = createSprite(300,320,20,20);
    obstacle.addImage("moving",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
  }