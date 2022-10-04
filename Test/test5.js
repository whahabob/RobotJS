fs = require('fs');
var robot = require("robotjs");
const readline = require('readline');


var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = 1080
var width = 1920;

var anvil = {x:956, y: 935}

var bank = {x:407, y:736};

var withdral = {x:899, y:824};

var bronzeBar = {x:876, y:214};
//var copperOre = {x:876, y:179};
var outOfClient = {x:1405,y:1070}
var n = 0;

var portalExit = {x:754, y: 656}
var altar = {x:912, y: 407}

var pathback = [];
var pathback1 = {x:1230, y: 180}
var pathback2 = {x:913, y: 181}
var pathback3 = {x:870, y: 171}
var pathback4 = {x:947, y: 150}
pathback.push(pathback1);
pathback.push(pathback2);
pathback.push(pathback3);
pathback.push(pathback4);
var essence = {x:876, y: 250}

var pathto= [];
var pathto1 = {x:607, y: 1022}
var pathto2 = {x:816, y: 1025}
var pathto3 = {x:776, y: 1004}
var pathto4 = {x:772, y: 1029}
var bank = {x:451, y: 965}
var enterAltar = {x:362, y: 656}
pathto.push(pathto1);
pathto.push(pathto2);
pathto.push(pathto3);
pathto.push(pathto4);

async function WaitForWalk()
{
    
    await delay(getRndInteger(12,14));
    
}

async function StartRunecrafting()
{
        for(let i = 0; i < 100; i++)
        {
                if(n > 300)
                {
                        console.log("activated running");
                        await MoveMouseSmooth(1483, 155, true);
                        
                }
               await delay(getRndInteger(10,40)/100)
               for(let i = 0; i < pathto.length; i++)
               {
                    await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(pathto[i].x,), 
                        GetSmallRandomValueAroundPoint(pathto[i].y),
                        true);

                        if(i == 0)
                        {
                            await delay(getRndInteger(6,8))
                        }
                   
                   await WaitForWalk();
               }
               await MoveMouseSmooth(
                GetSmallRandomValueAroundPoint(enterAltar.x,), 
                GetSmallRandomValueAroundPoint(enterAltar.y),
                 true);

                 await WaitForWalk();
                

                 await MoveMouseSmooth(
                    GetSmallRandomValueAroundPoint(altar.x,), 
                    GetSmallRandomValueAroundPoint(altar.y),
                     true);
    
                if(runActive)
                {
                        await delay(getRndInteger(5,7));
                }
               


                await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(portalExit.x,), 
                        GetSmallRandomValueAroundPoint(portalExit.y),
                         true);
                await WaitForWalk();
               
                
                for(let i = 0; i < pathback.length; i++)
                {
                     await MoveMouseSmooth(
                         GetSmallRandomValueAroundPoint(pathback[i].x,), 
                         GetSmallRandomValueAroundPoint(pathback[i].y),
                         true);

                         
                        await WaitForWalk();
                    
                }


                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(bank.x),GetSmallRandomValueAroundPoint(bank.y),true);
                await delay(getRndInteger(7,9));

              
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(withdral.x),GetSmallRandomValueAroundPoint(withdral.y),true);
                await delay(getRndInteger(1,3)/10);
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(essence.x),GetSmallRandomValueAroundPoint(essence.y),true);
                await delay(getRndInteger(1,3)/10);
                
        }
       
}





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

async function delay(q){
        return await new Promise(function(resolve){
            var k = getRndInteger(990,1010)
            if(!runActive)
            {
               q = q*3;
            }
            setTimeout(resolve,q*k);
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
          console.log(runActive);  
    }, 200);}
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

    StartRunecrafting();


        