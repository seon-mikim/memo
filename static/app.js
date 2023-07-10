
const formEl = document.querySelector('#memo-form');

async function createMemo(value) {
  const response = await fetch('/memos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  
  readMemos();
}

const handleSubmit = (event) => {
  event.preventDefault();
  const inputEl = document.querySelector('#memo-input');
  createMemo(inputEl.value);
  inputEl.value = '';
};

formEl.addEventListener('submit', handleSubmit);

function displayMemo(memo) {
  const ulEl = document.querySelector('ul');
  const liEl = document.createElement('li');
  liEl.innerText = `id:[${memo.id}] ${memo.content}`;
  ulEl.appendChild(liEl);
}

async function readMemos() {
  const response = await fetch('/memos');
  const res = await response.json();
  const ulEl = document.querySelector('ul');
  ulEl.innerHTML = '';
  res.forEach(displayMemo);
}

readMemos();