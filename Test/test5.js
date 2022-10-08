fs = require('fs');
var robot = require("robotjs");
const readline = require('readline');

nExit = 1;
const exits = [];
async function processLineByLine() {
    let rock = [];
  const fileStream = fs.createReadStream('exit' + nExit + '.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    rock.push(line);
  }
  exits.push(rock);
}


var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = 768;
var width = 1366;

var anvil = {x:956, y: 935}

var bank = {x:407, y:736};

var withdral = {x:621, y:576};

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
pathback.push(pathback1);
pathback.push(pathback2);
pathback.push(pathback3);
pathback.push(pathback4);
var essence = {x:600, y: 228}

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
pathto.push(pathto1);
pathto.push(pathto2);
pathto.push(pathto3);
pathto.push(pathto4);

async function WaitForWalk()
{
    
    await delay(getRndInteger(1,2));
    
}
var foundAltar = false;
async function StartRunecrafting()
{
    console.log("Start RC");
        for(let i = 0; i < 100; i++)
        {
                if(n > 300)
                {
                        console.log("activated running");
                 //       await MoveMouseSmooth(1483, 155, true);
                        
                }
                
               await delay(getRndInteger(10,40)/100)
               for(let i = 0; i < pathto.length*20; i++)
               {
                
                await FindAltar().then((r)=>
                {
                    foundAltar = r;
                })
                if(!foundAltar)
                {
                    await FindPath(true);
                                
                    await WaitForWalk();
                }
                else
                {
                    await delay(5);
                    console.log("inside altar");
                    break;
                }
            }
              

               await Runecraft();

               
               await delay(1);
               
               await FindExit();

               await delay(1);
              
               var foundBank = false;
               for(let i = 0; i < pathback.length*100; i++)
               {
                   console.log("going back");
                   await FindBank().then((r)=>
                   {
                       foundBank = r;
                       if(r)
                       {
                           console.log(r);
                       }
                   })
                   if(!foundBank)
                   {
                       await FindPath(false);
                        await WaitForWalk();
                   }
                   else
                   {
                        await delay(10);
                       console.log("inside bank");
                       break;
                   }
                   
               }
               
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(withdral.x),GetSmallRandomValueAroundPoint(withdral.y),true);
                await delay(getRndInteger(1,3)/10);
                await MoveMouseSmooth(GetSmallRandomValueAroundPoint(essence.x),GetSmallRandomValueAroundPoint(essence.y),true);
                await delay(getRndInteger(1,3)/5);

                robot.keyTap("escape");
                await delay(1);
                
        }
       
}





async function MoveMouseSmooth(x,y, click = false, superfast = false)
{
    console.log("superfast:" + superfast);
    if(!superfast)
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
    }
    
   
   
     
    if(click)
    {
        if(!superfast)
        {
            robot.moveMouseSmooth(x, y, 2);
            await delay(getRndInteger(8,16)/100);
        }
        else
            robot.moveMouseSmooth(x, y, 1);
        
        await delay(getRndInteger(8,16)/1000);
       robot.mouseClick();
        
    }

    if(getRndInteger(0,1000) > 991 && !superfast){
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
    }, 200);}
var runActive = false;
    func();


var img;

function imgFunc()  { setInterval(function(){
        img = robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);
             
     }, 100);}
     
     imgFunc();







//FindPath();

