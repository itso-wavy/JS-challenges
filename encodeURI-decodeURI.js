const word = document.querySelector('#searchInput').value.replaceAll(' ', '');
const encoded = encodeURI(`https://serieson.naver.com/v3/search?query=${word}`);
doc.querySelector('#result').value = decodeURI(encoded);
