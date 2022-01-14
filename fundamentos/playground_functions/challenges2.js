// Desafio 10
function techList(tech, name) {
  let techLearn = [];
    
  if (tech.length < 1) {
      return 'Vazio!'
  } else {
      let techOrder = tech.sort();
      for (let index = 0; index < techOrder.length;  index += 1) {
        techLearn.push({
          tech: techOrder[index],
          name: name
        })
      }
    }
  return techLearn;
}


// Desafio 11
function generatePhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 11) {
    return "Array com tamanho incorreto."
  }
  for (let index = 0; index < phoneNumber.length; index += 1) { 
    let sameCheck = 1;
    for (let index2 = 1; index2 < phoneNumber.length; index2 += 1) {
      if (phoneNumber[index] > 9 || phoneNumber[index] < 0) {
        return "não é possível gerar um número de telefone com esses valores";
      } else if (index === index2) {
        sameCheck = sameCheck;
      } else if (phoneNumber[index] === phoneNumber[index2]) {
        sameCheck += 1;
      }
  }
      if (sameCheck >= 3) {
          return "não é possível gerar um número de telefone com esses valores";
      
      }
  }
  let phoneNumberString = phoneNumber.join("");
  let result = "(" + phoneNumberString.slice(0,2) + ") " + phoneNumberString.slice(2,7) + "-" + phoneNumberString.slice(7,11);
  return result;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < lineB+lineC && lineB < lineA+lineC && lineC < lineA+lineB && lineA > Math.abs(lineB-lineC) && lineB > Math.abs(lineA-lineC) && lineC > Math.abs(lineA-lineB)) {
    return true;
  } else {
    return false;
  }
}
console.log(triangleCheck(10,14,8));

// Desafio 13
function hydrate(beveragesQnt) {
  let regex = /[0-9]/g;
  let stringsOfNumbers = beveragesQnt.match(regex);
  let justNumbers = [];
  let sum = 0;
  for (let number of stringsOfNumbers) {
    let integer = parseInt(number);
    justNumbers.push(integer);
  }
  for (let number2 of justNumbers) {
    sum += number2;
  }
  if (sum === 1) {
  return sum + " copo de água";
  } else {
  return sum + " copos de água";
  }
} 


module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
