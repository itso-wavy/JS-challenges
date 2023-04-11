const userLanguage = document.querySelector('#i18n');

const i18n = {
  en: {
    'Order List': 'Order List',
    Search: 'Search',
    Text: 'Lorem ipsum dolor sit amet.',
  },
  ko: {
    'Order List': '주문 목록',
    Search: '조회',
    Text: '청춘이 파란 패, 이런 오는 별이 별 있습니다.',
  },
};

const i18n2 = {
  en: {
    'product-desc': `product name: {productName}<br>
    description: {description}<br>
    price: {price}`,
  },
  ko: {
    'product-desc': `상품명: {productName}<br>
    상품 소개: {description}<br>
    가격: {price}`,
  },
};

const data = {
  id: '1',
  productName: 'excellent fly swatter',
  description: "If you get hit by this, you'll be sick!",
  price: '10,000',
};

/**
 * 다국어 번역 문자열 내 중괄호 안의 key와 동일한 오브젝트 데이터의 key를 찾아서 그 값으로 치환하는 함수
 * @param {String} form - 다국어 번역 문자열
 * @param {Object} params - 다국어 번역 내용 중 특정 내용을 치환하기 위한 오브젝트 데이터
 * @returns 다국어 적용 문자열
 */
const translate = (form, params = {}) => {
  return form.replace(/{[^}]*}/g, key => params[key.slice(1, -1)]);
};

const koText = translate(i18n2['ko']['product-desc'], data);
const enText = translate(i18n2['en']['product-desc'], data);

const loadTranslation = () => {
  const i18ns = document.querySelectorAll('[data-i18n]');
  for (let ele of i18ns) {
    ele.innerText = i18n[userLanguage.value][ele.getAttribute('data-i18n')];
  }
  document.querySelector('.productbox').innerHTML =
    userLanguage.value == 'ko' ? koText : enText;
};

userLanguage.addEventListener('change', loadTranslation);
window.addEventListener('load', loadTranslation);
