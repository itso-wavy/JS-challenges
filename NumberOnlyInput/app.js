const display = document.querySelector('#display');
const text = document.querySelector('#text');

const allowedKeys = {
  backspace: 8,
  leftarrow: 37,
  rightarrow: 39,
  delete: 46,
};

const checkInt = e => {
  display.style.display = 'none';
  const keycode = new RegExp(e.keyCode);
  if (keycode.test(Object.values(allowedKeys))) {
    display.style.display = 'block';
    text.innerText = e.key;
  } else if (
    !(48 <= e.keyCode && e.keyCode <= 57) &&
    !(97 <= e.keyCode && e.keyCode <= 105)
  ) {
    e.preventDefault(); // keyup으로 이어지지 않도록 이벤트 중단
  }
};

const checkFloat = e => {
  display.style.display = 'none';
  const keycode = new RegExp(e.keyCode);
  if (keycode.test(Object.values(allowedKeys)) || e.keyCode == 190) {
    display.style.display = 'block';
    text.innerText = e.key;
  } else if (
    !(48 <= e.keyCode && e.keyCode <= 57) &&
    !(97 <= e.keyCode && e.keyCode <= 105)
  ) {
    e.preventDefault();
  }
};

const checkChar = e => {
  e.target.value = e.target.value.replace(/[^\d\.]/gi, '');
};

const setField = (eleId, type) => {
  const input = document.getElementById(eleId);
  switch (type) {
    case 'int':
      input.addEventListener('keydown', checkInt);
      break;
    case 'float':
      input.addEventListener('keydown', checkFloat);
      break;
  }
  input.addEventListener('keyup', checkChar);
};

setField('int-input', 'int');
setField('float-input', 'float');
