// 1
0 + NaN // NaN
0 + Infinity // Infinity
0 + false // 0
0 + true // 1
0 + null // 0
0 + undefined // NaN

// 2
[] + [] // '' // + 연산으로 문자열 변환됨
[] - [] // 0
[] + {} // '[object Object]'
[] - {} // NaN
{} + {} // NaN
{} - {} // NaN
{} + [] // 0
{} - [] // -0
/* 
Number([]) === 0
Number({}) === NaN
 */

// ...

// 5 이스케이프 시퀀스
`
\n
\b
\t
\r
\f
\'
\"
\\
\newline
`

// 6 유니코드
`🌐`

// 7 템플릿 리터럴 표현식
const jerry = {name: 'jerry', age: 100}
const tl = `jerry's age is ${jerry.age}!`

// 8 배열 인덱스 시퀀스
const arr = [,,,]
arr[0] = null
arr[1] = undefined

// 9 배열 인덱스 넌시퀀스
const arr2 = [0, 1, 2]
arr2[0.5] = 0.5
arr2[1.5] = 1.5
arr2 // [0, 1, 2, 0.5: 0.5, 1.5: 1.5]

// 10 배열 문자화
const arr3 = [[1, 2, 3]]
arr3.toString() // '1,2,3'

// 11 객체 인터로깅, 
let harry, sally
harry = {friends: [sally]} 
sally = {friends: [harry]}
JSON.stringify(harry) // '{"friends":[null]}'
JSON.stringify(sally) // '{"friends":[{"friends":[null]}]}'



