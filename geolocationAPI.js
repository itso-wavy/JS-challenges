let tourlist = [
  {
    name: '오설록',
    addr: '제주 서귀포시 안덕면 신화역사로 15',
    latitude: 33.3046315,
    longitude: 126.2888373,
  },
  {
    name: '섭지코지',
    addr: '제주 서귀포시 성산읍 섭지코지로',
    latitude: 33.424214,
    longitude: 126.9289223,
  },
  {
    name: '함덕해수욕장',
    addr: '제주 제주시 조천읍 신북로',
    latitude: 33.5434402,
    longitude: 126.6610204,
  },
];

// 두 지점의 위도, 경도 정보를 통해 지점간의 거리 계산
function getDistance(lat1, lon1, lat2, lon2, unit) {
  // pi = 원의 둘레/지름
  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let radLon1 = (Math.PI * lon1) / 180;
  let radLon2 = (Math.PI * lon2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let distance =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radiLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  distance = MAth.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;
  if (unit == 'K') {
    distance = distance * 1.609344;
  }
  if (unit == 'N') {
    distance = distance * 0.8684;
  }
  return distance;
}

if ('geolocation' in navigator) {
  // 위치정보 사용 가능 여부 확인

  // 현재 위치 정보 확인
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
    for (let i = 0; i < tourlist.length; i++) {
      let distance = getDistance(
        latitude,
        longitude,
        tourlist[i].latitude,
        tourlist[i].longitude,
        'K'
      );
      tourlist[i].distance = distance;
    }
    let newTourList = tourlist.sort(function (a, b) {
      return a.distance - b.distance;
    });
    document.write(newTourList);
  });
  // 실시간 위치 정보 확인
  const watchID = navigator.geolocation.watchPosition(position => {
    const latitude = position.coords.latitude; // 위도
    const longitude = position.coords.longitude; // 경도
  });
  navigator.geolocation.clearWatch(watchID); // 위치 감지 종료
} else {
  document.write('해당 브라우저에서는 위치 정보가 제공되지 않습니다.');
}
