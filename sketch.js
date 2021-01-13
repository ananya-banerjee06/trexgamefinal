
var trex ,trex_running;
var ground ,ground_image;
var invisible_ground;
var cloud ,cloud_image;
var score = 0;
var o1, o2, o3, o4, o5, o6, obstacle;
var cloud_grp, obstacle_grp;
var play = 1;
var end = 0;
var gamestate = play;
var gameover, gameover_image
var restart, restart_image;
var jump_sound, gameover_sound, lvlup_sound;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png" ,"trex4.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  gameover_image= loadImage("gameOver.png")
  restart_image= loadImage("restart.png")
  jump_sound = loadSound("smb_jump-small.wav")
  gameover_sound = loadSound("smb_gameover.wav")
  lvlup_sound = loadSound("smb_stomp.wav")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.6

  ground = createSprite(width/2,height,width,2);
  ground.addImage(ground_image);
  ground.x = width/2;

  invisible_ground = createSprite(width/2,height-10,width,125);
  invisible_ground.visible = false;

  obstacle_grp = new Group()
  cloud_grp = new Group()

  trex.setCollider("rectangle", 0, 0, 30, 30)
  trex.debug = false;
  
  gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameover_image);
  gameover.scale = 0.5;
  gameover.visible = false;

  restart = createSprite(width/2,height/2);
  restart.addImage(restart_image)
  restart.scale = 0.05
  restart.visible = false;
}

function draw(){
  //console.log(trex.y)
  background("white")
  drawSprites();
  if (gamestate === play){
   ground.velocityX = -(6+3*score/100)
   if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
    jump_sound.play( )
    trex.velocityY = -10;
     touches = [];
  }
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(score>0 && score%100 === 0){
    lvlup_sound.play()
  }
  if(keyDown("space") && trex.y > 100){
  trex.velocityY = -10
  jump_sound.play()
}
  clouds()
  obstacles()  
  score = score+ Math.round(getFrameRate()/60)
  trex.velocityY = trex.velocityY + 0.5
    if (trex.isTouching (obstacle_grp)){
      gamestate = end;
      gameover_sound.play()
    }
}
  else if(gamestate === end){
    ground.velocityX = 0
    obstacle_grp.setVelocityXEach(0)
    cloud_grp.setVelocityXEach(0)
    obstacle_grp.setLifetimeEach(-1)
    cloud_grp.setLifetimeEach(-1)
    trex.velocityY = 0
    gameover.visible = true;
    restart.visible = true;
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  } 
  
  text("score = " +score, 520, 50)
  trex.collide(invisible_ground)
}
function reset(){
  gamestate = play;
  obstacle_grp.destroyEach()
  cloud_grp.destroyEach()
  gameover.visible = false;
  restart.visible = false;
  score = 0;
}
function clouds(){
  if(frameCount%80 === 0 ){
    cloud = createSprite(600, 50, 10, 10)
    cloud.velocityX = -(6+2*score/100)
    cloud.addImage(cloud_image)
    cloud.scale = random (0.5, 1.2)
    cloud.y = Math.round(random(20, 110))
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 200
    cloud_grp.add(cloud)
  }
}
function obstacles (){
  if(frameCount%80 === 0){
  obstacle = createSprite(600, 170, 20, 20) 
  obstacle.velocityX = -(6+2*score/100)
  var k = Math.round(random(1,6))
  switch(k){
    case 1 :obstacle.addImage(o1)
    break;
    case 2 :obstacle.addImage(o2)
    break;
    case 3 :obstacle.addImage(o3)
    break;
    case 4 :obstacle.addImage(o4)
    break;
    case 5 :obstacle.addImage(o5)
    break;
    case 6 :obstacle.addImage(o6)
    break;
    default : break;
    }
    obstacle.scale = 0.6;
    obstacle.lifetime = 200
    obstacle_grp.add(obstacle)
  }
}


