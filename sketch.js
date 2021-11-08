var dog,sadDog,happyDog, database;
var food, foodStock;
var addFood, foodObj;
var feed, lastFed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value", readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the dog")
  feed.position(700, 95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on ("value",function(data){
    lastFed=data.val()})

    fill(255,255,255)

    if(lastFed>=12){
      text("Last Feed: "+ lastFed%12+"PM", 350, 30)
    }else if(lastFed==0){
      text("Last Feed: 12AM", 350, 30)
    }
    drawSprites();
  }

function readStock(data){
  food=data.val();
  foodObj.updateFoodStock(food)
  console.log(food);
}

function addFoods(){
  database.ref("/").update({
    food:food+1
  })
}

function feedDog(){
database.ref("/").update({
  food:food-1
})
}