// Desafio 1
function compareTrue(a, b) {
  if (a === true && b === true) {
    return true;
  } else {
    return false;
  }
}

// Desafio 2
function calcArea(base, height) {
  return (base*height)/2;
}

// Desafio 3
function splitSentence(sentence) {
  let separatedSentence = sentence.split([" "]);
  return separatedSentence;
}

// Desafio 4
function concatName(arrayDeStrings) {
  let ultimoPrimeiro = arrayDeStrings[arrayDeStrings.length-1] + ", " + arrayDeStrings[0];
  return ultimoPrimeiro;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = wins*3 + ties;
  return points;
}

// Desafio 6
function highestCount(arrayNum) {
  let maior = arrayNum[0];
  for (let index = 0; index < arrayNum.length; index += 1) {
    if (maior < arrayNum[index]) {
      maior = arrayNum[index];
    }
  }
  let contMaior = 0;
  for (let index2 = 0; index2 < arrayNum.length; index2 += 1) {
    if (maior === arrayNum[index2]) {
      contMaior += 1;
    }
  }
  return contMaior;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (Math.abs(cat1 - mouse) === Math.abs(cat2 - mouse)) {
    return "os gatos trombam e o rato foge";
  } else if (Math.abs(cat1 - mouse) > Math.abs(cat2 - mouse)) {
    return "cat2";
  } else {
    return "cat1";
  }
}

// Desafio 8
function fizzBuzz(arrayNum) {
  let arrayFizzBuzz = [];
  for (let index = 0; index < arrayNum.length; index += 1) {
    if (arrayNum[index]%3 === 0 && arrayNum[index]%5 === 0) {
      arrayFizzBuzz.push("fizzBuzz");
    } else if (arrayNum[index]%3 === 0) {
      arrayFizzBuzz.push("fizz");
    } else if (arrayNum[index]%5 === 0) {
      arrayFizzBuzz.push("buzz");
    } else {
      arrayFizzBuzz.push("bug!");
    }
  }
  return arrayFizzBuzz;
}

// Desafio 9
function encode(stringToEncode) {
  let arrayToEncode = stringToEncode.split([,]);
  for (let index = 0; index < arrayToEncode.length; index += 1) {
    if (arrayToEncode[index] === "a") {
      arrayToEncode[index] = "1";
    } else if (arrayToEncode[index] === "e") {
      arrayToEncode[index] = "2";
    } else if (arrayToEncode[index] === "i") {
      arrayToEncode[index] = "3";
    } else if (arrayToEncode[index] === "o") {
      arrayToEncode[index] = "4";
    } else if (arrayToEncode[index] === "u") {
      arrayToEncode[index] = "5";
    }
  }
  let stringEncoded = arrayToEncode.join("");
  return stringEncoded;
}


function decode(stringToDecode) {
  let arrayToDecode = stringToDecode.split([,]);
  for (let index = 0; index < arrayToDecode.length; index += 1) {
    if (arrayToDecode[index] === "1") {
      arrayToDecode[index] = "a";
    } else if (arrayToDecode[index] === "2") {
      arrayToDecode[index] = "e";
    } else if (arrayToDecode[index] === "3") {
      arrayToDecode[index] = "i";
    } else if (arrayToDecode[index] === "4") {
      arrayToDecode[index] = "o";
    } else if (arrayToDecode[index] === "5") {
      arrayToDecode[index] = "u";
    }
  }
  let stringDecoded = arrayToDecode.join("");
  return stringDecoded;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
