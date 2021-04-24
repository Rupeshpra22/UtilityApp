const readLineSync = require('readline-sync');
const crypto = require('crypto');
const validAppOption = ["1","2","3","4","5","6","7"];
console.log("Hello, Welcome to Utility App, Here you will find bunch of utilities that you can play with");
console.log("");

const utilityApp = [
  {
    appId: "1",
    appName : "URL Encoder/Decoder",
    operations : ["Encode", "Decode"]
  },
  {
    appId: "2",
    appName : "Base64 Encoder/Decoder",
    operations : ["base64Encode", "base64Decode"]
  },
  {
    appId: "3",
    appName : "String Hashing",
    operations : ["md5", "sha1","sha256", "sha512"]
  },
  {
    appId: "4",
    appName : "Epoch Converters",
    operations : ["To Human Date", "To Epoch Time"]
  },
  {
    appId: "5",
    appName : "Binary/Decimal/Hex/Octal Converters",
    operations : ["Binary to Decimal", "Binary to Hexadecimal", "Binary to Octal", "Decimal to Binary", "Decimal To Hexadecimal", "Decimal To Octal", "Hexadecimal To Binary", "Hexadecimal To Decimal", "Hexadecimal to Octal", "Octal to Binary", "Octal to Decimal", "Octal to Hexadecimal"]
  },
  {
    appId: "6",
    appName : "RGB to HEX",
    operations : ["RGB to HEX", "HEX to RGB"]
  },
  {
    appId: "7",
    appName : "Unit Converter",
    operations : ["Meter to Kilometer", "Centimeter to Kilometer", "Kilometer to Mile"]
  },
]

const BinDecHexOct = [
  {selectedOperation: "1", fromOperation : 2, toOperation: 10},
  {selectedOperation: "2", fromOperation : 2, toOperation: 16},
  {selectedOperation: "3", fromOperation : 2, toOperation: 8},
  {selectedOperation: "4", fromOperation : 10, toOperation: 2},
  {selectedOperation: "5", fromOperation : 10, toOperation: 16},
  {selectedOperation: "6", fromOperation : 10, toOperation: 8},
  {selectedOperation: "7", fromOperation : 16, toOperation: 2},
  {selectedOperation: "8", fromOperation : 16, toOperation: 10},
  {selectedOperation: "9", fromOperation : 16, toOperation: 8},
  {selectedOperation: "10", fromOperation : 8, toOperation: 2},
  {selectedOperation: "11", fromOperation : 8, toOperation: 10},
  {selectedOperation: "12", fromOperation : 8, toOperation: 16}
]

utilityApp.forEach(app=>{
  console.log(app.appId+" : "+app.appName);
})

console.log("");
let selectedApp = readLineSync.question('Select any one utility App from above: \n');

while(!validAppOption.includes(selectedApp)){
  console.log("Please select valid Option");
  selectedApp =  readLineSync.question("Your Option: ");
  console.log("");
}


const utility = (selectedApp) =>{
  const filteredApp = utilityApp.filter(app=>app.appId === selectedApp);
    if(selectedApp === filteredApp[0].appId){
      console.log("");
      filteredApp[0].operations.forEach((operation,index)=>console.log(index+1+" : "+operation));
      let selectedOperation = readLineSync.question('Select one operation from above \n');
      console.log("");
      while(selectedOperation>filteredApp[0].operations.length || selectedOperation==="0"){
        console.log("Please select valid Option");
        selectedOperation = readLineSync.question("Your Option: ");
        console.log("");
      }
      const result = selectedFunction(selectedApp,selectedOperation);
      return result;
    }
  }


const selectedFunction = (selectedApp,selectedOperation) =>{
  switch(selectedApp){
    case "1" : 
    const firstAppUrl = readLineSync.question("Please enter the url \n");
    if(selectedOperation === "1"){
      return encodeURIComponent(firstAppUrl);
    }else{
      return decodeURIComponent(firstAppUrl);
    }

    case "2" : 
    const secondAppUrl = readLineSync.question("Please enter the url \n");
    if(selectedOperation === "1"){
       return Buffer.from(secondAppUrl).toString('base64');;
     }else{
        return Buffer.from(secondAppUrl, 'base64').toString('ascii');
     }

    case "3" :
    const thirdAppUrl = readLineSync.question("Please enter the url \n");
    if(selectedOperation === "1"){
      return crypto.createHash('md5').update(thirdAppUrl).digest('hex');
    }else if(selectedOperation === "2"){
      return crypto.createHash('sha1').update(thirdAppUrl).digest('hex');
    }else if(selectedOperation === "3"){
      return crypto.createHash('sha256').update(thirdAppUrl).digest('hex');
    }else{
      return crypto.createHash('sha512').update(thirdAppUrl).digest('hex');
    }

   case "4":   
   if(selectedOperation === "1"){
     let millisecond = readLineSync.question("Please enter millisecond value \n");
      let humanDate =  new Date(Number(millisecond));
      return `{ Year : ${humanDate.getFullYear()}, Month : ${humanDate.getMonth()}, Date : ${humanDate.getDate()}, Hours : ${humanDate.getHours()}, Minutes : ${humanDate.getMinutes()}, Seconds: ${humanDate.getSeconds()}}`;

    }else{
      let date = readLineSync.question("Please enter the Date eg: 2019,2,3 \n");
      return Date.parse(date);
    }

  case "5" : 
  let fifthAppData = readLineSync.question("Enter the value \n");
  let filteredConverter = BinDecHexOct.filter(op => op.selectedOperation === selectedOperation);
  return parseInt(fifthAppData, filteredConverter[0].fromOperation).toString(filteredConverter[0].toOperation);

  case "6" : 
   if(selectedOperation === "1"){
     let red = readLineSync.question('Please enter red value \n');
     let green = readLineSync.question('Please enter green value \n');
     let blue = readLineSync.question('Please enter blue value \n');
     red = Number(red).toString(16);
     green = Number(green).toString(16);
     blue = Number(blue).toString(16);
     if (red.length == 1)
      red = "0" + red;
     if (green.length == 1)
      green = "0" + green;
     if (blue.length == 1)
      blue = "0" + blue;
     return "#" + red + green + blue;
   }else{
     let hex = readLineSync.question('Enter the Hexadecimal code eg: #202324\n')
     let red = 0, green = 0, blue = 0;
     if (hex.length == 4) {
      red = "0x" + hex[1] + hex[1];
      green = "0x" + hex[2] + hex[2];
      blue = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      red = "0x" + hex[1] + hex[2];
      green = "0x" + hex[3] + hex[4];
      blue = "0x" + hex[5] + hex[6];
    }  
    return "rgb("+ +red + "," + +green + "," + +blue + ")";
   }
  
  case "7" : 
  if(selectedOperation === "1"){
    const meter = readLineSync.question("Please enter meter value \n");
    return (meter/1000).toFixed(2);
  }else if(selectedOperation === "2"){
    const centimeter = readLineSync.question("Please enter centimeter value \n");
    return (centimeter/100000).toFixed(2);
  }else{
    const kilometer = readLineSync.question("Please enter kilometer value \n");
    return (kilometer*0.621371).toFixed(2);
  }
  }
}

console.log(utility(selectedApp));
