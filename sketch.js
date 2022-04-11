var piso1,piso;
var piso_invisible;
var nube,nube1;
var trex ,trex_corriendo,trex_muerto;
var cactus0;
var aleatorio;
var gameState = "jugando";
var puntos = 0;
var jugando = 1;
var final = 0;
var gameOver,gameOverImg;
var restart,restartImg;
var Gcactus,Gnubes;
var jumpSound,checkpointSound,dieSound;
function preload(){

  //cargar imagenes o animaciones
nube1 = loadImage ("cloud.png");
jumpSound = loadSound ("jump.mp3");
checkpointSound = loadSound ("checkpoint.mp3");
dieSound = loadSound ("die.mp3");
trex_corriendo = loadAnimation ("trex1.png","trex3.png","trex4.png");
trex_muerto = loadAnimation ("trex_collided.png");
piso1 = loadImage ("ground2.png");
cactus1 = loadImage ("obstacle1.png");
cactus2 = loadImage ("obstacle2.png");
cactus3 = loadImage ("obstacle3.png");
cactus4 = loadImage ("obstacle4.png");
cactus5 = loadImage ("obstacle5.png");
cactus6 = loadImage ("obstacle6.png");
gameOverImg = loadImage ("gameOver.png")
restartImg = loadImage ("restart.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

var mensaje = "esto es un mensaje"
console.log(mensaje);

Gcactus = createGroup ();
Gnubes =  createGroup ();

//gameOver
gameOver = createSprite (width / 2,height / 2 - 50);
gameOver.addImage (gameOverImg);
gameOver.scale = 0.5;

//restart
restart = createSprite (width / 2,height / 2);
restart.addImage (restartImg);
restart.scale = 0.5;

piso_invisible = createSprite (width / 2,height - 10,width,125);
piso_invisible.visible = false
piso = createSprite (width / 2,height - 80,width,2);
piso.addImage (piso1);
trex = createSprite (50,height - 70,20,50);
trex.addAnimation ("corriendo",trex_corriendo);
trex.addAnimation ("muerto",trex_muerto);
trex.scale = 0.5;
trex.setCollider ("circle",0,0,40);
//trex.debug = true;

//trex.setCollider ("rectangle",0,0,400,40);
//trex.debug = true;
}
function draw(){
background("lightblue");
text ("MARCADOR = " + puntos,20,20);

if (gameState === "jugando"){
  gameOver.visible = false;
  restart.visible = false;
  puntos = puntos + Math.round(frameCount / 60);
  if (puntos > 0 && puntos % 100 === 0){
    checkpointSound.play();
  }
  if (piso.x < 0){
    piso.x = piso.width / 2;
  }
  if ((touches.length > 0 || keyDown ("space")) && trex.y >= height - 180){
    jumpSound.play();
    trex.velocityY = -12;
    touches = [];
  }
  piso.velocityX = -(4 + 3 * puntos / 100);
  trex.velocityY = trex.velocityY + 0.8;
  nubes();
  cactus();
  if (trex.isTouching(Gcactus)){
    dieSound.play();
    //trex.velocityY = -12;
    trex.changeAnimation("muerto",trex_muerto);
  gameState = "final";
  }
}
else if (gameState === "final"){
  gameOver.visible = true;
  restart.visible = true;
  
 /* if (mousePressedOver (restart)){
    reiniciar();
  }*/
  if (touches.lenght > 0 || keyDown ("space")){
reiniciar();
touches = [];
  }

  //frenar escenario
trex.velocityY = 0;
piso.velocityX = 0;
Gcactus.setVelocityXEach (0);
Gnubes.setVelocityXEach (0);
}
trex.x = 200;
trex.collide (piso_invisible);
drawSprites();  
}
function reiniciar(){
  gameState = "jugando";
    trex.changeAnimation ("corriendo",trex_corriendo);
    gameOver.visible = false;
    restart.visible = false;
    puntos = 0;
    Gcactus.destroyEach();
    Gnubes.destroyEach();
  }
function nubes(){

  if (frameCount % 60 === 0){
    nube = createSprite (width + 20,height,40,10);
    nube.addImage (nube1);
    nube.scale = 0.7;
    nube.depth = trex.depth;
    trex.depth = trex.depth + 1;
    nube.velocityX = -3;
    if (nube < 0){
      nube.destroyEach();
    }
    Gnubes.add(nube);
    nube.y = Math.round (random (50,150));
  }
}
function cactus(){
if (frameCount % 60 === 0){
 cactus0 = createSprite (width + 20,height - 95,10,40);
 cactus0.velocityX = -(5 + puntos / 100);
 cactus0.scale = 0.5;
 if (cactus0 < 0){
   cactus0.destroyEach();
 }
 Gcactus.add(cactus0);
 cactus0.debug = true;
 var aleatorio = Math.round (random(1,6))
}
switch (aleatorio){
  case 1: cactus0.addImage (cactus1);
  break;
  case 2: cactus0.addImage (cactus2);
  break;
  case 3: cactus0.addImage (cactus3);
  break;
  case 4: cactus0.addImage (cactus4);
  break;
  case 5: cactus0.addImage (cactus5);
  break;
  case 6: cactus0.addImage (cactus6);
  break;
  default: 
  break;
}
}