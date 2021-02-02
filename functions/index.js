const functions = require("firebase-functions");
const express = require("express");
const app=express();
const ops={
  add: "+",
  sub: "-",
  mul: "*",
  div: "\\",
};

const loggData=[];
let res=0;
app.get("/", (request, response)=>{
  response.send("Welcome to the calculator API");
});


app.get("/calApi", (request, response)=>{
  const number1=Number(request.param("num1"));
  const number2=Number(request.param("num2"));
  const operator=ops[request.param("oper")];

  if (isNaN(number1) || isNaN(number2)) {
    response.send("WARNING,Numbers are not in the number format");
  } else if (operator ==null) {
    response.send("WARNING,Enter the correct operator");
  } else {
    switch (operator) {
      case "+":
        response.send(addN(number1, number2));
        break;

      case "-": response.send(substractN(number1, number2));
        break;
      case "*": response.send(multiplyN(number1, number2));
        break;

      case "\\": response.send(divisionN(number1, number2));
        break;
      default: console.log("hiiiii");
    }
  }

  function addN(number1, number2) {
    res=number1+number2;
    if (res<0) {
      res= res *(-1);
    }
    logg(number1, number2, res);
    return ("value is "+res+"<br/>"+number1+" "+operator+number2+" ="+res);
  }

  function substractN(number1, number2) {
    res=number1-number2;
    logg(number1, number2, res);
    return ("value is "+res+"<br/>"+number1+" "+operator+number2+" ="+res);
  }


  function multiplyN(number1, number2) {
    res=number1*number2;
    logg(number1, number2, res);

    return ("value is "+res+"<br/>"+number1+" "+operator+number2+" ="+res);
  }


  function divisionN(number1, number2) {
    if (number2==0) {
      response.send("ERROR YOU CANNOT DIVIDE BY 0");
    } else {
      res=number1/number2;
      logg(number1, number2, res);
      return ("value is "+res+"<br/>"+number1+" "+operator+number2+" ="+res);
    }
  }


  function logg(number1, number2, res) {
    loggData.push(""+number1+" "+operator+number2+" ="+res);
    console.log(loggData);
  }
}
);

app.get("/displayLog", (request, response)=>{
  response.send("Log Data is as follows <br/>"+loggData+"<br>");
});

app.get("/displayLastTen", (request, response)=>{
  const arry=[];
  let leng=0;

  if (loggData.length>=10) {
    leng=10;
  } else {
    leng=loggData.length;
  }

  console.log(leng);
  for (let i=0; i<leng; i++) {
    arry.push(loggData[i]);
  }

  response.send("Last 10 log Data is as follows <br/>"+arry);
});
app.listen(8080);


exports.app = functions.https.onRequest(app);
