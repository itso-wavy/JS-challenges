// 1️⃣ closer: 자유변수를 포함하는 함수
// ➰ 자유변수: 매개변수나 지역 변수로 선언되지 않은 다른 변수

const func = (txt, time) => {
  console.time(txt);
  const innerfunc = () => {
    console.timeEnd(txt);
  };
  setTimeout(innerfunc, time);
};
func('hello', 1000);
func('bye', 1000);

// 캡처한 변수의 값을 바꾸면 클로저에도 반영됨
// 즉 함수 내 자유변수는 외부와 같은 값을 갖음
let txt = 'good';
setTimeout(() => console.log(txt), 1000); // 'bad'
txt = 'bad';

// ➰ 하드 객체(클로저 패턴, 팩토리 클래스 패턴)
const createAccount = (balance = 0) => {
  // 팩토리 함수
  balance += 0;
  return {
    deposit: amount => {
      balance += amount;
      console.log(balance);
    },
    withdraw: amount => {
      console.log(balance);
    },
    withdraw: amount => {
      console.log(balance);
    },
    withdraw: amount => {
      if (balance >= amount) balance -= amount;
      console.log(balance);
    },
    getBalance: () => console.log(balance),
  };
};

const harrysAccount = createAccount();
const sallysAccount = createAccount(300);
sallysAccount.deposit(500);

// 2️⃣ 호이스팅: 선언이 스코프의 최상단으로 끌어올려진 것과 같은 현상
// 변수나 함수를 선언하기 전에 값을 저장할 수 있는 메모리 공간이 확보됨
function doStuff() {
  function localWork() {
    console.log(someVariable);
  }
  let someVariable = 42;
  localWork(); // 42
}

// 3️⃣ 예외 처리
// ➰ Error 객체
function func() {
  throw Error('메세지'); // caught Error: 메세지
  // 함수 즉시 종료 + catch / finally 절 실행
}

// ➰ 에러 핸들링: catch / finally
try {
  throw Error('에러1');
} catch (e) {
  console.error(e); // Error: 에러1
}

try {
  // try문 내 try문
  try {
    throw Error('에러2');
  } catch (e) {
    console.error(e); // Error: 에러2
    throw e; // 에러 다시 던지기 -> 코드 블럭 밖으로
  }
} catch (e) {
  console.log('rethrow 에러 잡았다!'); // rethrow 에러 잡았다!
} finally {
  console.log('에러 처리 끝!');
}

//💯 ...

// 4 sort 구현
const arr = [5, 2, 3, 1, 4];
const arr2 = [
  { name: 'a', age: 30 },
  { name: 'b', age: 80 },
  { name: 'c', age: 50 },
];
const arr3 = ['citron', 'apple', 'banana'];

arr.sort((a, b) => b - a); // [5, 4, 3, 2, 1]

arr2.sort((a, b) => a.age - b.age);
/*
[
  { name: 'a', age: 30 },
  { name: 'c', age: 50 },
  { name: 'b', age: 80 },
];
*/

arr3.sort((a, b) => a.length - b.length); // ['apple', 'citron', 'banana']

// 5 하드 객체
const myFirstCounter = CounterFactory(0, 2);
myFirstCounter.count(); // 2
myFirstCounter.count(); // 4

function CounterFactory(num1 = 0, num2 = 1) {
  let counter = num1; // 자유변수 num1
  function count() {
    counter += num2;
    console.log(counter);
  }
  return { count };
}

// ...

// 10 클로저와 호이스팅
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 1000 * i);
} // 10 * 10
/* var는 함수 레벨 스코프를 가지므로 호이스팅되어 setTimeout 함수 실행시 10으로 평가된다.
원하는 결과를 얻기 위해서는 스코프를 변경해야 하므로 let 선언자를 사용
 */
for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 1000 * i);
} // 1 2 3 ... 9

// 11 호이스팅과 재귀함수
const fac = n => (n > 1 ? n * fac(n - 1) : 1);
// fac(n - 1)이 선언되기 전에 메모리를 확보하므로 에러가 나지 않는다

// ...
