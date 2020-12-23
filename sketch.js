var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlocksgroup;
var gameState="PLAY";
var spookysound;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookysound=loadSound("spooky.wav");
 
}

function setup(){
  createCanvas(600,600);
  spookysound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImage)
  tower.velocityY=1;
  
   doorsGroup=new  Group();
  climbersGroup=new Group();
  invisibleBlocksgroup=new  Group();
  
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
}

function draw(){
  background("black") 
  
  if(gameState==="PLAY"){
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlocksgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy(); 
    gameState=  "END"
  }
  
  Spawndoors();
  
  drawSprites();
}
if(gameState==="END"){
  stroke("yellow")
  fill("yellow")
  textSize(30)
  text("Game Over",230,250)
}
}
  
function Spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImage)
    
    climber=createSprite(200,10);
    climber.addImage(climberImage) 
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;       
    
    door.x=Math.round(random(120,400))
    door.velocityY=1;
    
    climber.x=door.x;
    climber.velocityY=1;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth+=1
    
    door.lifetime=800;
    climber.lifetime=800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlocksgroup.add(invisibleBlock);
    
    invisibleBlock.debug=true;
    
  }
}
