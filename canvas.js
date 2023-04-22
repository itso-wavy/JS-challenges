const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 300;

ctx.lineWidth = 2; // 선 굵기
ctx.strokeStyle = 'yellow'; // 선 색상
ctx.fillStyle = "red"; // 채우기 색상


// fillRect = fill + rect
// rect = moveTo + lineTo

ctx.fillRect(50, 50, 100, 200); // 블랙
ctx.fillStyle = "green";
ctx.rect(100, 100, 100, 100); // x시작점, y시작점, x도착점, y도착점
ctx.fill();

ctx.beginPath(); // 새로운 context/ 컬러, 스타일 등 변경
ctx.rect(150, 150, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "blue";
ctx.moveTo(50, 50); // 시작점 변경
ctx.lineTo(150, 50); // 선 긋기
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill()

ctx.strokeRect(150, 150, 50, 49);
ctx.fillRect(100, 100, 50, 100);
ctx.fillRect(100, 100, 100, 20);
ctx.fillRect(200, 100, 50, 100);
ctx.moveTo(100, 100);
ctx.lineTo(200, 50);
ctx.lineTo(100, 100);
ctx.stroke();

ctx.fillRect(210 - 40, 200 - 30, 15, 100);
ctx.fillRect(350 - 40, 200 - 30, 15, 100);
ctx.fillRect(260 - 40, 200 - 30, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI); //x좌표, y좌표, 반지름, 시작 각도, 종료 각도
// 0 * Math.PI = 2 * Math.PI = 3시 
// 0.5 * Math.PI = 6시 
// 1 * Math.PI = 9시 
// 1.5 * Math.PI = 12시 
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);


/// 누데이크 스타일
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const brush = document.querySelector('#brush');
CANVAS_WIDTH = 352;
CANVAS_HEIGHT = 250;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let isPainting = false;

function onMove(e) {
  brush.style.left = e.offsetX + 'px';
  brush.style.top = e.offsetY + 'px';

  if (isPainting) { 
  ctx.clearRect(e.offsetX-30, e.offsetY-30, e.offsetX-30, e.offsetY-30)
  }
  ctx.moveTo(e.offsetX, e.offsetY); 
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
