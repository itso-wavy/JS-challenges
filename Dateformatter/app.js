const picked_input = document.querySelector('#picked_input');
const current_input = document.querySelector('#current_input');
const kr_span = document.querySelector('#kr_span');
const us_span = document.querySelector('#us_span');
const gb_span = document.querySelector('#gb_span');

const DATE_FORMAT = {
  kr: 'YYYY-MM-DD',
  us: 'MM-DD-YYYY',
  gb: 'DD-MM-YYYY',
};

const renderDate = date_box => {
  kr_span.textContent = date_box.kr;
  us_span.textContent = date_box.us;
  gb_span.textContent = date_box.gb;
};

const getFormattedDate = date => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const day = date.getDate().toString().padStart(2, 0);
  return { year, month, day };
};

const getPickedDate = date => {
  const { year, month, day } = getFormattedDate(date);
  const date_box = {};
  for (let key in DATE_FORMAT) {
    let new_date = DATE_FORMAT[key];
    new_date = new_date.replace('YYYY', year);
    new_date = new_date.replace('MM', month);
    new_date = new_date.replace('DD', day);
    date_box[key] = new_date;
  }
  renderDate(date_box);
};

function getIntervalDate(date, INTERVAL) {
  const MilliSEC_DAY = 60 * 60 * 24 * 1000;
  const picked_date = new Date(
    new Date(date).getTime() - MilliSEC_DAY * INTERVAL
  );
  return getFormattedDate(picked_date);
}

const INTERVAL = 7;
const date = new Date();

const getInitialSetting = () => {
  const { year, month, day } = getFormattedDate(date);
  current_input.value = `${year}-${month}-${day}`;
  const {
    year: year2,
    month: month2,
    day: day2,
  } = getIntervalDate(current_input.value, INTERVAL);
  picked_input.value = `${year2}-${month2}-${day2}`;
};

getInitialSetting();
getPickedDate(date);
picked_input.addEventListener('change', () => {
  const date = new Date(picked_input.value);
  getPickedDate(date);
});