async function FindPath(goingTo)
{
    
    var halfScreensize = 1080/2;
    console.log("Finding path");
        rocks = [];
        for(let i = 0; i < 500; i++)
        {

            var x = goingTo ? getRndInteger(27, halfScreensize-100) : getRndInteger(halfScreensize+100,width -27)
            var y = getRndInteger(27, height-27);
            var color = robot.getPixelColor(x,y);
            var rgbColor = ConvertHexToRGB(color);
            var RgbCurrentRock = ConvertHexToRGB("ffff00");
            var rgbDifference = 
                    {
                        r: difference(rgbColor.r, RgbCurrentRock.r),
                        g: difference(rgbColor.g, RgbCurrentRock.g),
                        b: difference(rgbColor.b, RgbCurrentRock.b)
    
                    }
            if(rgbDifference.r == 0 && rgbDifference.g == 0 && rgbDifference.b == 0)
            {
                if(robot.getPixelColor(x+1,y) == color || robot.getPixelColor(x-1,y) || robot.getPixelColor(x,y-1) || robot.getPixelColor(x,y+1))
                {
                    console.log(x + " : " + y);
                    await MoveMouseSmooth(x,y, true, true);
                    break;
                }
                
            }
        }
}


async function FindAltar()
{
    var goingTo = true;
    var halfScreensize = 1080/2;
    console.log("Finding path for altar");
        rocks = [];
        for(let i = 0; i < 1800; i++)
        {

            var x = goingTo ? getRndInteger(27, halfScreensize-100) : getRndInteger(halfScreensize+100,width -27)
            var y = getRndInteger(27, height-27);
            var color = robot.getPixelColor(x,y);
            var rgbColor = ConvertHexToRGB(color);
            var RgbCurrentRock = ConvertHexToRGB("00ff00");

            var rgbDifference = 
                    {
                        r: difference(rgbColor.r, RgbCurrentRock.r),
                        g: difference(rgbColor.g, RgbCurrentRock.g),
                        b: difference(rgbColor.b, RgbCurrentRock.b)
    
                    }

            if(rgbDifference.r == 0 && rgbDifference.g == 0 && rgbDifference.b == 0)
            {
                if(robot.getPixelColor(x+1,y) == "00ff00" || robot.getPixelColor(x-1,y) == "00ff00" || robot.getPixelColor(x,y-1) == "00ff00" || robot.getPixelColor(x,y+1) == "00ff00")
                {
                    console.log(rgbDifference);
                    console.log(rgbColor);
                    console.log("Found altar: "+x + " : " + y);
                    await MoveMouseSmooth(x,y, true, true);
                    return true;
                }
                
            }
        }
        return false;
        
        
    
}

var exitPos = [];
async function FindExit()
{
    
    var halfScreensize = 1080/2;
    console.log("Finding path for exit");
        for(let i = 0; i < 1500; i++)
        {
            var x = getRndInteger(300, halfScreensize);
            var y = getRndInteger(200, height-100);
            var color = robot.getPixelColor(x,y);

           
           
            var rgbColor = ConvertHexToRGB(color);
            var RgbCurrentRock = ConvertHexToRGB("ff0000");

            var rgbDifference = 
                    {
                        r: difference(rgbColor.r, RgbCurrentRock.r),
                        g: difference(rgbColor.g, RgbCurrentRock.g),
                        b: difference(rgbColor.b, RgbCurrentRock.b)
    
                    }

            if(rgbDifference.r == 0 && rgbDifference.g == 0 && rgbDifference.b == 0)
            {
                
                    exitPos.push({x:x, y:y});
            }
        }

       
        console.log(exitPos.length);
       
        await GetOuterBounds();
        
     
}

async function GetOuterBounds()
{
    var minX = exitPos[0].x;
    var minY = exitPos[0].y;
    var maxX = exitPos[0].x;
    var maxY = exitPos[0].y;

    exitPos.forEach(pos =>
    {
        if(pos.x > maxX)
        {
            maxX = pos.x;
        }
         if(pos.y > maxY)
        {
            maxY = pos.y;
        }
        if(pos.x < minX)
        {
            minX = pos.x;
        }
        if(pos.y < minY)
        {
            minY = pos.y;
        }
    });

    

        console.log(minX + " : " + minY + "  " + maxX + " : " + maxY);
        console.log(difference(minX, maxX) + " : " + difference(minY,maxY));
        await MoveMouseSmooth(minX + difference(minX, maxX)/2, minY + difference(minY,maxY)/2, true)
}

