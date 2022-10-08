fs = require('fs');
var robot = require("robotjs");
const readline = require('readline');


let rocks = [];
let rockAviable = [];
let mousePos = [];
let nGlobal = 0;

let drop = false;
let running = false;
let amountOfRocks = 0;

let bankFar = {x: 830, y: 89}
let bankClose = {x:625, y:345}

let altarFar = {x:257, y:709}
let altarClose = {x:485, y:430}

let rcAltar = {x:557 , y:448}
let exitPortal = {x:539 ,y:456}

var withdral = {x:621, y:576};
var essence = {x:600, y: 228}


async function StartMining(g = 10000)
{
    console.log("Starting");
    
    await delay(1);
    for(let j = 0; j < g; j++){
       
        while(running)
        {
               
                    
                 await MoveMouseSmooth(altarFar.x, altarFar.y, true);
                 await delay(50);
                 await MoveMouseSmooth(altarClose.x, altarClose.y, true);
                 await delay(11);
                 await MoveMouseSmooth(rcAltar.x, rcAltar.y,true);
                 await delay(7);
                 await MoveMouseSmooth(exitPortal.x, exitPortal.y, true);
                 await delay(7);
                 await MoveMouseSmooth(bankFar.x, bankFar.y, true);
                 await delay(50);
                 await MoveMouseSmooth(bankClose.x, bankClose.y, true);
                 await delay(9);
                 await MoveMouseSmooth(GetSmallRandomValueAroundPoint(withdral.x),GetSmallRandomValueAroundPoint(withdral.y),true);
                 await delay(getRndInteger(1,3)/10);
                 await MoveMouseSmooth(GetSmallRandomValueAroundPoint(essence.x),GetSmallRandomValueAroundPoint(essence.y),true);
                 await delay(getRndInteger(1,3)/5);
                    
        } 
        while(!running)
        {
            
        }
        console.log(g);
    }
}

function GetSmallRandomValueAroundPoint(x )
{
    return getRndInteger(x-3, x+3);
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


async function delay(n){
    return await new Promise(function(resolve){
        var k = getRndInteger(990,1010);

        setTimeout(resolve,n*k);
    });
}

let n = 0;
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

let img;

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
async function until(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 100);
    }
  
    return new Promise(poll);
  }
function WriteToFile(content)
{
    fs.appendFile('rock' + numberOfRocks + '.txt', content + '\n', function (err) {
        if (err) return console.log(err);
      });
}
let numberOfRocks = 1;
function readPixels(width, height, x, y){
  var img = robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);

    fs.writeFile('rock' + numberOfRocks + '.txt', "Start:" + x + ":" + y + '\n', function (err) {
        if (err) return console.log(err);
      });

    for(let w = 0; w< width; w++)
    {
        for(let h = 0; h < height; h++)
        {
            var color = img.colorAt(x+w,y+h);
            WriteToFile(color);
        }
    }
}


readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'c' && running == true ) {
        console.log("stoppp");
        running = false;
        // do something usefull
      }
    else if (key && key.ctrl && key.name == 'c') {
        console.log("startt");
        running = true;
        StartMining();
        // do something usefull
      }
     
      else
      {
        console.log('got "keypress"', ch, key);
        mousePos.push(robot.getMousePos());
        readPixels(5,5,robot.getMousePos().x,robot.getMousePos().y);
        processLineByLine();
        numberOfRocks++;
      }
  
        
 
});

process.stdin.setRawMode(true);
process.stdin.resume();



async function processLineByLine() {
    let rock = [];
  const fileStream = fs.createReadStream('rock' + numberOfRocks + '.txt');

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
  rocks.push(rock);
  rockAviable.push(false);
}

function GetRandomValueAroundPoint(x,y )
{
    return { posX :  getRndInteger(x-25, x+25),posY :  getRndInteger(y-25, y+25) }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function imgFunc()  { setInterval(function(){
   img = robot.screen.capture(0, 0, robot.getScreenSize().width, robot.getScreenSize().height);
        
}, 100);}

imgFunc();

function goAFK()  { setInterval(function(){
  // running = false#
  console.log("4hrs");
        
}, 60*60*4*1000);}

goAFK();






    

