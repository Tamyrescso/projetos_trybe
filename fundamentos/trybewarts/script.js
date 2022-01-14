function validateLogin() {
  const emailValue = document.getElementById('email').value;
  const passValue = document.getElementById('password').value;

  if (emailValue === 'tryber@teste.com' && passValue === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

const btnLogin = document.getElementById('btn-enter');
btnLogin.addEventListener('click', validateLogin);

const checkAgreement = document.getElementById('agreement');

function enableButton() {
  const btnSubmit = document.getElementById('submit-btn');
  if (checkAgreement.checked === false) {
    btnSubmit.disabled = true;
  } else {
    btnSubmit.disabled = false;
  }
}

checkAgreement.addEventListener('change', enableButton);

function removeCounter() {
  const counterParent = document.getElementById('counter-parent');
  const counterText = document.getElementById('counter');
  counterParent.removeChild(counterText);
}

function countTextarea() {
  const comment = document.getElementById('textarea');
  const commentValueSize = comment.value.length;
  const currentQnt = 500 - commentValueSize;
  return currentQnt;
}

function insertCounter() {
  removeCounter();
  const counterParent = document.getElementById('counter-parent');
  const newP = document.createElement('p');
  newP.innerText = countTextarea();
  newP.id = 'counter';
  counterParent.appendChild(newP);
}

const commentText = document.getElementById('textarea');
commentText.addEventListener('keyup', insertCounter);

function addSelectedTech(event) {
  const targetClass = event.target.classList;
  if (targetClass.contains('s-tech')) {
    targetClass.remove('s-tech');
  } else {
    targetClass.add('s-tech');
  }
}

const techOptions = document.getElementById('grid');
techOptions.addEventListener('change', addSelectedTech);

function addSelectedFamily(event) {
  const currentFamily = document.querySelector('.s-family');
  const targetClass = event.target.classList;
  if (currentFamily === null) {
    targetClass.add('s-family');
  } else {
    currentFamily.classList.remove('s-family');
    targetClass.add('s-family');
  }
}

const parentFamily = document.getElementById('family');
parentFamily.addEventListener('change', addSelectedFamily);

function addSelectedRate(event) {
  const currentRate = document.querySelector('.s-rate');
  if (currentRate === null) {
    event.target.classList.add('s-rate');
  } else {
    currentRate.classList.remove('s-rate');
    event.target.classList.add('s-rate');
  }
}

const parentRate = document.getElementById('rate');
parentRate.addEventListener('change', addSelectedRate);

function outputDiv(key, value) {
  const output = document.getElementById('output');
  output.style.display = 'block';
  const paragraph = document.createElement('p');
  paragraph.innerText = key + value;
  output.appendChild(paragraph);
}

function getInputFirstPart() {
  const name = document.getElementById('input-name').value;
  const lastName = document.getElementById('input-lastname').value;
  const email = document.getElementById('input-email').value;
  const house = document.getElementById('house').value;
  const fullName = `${name} ${lastName}`;

  outputDiv('Nome: ', fullName);
  outputDiv('Email: ', email);
  outputDiv('Casa: ', house);
}

function getInputSecondPart() {
  const family = document.querySelector('.s-family').value;

  const subject = document.getElementsByClassName('s-tech');
  const techs = [];
  for (let index = 0; index < subject.length; index += 1) {
    techs.push(subject[index].value);
  }
  const subjects = techs.join(', ');
  outputDiv('Família: ', family);
  outputDiv('Matérias: ', subjects);
}

function getInputLastPart() {
  const rate = document.querySelector('.s-rate').value;
  const comment = document.getElementById('textarea').value;

  outputDiv('Avaliação: ', rate);
  outputDiv('Observações: ', comment);
}

function prevent(event) {
  event.preventDefault();

  getInputFirstPart();
  getInputSecondPart();
  getInputLastPart();
}

const btnSend = document.getElementById('submit-btn');
btnSend.addEventListener('click', prevent);
