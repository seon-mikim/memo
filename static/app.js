async function createMemo(value) {
  const response = await fetch('/memos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
	});
	const res = response.json()
	console.log(res)
}

const handleSubmit = (event) => {
  event.preventDefault();
  const inputEl = document.querySelector('#memo-input');
  createMemo(inputEl.value);
  inputEl.value = '';
};

const formEl = document.querySelector('#memo-form');
formEl.addEventListener('submit', handleSubmit);
