var gino;
var ground;
var Health=100;
function preload(){
   heroImg = loadAnimation("idle/idle01.png","idle/idle02.png",
                          "idle/idle03.png","idle/idle04.png",
                          "idle/idle05.png","idle/idle06.png",
                          "idle/idle07.png");
   bgImg = loadImage("bg.jpeg");
   gino_running = loadAnimation("running/run01.png","running/run02.png","running/run03.png",
             "running/run04.png", "running/run05.png","running/run06.png",
              "running/run07.png","running/run08.png");
  runningsound = loadSound("running.mp3");
  batImg = loadAnimation("batso/attack01.png","batso/attack02.png","batso/attack03.png",
  "batso/attack04.png","batso/attack05.png","batso/attack06.png","batso/attack07.png",
  "batso/attack08.png","batso/attack09.png","batso/attack10.png",)
  batFly = loadAnimation("batso/fly01.png","batso/fly02.png","batso/fly03.png","batso/fly04.png",
  "batso/fly05.png","batso/fly06.png","batso/fly07.png",)
  
  gino_jump = loadAnimation("jump/jump_start01.png","jump/jump_start02.png","jump/jump_mid01.png",
  "jump/jump_mid02.png","jump/jump_mid03.png","jump/jump_mid04.png","jump/jump_landing.png");

  AttackA = loadAnimation("attackA/AttackA01.png","attackA/AttackA02.png","attackA/AttackA03.png",
  "attackA/AttackA04.png","attackA/AttackA05.png","attackA/AttackA06.png","attackA/AttackA07.png",);

  slide = loadAnimation("slide/slide_start01.png","slide/slide_start02.png","slide/slide.png",
  "slide/slide_end01.png","slide/slide_end02.png",)

  gino_dies = loadAnimation("death/death01.png","death/death02.png","death/death03.png",
  "death/death05.png","death/death05.png",)
  gino_dead = loadAnimation("death/death05.png");

  //trollImg = loadAnimation("troll.gif");

  healthImg = loadImage("28.png");

  diggerImg = loadAnimation("digger/idle01.png","digger/idle02.png");
  diggerHit = loadAnimation("digger/hit01.png","digger/hit02.png","digger/hit03.png");

  dagger = loadAnimation("Throw attack/throw_dagger.png");

  daggerhit = loadAnimation("Throw attack/throw_dagger_hit01.png","Throw attack/throw_dagger_hit02.png",
  "Throw attack/throw_dagger_hit03.png",)

  throwAnim = loadAnimation("Throw attack/throw_attack01.png","Throw attack/throw_attack02.png",
  "Throw attack/throw_attack03.png","Throw attack/throw_attack04.png","Throw attack/throw_attack05.png",
  "Throw attack/throw_attack06.png","Throw attack/throw_attack07.png")

  auntBatonImg = loadImage("aunt baton/idle01.png");

  batig = loadImage("batso/fly01.png");
  diggerig = loadImage("digger/idle01.png");

}

function setup(){
  createCanvas(1200,650);
  
  gino = createSprite(220,590,50,50);
  gino.addAnimation("idle",heroImg);
  gino.addAnimation("running",gino_running);
  gino.addAnimation("jumping",gino_jump);
  gino.addAnimation("attackA",AttackA);
  gino.addAnimation("slide",slide);
  gino.addAnimation("death",gino_dies);
  gino.addAnimation("dead",gino_dead);
  gino.addAnimation("throw",throwAnim);
  gino.scale = 2;
  //gino.debug=true;
  gino.setCollider("circle",-5,10,20)
  
  // ground = createSprite(200,800,800,10);
  // ground.velocityX=-3;
  // ground.shapeColor=(35,31,31);
  
  // invisibleGround = createSprite(displayWidth/2,displayHeight-150,displayWidth,10);
  invisibleGround = createSprite(100,610,1200,10);
  invisibleGround.velocityX = -3
  invisibleGround.shapeColor = "red";
  //invisibleGround.visible = false;

  bat = createSprite(100,300,50,50);
  bat.addAnimation("attack",batImg);
  bat.addAnimation("fly",batFly);
  //bat.debug=true;

  // troll = createSprite(80,370,50,50);
  // troll.addImage(trollImg);
  // troll.scale = 0.2;

    health = createSprite(90,370,10,10);
    health.addImage(healthImg);
    health.scale = 0.5;

    digger = createSprite(50,360,50,50);
    digger.addAnimation("idle",diggerImg);
    digger.addAnimation("hat",diggerHit);

    daggersprt = createSprite(gino.x,gino.y,10,10);
    daggersprt.addAnimation("dag",dagger);
    daggersprt.addAnimation("hit",daggerhit);
    daggersprt.visible=false;

    auntbaton = createSprite(290,590,50,50);
    auntbaton.addImage(auntBatonImg);
}




function draw(){
  background(bgImg); 
  text("Health:"+ Health,gino.x,30);
  camera.x=gino.x;
  if(keyDown("RIGHT_ARROW")){
    gino.x+=10;
   gino.changeAnimation("running",gino_running);
    // gino.changeAnimation("idle",heroImg);
    runningsound.play();
    runningsound.stop();
  }
    if(keyDown("LEFT_ARROW")){
    gino.x-=10;
   gino.changeAnimation("idle",heroImg);
      // gino.changeAnimation("running",heroImg);
  }
  if(keyDown("UP_ARROW")){
    //gino.x-=10;
   gino.changeAnimation("attackA",AttackA);
      // gino.changeAnimation("running",heroImg);
  }
  if(keyDown("DOWN_ARROW")){
    gino.x+=10;
   gino.changeAnimation("slide",slide);
      // // gino.chan:
      // flowth/2;
  }
      if(keyDown("space")&& gino.y >= 350) {
        gino.velocityY = -12;
        gino.changeAnimation("jumping",gino_jump);
    }

    if(keyDown("F")){
     gino.changeAnimation("throw",throwAnim);
     daggersprt.visible = true;
     daggersprt.velocityX=3;
    }

    if(daggersprt.x>digger.x){
      digger.changeAnimation("hat",diggerHit);
      daggersprt.changeAnimation("hit",daggerhit);
    }

  if(gino.isTouching(bat)){
    Health=Health-10;
    bat.destroy();
  }
      gino.velocityY = gino.velocityY + 1

      if(Health<0){
      gino.changeAnimation("death",gino_dies);
      textSize=80;
      fill("red");
      text("Game Over",gino.x,200);
      bat.destroy();
      }

   if(gino.isTouching(health)){
     Health+=30
     health.destroy();
   }  
  // if(gino.velocityX===5){
  //    runningsound.play();
  //   runningsound.setVolume(0.1);
  // }
  if(invisibleGround.x<600){
    invisibleGround.x=600;
  }
  spawnVillians();
  gino.collide(invisibleGround);
  drawSprites();   
}

function spawnVillians(){
  if(frameCount%60===0){
    var villian=createSprite(600,590,50,50);
    villian.velocityX=-6;
    var rand=Math.round(1,3);
    switch(rand){
      case 1: villian.addAnimation(diggerImg);break;
      case 2: villian.addImage(batig);break;
      case 3: villian.addImage(auntBatonImg);break;
    }
  }
}