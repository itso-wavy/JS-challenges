let recognition = null;

const checkCompatibility = () => {
  // 브라우저 지원 여부 확인
  if (typeof webkitSpeechRecognition !== 'function') {
    document.write('해당 브라우저에서는 webspeech api를 사용할 수 없습니다.');
  }

  // 객체 생성 & 환경 설정
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'ko-KR'; // 인식 언어 지정
  recognition.maxAlternatives = 3; // 텍스트 전환 결과 최대 개수 설정
};

const startSpeechRecognition = () => {
  recognition.addEventListener('speechstart', () => {
    console.log('speech start');
  });
  recognition.addEventListener('speechend', () => {
    console.log('speech end');
  });
  recognition.addEventListener('result', e => {
    const txt = e.results[0][0].transcript;
    document.getElementById('speech-result').value = txt;
  });
  recognition.start();
};

const endSpeechRecognition = () => {
  recognition.stop();
};

window.addEventListener('load', checkCompatibility);
