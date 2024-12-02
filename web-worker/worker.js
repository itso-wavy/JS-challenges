self.onmessage = event => {
  // self 생략 가능
  console.log('😇from main-thread:', event.data);
  console.log('😇self', self); // DedicatedWorkerGlobalScope

  const receivedData = event.data;

  // 데이터 처리 로직
  const result = someHeavyTask(receivedData);

  // 메인 스레드로 결과 전송
  self.postMessage(result);
};

// 에러 처리
self.onerror = error => {
  console.error('Worker error:', error);
};

const someHeavyTask = params => {
  console.log(params);
  return;
};

// Worker 종료
worker.terminate();

/* 
// Web Worker에서 사용 가능한 API들
self.setTimeout();
self.setInterval();
self.addEventListener();
self.postMessage();
self.importScripts();

// Web Worker에서 사용 불가능한 API들
// self.document (없음)
// self.window (없음)
// self.alert (없음)
// self.prompt (없음)
*/
