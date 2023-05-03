//#lime                             //#
/* 1. 메서드 */
let harry = {
  // 직원 1
  name: 'harry',
  salary: 90000,
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  },
};

let sally = {
  // 직원 2
  name: 'sally',
  salary: 110000,
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  },
};

harry.raiseSalary(10);
// this는 점 연산자 왼쪽의 객체를 참조함
// 화살표 문법에서는 동작하지 않음

function createEmployee(name, salary) {
  // 팩토리 함수
  return {
    name: name,
    salary: salary,
    raiseSalary(percent) {
      // 중복 메서드, 메모리 낭비
      this.salary *= 1 + percent / 100;
    },
  };
}

//#lime                             //#
/* 2. 프로토타입: 노출되지 않는 객체의 내부 슬롯
 * 클래스와 상속을 구현, 객체를 인스턴스화하고 동작을 바꾸는 데 사용함
 */
const employeePrototype = {
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  },
};

// 팩토리 함수+프로토타입 1
function createEmployee(name, salary) {
  const result = { name, salary };
  Object.setPrototypeOf(result, employeePrototype);
  return result;
}
const sally_ = createEmployee('sally', 3000);
Object.getPrototypeOf(sally_); // === sally_.__proto__
// 함수 내에서 result.prototype.greet = function ... 이런 식으로는 쓸 수 없음!

//#lime                             //#
/* 3. 생성자: 노출되지 않는 객체의 내부 슬롯 */
// 프로토타입 설정
const EmployeePrototype = {
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  },
};

// 팩토리 함수+프로토타입 2
function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
  Object.setPrototypeOf(this, EmployeePrototype);
}
// Employee.prototype = EmployeePrototype

const harry_ = new Employee('Harry', 90000);
Object.getPrototypeOf(harry_);
// this는 새로 만든 객체 harry_

/* 단계별 톺아보기
1. new 연산자가 새로운 객체를 만듦
2. 새 객체의 [[Prototype]] 내부 슬롯을 Employee.prototype 객체로 설정
3. new 연산자가 this, name, salary 세 매개변수로 생성자 함수를 호출
4. Employee 함수 본문에서 this 매개변수를 이용해 객체 프로퍼티를 설정
5. 생성자 함수 실행이 끝나면 new 연산자는 완전히 초기화된 객체를 값으로 갖게 됨
6. harry 변수는 객체 레퍼런스로 초기화됨
*/

//#lime                             //#
/* 4. 클래스 문법
클래스: 생성자 함수, 같은 메서드를 포함하는 객체의 집합, 즉 인스턴스끼리의 공통 동작은 프로토타입으로 구현될 뿐 */
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  }
}
// 클래스는 추상적 개념, 여기서 class 키워드를 사용했지만 Employee가 선언되었을 뿐 지금까진 실제 클래스가 존재하지 않음
// constructor는 class 내에 하나만 존재 가능, 명시하지 않으면 빈 constructor가 자동 생성됨
// 일반 함수와 다르게 호이스팅 되지 않으므로 인스터스를 만들기 위해 먼저 선언이 필요함
// 일반 객체와 다르게 메서드 선언을 쉼표로 분리하지 않아도 됨

//#lime                             //#
/* 5. 게터 & 세터 */
class Person {
  constructor(last, first) {
    this.last = last;
    this.first = first;
    // this.fullName = '중복된 프로퍼티 네임!!' // 당연히 이딴 짓은 할 수 없다. 그리고 에러는 인스턴스를 만든 후에 난다...
  }
  get fullName() {
    // 게터: 동적으로 프로퍼티를 계산
    return `${this.last}, ${this.first}`;
  }

  set newName(value) {
    // 세터: 동적으로 프로퍼티를 세팅, 반드시 인자를 하나 받아야 함
    const parts = value.split(/,\s*/);
    this.last = parts[0];
    this.first = parts[1];
  }
}

const mary = new Person('Gold', 'Mary');
mary.fullName; // 'Gold, Mary'
/* 
mary = {
  first: 'Mary',
  last: 'Gold',
  fullName: 'Gold, Mary'
  [[Prototype]]
}
 */

mary.newName = '골드, 마리'; //
/* 
mary = {
  first: '마리',
  last: '골드',
  fullName: '골드, 마리'
  [[Prototype]]
}
 */

//#lime                             //#
/* 6. 인스턴스 필드와 비공개 메서드 */
class BankAccount {
  constructor() {
    this.balance = 0;
  }
  deposit(amount) {
    this.balance += amount;
  }
}
// =
class BankAccount {
  balance = 0;
  deposit(amount) {
    this.balance += amount;
  }
}
// 비공개 프로퍼티(메서드)
class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  #getBalance() {
    console.log(this.#balance);
  }
}

