var road;
var runner;
var invisible1,invisible2;
var bomb;
var drink;
var coin;
var score = 0;
var gameState = 'serve';
var bombGroup;
var drinkGroup;
var coinGroup;


function preload()
{
  //pre-load images
  runner_1 = loadAnimation('Runner-1.png','Runner-2.png')
  path = loadImage('path.png')
  bomb_1 = loadImage('bomb.png')
  drink_1 = loadImage('energyDrink.png')
  coin_1=loadImage('coin.png')

}

function setup()
{
  createCanvas(445,400);
  //create sprites here

  road = createSprite(200,200)
  road.addImage(path)
  road.scale = 1

  runner = createSprite(200,300,10,10);
  runner.addAnimation('runner',runner_1)
  
  runner.scale = 0.05

  invisible1 = createSprite(-20,0,140,800)
  invisible2 = createSprite(443,0,166,800)
  invisible1.visible = false
  invisible2.visible = false

  bombGroup = new Group()
  drinkGroup = new Group()
  coinGroup = new Group()
}

function draw() 
{
  background(0);

  runner.setCollider('circle',0,0,555)

 
  if (gameState==='serve')
  {
    textSize(18);
    fill('pink');
    text('Press ',360,50);

    textSize(18);
    fill('pink');
    text('space',360,70);

    textSize(18);
    fill('pink');
    text('to start',360,100);

    textSize(18);
    fill('pink');
    text('Move with ',360,200);

    textSize(18);
    fill('pink');
    text('the mouse',360,230);

    textSize(18);
    fill('pink');
    text('to play',360,260);
   
  }
  

  if (keyDown('space')&&gameState==='serve')
  {
    gameState='play'
  }

  if (gameState==='play')
  {
    gameplay();
    textSize(18);
    fill('pink');
    text('Score = '+score,355,200);
  }
 

  if (gameState==='end')
  {
    runner.velocityx=0
    road.velocityY = 0

    textSize(18);
    fill('pink');
    text('You Lost',355,100);
    text('Score is '+score,355,350) 
  }

  drawSprites();
}

function spawnBomb()
{

  randx = Math.round(random(70,330))
  randy = Math.round(random(-100,-20))

  if (frameCount%60===0 || frameCount%80===0)
  {
    bomb = createSprite(randx,randy)
    bomb.addImage(bomb_1)
    bomb.scale = 0.05
    bomb.velocityY = 9
    bomb.lifetime = 210
    bombGroup.add(bomb)

  }
}


function spawnDrink()
{
  randx = Math.round(random(70,330))
  randy = Math.round(random(-100,-20))

  if (frameCount%100===0)
  {
    drink = createSprite(randx,randy)
    drink.addImage(drink_1)
    drink.scale = 0.09
    drink.velocityY = 4
    drink.lifetime = 210
    drinkGroup.add(drink)

  }
  
}

function spawnCoin()
{
    if (frameCount%100===0)
  {
    coin = createSprite(randx,randy)
    coin.addImage(coin_1)
    coin.scale = 0.25
    coin.velocityY = 7
    coin.scoreTime = 209
    coinGroup.add(coin)
  }
}

function kill()
{
  if (bomb.collide(runner))
  {

  }
}

function gameplay()
{
  road.velocityY = 5
  if (road.y>400)
  {
    road.y = road.width/2
  }

  if (runner.isTouching(bombGroup))
  {
    gameState='end'
  }

  if (runner.isTouching(drinkGroup))
  {
    drink.destroy()
    score+=2
  }

  if (runner.isTouching(coinGroup))
  {
    coin.destroy()
    score+=5
  }

  runner.x = mouseX
  runner.collide(invisible1)
  runner.collide(invisible2)

  spawnBomb();
  spawnDrink();
  spawnCoin();
}