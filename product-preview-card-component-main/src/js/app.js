const addBtn = document.querySelector('.btn-add');
const productTit = document.querySelector('.product-tit').innerText;
const productQty = document.querySelector('.product-qty');
const shoppingList = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {};

addBtn.addEventListener('click', () => {
  if (typeof Storage !== 'undefined') {
    // 브라우저 storage 지원 여부 확인
    !shoppingList[productTit] && (shoppingList[productTit] = 0);
    shoppingList[productTit] = shoppingList[productTit] + 1;
    // localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(shoppingList));
    productQty.textContent = shoppingList[productTit];
  }
});
