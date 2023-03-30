function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function rpsPlayer(userRps) {
//   const rps = ['가위', '바위', '보'];
//   const playerRps = rps[getRandomInteger(0, 2)];

//   if (userRps == playerRps) {
//     return {
//       userRps: userRps,
//       playerRps: playerRps,
//       score: 0,
//     };
//   } else if (userRps == '가위') {
//     if (playerRps == '바위') {
//       return {
//         userRps: '가위',
//         playerRps: '바위',
//         score: -1,
//       };
//     } else {
//       return {
//         userRps: '가위',
//         playerRps: '보',
//         score: 1,
//       };
//     }
//   } else if (userRps == '바위') {
//     if (playerRps == '보') {
//       return {
//         userRps: '바위',
//         playerRps: '보',
//         score: -1,
//       };
//     } else {
//       return {
//         userRps: '바위',
//         playerRps: '가위',
//         score: 1,
//       };
//     }
//   } else if (userRps == '보') {
//     if (playerRps == '가위') {
//       return {
//         userRps: '보',
//         playerRps: '가위',
//         score: -1,
//       };
//     } else {
//       return {
//         userRps: '보',
//         playerRps: '바위',
//         score: 1,
//       };
//     }
//   }
// }

function rpsPlayer2(userRps) {
  const rps = ['가위', '바위', '보'];
  const playerRps = rps[getRandomInteger(0, 2)];
  const winValue = {
    가위: '바위',
    바위: '보',
    보: '가위',
  };
  return {
    userRps: userRps,
    playerRps: playerRps,
    score:
      userRps == playerRps
        ? score
        : winValue[playerRps] == userRps
        ? score++
        : score--,
  };
}

let score = 0;
const form = document.querySelector('form');
const scissors = document.querySelector('#scissors');
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scoreboard = document.querySelector('#scoreboard');
const user = document.querySelector('#user');
const player = document.querySelector('#player');

const handleCalculation = e => {
  const { userRps, playerRps, score } = rpsPlayer2(e.target.value);
  user.innerText = userRps;
  player.innerText = playerRps;
  scoreboard.innerText = score;
};

scissors.addEventListener('click', handleCalculation);
rock.addEventListener('click', handleCalculation);
paper.addEventListener('click', handleCalculation);

form.addEventListener('submit', e => {
  e.preventDefault();
});
