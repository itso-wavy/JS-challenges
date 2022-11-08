const dq = document.querySelector.bind(document);

const startBtn = dq('.btn-start')
const resetBtn = dq('.btn-reset')
const hrs = dq('.hrs-nums')
const min = dq('.min-nums')
const sec = dq('.sec-nums')

startBtn.addEventListener(click, start)
pauseBtn.addEventListener(click, stop)
resetBtn.addEventListener(click, reset)
if(hrs === 00 && min === 00 && sec === 00) reset();

function start() {
    startTime = new Date();
    timer = setInterval(function () {
        const now = new Date();
        
    }, 10);
}

function reset() {
    clearInterval(timer)
    hrs = 0; min = 0; sec = 0;
    hrs.innerText = "00"
    min.innerText = "00"
    sec.innerText = "00"
}