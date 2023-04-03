const form = document.querySelector('#form');
const country = document.querySelector('#country');
const amount = document.querySelector('#amount');
const button = document.querySelector('#button');
const result = document.querySelector('#result');

const convertCurrencyFormat = (amount, format) => {
  const currencyUnit = format.substr(0, 1); // ₩ $ €
  const groupingSeparator = currencyUnit === '€' ? undefined : ','; // 정수부 3자리 구분자
  const maxFractionDigits = 2; // 소수부 자릿수 기본 값

  // 음수 관리
  let sign = ''; // '' 또는 '-'
  if (amount.toString().startsWith('-')) {
    sign = '-';
    amount = amount.toString().slice(1);
  }

  // 소수부 반올림
  const dec = Math.pow(10, maxFractionDigits); // 100
  let roundedNumber =
    dec === 1
      ? amount
      : (Math.round(parseFloat(amount) * dec) / dec).toString();

  // 정수부와 소수부 분리
  let integer = '';
  let decimal = '';

  roundedNumber.indexOf('.') === -1
    ? ((integer = roundedNumber.slice(0)), (decimal = ''))
    : ((integer = roundedNumber.slice(0, roundedNumber.indexOf('.'))),
      (decimal = roundedNumber.slice(roundedNumber.indexOf('.'))));

  // 소수점 이하 두자리가 아닌 경우에도 자릿수 맞추기
  if (format.slice(-1) === '0' && decimal.slice(1) / dec <= 0.1) {
    decimal =
      '.' + parseFloat(decimal.slice(1)).toFixed(maxFractionDigits).toString();
  } else if (format.slice(-1) !== '0') {
    decimal = '';
  }

  //정수부 3자리마다 , 추가
  if (currencyUnit !== '€') {
    let re = /(\d+)(\d{3})/;
    while (re.test(integer)) {
      integer = integer.replace(re, '$1' + groupingSeparator + '$2');
    }
  }

  result.textContent = sign + currencyUnit + integer + decimal;
};

button.addEventListener('click', () => {
  if (amount.value) {
    let format = '';
    switch (country.value) {
      case 'kr':
        format = '₩#,###';
        break;
      case 'us':
        format = '$#,###.#0';
        break;
      case 'eu':
        format = '€####.#0';
        break;
    }
    convertCurrencyFormat(amount.value, format);
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
});
