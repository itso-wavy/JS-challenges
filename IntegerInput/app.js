const input = document.querySelector('#input');
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
  for (let key in allowedKeys) {
    if (e.keyCode == allowedKeys[key]) {
      display.style.display = 'block';
      text.innerText = e.key;
    } else if (
      !(48 <= e.keyCode && e.keyCode <= 57) &&
      !(97 <= e.keyCode && e.keyCode <= 105)
    )
      e.preventDefault(); // keyup으로 이어지지 않도록 이벤트 중단
  }
};

const checkChar = e => {
  e.target.value = e.target.value.replace(/[^\d]/gi, '');
};

input.addEventListener('keydown', checkInt);
input.addEventListener('keyup', checkChar);
