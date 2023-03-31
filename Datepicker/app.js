const $ = selector => document.querySelector(selector);
const input_date = $('#input_date');
const div_calendar = $('#div_calendar');
const input_year = $('#input_year');
const input_month = $('#input_month');
const tbody_calendar = $('#tbody_calendar');

let current_year = new Date().getFullYear();
let current_month = new Date().getMonth() + 1;

const checkLeapYear = year => {
  // true = 윤년, false = 평년
  if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else if (year % 4 == 0) {
    return true;
  } else return false;
};

const setDate = day => {
  let month = current_month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);
  input_date.value = `${current_year}-${month}-${day}`;
  div_calendar.style.display = 'none';
};

const renderCalendar = calendar => {
  let html = [];
  for (let i = 0; i < calendar.length; i++) {
    if (i == 0) html.push(`<tr>`);
    else if (i % 7 == 0) html.push(`</tr> <tr>`);
    html.push(`<td onclick="setDate(${calendar[i]});">${calendar[i]}</td>`);
  }
  html.push(`</tr>`);
  tbody_calendar.innerHTML = html.join('');
};

const changeYearMonth = (year, month) => {
  let lastday_of_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  month == 2 && checkLeapYear(year) && (lastday_of_month[1] = 29);
  let calendar_arr = [];
  let blank_front = new Date(`${year}-${month}-01`).getDay();
  for (let i = 0; i < blank_front; i++) {
    calendar_arr.push('');
  }
  for (let i = 1; i <= lastday_of_month[month - 1]; i++) {
    calendar_arr.push(i);
  }
  let blank_back = 7 - (calendar_arr % 7);
  if (blank_back < 7) {
    for (let i = 0; i < blank_back; i++) {
      calendar_arr.push('');
    }
  }
  renderCalendar(calendar_arr);
};

const updateInput = (year, month) => {
  input_year.value = year;
  input_month.value = month;
  changeYearMonth(year, month);
};

const changeYear = () => {
  current_year = input_year.value;
  updateInput(current_year, current_month);
};

const changeMonth = diff => {
  diff == -1 || diff == 1
    ? (current_month = current_month + diff)
    : (current_month = parseInt(input_month.value));

  current_month == 0 &&
    ((current_year = current_year - 1), (current_month = 12));
  current_month == 13 &&
    ((current_year = current_year + 1), (current_month = 1));
  updateInput(current_year, current_month);
};

input_year.value = current_year;
input_month.value = current_month;

input_year.addEventListener('change', changeYear);
input_month.addEventListener('change', changeMonth);

input_date.addEventListener('click', () => {
  div_calendar.style.display =
    div_calendar.style.display == 'none' ? '' : 'none';
});

changeYearMonth(current_year, current_month);
