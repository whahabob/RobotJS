fs = require('fs');
var robot = require("robotjs");
const readline = require('readline');


var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = 1080
var width = 1920;

var furnance = {x:802, y: 299}

var bank = {x:233, y:539};

var withdral = {x:620, y:565};

var tinOre = {x:595, y:121};
var copperOre = {x:595, y:154};
var outOfClient = {x:1405,y:1070}
var n = 0;

async function StartSmithing()
{
        for(let i = 0; i < 50; i++)
        {
                if(n > 180)
                {
                        console.log("activated running");
                      //  await MoveMouseSmooth(1483, 155, true);
                        
                }
               await delay(getRndInteger(10,40)/100)
               
                await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(furnance.x,), 
                        GetSmallRandomValueAroundPoint(furnance.y),
                         true);
                if(runActive)
                {
                        await delay(getRndInteger(5,7));
                }
                else
                {
                        await delay(getRndInteger(5,7)*2.5);
                }
                
                robot.keyTap("1");
                await delay(0.5);
                await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(outOfClient.x,), 
                        GetSmallRandomValueAroundPoint(outOfClient.y),
                         true);
                await delay(getRndInteger(44,50));
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(bank.x),GetSmallRandomValueAroundPoint(bank.y),true);
                if(runActive)
                {
                        await delay(getRndInteger(5,7));
                }
                else
                {
                        await delay(getRndInteger(5,7)*2.5);
                }
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(withdral.x),GetSmallRandomValueAroundPoint(withdral.y),true);
                await delay(getRndInteger(1,3)/10);
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(tinOre.x),GetSmallRandomValueAroundPoint(tinOre.y),true);
                await delay(getRndInteger(1,3)/10);
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(copperOre.x),GetSmallRandomValueAroundPoint(copperOre.y),true);
                await delay(getRndInteger(1,3)/10);
        }
       
}


StartSmithing();


async function MoveMouseSmooth(x,y, click = false)
{
    if(getRndInteger(0,100) > 91 && click)
    {
        let tempPos = GetRandomValueAroundPoint(x+getRndInteger(-175,175), y+getRndInteger(-175,175));
        robot.moveMouseSmooth(tempPos.posX, tempPos.posY, 1);
        await delay(getRndInteger(9,19)/100);
        console.log("uitschieter");
    }
   
        robot.moveMouseSmooth(GetRandomValueAroundPoint(x, y).posX, GetRandomValueAroundPoint(x, y).posY, 1);
        
        await delay(getRndInteger(9,15)/100);
       
   
     
    if(click)
    {
        robot.moveMouseSmooth(x, y, 2);
        await delay(getRndInteger(8,16)/100);
       robot.mouseClick();
        
    }

    if(getRndInteger(0,1000) > 991){
        if(getRndInteger(0,1000) > 915){
            console.log("extra long Idle mode active");
            var h = getRndInteger(100,150)
            console.log(h);
            await delay(h);
        }
       
        console.log("Idle mode active");
        var h = getRndInteger(5,10)
        console.log(h);
        await delay(h);
    }
    else{
        await delay((getRndInteger(15,31))/100);
    }

    
}

async function delay(n){
        return await new Promise(function(resolve){
            var k = getRndInteger(990,1010)
            setTimeout(resolve,n*k);
        });
    }

    async function until(conditionFunction) {

        const poll = resolve => {
          if(conditionFunction()) resolve();
          else setTimeout(_ => poll(resolve), 100);
        }
      
        return new Promise(poll);
      }

      function GetRandomValueAroundPoint(x,y )
      {
          return { posX :  getRndInteger(x-25, x+25),posY :  getRndInteger(y-25, y+25) }
      }

      function GetSmallRandomValueAroundPoint(x )
      {
          return getRndInteger(x-3, x+3);
      }
      
      function getRndInteger(min, max) {
          return Math.floor(Math.random() * (max - min) ) + min;
      }

      function func()  { setInterval( function(){
        var color = robot.getPixelColor(1483,155);
        if(color === "ecda67")
        {
            n = 0;
            runActive = true;
        }
        else
        {
        
                n++;
            runActive = false;
            
        }
            
    }, 1000);}
var runActive = false;
    func();


var img;

function imgFunc()  { setInterval(function(){
        img = robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);
             
     }, 100);}
     
     imgFunc();


function findObjectsOnScreen()
{
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
        
    }


        