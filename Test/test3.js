fs = require('fs');
var robot = require("robotjs");
const readline = require('readline');


var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = 1080
var width = 1920;

var furnance = {x:789, y: 292 }

var bank = {x:251, y:517};

var withdral = {x:620, y:540};

var tinOre = {x:595, y:120};
var copperOre = {x:595, y:154};
var outOfClient = {x:966,y:753}
var n = 0;

async function StartSmithing()
{
   await delay(3);
        for(let i = 0; i < 7; i++)
        {
                if(n > 180)
                {
                        console.log("activated running");
                        await MoveMouseSmooth(925, 159, true);
                        
                }
               await delay(getRndInteger(10,40)/100)
               
                await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(furnance.x,), 
                        GetSmallRandomValueAroundPoint(furnance.y),
                         true);
                // if(runActive)
                // {
                //         await delay(getRndInteger(5,7));
                // }
                // else
                // {
                //         await delay(getRndInteger(5,7)*2.5);
                // }
                func();
                await until(_ => readyAtFurnance == true );
                clearInterval(funcID);
                inventoryEmptyFunc();
                
                robot.keyTap("1");
                await delay(getRndInteger(5,10)/10);
                await MoveMouseSmooth(
                        GetSmallRandomValueAroundPoint(outOfClient.x,), 
                        GetSmallRandomValueAroundPoint(outOfClient.y),
                         true);
                await until(_ => inventoryEmpty == true || nInventoryEmpty > 20);
                clearInterval(inventoryEmptyFuncID);
                inventoryEmpty = false;
                await delay(getRndInteger(0,15));
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(bank.x),GetSmallRandomValueAroundPoint(bank.y),true);

                func();
                await until(_ => bankIsOpen == true);
                clearInterval(inventoryEmptyFuncID);
                bankIsOpen = false;
              //  await MoveMouseSmooth(GetSmallRandomValueAroundPoint(withdral.x),GetSmallRandomValueAroundPoint(withdral.y),true);
                await delay(getRndInteger(1,3)/10);
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(tinOre.x),GetSmallRandomValueAroundPoint(tinOre.y),true);
                await delay(getRndInteger(1,3)/10);
                // await MoveMouseSmooth(GetSmallRandomValueAroundPoint(tinOre.x),GetSmallRandomValueAroundPoint(tinOre.y),true);
                // await delay(getRndInteger(1,3)/10);
                // await MoveMouseSmooth(GetSmallRandomValueAroundPoint(copperOre.x),GetSmallRandomValueAroundPoint(copperOre.y),true);
                // await delay(getRndInteger(1,3)/10);
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
var readyAtFurnance = false;
var nReadyAtFurnance = 0;
var inventoryEmpty = false;
var nInventoryEmpty = 0;
var bankIsOpen = false;
var nBankIsOpen = 0;
function func()  {  funcID = setInterval( function(){
        var color = robot.getPixelColor(925,159);
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
        var color2 = robot.getPixelColor(261,650);
        
        if(color2 === "252121")
        {
            nReadyAtFurnance = 0
            readyAtFurnance = true;
        }
        else
        {
        
                nReadyAtFurnance++;
                readyAtFurnance = false;
            
        }

        var color3 = robot.getPixelColor(603,122);
        if(color3 === "776c6c")
        {
            
            bankIsOpen = true;
        }
        else
        {
            bankIsOpen = false;
        }
       
            
    }, 1000);}
var runActive = false;
var funcID;

var inventoryEmptyFuncID;
function inventoryEmptyFunc()  {  inventoryEmptyFuncID = setInterval( function(){
    var color3 = robot.getPixelColor(1046,662);
    if(color3 === "3e3529")
    {
        nInventoryEmpty = 0;
        inventoryEmpty = true;
    }
    else
    {
        nInventoryEmpty++;
        inventoryEmpty = false;
    }
}, 8000);}




var img;

function imgFunc()  { setInterval(function(){
        img = robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);
             
     }, 100);}
     
   //  imgFunc();





        