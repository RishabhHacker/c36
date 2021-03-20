//Create variables here
var dog,sadDog,happyDog;
var frameCount=0;
var foodObj
var gameState="hungry";
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;
var bedroomImg,gardenImg,washRoomImg,sleepImg,runImg;
var input,button;
function preload()
{
	//load images here
  sadDog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  bedroomImg=loadImage("images/Bed Room")
  gardenImg=loadImage("images/virtual pet images/deadDog.png")
  dogVaccinationImg=loadImage("images/virtual pet images/dogVaccination.png")
  foodStock=loadImage("images/virtual pet images/Food Stock")
washRoomImg=loadImage("images/virtual pet images/Wash Room")  
sleepImg=loadImage("images/virtual pet images/lazy.png")
runImg=loadImage("images/virtual pet images/running.png")
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database()
  foodObj=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  dog=createSprite(800,200,150,150)
  dog.addImage(sadDog)
  dog.scale=0.15
  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  dog.addAnimation("hungry",hungryDog)
  dog.addAnimation("happy",happyDog)
  dog.addAnimation("sleeping",sleep.Img)
  dog.addAnimation("run",runImg)
  getGameState()
  feed=createButton("feed the dog")
  feed.position(950,95)
  feed.mousePressed(feedDog)
  addFood=createButton("feed the dog")
  feed.position(1050,95)
  addFood.mousePressed(addFoods)
  input=createInput("pet name")
  input.position(950,120)
  button=createButton("confirm")
  button.position(100,145)
  button.mousePressed(createName)
}


function draw() {  
currentTime=hour()
if(currentTime===lastFed+1){
  gameState="playing";
  updateGameState()
  foodObj.garden()
}
else if(currentTime===lastFed+2){
  gameState="sleeping";
  updateGameState()
  foodObj.bedroom()
}
else if(currentTime>lastFed+2 && currentTime<=lastFed+4){
  gameState="bathing"
  updateGameState()
  foodObj.washRoom();
}

}
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Feed"+lastFed %12 + "PM",350,30)
}
else if(lastFed==0){
  text("Last Feed:12AM",350,30)
}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}
  drawSprites();
  //add styles here


function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
async function hour(){
    var site=await fetch("http://worldtime.org/api/timezone/India/Kolkata")
    var siteJSON=await site.json()
    var datetime=siteJSON.datetime;
    var hourTime=datatime.slice(11,13)
    return hourTime
}
function createName(){
  input.hide()
  button.hide()
  name=input.value()
  var greeting=createElement('h3')
  greeting.html("pets name:"+name)
  greeting.position(width/2+850,height/2+200)
}
function getGameState(){
  gameStateRef=database.ref('gameState')
  gameStateRef.on("value",function(data){
    gameState=data.val()
  })
}
function updateGameState(){
  database.ref('/').update({
    gameState:gameState
  })
}



