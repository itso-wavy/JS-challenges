// ...

// 2 블록문
if (x === 0) console.log('zero');
else console.log('nonzero');

// ...

// 4 비교연산자
undefined < undefined; // false
undefined < null; // false
undefined < 0; // false
undefined < ''; // false
null < null; // false
null < 0; // false
null < ''; // false
0 < 0; // false
0 < ''; // false
'' < ''; // false

undefined === undefined; // true
null === null; // true
0 === 0; // true
'' === ''; // true

undefined == null; // true
undefined === null; // false
undefined == 0; // false
undefined == ''; // false
null == 0; // false
null == ''; // false
0 == ''; // true
0 === ''; // false

// ...

// 7 for...in문
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
for (i in arr) {
  if (i + 1 === 10) console.log(a[i]);
}
// arr가 a로 표기됨, i는 문자열이므로 i+1 = 11,21,31,...
// =>
for (i in arr) {
  if (~~i + 1 === 10) console.log(arr[i]);
}

//...

// 10
i = 0;
s = 'television'; // s.length === 10

do {
  i++;
} while (i < s.length && s[i] != ' ');
// =>
i++;
while (i < s.length && s[i] != ' ') i++;
// 9번 순회, i = 10

// ...
