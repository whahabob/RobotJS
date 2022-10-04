var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(10);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = 1080
var width = 1920;


var previousColour = "";
var currentColour = "";
let newColour = false;
setInterval(function(){
    //var color = robot.getPixelColor(robot.getMousePos().x,robot.getMousePos().y);
    currentColour = robot.getPixelColor(40,34);
    if(currentColour - previousColour > 100)
    console.log(currentColour);
    if(currentColour !== previousColour)
    {
        previousColour = currentColour;
        newColour = true;
    }
    else{
        newColour = false;
    }

    
}, 250);




async function DoMining(g)
{
    console.log("Starting mining");
    await delay(1);
    for(let j = 0; j < g; j++){
        for(let i = 0; i < rocks.length; i++)
        {
            await until(_ => drop == false)
            
            await ClickRockAndDrop(rocks[i].x,rocks[i].y);
        }
    }
}



//FFED5C5C

//FFC31313

//FF610404


let i = 0;
async function ClickRockAndDrop(x, y)
{
    let tempPos = GetRandomValueAroundPoint(x, y);
    await MoveMouseSmooth(tempPos.posX, tempPos.posY, true);

    await until(_ => drop == true).then(console.log("finished"));
   
    DropOre()
}

async function DropOre()
{
    console.log("Dropping");
    let pos2 = { posX :  getRndInteger(1476-5, 1476+5),posY : 764 }


    await MoveMouseSmooth(pos2.posX, pos2.posY, true);
}

async function MoveMouseSmooth(x,y, click = false)
{
    if(getRndInteger(0,100) > 63)
    {
        let tempPos = GetRandomValueAroundPoint(x+getRndInteger(-175,175), y+getRndInteger(-175,175));
        robot.moveMouseSmooth(tempPos.posX, tempPos.posY, 0.95);
        await delay(getRndInteger(1,8)/15);
        console.log("uitschieter");
    }
   
    robot.moveMouseSmooth(GetRandomValueAroundPoint(x, y).posX, GetRandomValueAroundPoint(x, y).posY, 0.65);
    await delay(getRndInteger(1,10)/29);
    robot.moveMouseSmooth(x, y, 0.75);

    if(click)
    {
        await delay(getRndInteger(6,16)/100);
        robot.mouseClick();
    }

    if(getRndInteger(0,100) > 93){
        console.log("Idle mode active");
        var h = getRndInteger(5,12)
        console.log(h);
        await delay(h);

        if(getRndInteger(0,100) > 96){
            console.log("extra long Idle mode active");
            var h = getRndInteger(60,129)
            console.log(h);
            await delay(h);
        }
    }
    else{
        await delay((getRndInteger(26,30))/10);
    }

    
}


async function delay(n){
    return await new Promise(function(resolve){
        var k = getRndInteger(990,1010)
        setTimeout(resolve,n*k);
    });
}
let drop = false;



async function until(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
  
    return new Promise(poll);
  }




let n = 0;

function func()  { setInterval(function(){
    var color = robot.getPixelColor(1476,764);
    if(color === "3e3529")
    {
        n++;
        drop = false;
    }
    else
    {
        n = 0;
        drop = true;
    }
        
}, 500);}

func();

robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);

function check()  { setInterval(function(){
   if(drop)
   DropOre();
        
}, getRndInteger(60,95)*1000);}



function doLoop()  { setInterval(function(){
    if(n > 200)
    FindRock();
         
 }, getRndInteger(145,285)*1000);}

 //doLoop()

function GetRandomValueAroundPoint(x,y )
{
    return { posX :  getRndInteger(x-25, x+25),posY :  getRndInteger(y-25, y+25) }
}


let rocks = [
    { name: 'rock1', x: 572, y: 513 },
    { name: 'rock1', x: 851, y: 235 },
    { name: 'rock1', x: 572, y: 513 },
    { name: 'rock1', x: 851, y: 235 }
  ];

 let skills = { name: 'Skills', x: 1264, y: 1022, width: 28 }
 let inventory = { name: 'Inventory', x: 1327, y: 1022, width: 28 }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let searching = true;
function FindRock(){
    console.log("starting");
    rocks = [];
    for(let i = 600; i < width-500; i++)
    {
        for(let j = 300; j < height-300; j++)
        {
            if(rocks.length >= 3){
                break;
            }
            let pos = { x :  getRndInteger(i, width-i), y :  getRndInteger(j, height - j) };
            if(robot.getPixelColor(pos.x, pos.y) === "ffff00"){
                searching = false;
                console.log("Found rock 1");
                
                    rocks.push({name: "rock1", x : pos.x, y : pos.y});
                
            }
            else if(robot.getPixelColor(pos.x, pos.y) === "262606"){
                searching = false;
                console.log("Found rock 2");
                if(rocks.filter((r) => r.name === "rock2").length == 0)
                {
                    console.log(pos);
                    rocks.push({name: "rock2", x : pos.x, y : pos.y});
                }
                
            }
            else if(robot.getPixelColor(pos.x, pos.y) === "4d4415"){
                searching = false;
                console.log("Found rock 3");
                if(rocks.filter((r) => r.name === "rock3").length == 0)
                {
                    rocks.push({name: "rock3", x : pos.x, y : pos.y});
                }
            }
        }
    }
    console.log(rocks);
    DoMining();
    
}
//robot.setMouseDelay(100);
DoMining(1140);

//FindRock();