// bank.#balace
// caught Error: Private identifiers are not allowed outside class bodies.

//#lime                             //#
/* 7. 정적 메서드와 필드 */
class BankAccount {
  static percentOf(amount, rate) {
    return (amount * rate) / 100;
  } // 정적메서드: 인스턴스에서 작동하지 않음 = 상속되지 않음

  addInterest(rate) {
    this.balance += BankAccount.percentOf(this.balance, rate);
  }
}

const bankAccount = new BankAccount();
bankAccount.percentOf(10000, 10); // error!
BankAccount.percentOf(10000, 10); // 1000

BankAccount.OVERDRAFT_FEE = 30;

//#lime                             //#
/* 8. 서브 클래스 */
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  }
  getSalary() {
    return this.salary;
  }
}

class Manager extends Employee {
  constructor(name, salary, bonus) {
    super(name, salary); // super가 반드시 필요!, constructor 표기 생략시엔 같이 자동 생성됨
    this.bonus = bonus;
  }

  getSalary() {
    return this.salary + this.bonus;
  }
}

const boss = new Manager('Mr.black', 10000);
boss.raiseSalary(100);
boss instanceof Employee; // true

//#lime                             //#
/* 9. 메서드 오버라이드 */
const employee = new Employee();
const manager = new Manager();

employee.getSalary(); // salary
manager.getSalary(); // salary + bonus
// 다형성: 참조 객체에 따라 다른 메서드가 호출되는 현상, 검색하는 프로토타입이 다르기 때문에 결과도 달라짐

// 서브클래스에서 슈퍼클래스의 메서드 참조도 가능,
// 이 때 서브클래스의 프로토타입은 탐색하지 않음
class Manager extends Employee {
  getSalary() {
    // 메서드 오버라이드
    return super.getSalary() + this.bonus; // salary + bonus
  }

  get salary() {
    // 게터 오버라이드
    return super.salary + this.bonus;
  }
}

//#lime                             //#
/* 10. 클래스 표현식(익명 클래스 활용) */
class base {
  constructor() {
    /* ... */
  }
  method() {
    /* ... */
  }
}

const withToString = base =>
  class extends base {
    toString() {
      let result = '{';
      for (const key in this) {
        if (result !== '{') result += ',';
        result += `${key}=${this[key]}`;
      }
      return result + '}';
    }
  };

//#lime                             //#
/* 11. this 레퍼런스 */
const price = Number('19.95'); // 19.95
const zero = new Number(0); // undefined, 새 객체 생성
const emp = Employee; // error!
const emp_ = new Employee(); // 새 객체 생성

// 객체 없이 메서드 호출시 this = undefined
const doLater = (what, arg) => {
  setTimeout(() => what(arg), 1000);
};

doLater(BankAccount.prototype.deposit, 500);

setTimeout(() => {
  BankAccount.prototype.deposit(500);
}, 1000);

// 중첩 함수(콜백) 내의 this = undefined
class BankAccount {
  // ...
  spreadTheWealth(accounts) {
    accounts.forEach(function (account) {
      account.deposit(this.balance / accounts.length); // error!
    });
    this.balance = 0;
  }
}

// 화살표 함수 내의 this는 함수 외부의 this로 연결됨
class BankAccount {
  // ...
  spreadTheWealth(accounts) {
    accounts.forEach(account => {
      account.deposit(this.balance / accounts.length);
      // spreadTheWealth 메서드를 호출하는 BankAccount 객체를 가리킴
    });
    this.balance = 0;
  }
}
// this를 동적으로 연결하면 문제가 발생할 수 있으므로 function으로 정의한 함수 내에서는 this를 쓰지 않는 게 좋음
// 메서드, 생성자, 메서드와 생성자 내에서 정의한 화살표 함수에서만 사용하는 게 안전함

// 💯
// 1 팩토리 함수
function createPoint(x, y) {
  return {
    x,
    y,
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    translate(moveX, moveY) {
      this.x += moveX;
      this.y += moveY;
    },
  };
}

// 2 생성자 함수와 프로토타입
function createPoint(x, y) {
  return {
    x,
    y,
  };
}

function pointPrototype() {
  return {
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    translate(moveX, moveY) {
      this.x += moveX;
      this.y += moveY;
    },
  };
}

Object.setPrototypeOf(createPoint, pointPrototype);

// 3 클래스 문법
class CreatePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  translate(moveX, moveY) {
    this.x += moveX;
    this.y += moveY;
  }
}

// 4 게터와 세터
function createPoint(x = 0, y = 0) {
  return {
    x,
    y,
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    get currentPoint() {
      return { x: this.x, y: this.y };
    },
    set newPoint([newX, newY]) {
      (this.x = newX), (this.y = newY);
    },
    translate(moveX, moveY) {
      this.x += moveX;
      this.y += moveY;
    },
  };
}

