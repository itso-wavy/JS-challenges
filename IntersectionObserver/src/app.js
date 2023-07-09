// const primaryHeader = document.querySelector('.primary-header');
// const scrollWatcher = document.createElement('div');

// scrollWatcher.setAttribute('data-scroll-watcher', '');
// primaryHeader.before(scrollWatcher);

// const navObserver = new IntersectionObserver(
//   entries => {
//     primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting);
//   },
//   { rootMargin: '50px 0px 0px 0px' }
// );

// navObserver.observe(scrollWatcher);

const $header = document.querySelector('.primary-header');
const $sections = document.querySelectorAll('section');

const options = {
  root: null, // 경로: 초깃값 null=뷰포트
  threshold: 0, // 항목의 배율: 0 ~ 1, 항목의 몇 %가 포함될지 결정
  rootMargin: '-80px 0px 0px 0px', // 초깃값 0px(px 기재 필수)
};

const callback = (entries, observer) => {
  /* props[0][0] = IntersectionObserverEntry[0]

    boundingClientRect: DOMRectReadOnly {x: 0, y: 0, width: 543, height: 62.09375, top: 0, …}
    intersectionRatio: 1
    intersectionRect: DOMRectReadOnly {x: 0, y: 0, width: 543, height: 62.09375, top: 0, …}
    isIntersecting: true
    isVisible: false
    rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 543, height: 311, top: 0, …}
    target: header.primary-header
    time: 103.40000000596046
  */
  /* observer

    delay: 0
    root: null
    rootMargin: "0px 0px 0px 0px"
    thresholds: [0]
    trackVisibility: false
  */
  entries.forEach(entry => {
    console.log(entry.target);
    entry.target.classList.toggle('sticking', !entries[0].isIntersecting);
  });
};

const observer = new IntersectionObserver(callback, options);

observer.observe($header);
// $sections.forEach($section => observer.observe($section));
