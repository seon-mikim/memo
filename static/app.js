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

const handleClick = async (event) => {
  const { id } = event.target.dataset;
  const editInput = prompt('수정할 값을 입력하세요');
  const response = await fetch(`/memo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      content: editInput
    })
  });
  readMemos()
};

function displayMemo(memo) {
  const ulEl = document.querySelector('ul');

  const liEl = document.createElement('li');
  liEl.innerText = `id:[${memo.id}] ${memo.content}`;

  const editBtnEl = document.createElement('button');
  editBtnEl.innerText = 'edit';
  editBtnEl.dataset.id = memo.id;
  editBtnEl.addEventListener('click', handleClick);

  liEl.appendChild(editBtnEl);
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