const cp = createPoint();
cp.currentPoint; // {x: 0, y: 0}
cp.newPoint = [10, 10]; // {x: 10, y: 10}

// 5 프로토타입
function createGreetable(str) {
  this.result = new String(str);
}
createGreetable.prototype.greet = function (greeting) {
  return `${greeting}, ${this.result}!`;
};

const g = new createGreetable('World');
console.log(g.greet('Hello'));

/* 단계별 톺아보기
1. new 연산자가 새로운 객체를 만듦
2. 새 객체의 [[Prototype]] 내부 슬롯을 createGreetable.prototype 객체로 설정
3. new 연산자가 this, str 매개변수로 생성자 함수를 호출
4. createGreetable 함수 본문에서 this 매개변수를 이용해 객체 프로퍼티를 설정
5. 생성자 함수 실행이 끝나면 new 연산자는 완전히 초기화된 객체를 값으로 갖게 됨
6. g 변수는 객체 레퍼런스로 초기화됨
*/

// 6 클래스 표현식(익명 클래스)
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  }
}

const withGreeter = base =>
  class extends base {
    greet(greeting) {
      console.log(this);

      return `${greeting}, ${this.name}!`;
    }
  };

const GreetableEmployee = withGreeter(Employee);
const e = new GreetableEmployee('Harry Smith', 90000);
console.log(e.greet('Hello'));

// 7 비공개 인스턴스 필드
class Employee {
  #name = '';
  #salary = 0;

  constructor(name, salary) {
    this.#name = name;
    this.#salary = salary;
  }
  raiseSalary(percent) {
    this.salary *= 1 + percent / 100;
  }
}

// ...

// 9 정적 메서드를 가진 클래스
class Random {
  static nextInt(low, high) {
    return ~~(Math.random() * (high - low) + low);
  }
  static nextElement(array) {
    const i = ~~(Math.random() * array.length);
    return array[i];
  }
}

// 10 서브클래스 생성, 상속, 오버라이드
class BankAccount {
  constructor() {
    this.balance = 0;
  }

  deposit(amount) {
    this.balance += amount;
  }
}

class SavingsAccount extends BankAccount {
  constructor() {
    super();
    this.interest = 0;
  }
  addInterest() {
    this.interest += this.balance / 100;
  }
  deposit(amount) {
    super.deposit(amount); // this.balance += amount;
    this.addInterest();
  }
}

class CheckingAccount extends BankAccount {
  withdrawal(amount) {
    const charge = amount / (100 * 3);
    this.balance -= amount + charge;
  }
}

// 11 프로토타입 체인으로 구현된 상속 벤다이어그램
/* 
⚪: Object
🏛️: BankAccount
👛: SavingsAccount, instance: 🔴
💸: CheckingAccount, instance: 🟡

🔴 → 👛 → 
           🏛️ → ⚪
🟡 → 💸 → 
*/

// 12 함수 내 this
const button = document.getElementById('button1');
button.addEventListener('click', function () {
  this.classList.toggle('clicked');
});
// 동작함

button.addEventListener('click', () => {
  this.classList.toggle('clicked');
});
// 동작 안 함. 화살표 함수 내 this는 전역 객체인 window를 가리킨다. function 키워드를 사용해야 함수를 호출한 대상 객체를 가리킬 수 있다.

button.addEventListener('click', e => {
  e.target.classList.toggle('clicked');
});
// 이렇게 개선할 수 있다. this, event 매개변수를 사용하지 않는다면

button.addEventListener('click', () => {
  button.classList.toggle('clicked');
});
// 이렇게 해도 된다.

// 13 this 레퍼런스
class BankAccount {
  constructor() {
    console.log(1, this);

    this.balance = 0;
  }

  deposit(amount) {
    console.log(2, this);

    this.balance += amount;
  }
}

const action1 = BankAccount.prototype.deposit;
BankAccount.prototype.deposit(1000); // ok
action1(1000); // error!
/* 이유:
 * BankAccount.prototype.deposit(1000)로 호출시 점연산자를 타고 BankAccount 생성자 함수(객체)를 가리키므로 에러는 나지 않음
 * action1(1000)에서 객체 생성 없이 추상 클래스 내에서 함수를 호출했기 때문에 this가 가리키는 대상이 undefined임
 */
const harrysAccount = new BankAccount();
const action2 = harrysAccount.deposit;
harrysAccount.deposit(1000); // ok
action2(1000); // error!
/* 이유:
 * harrysAccount.deposit(1000)로 호출시 this는 BankAccount를 가리키고 프로토타입 체인을 통해 BankAccount에서 deposit 메서드를 검색하여 정상 실행함
 * action2(1000)에서 FIXME:
 */

// ...
