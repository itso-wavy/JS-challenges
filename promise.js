// Promise.all
const data = { key1: 'value1', key2: 'value2' };
const promise1 = new Promise(resolve => resolve(data)).then(res => res.key1);
const promise2 = new Promise(resolve => resolve(data)).then(res => res.key2);

Promise.all([promise1, promise2]).then(values => {
  const [data1, data2] = values; // ["value1", "value2"]
  console.log(data1);
  console.log(data2);
  console.log(data1 + data2); // promise로 얻어낸 데이터 핸들링
  // 콜백 지옥...
});

// 콜백 지옥 피하기(async, await + function)
async function fetchData() {
  const data = { key1: 'value1', key2: 'value2' };
  const promise1 = new Promise(resolve => resolve(data)).then(res => res.key1);
  const promise2 = new Promise(resolve => resolve(data)).then(res => res.key2);

  const values = await Promise.all([promise1, promise2]).then(values => values);

  const [data1, data2] = values;
  console.log(data1);
  console.log(data2);
  console.log(data1 + data2); // promise로 얻어낸 데이터 핸들링
}
fetchData();

async function fetchData2() {
  const data = { key1: 'value1', key2: 'value2' };
  const promise1 = new Promise(resolve => resolve(data)).then(res => res.key1);
  const promise2 = new Promise(resolve => resolve(data)).then(res => res.key2);

  return await Promise.all([promise1, promise2]).then(values => values);
}
const values = await fetchData2();
const [data1, data2] = values;
console.log(data1);
console.log(data2);
console.log(data1 + data2); // promise로 얻어낸 데이터 핸들링
