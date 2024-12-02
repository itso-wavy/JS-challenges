console.log('😇js loaded');

const worker = new Worker('worker.js');

// 작업 위임
worker.postMessage('worker: hi!');

// 결과 처리
worker.onmessage = e => {
  console.log('계산 결과:', e.data);
};
