let data = '';
let totalPage;
const ID = 'tb';
const pagecnt = 10;
let pageRange = [];
let currentPage = 1;
let currentCnt = [];

// 렌더링
const renderTable = (id, data) => {
  const html = [];
  for (const ele of data) {
    html.push('<tr class="border border-black">');
    html.push(`<td class="p-3 bg-stone-200">${ele.id}</td>`);
    html.push(`<td class="p-3">${ele.title}</td>`);
    html.push(
      `<td class=""><img class="align-top w-full max-h-96" src="${ele.image}"></td>`
    );
    html.push(`<td class="p-3 text-left">${ele.description}</td>`);
    html.push(
      `<td class="p-3 bg-stone-200">${ele.ingredients
        .toString()
        .replaceAll(',', ', ')}</td>`
    );
    html.push('</tr>');
  }
  document.getElementById(id).innerHTML = html.join('');
};

// 페이지네이션
const prevPage = () => {
  currentPage = pageRange[0];
  pageRange = [
    currentPage - 5,
    currentPage - 4,
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
  ];
  changePage(currentPage - 1);
};

const nextPage = () => {
  const lastPage = pageRange[pageRange.length - 1];
  const startIdx = lastPage + 1;
  let endIdx = lastPage + 5 > totalPage ? lastPage + 5 : totalPage;
  pageRange = [];
  for (let i = startIdx; i <= endIdx; i++) {
    pageRange.push(i);
  }
  changePage(lastPage + 1);
};

const changePage = page => {
  currentPage = page;
  currentCnt = [];
  const firstCntIdx = (page - 1) * pagecnt;
  let lastCntIdx = page * pagecnt > data.length ? data.length : page * pagecnt;
  for (let i = firstCntIdx; i < lastCntIdx; i++) {
    currentCnt.push(data[i]);
  }
  renderTable(ID, currentCnt);
  paging();
};

const renderPagination = () => {
  const html = [];
  pageRange[0] > 1 &&
    html.push(
      `<a class="w-3 h-3 bg-slate-300" href="javascript:prevPage();">&laquo;</a>`
    );

  for (const page of pageRange) {
    html.push(
      `<a href="javascript:changePage(${page});" class="w-3 h-3 bg-slate-300 ${
        page === currentPage ? 'active' : ''
      }">${page}</a>`
    );
  }

  pageRange[pageRange.length - 1] < totalPage &&
    html.push(
      `<a class="w-3 h-3 bg-slate-300" href="javascript:nextPage();">&raquo;</a>`
    );

  document.querySelector('.pagination').innerHTML = html.join('');
};

const paging = () => {
  totalPage = Math.ceil(data.length / pagecnt);
  if (totalPage > 5) {
    pageRange = [1, 2, 3, 4, 5];
  } else {
    pageRange = [];
    for (var i = 1; i <= totalPage; i++) {
      pageRange.push(i);
    }
  }
  renderPagination();
};

// 필터링
const filter = () => {
  const search = document.getElementById('search').value;
  if (search) {
    const regexp = new RegExp(search, 'i');
    data = getData().filter(
      ele =>
        regexp.test(ele.name) ||
        regexp.test(ele.email) ||
        regexp.test(ele.phone) ||
        regexp.test(ele.address)
    );
    renderTable(ID, data);
    changePage(1);
  } else return;
};

// 정렬
let sortKey;
let isAsc = true; // 1234...
const sort = columnKey => {
  columnKey === sortKey && (isAsc = !isAsc);
  let sortScore = isAsc ? 1 : -1;
  const sortedData = data.sort((a, b) =>
    a[columnKey] > b[columnKey]
      ? sortScore
      : a[columnKey] < b[columnKey]
      ? sortScore * -1
      : 0
  );

  renderTable(ID, sortedData);
  changePage(currentPage);
  sortKey = columnKey;
};

// 데이터 가져오기
const getData = async () => {
  data = await (await fetch('https://api.sampleapis.com/coffee/hot')).json();
  renderTable(ID, data);
  return data;
};

// 이벤트 실행
window.addEventListener('load', () => {
  getData();
  document.querySelectorAll('th[data-sort-key]').forEach(th => {
    th.addEventListener('click', () => {
      sort(th.getAttribute('data-sort-key'));
    });
  });
  paging();
  changePage(1);
});

document.getElementById('search-btn').addEventListener('click', filter);