async function Runecraft()
{
    var goingTo = false;
    var halfScreensize = 1080/2;
    console.log("runecraft at altar");
        rocks = [];
        for(let i = 0; i < 1800; i++)
        {

            var x = getRndInteger(halfScreensize, halfScreensize+200)
            var y = getRndInteger(27, height-27);
            var color = robot.getPixelColor(x,y);
            var rgbColor = ConvertHexToRGB(color);
            var RgbCurrentRock = ConvertHexToRGB("0000ff");

            var rgbDifference = 
                    {
                        r: difference(rgbColor.r, RgbCurrentRock.r),
                        g: difference(rgbColor.g, RgbCurrentRock.g),
                        b: difference(rgbColor.b, RgbCurrentRock.b)
    
                    }

            if(rgbDifference.r == 0 && rgbDifference.g == 0 && rgbDifference.b == 0)
            {
                
                    
                    console.log("Found runecraft altar: "+x + " : " + y);
                    await MoveMouseSmooth(x,y, true);
                    break;
                
            }
                
            
        }
        console.log("could not find altar")
        
        
    
}



async function FindBank()
{
    var goingTo = false;
    var halfScreensize = 1080/2;
    console.log("Finding path for bank");
        rocks = [];
        for(let i = 0; i < 750; i++)
        {

            var x = goingTo ? getRndInteger(27, halfScreensize-100) : getRndInteger(halfScreensize,width)
            var y = getRndInteger(27, height-27);
            var color = robot.getPixelColor(x,y);
            var rgbColor = ConvertHexToRGB(color);
            var RgbCurrentRock = ConvertHexToRGB("00ffff");

            var rgbDifference = 
                    {
                        r: difference(rgbColor.r, RgbCurrentRock.r),
                        g: difference(rgbColor.g, RgbCurrentRock.g),
                        b: difference(rgbColor.b, RgbCurrentRock.b)
    
                    }

            if(rgbDifference.r == 0 && rgbDifference.g == 0 && rgbDifference.b == 0)
            {
                if(robot.getPixelColor(x+1,y) == "00ffff" || robot.getPixelColor(x-1,y) == "00ffff" || robot.getPixelColor(x,y-1) == "00ffff" || robot.getPixelColor(x,y+1) == "00ffff")
                {
                    console.log(rgbDifference);
                    console.log(rgbColor);
                    console.log("Found bank: "+x + " : " + y);
                    await MoveMouseSmooth(x,y, true, true);
                    return true;
                }
            }
        }
        return false;
           
}



    function difference(a, b) {
        return Math.abs(a - b);
      }
    
      
    function ConvertHexToRGB(first)
    {
        if(first)
        {
            var color1 = first.charAt(0);
            var color2 = first.charAt(1);
            var R = (ConvertToInt(color1)*16) + ConvertToInt(color2);
        
            var color3 = first.charAt(2);
            var color4 = first.charAt(3)
            var G = (ConvertToInt(color3)*16) + ConvertToInt(color4);
            var color5 = first.charAt(4)
            var color6 = first.charAt(5)
            var B = (ConvertToInt(color5)*16) + ConvertToInt(color6);
            
          
            return {r: R, g:G, b:B}
        }
    
        return  {r: 0, g:0, b:0}
        
    }
    
    function ConvertToInt(hexdecimal)
    {
        switch (hexdecimal) {
            case 'a':
                return 10;
            case 'b':
                return 11;
            case 'c':
                return 12;
            case 'd':
                return 13;
            case 'e':
                return 14;
            case 'f':
                return 15;
            default:
              return hexdecimal
          }
    }

    function func32()  { setInterval(function(){
        var color = robot.getPixelColor(robot.getMousePos().x,robot.getMousePos().y);
        console.log(color);
            
    }, 10);}
    //func32();
    StartRunecrafting();
    //FindExit();

    